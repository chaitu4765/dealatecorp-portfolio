import { Fragment } from "react";
import { tirumalasettyWork } from "../data/content.js";
export function Tirumalasetty() {
  return (
    <main className="tirumalasetty-case">
      <section
        className="tirumalasetty-hero"
        aria-label="Tirumalasetty Projects LLP hero"
      >
        <img
          src="/assets/th.jpg"
          alt="Tirumalasetty Projects LLP architectural hero artwork"
          decoding="async"
        />
      </section>

      <section
        className="tirumalasetty-intro"
        aria-labelledby="tirumalasetty-title"
      >
        <div>
          <p className="kicker">About the client</p>

          <h1 id="tirumalasetty-title">Tirumalasetty Projects LLP</h1>

          <p className="tirumalasetty-location">
            Visakhapatnam, Andhra Pradesh
          </p>
        </div>

        <div className="tirumalasetty-copy">
          <p>
            Tirumalasetty Projects LLP is a real estate and construction firm
            based in Visakhapatnam, Andhra Pradesh. Its residential developments
            include Lake Front Villas in Sujathanagar, with a focus on
            contemporary architecture, well-planned layouts, and premium
            finishes.
          </p>

          <dl className="tirumalasetty-info">
            <div>
              <dt>Status</dt>
              <dd>Active</dd>
            </div>

            <div>
              <dt>Incorporated</dt>
              <dd>January 28, 2025</dd>
            </div>

            <div>
              <dt>LLPIN</dt>
              <dd>ACL-6552</dd>
            </div>

            <div>
              <dt>Registrar</dt>
              <dd>ROC, Vijayawada</dd>
            </div>
          </dl>

          <article className="tirumalasetty-feature">
            <p className="kicker">Featured Development</p>

            <h2>Lake Front Villas</h2>

            <p>
              A residential villa project in Sujathanagar, Chinnamushidiwada,
              Visakhapatnam, featuring contemporary architecture, planned
              layouts, premium finishes, and North, South, East, and West facing
              options.
            </p>
          </article>

          <details className="tirumalasetty-details">
            <summary>Company Details</summary>

            <p>
              <b>Partners:</b>
              {
                " Singamsetty Dharma Theja, Tirumalasetty Hemanth Kumar, Ajitkumar Tirumalasetty, Revathi Tirumalasetty"
              }
            </p>

            <p>
              <b>Registered office:</b>
              {
                " 3rd Floor, Flat No. 303, Srinivasam - 11, Sapthagirinagar, Sujathanagar, Pendurthi, Visakhapatnam, Andhra Pradesh - 530051"
              }
            </p>

            <p>
              <b>Phone:</b> <a href="tel:+916305386699">6305386699</a>
              {" / "}
              <a href="tel:+919347995152">9347995152</a>
            </p>
          </details>
        </div>
      </section>

      <section
        className="tirumalasetty-work"
        aria-labelledby="tirumalasetty-work-title"
        tabIndex="0"
      >
        <div className="tirumalasetty-work__head">
          <p className="kicker">Our work</p>

          <h2 id="tirumalasetty-work-title">Our work for Tirumalasetty</h2>

          <p>
            A closer look at the creative work developed for Tirumalasetty
            Projects LLP.
          </p>
        </div>

        <div className="tirumalasetty-stage" aria-live="polite">
          <>
            {tirumalasettyWork.map((item, index) => (
              <button
                className={"tirumalasetty-panel tirumalasetty-panel--" + index}
                type="button"
                data-tiru-panel={index}
                aria-label={"Open Tirumalasetty artwork " + (index + 1)}
                key={index}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </button>
            ))}
          </>
        </div>

        <div className="tirumalasetty-controls">
          <button
            className="tiru-prev"
            type="button"
            aria-label="Previous Tirumalasetty artwork"
          >
            ←
          </button>

          <span className="tiru-count">01 / 03</span>

          <div
            className="tiru-dots"
            aria-label="Tirumalasetty artwork pagination"
          >
            {tirumalasettyWork.map((_, index) => (
              <button
                type="button"
                data-tiru-dot={index}
                aria-label={"Show artwork " + (index + 1)}
                aria-current={index === 0 ? "true" : undefined}
                key={index}
              />
            ))}
          </div>

          <button
            className="tiru-next"
            type="button"
            aria-label="Next Tirumalasetty artwork"
          >
            →
          </button>

          <button className="tiru-toggle" type="button" aria-pressed="false">
            Pause
          </button>
        </div>

        <div
          className="tiru-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Tirumalasetty artwork preview"
          hidden
        >
          <button
            className="tiru-lightbox-close"
            type="button"
            aria-label="Close artwork preview"
          >
            ×
          </button>

          <button
            className="tiru-lightbox-prev"
            type="button"
            aria-label="Previous artwork"
          >
            ←
          </button>

          <img src={tirumalasettyWork[0].src} alt={tirumalasettyWork[0].alt} />

          <button
            className="tiru-lightbox-next"
            type="button"
            aria-label="Next artwork"
          >
            →
          </button>
        </div>
      </section>
    </main>
  );
}
