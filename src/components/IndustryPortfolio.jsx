import { useRef, useState } from "react";
import { industryPortfolio } from "../data/industry-portfolio.js";

export function IndustryPortfolio() {
  const [activeId, setActiveId] = useState(industryPortfolio[0].id);
  const [paused, setPaused] = useState(false);
  const tabRefs = useRef([]);
  const activeIndex = industryPortfolio.findIndex(
    (item) => item.id === activeId,
  );

  function selectIndustry(index, moveFocus = false) {
    const next =
      industryPortfolio[
        (index + industryPortfolio.length) % industryPortfolio.length
      ];
    setActiveId(next.id);
    if (moveFocus) tabRefs.current[index]?.focus();
  }

  function handleTabKeyDown(event, index) {
    const last = industryPortfolio.length - 1;
    let nextIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      nextIndex = (index + 1) % industryPortfolio.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      nextIndex = (index + last) % industryPortfolio.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = last;
    else return;
    event.preventDefault();
    selectIndustry(nextIndex, true);
  }

  return (
    <section
      className="industry-portfolio"
      id="industries-worked-with"
      aria-labelledby="industry-portfolio-title"
    >
      <div className="industry-portfolio__head">
        <p className="kicker">Industries we work with</p>
        <h2 id="industry-portfolio-title">Good work, built for your world.</h2>
        <p>
          Explore live websites and campaign imagery made for the industries we
          know. Choose a sector to see the work come together.
        </p>
      </div>

      <div
        className="industry-selector"
        role="tablist"
        aria-label="Choose an industry"
      >
        {industryPortfolio.map((industry, index) => (
          <button
            key={industry.id}
            ref={(element) => (tabRefs.current[index] = element)}
            className="industry-tab"
            id={`industry-tab-${industry.id}`}
            type="button"
            role="tab"
            aria-selected={activeId === industry.id}
            aria-controls={`industry-panel-${industry.id}`}
            tabIndex={activeId === industry.id ? 0 : -1}
            style={{
              "--industry-theme-image": `url("${industry.themeImage}")`,
            }}
            onClick={() => selectIndustry(index)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
          >
            <span className="industry-tab__number">{industry.mark}</span>
            <span className="industry-tab__name">{industry.label}</span>
            <span className="industry-tab__arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        ))}
      </div>

      <div className="industry-panels">
        {industryPortfolio.map((industry, index) => {
          const isActive = activeId === industry.id;
          return (
            <article
              key={industry.id}
              className="industry-panel"
              id={`industry-panel-${industry.id}`}
              role="tabpanel"
              aria-labelledby={`industry-tab-${industry.id}`}
              hidden={!isActive}
              tabIndex={0}
              style={{
                "--industry-theme-image": `url("${industry.themeImage}")`,
              }}
            >
              <div className="industry-panel__intro">
                <span className="industry-panel__index">
                  0{index + 1} / SECTOR
                </span>
                <div>
                  <h3>{industry.label}</h3>
                  <p>{industry.summary}</p>
                </div>
                <span className="industry-panel__signal" aria-hidden="true">
                  ●
                </span>
              </div>

              <div className="industry-showcase-block">
                <div className="industry-subhead">
                  <span>01</span>
                  <div>
                    <h4>Websites</h4>
                    <p>Visit the live work or explore it right here.</p>
                  </div>
                </div>
                <div className="industry-browser-grid">
                  {industry.websites.map((site, siteIndex) => (
                    <article className="industry-browser-card" key={site.url}>
                      <div className="industry-browser">
                        <div
                          className="industry-browser__bar"
                          aria-hidden="true"
                        >
                          <span />
                          <span />
                          <span />
                          <b>
                            {new URL(site.url).hostname.replace(/^www\./, "")}
                          </b>
                        </div>
                        <div className="industry-browser__stage">
                          {isActive && (
                            <iframe
                              title={`${site.name} website preview`}
                              src={site.url}
                              loading={siteIndex === 0 ? "eager" : "lazy"}
                              referrerPolicy="no-referrer-when-downgrade"
                            />
                          )}
                          <span className="industry-browser__hint">
                            Some sites limit embedded previews. Open the site to
                            view it directly.
                          </span>
                        </div>
                      </div>
                      <div className="industry-browser-card__foot">
                        <h4>{site.name}</h4>
                        <a
                          className="industry-visit"
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit site <span aria-hidden="true">↗</span>
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="industry-showcase-block industry-showcase-block--media">
                <div className="industry-subhead">
                  <span>02</span>
                  <div>
                    <h4>Campaign gallery</h4>
                    <p>
                      Creative made to connect with the people in this space.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="industry-gallery-toggle"
                    aria-pressed={paused}
                    onClick={() => setPaused((value) => !value)}
                  >
                    {paused ? "Play gallery" : "Pause gallery"}
                  </button>
                </div>
                <div
                  className={`industry-media-viewport${paused ? " is-paused" : ""}`}
                  aria-label={`${industry.label} campaign gallery`}
                >
                  <div className="industry-media-track">
                    {[0, 1].map((sequence) => (
                      <div
                        className="industry-media-sequence"
                        key={sequence}
                        aria-hidden={sequence === 1 ? "true" : undefined}
                      >
                        {industry.media.map((item, mediaIndex) => (
                          <figure
                            className="industry-media-card"
                            key={`${item.src}-${sequence}`}
                          >
                            <img
                              src={item.src}
                              alt={sequence === 0 ? item.alt : ""}
                              loading="lazy"
                              decoding="async"
                              style={{ "--media-index": mediaIndex }}
                            />
                            {sequence === 0 && (
                              <figcaption>
                                <span>0{mediaIndex + 1}</span>
                                {industry.label}
                              </figcaption>
                            )}
                          </figure>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
