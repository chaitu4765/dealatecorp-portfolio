import { Fragment } from "react";
import { adhithyaGallery } from "../data/content.js";
export function Adhithya() {
  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=D%20No.%201-168%2F5%2C%20Sanyal%20Villa%2C%20Gopalapatnam%20Main%20Road%2C%20Susarla%20Colony%2C%20Baji%20Junction%2C%20Gopalapatnam%2C%20Visakhapatnam%20530027%2C%20Andhra%20Pradesh%2C%20India";
  return (
    <main className="adhithya-case">
      <section className="adhithya-hero" aria-labelledby="adhithya-title">
        <video
          className="adhithya-hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/postors/aditya.png"
        >
          <source src="/clients/videos/aditya.mp4" type="video/mp4" />
        </video>

        <div className="adhithya-hero__overlay" />

        <div className="adhithya-hero__copy">
          <p className="adhithya-badge">REAL ESTATE · VISAKHAPATNAM</p>

          <h1 id="adhithya-title">Adhithya Sai Promoters</h1>

          <p>
            Residential opportunities in Visakhapatnam's growing neighbourhoods.
          </p>

          <div className="adhithya-hero__actions">
            <a className="adhithya-button" href="#adhithya-about">
              Discover the Company
            </a>

            <button
              className="adhithya-video-toggle"
              type="button"
              aria-pressed="false"
              aria-label="Pause hero video"
            >
              Pause
            </button>
          </div>
        </div>
      </section>

      <section
        id="adhithya-about"
        className="adhithya-about"
        aria-labelledby="adhithya-about-title"
      >
        <div className="adhithya-about__intro">
          <p className="kicker">ABOUT THE COMPANY</p>

          <h2 id="adhithya-about-title">
            Residential spaces. Growing possibilities.
          </h2>

          <div className="adhithya-logo-surface">
            <img
              src="/assets/logo/adithya sai.jpeg"
              alt="Adhithya Sai Promoters logo"
              loading="lazy"
              decoding="async"
            />
          </div>

          <a className="adhithya-back" href="/clients/">
            Back to Clients
          </a>
        </div>

        <div className="adhithya-about__copy">
          <p>
            Adhithya Sai Promoters, also frequently spelled Aditya Sai
            Promoters, is a real estate firm based in Visakhapatnam, Andhra
            Pradesh. The company develops and promotes residential properties,
            with a focus on growing housing zones across the Visakhapatnam
            region.
          </p>

          <p>
            The company operates from Gopalapatnam, serving property buyers
            exploring residential opportunities in the northern and western
            corridors of the city.
          </p>
        </div>
      </section>

      <section
        className="adhithya-specialisations"
        aria-labelledby="adhithya-specialisations-title"
      >
        <div className="adhithya-section-head">
          <p className="kicker">Business specialisations</p>

          <h2 id="adhithya-specialisations-title">
            Built around residential growth.
          </h2>
        </div>

        <div className="adhithya-card-grid">
          <article className="adhithya-card adhithya-card--aqua">
            <span className="adhithya-icon" aria-hidden="true">
              B
            </span>
            <h3>Real Estate Promotions</h3>
            <p>
              Promoting residential property opportunities across the
              Visakhapatnam region.
            </p>
          </article>

          <article className="adhithya-card adhithya-card--peach">
            <span className="adhithya-icon" aria-hidden="true">
              H
            </span>
            <h3>Apartment Construction</h3>
            <p>
              Residential apartment development for homebuyers exploring the
              city's growing neighbourhoods.
            </p>
          </article>

          <article className="adhithya-card adhithya-card--gold">
            <span className="adhithya-icon" aria-hidden="true">
              L
            </span>
            <h3>Plot Development</h3>
            <p>
              Plot development as part of the company's real estate activities.
            </p>
          </article>
        </div>
      </section>

      <section
        className="adhithya-offerings"
        aria-labelledby="adhithya-offerings-title"
      >
        <div className="adhithya-offerings__copy">
          <p className="kicker">Residential offerings</p>

          <h2 id="adhithya-offerings-title">
            Explore Residential Opportunities
          </h2>

          <p>
            The company has marketed premium North- and South-facing residential
            flats near Parawada, Visakhapatnam.
          </p>

          <div className="adhithya-pills">
            <span>North-facing flats</span>
            <span>South-facing flats</span>
          </div>

          <small>
            Contact the company to confirm current availability and project
            details.
          </small>
        </div>

        <div className="adhithya-gallery">
          {adhithyaGallery.map((item, index) => (
            <figure key={index}>
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
      </section>

      <section
        className="adhithya-contact"
        aria-labelledby="adhithya-contact-title"
      >
        <div className="adhithya-contact__icon" aria-hidden="true">
          +
        </div>

        <div>
          <p className="kicker">Office Address</p>

          <h2 id="adhithya-contact-title">Gopalapatnam, Visakhapatnam</h2>

          <address>
            D No. 1-168/5, Sanyal Villa, Gopalapatnam Main Road, Susarla Colony,
            Baji Junction, Gopalapatnam, Visakhapatnam - 530027, Andhra Pradesh,
            India.
          </address>

          <a
            className="adhithya-map"
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps
          </a>
        </div>
      </section>
    </main>
  );
}
