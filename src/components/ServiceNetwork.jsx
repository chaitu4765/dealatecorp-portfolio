import { useEffect, useLayoutEffect, useRef, useState } from "react";

/** SVG beam styling adapted from Inspira UI. See public/assets/third-party-notices.txt. */
export function ServiceNetwork({ services, selected, onSelect, renderIcon }) {
  const container = useRef(null);
  const hub = useRef(null);
  const svg = useRef(null);
  const nodes = useRef([]);
  const [geometry, setGeometry] = useState({
    width: 1,
    height: 1,
    beams: [],
  });
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [visible, setVisible] = useState(false);
  const [pageHidden, setPageHidden] = useState(
    typeof document !== "undefined" && document.hidden,
  );
  useLayoutEffect(() => {
    let disposed = false,
      frame = 0;
    const measure = () => {
      frame = 0;
      if (disposed) return;
      const bounds = container.current.getBoundingClientRect();
      const centre = hub.current.getBoundingClientRect();
      const ex = centre.left - bounds.left + centre.width / 2;
      const ey = centre.top - bounds.top + centre.height / 2;
      setGeometry({
        width: bounds.width,
        height: bounds.height,
        beams: nodes.current.map((node) => {
          const icon = node.getBoundingClientRect();
          const sx = icon.left - bounds.left + icon.width / 2;
          const sy = icon.top - bounds.top + icon.height / 2;
          return {
            sx,
            ex,
            delta: ex - sx,
            d: `M ${sx} ${sy} Q ${(sx + ex) / 2} ${sy} ${ex} ${ey}`,
          };
        }),
      });
    };
    const schedule = () => {
      if (!disposed && !frame) frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    [container.current, hub.current, ...nodes.current].forEach((node) =>
      observer.observe(node),
    );
    document.fonts.ready.then(schedule);
    measure();
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReduced(media.matches);
    const onVisibility = () => setPageHidden(document.hidden);
    const observer = new IntersectionObserver(
      (entries) => setVisible(entries[0].isIntersecting),
      {
        rootMargin: "100px",
      },
    );
    observer.observe(container.current);
    media.addEventListener("change", onMotion);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  useEffect(() => {
    const element = svg.current;
    if (paused || reduced || !visible || pageHidden) element.pauseAnimations();
    else element.unpauseAnimations();
    return () => element.pauseAnimations();
  }, [paused, reduced, visible, pageHidden, geometry]);
  const renderNode = (service, index) => (
    <button
      key={service.id}
      type="button"
      className="service-node"
      data-beam-node={index}
      aria-pressed={index === selected}
      aria-controls="service-focus"
      style={{
        "--node-color": service.color,
      }}
      onClick={() => onSelect(index)}
    >
      <span className="service-node__label">{service.short}</span>
      <span
        className="service-node__icon"
        ref={(node) => {
          nodes.current[index] = node;
        }}
      >
        {renderIcon(service)}
      </span>
      <span className="sr-only">
        {service.name !== service.short ? ` — ${service.name}` : ""}
      </span>
    </button>
  );
  return (
    <>
      <div
        ref={container}
        className="service-network"
        aria-describedby="network-help"
      >
        <svg
          ref={svg}
          className={`service-beams${reduced ? " is-reduced" : ""}`}
          aria-hidden="true"
          focusable="false"
          viewBox={`0 0 ${geometry.width} ${geometry.height}`}
        >
          <defs>
            {geometry.beams.map((beam, index) => (
              <linearGradient
                key={services[index].id}
                id={`service-beam-${index}`}
                gradientUnits="userSpaceOnUse"
                x1={beam.sx}
                x2={beam.ex}
                y1="0"
                y2="0"
              >
                <stop
                  offset="0%"
                  stopColor={services[index].color}
                  stopOpacity="0"
                />
                <stop offset="30%" stopColor={services[index].color} />
                <stop offset="65%" stopColor="#55aaff" />
                <stop offset="100%" stopColor="#55aaff" stopOpacity="0" />
                {!reduced && (
                  <>
                    <animate
                      attributeName="x1"
                      values={`${beam.sx - beam.delta * 0.6};${beam.ex}`}
                      dur={`${4.5 + (index % 3) * 0.7}s`}
                      begin={`-${index * 0.47}s`}
                      repeatCount="indefinite"
                      calcMode="linear"
                    />
                    <animate
                      attributeName="x2"
                      values={`${beam.sx};${beam.ex + beam.delta * 0.6}`}
                      dur={`${4.5 + (index % 3) * 0.7}s`}
                      begin={`-${index * 0.47}s`}
                      repeatCount="indefinite"
                      calcMode="linear"
                    />
                  </>
                )}
              </linearGradient>
            ))}
          </defs>
          {geometry.beams.map((beam, index) => (
            <g
              key={services[index].id}
              data-beam={index}
              className={index === selected ? "is-selected" : undefined}
            >
              <path
                className="beam-track"
                d={beam.d}
                fill="none"
                strokeLinecap="round"
              />
              <path
                className="beam-light"
                d={beam.d}
                fill="none"
                strokeLinecap="round"
                stroke={`url(#service-beam-${index})`}
              />
            </g>
          ))}
        </svg>
        <div className="service-network__side service-network__side--left">
          {services.slice(0, 7).map(renderNode)}
        </div>
        <div className="service-network__hub">
          <div ref={hub} className="service-network__brand">
            <img
              src="/assets/icons/dc-logo.png"
              width="70"
              height="59"
              alt="DC Creative Labs"
            />
          </div>
          <span>
            One shared
            <br />
            growth strategy
          </span>
        </div>
        <div className="service-network__side service-network__side--right">
          {services
            .slice(7)
            .map((service, index) => renderNode(service, index + 7))}
        </div>
      </div>
      <div className="network-toolbar">
        <span>14 services. One team.</span>
        <button
          type="button"
          className="beam-motion-toggle"
          disabled={reduced}
          aria-pressed={paused || reduced}
          onClick={() => setPaused((value) => !value)}
        >
          {reduced
            ? "Reduced motion enabled"
            : paused
              ? "Play animation"
              : "Pause animation"}
        </button>
      </div>
    </>
  );
}
