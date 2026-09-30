import { Fragment } from "react";
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

          <a
            className="button interactive-hover"
            href="mailto:hr@dealatecorp.com"
          >
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
    <footer>
      <div>
        <a className="brand brand--footer" href="/">
          <span className="brand-mark">D</span>
          <span>
            <b>DEALATECORP</b>
            <small>For a better tomorrow</small>
          </span>
        </a>
        <h2>
          Have an ambitious goal?
          <br />
          <em>Let’s make it move.</em>
        </h2>
        <a className="text-link" href="mailto:hr@dealatecorp.com">
          hr@dealatecorp.com
        </a>
      </div>
      <div className="footer-links">
        {nav.map(([l, h], index) => (
          <a href={h} key={index}>
            {l}
          </a>
        ))}
      </div>
      <p className="copyright">
        © 2026 Dealatecorp. Strategy, creative and performance—connected.
      </p>
    </footer>
  );
}
