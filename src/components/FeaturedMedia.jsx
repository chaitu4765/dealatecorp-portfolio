import { Fragment } from "react";
import { featuredMediaSlides } from "../data/content.js";
function featuredMediaFrame(media, side, index) {
  if (media.type === "video") {
    return (
      <figure className={"featured-media-card featured-media-card--" + side}>
        <video
          muted
          playsInline
          preload="metadata"
          poster={media.poster}
          aria-label={media.label || "Featured client video"}
        >
          <source src={media.src} type="video/mp4" />
        </video>

        <button
          className="featured-media-mute"
          type="button"
          aria-label="Unmute featured video"
          aria-pressed="true"
        >
          Muted
        </button>
      </figure>
    );
  }
  return (
    <figure className={"featured-media-card featured-media-card--" + side}>
      <img
        src={media.src}
        alt={media.alt}
        loading={index === 0 ? "eager" : "lazy"}
        decoding="async"
      />
    </figure>
  );
}
function featuredMediaSlide(slide, index) {
  return (
    <article
      className={"featured-media-slide" + (index === 0 ? " is-active" : "")}
      data-featured-slide={index}
      aria-hidden={index === 0 ? "false" : "true"}
    >
      <div className="featured-media-column featured-media-column--left">
        {featuredMediaFrame(slide.left, "left", index)}
      </div>

      <div className="featured-media-copy">
        <p className="kicker">{slide.category}</p>

        <h2>
          {slide.title.split("\n").map((line, i) => (
            <Fragment key={i}>
              <Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            </Fragment>
          ))}
        </h2>

        <p>{slide.description}</p>
      </div>

      <div className="featured-media-column featured-media-column--right">
        {featuredMediaFrame(slide.right, "right", index)}
      </div>
    </article>
  );
}
export function FeaturedMedia() {
  return (
    <section
      id="featured-media"
      className="featured-media-carousel"
      aria-label="Featured client media carousel"
      tabIndex="0"
    >
      <div className="featured-media-shell">
        <div className="featured-media-slides">
          {featuredMediaSlides.map((item, index) => (
            <Fragment key={index}>{featuredMediaSlide(item, index)}</Fragment>
          ))}
        </div>

        <button
          className="featured-media-arrow featured-media-arrow--prev"
          type="button"
          aria-label="Previous featured media"
        >
          ←
        </button>

        <button
          className="featured-media-arrow featured-media-arrow--next"
          type="button"
          aria-label="Next featured media"
        >
          →
        </button>

        <p className="featured-media-status" aria-live="polite">
          <>
            {"1 of "}
            {featuredMediaSlides.length}
          </>
        </p>
      </div>
    </section>
  );
}
