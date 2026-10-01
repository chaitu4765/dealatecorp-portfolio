import { Fragment } from "react";
export function CallToAction() {
  return (
    <section className="cta">
      <p className="kicker">Your next growth chapter</p>
      <h2>
        {"One partner. "}
        <em>Every moving part.</em>
      </h2>
      <p>
        Tell us where the business needs to go. We’ll map the clearest way
        forward.
      </p>
      <a className="button button--light interactive-hover" href="/contact/" data-project-enquiry>
        <span>Start a conversation</span>
        <i aria-hidden="true">↗</i>
      </a>
    </section>
  );
}
