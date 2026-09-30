import { useEffect, useRef, useState } from "react";
import {
  departments,
  itCapabilities,
  marketingCapabilities,
} from "../data/departments.js";

function Comparison({ capability }) {
  const [position, setPosition] = useState(50);
  const rangeId = `comparison-${capability.id}`;
  const moveDivider = (event) => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    if (width)
      setPosition(
        Math.round(
          Math.max(0, Math.min(100, ((event.clientX - left) / width) * 100)),
        ),
      );
  };
  return (
    <figure className="capability-comparison">
      <figcaption>
        <span className="dc-eyebrow">The implementation difference</span>
        <h4>From disconnected to considered.</h4>
      </figcaption>
      <div
        className="comparison-canvas"
        style={{ "--split": `${position}%` }}
        aria-hidden="true"
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          event.currentTarget.setPointerCapture?.(event.pointerId);
          moveDivider(event);
        }}
        onPointerMove={(event) => {
          if (event.buttons === 1) moveDivider(event);
        }}
      >
        {["before", "after"].map((side) => (
          <div
            className={`comparison-scene comparison-scene--${side}`}
            key={side}
          >
            <div className="comparison-scene__top">
              <span>{side === "before" ? "Before" : "After"}</span>
              <span>Workflow view</span>
            </div>
            <div className="comparison-flow">
              {capability[side].map((line, index) => (
                <div className="comparison-step" key={line}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{line}</p>
                  <i>{side === "before" ? "Unstructured" : "Connected"}</i>
                </div>
              ))}
            </div>
            <span className="comparison-scene__bottom">
              {side === "before"
                ? "Separate tasks. Unclear handoffs."
                : "Clear steps. Shared ownership."}
            </span>
          </div>
        ))}
        <div className="comparison-divider">
          <span>↔</span>
        </div>
      </div>
      <div className="comparison-controls">
        <label htmlFor={rangeId}>Compare before & after</label>
        <output htmlFor={rangeId}>
          {position}% before · {100 - position}% after
        </output>
        <input
          id={rangeId}
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-describedby={`${rangeId}-hint`}
          aria-valuetext={`${position} percent before, ${100 - position} percent after`}
        />
        <button type="button" onClick={() => setPosition(100)}>
          Show before
        </button>
        <span id={`${rangeId}-hint`}>Drag, or use arrow keys</span>
        <button type="button" onClick={() => setPosition(0)}>
          Show after
        </button>
      </div>
      <details className="comparison-transcript">
        <summary>Read the comparison</summary>
        <div>
          {["before", "after"].map((side) => (
            <div key={side}>
              <h5>{side === "before" ? "Before" : "After"}</h5>
              <ul>
                {capability[side].map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </details>
      <p className="comparison-disclaimer">
        Illustrative workflow—not a client result or performance guarantee.
      </p>
    </figure>
  );
}

export function DepartmentExplorer({ services }) {
  const [departmentId, setDepartmentId] = useState("it");
  const [capabilityIndex, setCapabilityIndex] = useState(0);
  const tabs = useRef([]);
  const section = useRef(null);
  const department = departments.find((item) => item.id === departmentId);
  const capabilities =
    departmentId === "it" ? itCapabilities : marketingCapabilities(services);
  const selected = capabilities[capabilityIndex] || capabilities[0];

  useEffect(() => {
    let frame;
    const readHash = () => {
      const id = window.location.hash.replace("#department-", "");
      if (!departments.some((item) => item.id === id)) return;
      setDepartmentId(id);
      setCapabilityIndex(0);
      frame = requestAnimationFrame(() =>
        section.current?.scrollIntoView({ block: "start" }),
      );
    };
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => {
      window.removeEventListener("hashchange", readHash);
      cancelAnimationFrame(frame);
    };
  }, []);

  const chooseDepartment = (id) => {
    setDepartmentId(id);
    setCapabilityIndex(0);
    window.history.replaceState(null, "", `#department-${id}`);
  };
  const onTabKey = (event, index) => {
    const count = departments.length;
    const next = {
      ArrowRight: (index + 1) % count,
      ArrowLeft: (index + count - 1) % count,
      Home: 0,
      End: count - 1,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    chooseDepartment(departments[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <section
      className="department-explorer dc-wrap"
      id="departments"
      ref={section}
      aria-labelledby="departments-title"
      data-department-addition
    >
      <div className="department-explorer__intro">
        <div>
          <p className="dc-eyebrow">01 / Explore our departments</p>
          <h2 id="departments-title">
            Connected thinking.
            <br />
            <span>Specialist execution.</span>
          </h2>
        </div>
        <p>
          Start with a department. Choose a capability.
          <br />
          See what goes into making it work.
        </p>
      </div>
      <div
        className="department-tabs"
        role="tablist"
        aria-label="Service departments"
      >
        {departments.map((item, index) => (
          <button
            key={item.id}
            id={`department-${item.id}`}
            role="tab"
            type="button"
            aria-selected={departmentId === item.id}
            tabIndex={departmentId === item.id ? 0 : -1}
            aria-controls={`department-panel-${item.id}`}
            ref={(node) => {
              tabs.current[index] = node;
            }}
            onKeyDown={(event) => onTabKey(event, index)}
            onClick={() => chooseDepartment(item.id)}
          >
            <span>0{index + 1}</span>
            <strong>{item.name}</strong>
            <small>{item.line}</small>
          </button>
        ))}
      </div>
      {departments.map((item) =>
        item.id !== departmentId ? (
          <div
            key={item.id}
            id={`department-panel-${item.id}`}
            role="tabpanel"
            aria-labelledby={`department-${item.id}`}
            hidden
          />
        ) : (
          <div
            key={item.id}
            id={`department-panel-${item.id}`}
            role="tabpanel"
            aria-labelledby={`department-${item.id}`}
            className="department-panel"
            tabIndex={0}
          >
            <aside className="capability-nav">
              <p className="dc-eyebrow">{capabilities.length} capabilities</p>
              <div className="capability-select">
                <label htmlFor="capability-choice">Choose a capability</label>
                <select
                  id="capability-choice"
                  value={capabilityIndex}
                  onChange={(event) =>
                    setCapabilityIndex(Number(event.target.value))
                  }
                >
                  {capabilities.map((cap, index) => (
                    <option key={cap.id} value={index}>
                      {String(index + 1).padStart(2, "0")} / {cap.name}
                    </option>
                  ))}
                </select>
              </div>
              <div role="group" aria-label={`${department.name} capabilities`}>
                {capabilities.map((cap, index) => (
                  <button
                    type="button"
                    key={cap.id}
                    aria-pressed={selected.id === cap.id}
                    aria-controls="capability-detail"
                    onClick={() => setCapabilityIndex(index)}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {cap.name}
                  </button>
                ))}
              </div>
              {departmentId === "digital" && (
                <a href="#digital-network" className="dc-service-link">
                  Explore the connected channels
                </a>
              )}
            </aside>
            <article id="capability-detail" className="capability-detail">
              <header
                className="capability-detail__heading"
                aria-live="polite"
                aria-atomic="true"
              >
                <p className="dc-eyebrow">
                  {department.name} /{" "}
                  {String(capabilityIndex + 1).padStart(2, "0")}
                </p>
                <h3>{selected.name}</h3>
                <p>{selected.description}</p>
              </header>
              <div className="capability-detail__body">
                <div className="capability-scope">
                  <h4>What we can deliver</h4>
                  <ul>
                    {selected.includes.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  <a
                    className="dc-button"
                    href={`mailto:hr@dealatecorp.com?subject=${encodeURIComponent(`Enquiry: ${department.name} / ${selected.name}`)}`}
                  >
                    Discuss this capability
                  </a>
                  <p>
                    Scope, timeline and deliverables agreed before work begins.
                  </p>
                </div>
                <Comparison
                  key={`${departmentId}-${selected.id}`}
                  capability={selected}
                />
              </div>
              <div className="implementation">
                <h4>How we put it into practice</h4>
                <ol>
                  {selected.implementation.map((step, index) => (
                    <li key={step}>
                      <span>
                        0{index + 1} /{" "}
                        {["Discover", "Implement", "Review & hand over"][index]}
                      </span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          </div>
        ),
      )}
      <div className="department-explorer__footer">
        <span>Different expertise. One clear project brief.</span>
        <a href="/portfolio/" className="dc-service-link">
          See our creative work
        </a>
      </div>
    </section>
  );
}
