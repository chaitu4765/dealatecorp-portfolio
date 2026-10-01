import { Fragment } from "react";
import { useAnimationEffect } from "../hooks/useAnimationEffect.js";
import { clientBrands, clientHeroMedia } from "../data/client-brands.js";
import { AceternityClientCard } from "../components/AceternityClientCard.jsx";
const media = clientHeroMedia.map((src) => [src, "Client campaign"]);
function mediaCard([src, label], i) {
  return (
    <figure className="clients-media-card">
      <img
        src={src}
        alt={label + " by DC Creative Labs"}
        loading={i < 6 ? "eager" : "lazy"}
        decoding="async"
      />
      <figcaption>{label}</figcaption>
    </figure>
  );
}
function clientBrandCard([name, logo, href]) {
  const content = (
    <>
      <div className="brand-logo-panel">
        <img src={logo} alt={name + " logo"} loading="lazy" decoding="async" />
      </div>
      <b>{name}</b>
    </>
  );
  return href ? (
    <AceternityClientCard
      as="a"
      href={href}
      aria-label={"View " + name + " case study"}
    >
      {content}
    </AceternityClientCard>
  ) : (
    <AceternityClientCard>{content}</AceternityClientCard>
  );
}
export function Clients({ featuredMedia }) {
  useAnimationEffect(initClients);
  const cards = media.map((item, index) => (
    <Fragment key={index}>{mediaCard(item, index)}</Fragment>
  ));
  return (
    <main className="clients-page">
      <section className="clients-hero" aria-labelledby="clients-title">
        <div className="clients-hero__copy">
          <p className="clients-pill">Creative work. Real client stories.</p>
          <h1 id="clients-title">
            Built on trust.
            <br />
            <em>Measured in momentum.</em>
          </h1>
          <p>
            Discover the brands, campaigns and digital experiences we create
            with the businesses we partner with.
          </p>
        </div>
        <div
          className="clients-media-viewport"
          tabIndex="0"
          aria-label="Client creative showcase"
        >
          <div className="clients-media-track">
            <div className="clients-media-sequence">{cards}</div>
            <div className="clients-media-sequence" aria-hidden="true">
              {cards}
            </div>
          </div>
        </div>
        <div className="clients-hero-actions">
          <a className="clients-action" href="#client-brands">
            Explore our clients
          </a>
          <button type="button" className="clients-toggle" aria-pressed="false">
            Pause movement
          </button>
        </div>
      </section>
      {featuredMedia}
      <section
        className="client-brand-showcase"
        id="client-brands"
        aria-labelledby="brand-title"
      >
        <div className="client-brand-head">
          <p className="kicker">Our clients</p>
          <h2 id="brand-title">
            Brands we have
            <br />
            <span>worked with.</span>
          </h2>
          <p>
            A curated wall of client identities, preserved in their original
            colors and presented with clarity.
          </p>
        </div>
        <div className="client-brand-grid">
          {clientBrands.map((item, index) => (
            <Fragment key={index}>{clientBrandCard(item)}</Fragment>
          ))}
        </div>
      </section>
      <section className="clients-project-cta">
        <div>
          <p className="kicker">Next collaboration</p>
          <h2>Let’s build your next success story.</h2>
          <p>
            Bring the ambition. We will shape the creative system around it with
            focus, restraint and momentum.
          </p>
          <a className="button button--light" href="/contact/" data-project-enquiry>
            Start a project
          </a>
        </div>
      </section>
    </main>
  );
}
function initClients(scope) {
  const hero = document.querySelector(".clients-hero"),
    viewport = document.querySelector(".clients-media-viewport"),
    track = document.querySelector(".clients-media-track"),
    sequence = document.querySelector(".clients-media-sequence"),
    toggle = document.querySelector(".clients-toggle");
  if (!hero || !viewport || !track || !sequence || !toggle) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let userPaused = false;
  const setDuration = () =>
    track.style.setProperty(
      "--clients-duration",
      `${Math.max(30, sequence.scrollWidth / 34)}s`,
    );
  const sync = () => {
    const paused = userPaused || reduced.matches;
    hero.classList.toggle("is-paused", paused);
    toggle.textContent = paused ? "Play movement" : "Pause movement";
    toggle.setAttribute("aria-pressed", String(userPaused));
    toggle.disabled = reduced.matches;
  };
  scope.on(toggle, "click", () => {
    userPaused = !userPaused;
    sync();
  });
  scope.on(reduced, "change", sync);
  scope.on(window, "resize", setDuration);
  scope.on(viewport, "pointerenter", () => hero.classList.add("is-hovered"));
  scope.on(viewport, "pointerleave", () => hero.classList.remove("is-hovered"));
  scope.on(viewport, "focusin", () => hero.classList.add("is-hovered"));
  scope.on(viewport, "focusout", () => hero.classList.remove("is-hovered"));
  setDuration();
  sync();
}
