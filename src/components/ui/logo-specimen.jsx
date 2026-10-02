import { useEffect, useRef, useState } from "react";
import { departments, selectedWork } from "../../data/home-content.js";

function ReactiveFrame({ project, index }) {
  const reset = (event) => {
    event.currentTarget.style.removeProperty("--frame-x");
    event.currentTarget.style.removeProperty("--frame-y");
    event.currentTarget.style.removeProperty("--frame-rx");
    event.currentTarget.style.removeProperty("--frame-ry");
  };
  const move = (event) => {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    // Measure the stationary wrapper so the moving image never chases the pointer.
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const style = event.currentTarget.style;
    style.setProperty("--frame-x", `${x * 10}px`);
    style.setProperty("--frame-y", `${y * 10}px`);
    style.setProperty("--frame-rx", `${-y * 12}deg`);
    style.setProperty("--frame-ry", `${x * 12}deg`);
  };
  return (
    <a
      className="logo-specimen__project"
      href={project.href}
      aria-label={`Explore ${project.name} — ${project.type}`}
      data-work-frame={index}
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerCancel={reset}
      onBlur={reset}
    >
      <figure>
        <img
          src={project.image}
          alt={`${project.name} ${project.type.toLowerCase()} by DC Creative Labs`}
          loading="lazy"
          width="1080"
          height="1080"
        />
        <figcaption>
          {project.name}
          <span aria-hidden="true">↗</span>
        </figcaption>
      </figure>
    </a>
  );
}

const NAV = [
  "Welcome",
  "Disciplines",
  "Capabilities",
  "Our work",
  "Creative Labs",
  "Let’s talk",
];
const clamp = (x) => Math.max(0, Math.min(1, x));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
// Adapted from the supplied Lycoris specimen: each scroll composition holds
// briefly before the object and type morph into the next composition.
function sceneCoord(progress) {
  const t = clamp(progress) * (NAV.length - 1);
  const i = Math.min(Math.floor(t), NAV.length - 2);
  return i + ease(clamp((t - i - 0.17) / 0.66));
}
const KEYS = [
  [50, 25, 1, -12, -6],
  [50, 45, 0.73, 25, 8],
  [79, 45, 0.78, -28, -7],
  [50, 46, 0.28, 24, 6],
  [73, 48, 1.05, -22, -8],
  [76, 29, 0.58, 12, 2],
];
const MOBILE_KEYS = [
  [50, 23, 0.8, -12, -6],
  [50, 28, 0.65, 25, 8],
  [77, 19, 0.39, -28, -7],
  [50, 53, 0.32, 24, 6],
  [76, 23, 0.52, -22, -8],
  [76, 23, 0.43, 12, 2],
];

// The upper shape and diagonal stroke are one continuous silhouette, matching
// /assets/logo.png. Every depth layer uses that same connected outline.
function BrandMark({ edge = false }) {
  return (
    <svg viewBox="0 0 176 148" aria-hidden="true" focusable="false">
      <path
        className={edge ? "logo-specimen__edge" : "logo-specimen__cyan"}
        d="M41 12H75C107 12 129 27 138 53L167 48L10 106L41 87Z"
      />
      <path
        className={edge ? "logo-specimen__edge" : "logo-specimen__blue"}
        d="M41 101L149 73C144 113 119 136 80 136H41Z"
      />
    </svg>
  );
}

export function LogoSpecimen() {
  const rootRef = useRef(null),
    stageRef = useRef(null),
    objectRef = useRef(null),
    jumpRef = useRef(null);
  const [active, setActive] = useState(0);
  const [staticMode, setStaticMode] = useState(false);
  useEffect(() => {
    const root = rootRef.current,
      stage = stageRef.current,
      object = objectRef.current;
    const panels = [...stage.querySelectorAll("[data-logo-scene]")];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0,
      disposed = false,
      visible = true,
      lastScene = -1,
      coord = 0,
      lastTime = 0;
    let targetX = 0,
      targetY = 0,
      pointerX = 0,
      pointerY = 0;
    let height = 1,
      width = 1,
      travel = 1,
      offset = 90,
      openingY = KEYS[0][1],
      openingScale = KEYS[0][2];
    const isStatic = () => reduced.matches || height < 1;
    const measure = () => {
      height = stage.clientHeight;
      width = stage.clientWidth;
      travel = Math.max(1, root.offsetHeight - height);
      offset = parseFloat(window.getComputedStyle(stage).top) || 0;
      // Fit the opening mark above the wordmark, including space for its tilt.
      // Short screens need a smaller mark as well as the higher position.
      const mobile = width < 700;
      const first = (mobile ? MOBILE_KEYS : KEYS)[0];
      const title = stage.querySelector("#hero-title");
      const titleTop = title.offsetTop;
      const topInset = mobile ? 38 : 28;
      const gap = mobile ? 18 : 28;
      const markHeight = object.offsetHeight * 1.12;
      openingScale = Math.min(
        first[2],
        Math.max(0.2, (titleTop - gap - topInset) / markHeight),
      );
      const halfMark = (markHeight * openingScale) / 2;
      openingY =
        (Math.max(
          topInset + halfMark,
          Math.min((height * first[1]) / 100, titleTop - gap - halfMark),
        ) /
          height) *
        100;
      wake();
    };
    const paint = () => {
      const i = Math.min(Math.floor(coord), NAV.length - 2),
        f = coord - i;
      const keys = width < 700 ? MOBILE_KEYS : KEYS;
      const from =
        i === 0
          ? [keys[0][0], openingY, openingScale, ...keys[0].slice(3)]
          : keys[i];
      const values = from.map((v, j) => v + (keys[i + 1][j] - v) * f);
      object.style.left = `${values[0]}%`;
      object.style.top = `${values[1]}%`;
      object.style.transform = `translate(-50%, -50%) perspective(1200px) rotateY(${values[3] + pointerX * 7}deg) rotateX(${-pointerY * 6}deg) rotateZ(${values[4]}deg) scale(${values[2]})`;
      const next = Math.round(coord);
      if (next !== lastScene) {
        lastScene = next;
        setActive(next);
      }
      panels.forEach((panel, index) => {
        const opacity = clamp((0.72 - Math.abs(coord - index)) / 0.4);
        panel.style.opacity = String(opacity);
        panel.style.visibility = opacity <= 0.01 ? "hidden" : "visible";
        panel.style.transform = `translateY(${(1 - opacity) * (index > coord ? 28 : -28)}px)`;
        panel.inert = index !== next;
        panel.setAttribute("aria-hidden", String(index !== next));
      });
      root.style.setProperty(
        "--specimen-progress",
        String(coord / (NAV.length - 1)),
      );
    };
    function tick(now) {
      frameId = 0;
      if (disposed || document.hidden || !visible || isStatic()) return;
      const dt = Math.min(50, now - (lastTime || now - 16));
      lastTime = now;
      const target = sceneCoord(
        clamp((offset - root.getBoundingClientRect().top) / travel),
      );
      const smoothing = 1 - Math.exp(-dt / 75);
      coord += (target - coord) * smoothing;
      pointerX += (targetX - pointerX) * smoothing;
      pointerY += (targetY - pointerY) * smoothing;
      if (Math.abs(target - coord) < 0.0005) coord = target;
      paint();
      if (
        Math.abs(target - coord) > 0.0001 ||
        Math.abs(pointerX - targetX) > 0.001 ||
        Math.abs(pointerY - targetY) > 0.001
      )
        wake();
    }
    function wake() {
      if (!disposed && visible && !document.hidden && !frameId && !isStatic())
        frameId = requestAnimationFrame(tick);
    }
    const syncMotion = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
      root.dataset.static = String(reduced.matches);
      setStaticMode(reduced.matches);
      panels.forEach((panel) => {
        panel.removeAttribute("style");
        panel.inert = false;
        panel.setAttribute("aria-hidden", "false");
      });
      if (!reduced.matches) {
        measure();
        paint();
      }
    };
    const move = (event) => {
      if (event.pointerType !== "mouse") return;
      const rect = stage.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / width - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / height - 0.5) * 2;
      wake();
    };
    const leave = () => {
      targetX = targetY = 0;
      wake();
    };
    jumpRef.current = (index) => {
      if (isStatic()) {
        panels[index].scrollIntoView({ block: "center" });
        return;
      }
      window.scrollTo({
        top:
          window.scrollY +
          root.getBoundingClientRect().top -
          offset +
          (index / (NAV.length - 1)) * travel,
        behavior: "smooth",
      });
    };
    syncMotion();
    const resize =
      typeof ResizeObserver === "function" ? new ResizeObserver(measure) : null;
    resize?.observe(stage);
    const intersection =
      typeof IntersectionObserver === "function"
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) wake();
            else {
              cancelAnimationFrame(frameId);
              frameId = 0;
            }
          })
        : null;
    intersection?.observe(root);
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", measure);
    stage.addEventListener("pointermove", move, { passive: true });
    stage.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", wake);
    reduced.addEventListener("change", syncMotion);
    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      resize?.disconnect();
      intersection?.disconnect();
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", measure);
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", wake);
      reduced.removeEventListener("change", syncMotion);
      jumpRef.current = null;
    };
  }, []);
  return (
    <section
      className="logo-specimen"
      ref={rootRef}
      aria-label="DealateCorp — our story"
      data-logo-specimen
    >
      <div className="logo-specimen__stage" ref={stageRef}>
        <div className="logo-specimen__grid" aria-hidden="true" />
        <div
          className="logo-specimen__object"
          ref={objectRef}
          aria-hidden="true"
        >
          {[8, 6, 4, 2].map((depth) => (
            <div
              key={depth}
              className="logo-specimen__layer"
              style={{ transform: `translateZ(-${depth}px)` }}
            >
              <BrandMark edge />
            </div>
          ))}
          <div className="logo-specimen__layer logo-specimen__face">
            <BrandMark />
          </div>
        </div>
        <article
          className="logo-specimen__scene logo-specimen__cover"
          data-logo-scene="0"
        >
          <p className="logo-specimen__eyebrow">For a better tomorrow</p>
          <h1 id="hero-title" tabIndex={-1}>
            DealateCorp
          </h1>
          <div className="logo-specimen__cover-bottom">
            <h2>
              Your goals matter.
              <br />
              <span>Let’s get there together.</span>
            </h2>
            <div>
              <p>
                Websites, brands and marketing
                <br />
                that move you forward.
              </p>
              <a
                href="/contact/"
                className="logo-specimen__cta"
                data-project-enquiry
              >
                Start a project <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </article>
        <article
          className="logo-specimen__scene logo-specimen__disciplines"
          data-logo-scene="1"
          aria-hidden="true"
        >
          <p className="logo-specimen__eyebrow">01 / One shared direction</p>
          <div className="logo-specimen__split">
            <a href="/services/#department-it">
              <small>01 / IT Department</small>
              <h2>
                Your goals.
                <br />
                <span>Our priority.</span>
              </h2>
              <span>Explore technology ↗</span>
            </a>
            <a href="/services/#department-digital">
              <small>02 / Digital Marketing</small>
              <h2>
                Your growth.
                <br />
                <span>Our commitment.</span>
              </h2>
              <span>Explore marketing ↗</span>
            </a>
          </div>
          <p className="logo-specimen__bottom-line">
            We listen first. Then build around you.
          </p>
        </article>
        <article
          className="logo-specimen__scene logo-specimen__capabilities"
          data-logo-scene="2"
          aria-hidden="true"
        >
          <p className="logo-specimen__eyebrow">02 / What we do</p>
          <div className="logo-specimen__copy">
            <h2>
              Built for
              <br />
              <span>what’s next.</span>
            </h2>
            <div className="logo-specimen__service-links">
              {departments.map((department) => (
                <a key={department.name} href={department.href}>
                  {department.name}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </article>
        <article
          className="logo-specimen__scene logo-specimen__work"
          data-logo-scene="3"
          aria-hidden="true"
        >
          <p className="logo-specimen__eyebrow">03 / Selected creative</p>
          <h2>
            Let the work
            <br />
            <span>do the talking.</span>
          </h2>
          <div className="logo-specimen__projects">
            {selectedWork.map((project, index) => (
              <ReactiveFrame
                key={project.name}
                project={project}
                index={index}
              />
            ))}
          </div>
          <a
            className="logo-specimen__work-link"
            href="/clients/#client-brands"
          >
            Explore our work ↗
          </a>
        </article>
        <article
          className="logo-specimen__scene logo-specimen__studio"
          data-logo-scene="4"
          aria-hidden="true"
        >
          <p className="logo-specimen__eyebrow">04 / Inside DC Creative Labs</p>
          <div className="logo-specimen__copy">
            <h2>
              Good design.
              <br />
              Clear strategy.
              <br />
              <span>Lasting growth.</span>
            </h2>
            <p>
              Brand, content and marketing.
              <br />
              Made to work together.
            </p>
            <a className="logo-specimen__studio-link" href="#inside-dc">
              Inside Creative Labs <span aria-hidden="true">↓</span>
            </a>
          </div>
        </article>
        <article
          className="logo-specimen__scene logo-specimen__contact"
          data-logo-scene="5"
          aria-hidden="true"
        >
          <p className="logo-specimen__eyebrow">05 / Have something in mind?</p>
          <div className="logo-specimen__copy">
            <h2>
              Let’s make your
              <br />
              <span>next move count.</span>
            </h2>
            <a
              href="/contact/"
              className="logo-specimen__cta"
              data-project-enquiry
            >
              Start a project <span aria-hidden="true">↗</span>
            </a>
            <a
              className="logo-specimen__email"
              href="mailto:hr@dealatecorp.com"
            >
              hr@dealatecorp.com
            </a>
          </div>
        </article>
        <nav className="logo-specimen__nav" aria-label="Homepage scenes">
          {NAV.map((name, index) => (
            <button
              key={name}
              type="button"
              onClick={() => jumpRef.current?.(index)}
              aria-label={`Show ${name}`}
              aria-current={active === index ? "step" : undefined}
            >
              <span>{name}</span>
              <i aria-hidden="true" />
            </button>
          ))}
        </nav>
        <div className="logo-specimen__footer">
          <span>
            {String(active + 1).padStart(2, "0")} / 06 <b>{NAV[active]}</b>
          </span>
          <div className="logo-specimen__scene-controls">
            <button
              type="button"
              aria-label="Previous scene"
              disabled={active === 0}
              onClick={() => jumpRef.current?.(active - 1)}
            >
              ↑
            </button>
            {active === 5 ? (
              <a href="#inside-dc">
                Explore Creative Labs <span aria-hidden="true">↓</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={() => jumpRef.current?.(active + 1)}
              >
                Next scene <span aria-hidden="true">↓</span>
              </button>
            )}
          </div>
        </div>
        <div className="logo-specimen__progress" aria-hidden="true">
          <i />
        </div>
      </div>
    </section>
  );
}
