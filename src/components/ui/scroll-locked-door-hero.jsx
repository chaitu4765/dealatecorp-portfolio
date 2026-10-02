import { useLayoutEffect, useRef, useState } from "react";

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

// Adapted from the supplied scroll-locked hero. Live doors replace video seeking,
// and the scroll lock is released as soon as the homepage reveal completes.
export function ScrollLockedDoorHero({ children, scrubDistance = 1500 }) {
  const rootRef = useRef(null);
  const dialogRef = useRef(null);
  const enterRef = useRef(null);
  const progressRef = useRef(null);
  const controlsRef = useRef(null);
  const [complete, setComplete] = useState(false);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const dialog = dialogRef.current;
    if (!root || !dialog) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const navigation = window.performance.getEntriesByType?.("navigation")[0];
    // Direct section links and restored history should land at their destination.
    if (
      reduced.matches ||
      window.location.hash ||
      window.scrollY > 8 ||
      navigation?.type === "back_forward" ||
      typeof dialog.showModal !== "function"
    ) {
      setComplete(true);
      return;
    }

    const bodyProperties = [
      "position",
      "top",
      "left",
      "right",
      "width",
      "height",
      "overflow",
      "overscrollBehavior",
    ];
    const savedBodyStyles = Object.fromEntries(
      bodyProperties.map((key) => [key, document.body.style[key]]),
    );
    const html = document.documentElement;
    const savedOverflow = html.style.overflow;
    const savedScrollBehavior = html.style.scrollBehavior;
    const startY = window.scrollY;
    let locked = true;
    let disposed = false;
    let finished = false;
    let frameId = 0;
    let lastTime = 0;
    let target = 0;
    let progress = 0;
    let automatic = false;
    let touchY = 0;
    let percentage = -1;

    root.dataset.active = "true";
    html.style.overflow = "hidden";
    Object.assign(document.body.style, {
      position: "fixed",
      top: `${-startY}px`,
      left: "0",
      right: "0",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      overscrollBehavior: "none",
    });
    dialog.showModal();
    enterRef.current?.focus({ preventScroll: true });

    function paint(value) {
      root.style.setProperty("--entry-progress", String(value));
      root.style.setProperty(
        "--entry-door-opacity",
        String(1 - clamp((value - 0.84) / 0.16)),
      );
      root.style.setProperty(
        "--entry-copy-opacity",
        String(1 - clamp(value / 0.42)),
      );
      root.style.setProperty(
        "--entry-scene-scale",
        String(0.86 + value * 0.14),
      );
      const next = Math.round(value * 100);
      if (next !== percentage) {
        percentage = next;
        progressRef.current?.setAttribute("aria-valuenow", String(next));
      }
    }

    function unlock() {
      if (!locked) return;
      locked = false;
      delete root.dataset.active;
      html.style.overflow = savedOverflow;
      Object.assign(document.body.style, savedBodyStyles);
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, startY);
      html.style.scrollBehavior = savedScrollBehavior;
    }

    function finish() {
      if (disposed || finished) return;
      finished = true;
      window.cancelAnimationFrame(frameId);
      frameId = 0;
      paint(1);
      dialog.close();
      unlock();
      setComplete(true);
      root.querySelector("#hero-title")?.focus({ preventScroll: true });
    }

    function tick(time) {
      frameId = 0;
      if (disposed || finished) return;
      const delta = lastTime ? Math.min(time - lastTime, 40) : 16;
      lastTime = time;
      if (automatic) target = clamp(target + delta / 1550);
      progress += (target - progress) * (1 - Math.exp(-delta / 80));
      if (target === 1 && progress > 0.998) {
        finish();
        return;
      }
      paint(progress);
      if (automatic || Math.abs(target - progress) > 0.0002) {
        frameId = window.requestAnimationFrame(tick);
      } else {
        lastTime = 0;
      }
    }

    function schedule() {
      if (!frameId && !finished) frameId = window.requestAnimationFrame(tick);
    }

    function addDelta(delta) {
      if (finished) return;
      automatic = false;
      target = clamp(target + delta / Math.max(400, scrubDistance));
      schedule();
    }

    function onWheel(event) {
      if (event.ctrlKey || finished) return;
      const unit =
        event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? window.innerHeight
            : 1;
      addDelta(event.deltaY * unit);
      event.preventDefault();
    }

    function onTouchStart(event) {
      if (event.touches.length === 1) touchY = event.touches[0].clientY;
    }

    function onTouchMove(event) {
      if (event.touches.length !== 1 || finished) return;
      const nextY = event.touches[0].clientY;
      addDelta((touchY - nextY) * 2);
      touchY = nextY;
      event.preventDefault();
    }

    function onKey(event) {
      if (event.ctrlKey || event.metaKey || event.altKey || finished) return;
      const delta = {
        ArrowDown: 190,
        ArrowUp: -190,
        PageDown: 450,
        PageUp: -450,
        End: scrubDistance,
        Home: -scrubDistance,
      }[event.key];
      if (delta !== undefined) {
        event.preventDefault();
        addDelta(delta);
      }
      // Enter/Space on the focused buttons retain their native activation.
    }

    function onCancel(event) {
      event.preventDefault();
      finish();
    }

    function onReducedMotion(event) {
      if (event.matches) finish();
    }

    controlsRef.current = {
      open() {
        automatic = true;
        schedule();
      },
      skip: finish,
    };
    paint(0);
    dialog.addEventListener("wheel", onWheel, { passive: false });
    dialog.addEventListener("touchstart", onTouchStart, { passive: true });
    dialog.addEventListener("touchmove", onTouchMove, { passive: false });
    dialog.addEventListener("keydown", onKey);
    dialog.addEventListener("cancel", onCancel);
    reduced.addEventListener("change", onReducedMotion);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      dialog.removeEventListener("wheel", onWheel);
      dialog.removeEventListener("touchstart", onTouchStart);
      dialog.removeEventListener("touchmove", onTouchMove);
      dialog.removeEventListener("keydown", onKey);
      dialog.removeEventListener("cancel", onCancel);
      reduced.removeEventListener("change", onReducedMotion);
      if (dialog.open) dialog.close();
      unlock();
      controlsRef.current = null;
    };
  }, [complete, scrubDistance]);

  return (
    <div className="home-entrance" ref={rootRef}>
      <div className="home-entrance__page">{children}</div>
      {!complete && (
        <dialog
          className="home-entrance__dialog"
          ref={dialogRef}
          aria-labelledby="entrance-title"
          aria-describedby="entrance-description"
        >
          <h2 id="entrance-title" className="home-entrance__sr-only">
            Welcome to DealateCorp
          </h2>
          <p id="entrance-description" className="home-entrance__sr-only">
            Scroll or swipe up to open the doors and reveal our homepage. You
            can also choose Enter DealateCorp, or press Escape to skip.
          </p>
          <div className="home-entrance__doors" aria-hidden="true">
            {["left", "right"].map((side) => (
              <div
                key={side}
                className={`home-entrance__door home-entrance__door--${side}`}
              >
                <div className="home-entrance__identity">
                  <div className="home-entrance__emblem">
                    <img
                      src="/assets/logo.png"
                      alt=""
                      width="170"
                      height="147"
                    />
                  </div>
                  <strong>DealateCorp</strong>
                  <span>For a better tomorrow</span>
                </div>
                <div className="home-entrance__handle" />
                <span className="home-entrance__department">
                  {side === "left"
                    ? "01 / Technology"
                    : "02 / Digital marketing"}
                </span>
              </div>
            ))}
          </div>
          <div className="home-entrance__frame" aria-hidden="true" />
          <div className="home-entrance__topline">
            <span>A new perspective awaits</span>
            <button type="button" onClick={() => controlsRef.current?.skip()}>
              Skip intro <span aria-hidden="true">↗</span>
            </button>
          </div>
          <div className="home-entrance__invitation">
            <p>Open the door to what’s next.</p>
            <button
              ref={enterRef}
              type="button"
              onClick={() => controlsRef.current?.open()}
            >
              Enter DealateCorp <span aria-hidden="true">↗</span>
            </button>
            <span className="home-entrance__hint">
              Scroll or swipe to open <span aria-hidden="true">↓</span>
            </span>
          </div>
          <div
            className="home-entrance__progress"
            role="progressbar"
            aria-label="Homepage reveal"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow="0"
            ref={progressRef}
          >
            <span />
          </div>
        </dialog>
      )}
    </div>
  );
}
