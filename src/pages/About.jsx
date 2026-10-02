import { CallToAction } from "../components/CallToAction.jsx";
import { DepartmentLinks } from "../components/DepartmentLinks.jsx";
export function About() {
  return (
    <main className="dc-about">
      <section className="page-intro">
        <div className="dc-about__hero-copy">
          <p className="kicker">About Dealatecorp</p>
          <h1>
            Built for the gap between
            <br />
            <em>ideas and outcomes.</em>
          </h1>
          <a className="button about-enquiry-button" href="/contact/">
            Enquire now <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="dc-about__hero-summary">
          <p>Strategy, design and technology. One team in Hyderabad.</p>
        </div>
        <div
          className="dc-about__visual"
          aria-hidden="true"
          data-about-addition
        >
          <span className="dc-about__orb" />
        </div>
      </section>
      <section className="about-manifesto">
        <div className="about-number">
          D<span>→</span>
        </div>
        <div>
          <p className="kicker">Our point of view</p>
          <h2>Clarity is the beginning of good growth.</h2>
          <p>
            We turn clear strategy into thoughtful design, useful technology and
            measurable marketing.
          </p>
        </div>
      </section>
      <section className="values dc-about__values">
        <h2 data-department-addition>What guides us</h2>
        <article>
          <h3>Think commercially</h3>
          <p>Creative work must understand the business it serves.</p>
        </article>
        <article>
          <h3>Make with care</h3>
          <p>Details shape trust before a sales conversation begins.</p>
        </article>
        <article>
          <h3>Measure honestly</h3>
          <p>Good reporting explains what changed and what to do next.</p>
        </article>
        <article data-department-addition>
          <h3>Work as one team</h3>
          <p>Clear collaboration keeps every decision close to the work.</p>
        </article>
      </section>
      <section
        className="shared-departments"
        aria-labelledby="about-departments"
        data-department-addition
      >
        <p className="kicker">Our departments</p>
        <h2 id="about-departments">
          One partner.
          <br />
          Two connected disciplines.
        </h2>
        <DepartmentLinks />
      </section>
      <CallToAction />
    </main>
  );
}
