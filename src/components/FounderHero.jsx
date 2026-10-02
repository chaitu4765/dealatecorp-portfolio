export function FounderHero() {
  return (
    <section className="founder-hero" aria-labelledby="hero-title">
      <div className="founder-hero__glow" aria-hidden="true" />
      <div className="founder-hero__stage">
        <h1 id="hero-title" className="founder-hero__wordmark" tabIndex={-1}>
          Dealatecorp
        </h1>

        <div className="founder-hero__portrait">
          <img
            src="/assets/founder/santhosh-cutout.png"
            alt="Santhosh, founder of Dealatecorp"
            width="1145"
            height="1374"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        <p className="founder-hero__badge">
          <span aria-hidden="true" />
          For a better tomorrow
        </p>
        <p className="founder-hero__note">
          Technology, creativity and digital marketing. Built around your next
          big idea.
        </p>

        <div className="founder-hero__name">
          <p className="founder-hero__eyebrow">The person behind the vision</p>
          <p className="founder-hero__display">
            Meet
            <br />
            Our Team 
          </p>
          <p className="founder-hero__role">Founder, Dealatecorp</p>
        </div>

        <p className="founder-hero__disciplines">
          Technology.
          <br />
          Creativity.
          <br />
          Growth.
        </p>

        <div className="founder-hero__footer">
          <a className="founder-hero__work-link" href="/clients/#client-brands">
            Explore our work <span aria-hidden="true">↗</span>
          </a>
          <a className="founder-hero__scroll" href="#home-services">
            Discover what we do <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
