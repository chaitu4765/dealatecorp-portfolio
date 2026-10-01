import { nav } from "../data/content.js";
export function Footer({ path }) {
  if (path === "/clients/tirumalasetty") {
    const mapsUrl =
      "https://www.google.com/maps/search/?api=1&query=3rd%20Floor%2C%20Flat%20No.%20303%2C%20Srinivasam%20-%2011%2C%20Sapthagirinagar%2C%20Sujathanagar%2C%20Pendurthi%2C%20Visakhapatnam%2C%20Andhra%20Pradesh%20530051";
    return (
      <footer className="tirumalasetty-footer-card">
        <div className="tirumalasetty-footer-main">
          <a className="brand brand--footer" href="/">
            <span className="brand-mark">D</span>
            <span>
              <b>DEALATECORP</b>
              <small>For a better tomorrow</small>
            </span>
          </a>

          <h2>
            Let's shape the next
            <br />
            <em>property story.</em>
          </h2>

          <p>
            Planning a launch, campaign, or branded real estate experience? We
            can help turn the location, vision, and project details into a clear
            digital presence.
          </p>

          <a className="button interactive-hover" href="/contact/" data-project-enquiry>
            <span>Start a project</span>
            <i aria-hidden="true">{"->"}</i>
          </a>
        </div>

        <address className="tirumalasetty-footer-address">
          <span className="kicker">Address</span>

          <strong>Tirumalasetty Projects LLP</strong>

          <p>
            3rd Floor, Flat No. 303, Srinivasam - 11, Sapthagirinagar,
            Sujathanagar, Pendurthi, Visakhapatnam, Andhra Pradesh - 530051
          </p>

          <a
            className="tirumalasetty-map-link"
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps
          </a>
        </address>

        <p className="copyright">
          © 2026 Dealatecorp. Strategy, creative and performance connected.
        </p>
      </footer>
    );
  }
  return (
    <footer className="dc-footer">
      <div className="dc-footer__inner">
        <div className="dc-footer__intro">
          <h2>Ready to move your business forward?</h2>
          <p>
            Bring your next idea to life with connected technology,
            <br />
            creative thinking and digital marketing.
          </p>
          <a className="dc-footer__cta" href="/contact/" data-project-enquiry>
            Start a project <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="dc-footer__panel">
          <div className="dc-footer__card">
            <div className="dc-footer__columns">
              <div className="dc-footer__brand">
                <a className="brand brand--footer" href="/">
                  <span className="brand-mark">
                    <img src="/assets/logo.png" alt="" width="42" height="42" />
                  </span>
                  <span>
                    <b>DEALATECORP</b>
                    <small>For a better tomorrow</small>
                  </span>
                </a>
                <p>
                  Connecting technology, creative thinking and digital marketing
                  to move your business forward.
                </p>
              </div>
              <nav className="dc-footer__nav" aria-label="Footer navigation">
                <h3>Explore</h3>
                {nav.map(([label, href]) => (
                  <a href={href} key={href}>
                    {label}
                  </a>
                ))}
              </nav>
              <nav className="dc-footer__nav" aria-label="Footer services">
                <h3>What we do</h3>
                <a href="/services/#department-it">IT Department</a>
                <a href="/services/#department-digital">Digital Marketing</a>
                <a href="/portfolio/">Our portfolio</a>
              </nav>
              <div className="dc-footer__contact">
                <h3>Get in touch</h3>
                <p>Tell us what you’re working on.</p>
                <a href="mailto:hr@dealatecorp.com">
                  hr@dealatecorp.com <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <nav className="dc-footer__socials" aria-label="Social links">
              <a
                href="https://www.instagram.com/dealatecorp?stkn=MWMzenJ3NngzcGN1cw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Dealatecorp on Instagram"
                className="dc-footer__social dc-footer__social--instagram"
              >
                <SocialIcon type="instagram" />
                <span>DC / IG</span>
              </a>
              <a
                href="https://www.instagram.com/dealatecorpcodelab?stkn=MTlmd2VzMmtiNXc5eA%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Dealatecorp CodeLab on Instagram"
                className="dc-footer__social dc-footer__social--instagram"
              >
                <SocialIcon type="instagram" />
                <span>DC Labs / IG</span>
              </a>
              <a
                href="https://www.facebook.com/share/1By528vaxn/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Dealatecorp on Facebook"
                className="dc-footer__social dc-footer__social--facebook"
              >
                <SocialIcon type="facebook" />
                <span>DC / FB</span>
              </a>
              <a
                href="https://www.facebook.com/share/1HchUHwyU9/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow DC Creative Labs on Facebook"
                className="dc-footer__social dc-footer__social--facebook"
              >
                <SocialIcon type="facebook" />
                <span>DC Labs / FB</span>
              </a>
              <a
                href="https://www.linkedin.com/company/dealatecorp/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Dealatecorp on LinkedIn"
                className="dc-footer__social dc-footer__social--linkedin"
              >
                <SocialIcon type="linkedin" />
                <span>DC / IN</span>
              </a>
            </nav>
            <div className="dc-footer__bottom">
              <p>
                © 2026 Dealatecorp. Strategy, creative and
                performance—connected.
              </p>
              <span>For a better tomorrow.</span>
            </div>
          </div>
          <div className="dc-footer__wordmark" aria-hidden="true">
            Dealatecorp
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ type }) {
  if (type === "linkedin")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="dc-footer__linkedin-icon">
        <path d="M6.3 8.3A1.8 1.8 0 1 0 6.3 4.7a1.8 1.8 0 0 0 0 3.6ZM4.8 19.4h3V10h-3v9.4Zm5.1 0h3v-4.7c0-1.2.2-2.4 1.7-2.4 1.5 0 1.5 1.4 1.5 2.5v4.6h3v-5.3c0-2.6-.6-4.6-3.6-4.6-1.5 0-2.5.8-2.9 1.6h-.1V10H9.9v9.4Z" />
      </svg>
    );
  if (type === "facebook")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="dc-footer__facebook-icon">
        <path d="M13.7 20v-7h2.5l.4-2.8h-2.9V8.4c0-.8.2-1.4 1.4-1.4h1.6V4.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H8.3V13h2.5v7h2.9Z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.55" cy="6.55" r="1" className="dc-footer__social-dot" />
    </svg>
  );
}
