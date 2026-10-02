import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CapabilityFlipCard } from "./CapabilityFlipCard.jsx";

const CARD_HEIGHT = 0.58;
const CARD_RATIO = 1.45;
const STEP = 40;
const DRUM_RADIUS = 2.22;
const LENS = 2.7;
const BOW = 1.82;
const WHEEL_UNITS = 700;
const DRAG_UNITS = 320;
const EASE = 0.12;
const CULL = 1.6;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const lerp = (from, to, amount) => from + (to - from) * amount;
const radians = (degrees) => (degrees * Math.PI) / 180;
const bowAt = (angle, bow) => -bow * (1 - Math.cos(radians(angle)));

function placeCard(ringAngle, drumAngle, ringRadius, drumRadius, bow, mix) {
  return (
    `translateX(${mix * bowAt(drumAngle, bow)}px)` +
    ` rotateZ(${(1 - mix) * ringAngle}deg) translateY(${-(1 - mix) * ringRadius}px)` +
    ` rotateX(${mix * drumAngle}deg) translateZ(${mix * drumRadius}px)`
  );
}

/**
 * Capability adaptation of the supplied WorksWheel component: scroll and drag
 * through focused capability cards, then gather every card into a compact ring
 * after the final capability. The detail panel stays connected to the active
 * item throughout.
 */
export function CapabilityWheel({
  capabilities,
  activeIndex,
  onSelect,
  departmentName,
}) {
  const stageRef = useRef(null);
  const wheelRef = useRef(null);
  const itemRefs = useRef([]);
  const scalerRefs = useRef([]);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const dragY = useRef(null);
  const dragged = useRef(false);
  const target = useRef(activeIndex);
  const turn = useRef(activeIndex);
  const activeRef = useRef(activeIndex);
  const lastReported = useRef(activeIndex);
  const [stage, setStage] = useState({ width: 0, height: 0 });
  const [active, setActive] = useState(activeIndex);
  const [reducedMotion, setReducedMotion] = useState(false);

  const count = capabilities.length;
  const last = Math.max(count - 1, 0);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReducedMotion(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  useEffect(() => {
    const element = stageRef.current;
    if (!element) return undefined;
    const read = () =>
      setStage({ width: element.clientWidth, height: element.clientHeight });
    read();
    const observer = new ResizeObserver(read);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const metrics = useMemo(() => {
    const { width, height } = stage;
    const cardWidth = Math.min(height * CARD_HEIGHT * CARD_RATIO, width * 0.74, 500);
    const cardHeight = cardWidth / CARD_RATIO;
    // Keep the compact overview inside the stage, even at portrait/mobile
    // aspect ratios. The old card-relative radius pushed the outer cards past
    // the clipped edge before the wheel opened.
    const ringRadius = Math.min(width, height) * 0.27;
    const ringScale = count
      ? clamp(
          Math.min(
            (((2 * Math.PI * ringRadius) / count) * 0.82) / (cardWidth || 1),
            (Math.min(width, height) / 2 - ringRadius - 12) /
              (Math.hypot(cardWidth, cardHeight) / 2 || 1),
          ),
          0.16,
          1,
        )
      : 1;
    const drumRadius = cardHeight * DRUM_RADIUS;
    return {
      cardWidth,
      cardHeight,
      ringRadius,
      ringScale,
      drumRadius,
      bow: cardHeight * BOW,
      depth: cardHeight * LENS,
      titleSize: cardHeight * 0.124,
      indexSize: cardHeight * 0.04,
    };
  }, [stage, count]);

  const to = useCallback(
    (next) => {
      target.current = clamp(next, 0, last + 1);
    },
    [last],
  );

  const select = useCallback(
    (index) => {
      const next = clamp(index, 0, last);
      lastReported.current = next;
      to(next);
      onSelect(next);
    },
    [last, onSelect, to],
  );

  // Keep dropdown and wheel controls synchronized without restarting the wheel
  // when the wheel itself changes the selected capability.
  useEffect(() => {
    if (activeIndex === lastReported.current) return;
    lastReported.current = activeIndex;
    to(activeIndex);
  }, [activeIndex, to]);

  useEffect(() => {
    if (!stage.height) return undefined;
    let frame = 0;
    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reducedMotion ? 1 : EASE);

      // Each whole turn step focuses the next capability. Only the final
      // step transitions the last focused card into the complete circle.
      const position = clamp(turn.current, 0, last);
      const mix =
        turn.current < last
          ? 1
          : 1 - clamp(turn.current - last, 0, 1);
      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-mix * metrics.drumRadius}px)`;
      }

      for (let index = 0; index < count; index += 1) {
        const distance = index - position;
        const angle = distance * STEP;
        const item = itemRefs.current[index];
        if (item) {
          item.style.transform = placeCard(
            distance * (360 / count),
            angle,
            metrics.ringRadius,
            metrics.drumRadius,
            metrics.bow,
            mix,
          );
          const visible = mix <= 0.5 || Math.abs(distance) <= CULL;
          item.style.opacity = visible ? "1" : "0";
          item.style.pointerEvents = visible ? "auto" : "none";
          item.style.zIndex = String(Math.round(100 - Math.abs(distance) * 2));
          const hidden = visible ? "false" : "true";
          if (item.getAttribute("aria-hidden") !== hidden) {
            item.setAttribute("aria-hidden", hidden);
          }
          const button = item.querySelector("button");
          if (button && button.tabIndex !== (visible ? 0 : -1)) {
            button.tabIndex = visible ? 0 : -1;
          }
        }
        if (scalerRefs.current[index]) {
          scalerRefs.current[index].style.transform = `scale(${lerp(metrics.ringScale, 1, mix)})`;
        }
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - mix);
      if (titleRef.current) titleRef.current.style.opacity = String(mix);

      const near = clamp(Math.round(position), 0, last);
      if (activeRef.current !== near) {
        activeRef.current = near;
        setActive(near);
        lastReported.current = near;
        onSelect(near);
      }
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [count, last, metrics, onSelect, reducedMotion, stage.height]);

  useEffect(() => {
    const element = stageRef.current;
    if (!element) return undefined;
    const onWheel = (event) => {
      const next = target.current + event.deltaY / WHEEL_UNITS;
      const atEnd =
        target.current >= last + 1 &&
        turn.current >= last + 1 &&
        Math.abs(target.current - turn.current) < 0.001;

      // Keep the page in this section while the wheel is still revealing its
      // capabilities. Let downward scrolling continue only after the final
      // card has reached its settled position.
      if (event.deltaY > 0 ? !atEnd : next > 0 && next < last + 1) {
        event.preventDefault();
      }
      to(next);
    };
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => element.removeEventListener("wheel", onWheel);
  }, [last, to]);

  const activeName = capabilities[active]?.name || capabilities[0]?.name || "";

  return (
    <section
      className="capability-wheel"
      aria-label={`${departmentName} capabilities`}
    >
      <div
        ref={stageRef}
        className="capability-wheel__stage"
        tabIndex={0}
        role="group"
        aria-label={`${departmentName} capability wheel. Scroll or drag to explore.`}
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          if (event.target.closest("button")) {
            dragY.current = null;
            return;
          }
          dragY.current = event.clientY;
          dragged.current = false;
          event.currentTarget.setPointerCapture?.(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (dragY.current === null) return;
          const delta = dragY.current - event.clientY;
          if (Math.abs(delta) > 3) dragged.current = true;
          to(target.current + delta / DRAG_UNITS);
          dragY.current = event.clientY;
        }}
        onPointerUp={() => {
          dragY.current = null;
          if (dragged.current) to(Math.round(target.current));
          window.setTimeout(() => {
            dragged.current = false;
          }, 0);
        }}
        onPointerCancel={() => {
          dragY.current = null;
          dragged.current = false;
        }}
        onClickCapture={(event) => {
          if (!dragged.current) return;
          event.preventDefault();
          event.stopPropagation();
          dragged.current = false;
        }}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            to(Math.round(target.current) + 1);
          } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            to(Math.round(target.current) - 1);
          } else {
            return;
          }
          event.preventDefault();
        }}
      >
        <div
          ref={wheelRef}
          className="capability-wheel__track"
          aria-live="off"
        >
          {capabilities.map((capability, index) => (
            <div
              key={capability.id}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              className="capability-wheel__item"
              style={{
                width: metrics.cardWidth,
                height: metrics.cardHeight,
                marginLeft: -metrics.cardWidth / 2,
                marginTop: -metrics.cardHeight / 2,
              }}
            >
              <div
                ref={(node) => {
                  scalerRefs.current[index] = node;
                }}
                className="capability-wheel__scaler"
              >
                <CapabilityFlipCard
                  capability={capability}
                  index={index}
                  selected={activeIndex === index}
                  onSelect={() => select(index)}
                />
              </div>
            </div>
          ))}
        </div>
        <div ref={labelRef} className="capability-wheel__label">
          Explore capabilities
        </div>
        <div ref={titleRef} className="capability-wheel__title" aria-hidden="true">
          {activeName}
        </div>
        <ol className="capability-wheel__index" aria-label="Choose a capability">
          {capabilities.map((capability, index) => (
            <li key={capability.id}>
              <button
                type="button"
                aria-current={activeIndex === index ? "true" : undefined}
                onClick={() => select(index)}
              >
                {capability.name}
              </button>
            </li>
          ))}
        </ol>
        <p className="capability-wheel__hint">
          Scroll through capabilities · continue after the last
        </p>
      </div>
    </section>
  );
}

export default CapabilityWheel;
