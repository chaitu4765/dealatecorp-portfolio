import { Fragment } from "react";
import { CallToAction } from "../components/CallToAction.jsx";
export function About() {
  return (
    <main>
      <section className="page-intro">
        <p className="kicker">About Dealatecorp</p>
        <h1>
          Built for the gap between
          <br />
          <em>ideas and outcomes.</em>
        </h1>
        <p>
          We are an independent growth partner in Hyderabad, bringing business
          thinking and digital craft under one roof.
        </p>
      </section>
      <section className="about-manifesto">
        <div className="about-number">
          D<span>→</span>
        </div>
        <div>
          <p className="kicker">Our point of view</p>
          <h2>Clarity is the beginning of good growth.</h2>
          <p>
            More activity is rarely the answer. Better alignment is. We help
            teams decide what matters, build it with care, and learn quickly
            from what the market says next.
          </p>
          <p>
            That means fewer disconnected campaigns, fewer vanity reports and
            more useful conversations about customers, conversion and long-term
            brand value.
          </p>
        </div>
      </section>
      <section className="values">
        <article>
          <span>01</span>
          <h3>Think commercially</h3>
          <p>Creative work must understand the business it serves.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Make with care</h3>
          <p>Details shape trust before a sales conversation begins.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Measure honestly</h3>
          <p>Good reporting explains what changed and what to do next.</p>
        </article>
      </section>
      <CallToAction />
    </main>
  );
}
