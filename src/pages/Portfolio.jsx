import { Fragment } from "react";
import { work } from "../data/content.js";
import { CallToAction } from "../components/CallToAction.jsx";
function projectCard([category, title, desc, tags, color]) {
  return (
    <article className={"project " + color}>
      <div className="project-art">
        <span>
          {title
            .split(" ")
            .map((x) => x[0])
            .join("")
            .slice(0, 2)}
        </span>
      </div>
      <p className="kicker">{category}</p>
      <h3>{title}</h3>
      <p>{desc}</p>
      <small>{tags}</small>
    </article>
  );
}
export function Portfolio() {
  return (
    <main>
      <section className="page-intro">
        <p className="kicker">Selected work</p>
        <h1>
          Work that moves
          <br />
          <em>business forward.</em>
        </h1>
        <p>
          Different sectors. Different constraints. One standard: make the work
          useful, memorable and measurable.
        </p>
      </section>
      <section className="portfolio-grid">
        {work.map((item, index) => (
          <Fragment key={index}>{projectCard(item, index)}</Fragment>
        ))}
      </section>
      <CallToAction />
    </main>
  );
}
