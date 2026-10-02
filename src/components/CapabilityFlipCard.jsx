import { useState } from "react";

// Independent React/CSS adaptation of the Flip Card interaction on 21st.dev.
export function CapabilityFlipCard({ capability, index, selected, onSelect }) {
  const [flipped, setFlipped] = useState(false);
  const updatePointerEffect = (event) => {
    if (event.pointerType === "touch") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty("--spot-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--spot-y", `${y * 100}%`);
    event.currentTarget.style.setProperty(
      "--card-tilt-x",
      `${(x - 0.5) * 5}deg`,
    );
    event.currentTarget.style.setProperty(
      "--card-tilt-y",
      `${(0.5 - y) * 5}deg`,
    );
  };

  return (
    <button
      type="button"
      className="capability-flip-card"
      style={{ "--card-index": index }}
      data-flipped={flipped}
      aria-pressed={selected}
      aria-controls="capability-detail"
      aria-label={`${capability.name} — ${flipped ? "show summary" : "show deliverables"}`}
      onPointerMove={updatePointerEffect}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setFlipped(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") {
          setFlipped(false);
          event.currentTarget.style.setProperty("--card-tilt-x", "0deg");
          event.currentTarget.style.setProperty("--card-tilt-y", "0deg");
          event.currentTarget.style.setProperty("--spot-x", "50%");
          event.currentTarget.style.setProperty("--spot-y", "50%");
        }
      }}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
      onClick={(event) => {
        // Hover handles mouse pointers; click toggles touch and keyboard input.
        if (event.detail === 0 || window.matchMedia("(hover: none)").matches) {
          setFlipped((value) => !value);
        }
        onSelect();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setFlipped(false);
      }}
    >
      <span className="capability-flip-card__inner">
        <span
          className="capability-flip-card__face capability-flip-card__front"
          aria-hidden={flipped}
        >
          <img
            className="capability-flip-card__image"
            src={`/assets/capabilities/${capability.id}.jpg`}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
          <strong>{capability.name}</strong>
        </span>
        <span
          className="capability-flip-card__face capability-flip-card__back"
          aria-hidden={!flipped}
        >
          <span className="capability-flip-card__top">
            <span>WHAT WE DELIVER</span>
            <img src="/assets/icons/dc-logo.png" alt="" aria-hidden="true" />
          </span>
          <strong>{capability.name}</strong>
          <span className="capability-flip-card__deliverables">
            {capability.includes.map((line) => (
              <span key={line}>
                <span aria-hidden="true">↗</span>
                {line}
              </span>
            ))}
          </span>
          <span className="capability-flip-card__hint">
            Click to return <span aria-hidden="true">↻</span>
          </span>
        </span>
      </span>
    </button>
  );
}
