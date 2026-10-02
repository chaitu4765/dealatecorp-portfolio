import { useRef, useState } from "react";
import { featuredMediaSlides } from "../data/content.js";

const campaignItems = featuredMediaSlides.slice(0, 8).map((slide, index) => {
  const artwork = slide.right?.type === "image" ? slide.right : slide.left;

  return {
    id: `campaign-${index + 1}`,
    category: slide.category,
    title: slide.title.replaceAll("\n", " "),
    description: slide.description,
    src: artwork.src,
    alt: artwork.alt,
  };
});

export function DigitalMarketingShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [trail, setTrail] = useState([]);
  const trailRef = useRef(null);
  const lastPointRef = useRef(null);
  const nextTrailIdRef = useRef(0);

  const showTrail = (event) => {
    if (event.pointerType === "touch") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const bounds = trailRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const point = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    const previous = lastPointRef.current;
    lastPointRef.current = point;
    if (!previous) return;

    const deltaX = point.x - previous.x;
    const deltaY = point.y - previous.y;
    if (Math.hypot(deltaX, deltaY) < 78) return;

    const artwork = campaignItems[nextTrailIdRef.current % campaignItems.length];
    const id = nextTrailIdRef.current++;
    const rotation = Math.max(-10, Math.min(10, (Math.atan2(deltaY, deltaX) * 180) / Math.PI / 8));

    setTrail((items) => [
      ...items.slice(-5),
      { id, x: point.x, y: point.y, rotation, ...artwork },
    ]);
  };

  const removeTrailItem = (id) => {
    setTrail((items) => items.filter((item) => item.id !== id));
  };

  return (
    <section
      className="digital-marketing-showcase dc-wrap"
      aria-labelledby="digital-marketing-showcase-title"
    >
      <div className="digital-marketing-showcase__heading">
        <div>
          <p className="dc-eyebrow">DC Creative Labs / Campaign gallery</p>
          <h2 id="digital-marketing-showcase-title">
            Creative made
            <br />
            <span>to catch the eye.</span>
          </h2>
        </div>
        <p>
          A closer look at the campaign imagery and social-first stories we
          create for the brands we work with.
        </p>
      </div>

      <div
        className="digital-marketing-trail"
        ref={trailRef}
        onPointerMove={showTrail}
        onPointerLeave={() => {
          lastPointRef.current = null;
        }}
        aria-label="Move your cursor through the campaign canvas to reveal artwork"
        role="group"
      >
        <div className="digital-marketing-trail__copy" aria-hidden="true">
          <span>01 — Made to move</span>
          <strong>Every brand has a story worth stopping for.</strong>
          <small>Move your cursor through the canvas</small>
        </div>
        {trail.map((item) => (
          <figure
            className="digital-marketing-trail__image"
            key={item.id}
            onAnimationEnd={() => removeTrailItem(item.id)}
            style={{
              "--trail-x": `${item.x}px`,
              "--trail-y": `${item.y}px`,
              "--trail-rotation": `${item.rotation}deg`,
            }}
            aria-hidden="true"
          >
            <img src={item.src} alt="" draggable="false" />
            <figcaption>{item.category}</figcaption>
          </figure>
        ))}
        <span className="digital-marketing-trail__corner" aria-hidden="true">
          <span />
          CAMPAIGNS IN MOTION
        </span>
      </div>

      <div className="digital-campaign-gallery__intro">
        <div>
          <p className="dc-eyebrow">Selected work</p>
          <h3>Explore the creative</h3>
        </div>
        <p>Hover, focus or select a panel to bring its story forward.</p>
      </div>

      <ul
        className="digital-campaign-gallery"
        style={{
          "--campaign-columns": campaignItems
            .map((_, index) => (index === activeIndex ? "4fr" : ".72fr"))
            .join(" "),
        }}
        aria-label="Digital marketing campaign artwork"
      >
        {campaignItems.map((item, index) => (
          <li className="digital-campaign-gallery__item" key={item.id}>
            <button
              className="digital-campaign-gallery__card"
              type="button"
              aria-pressed={activeIndex === index}
              aria-label={`${item.title}, ${item.category}`}
              onPointerEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
            >
              <img src={item.src} alt={item.alt} loading="lazy" />
              <span className="digital-campaign-gallery__shade" />
              <span className="digital-campaign-gallery__index">
                {String(index + 1).padStart(2, "0")} / CAMPAIGN
              </span>
              <span className="digital-campaign-gallery__collapsed-title">
                {item.title}
              </span>
              <span className="digital-campaign-gallery__details">
                <span className="digital-campaign-gallery__category">
                  {item.category}
                </span>
                <span className="digital-campaign-gallery__title">
                  {item.title}
                </span>
                <span className="digital-campaign-gallery__description">
                  {item.description}
                </span>
              </span>
              <span className="digital-campaign-gallery__arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="digital-campaign-gallery__hint">Scroll or swipe to explore all campaigns</p>
    </section>
  );
}
