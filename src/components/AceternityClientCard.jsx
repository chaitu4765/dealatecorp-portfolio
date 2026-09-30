import { useEffect, useRef } from "react";

// Adapted from Aceternity UI's 3D Card Effect by Manu Arora:
// https://ui.aceternity.com/components/3d-card-effect
// See ACETERNITY-REFERENCE.md for the source and local changes.
export function AceternityClientCard({
  as: Tag = "article",
  children,
  ...props
}) {
  const card = useRef(null);
  const motionAllowed = useRef(false);

  const reset = () => {
    const element = card.current;
    if (!element) return;
    element.style.removeProperty("--ace-rotate-x");
    element.style.removeProperty("--ace-rotate-y");
    delete element.dataset.tiltActive;
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => {
      motionAllowed.current = !reduced.matches && fine.matches;
      if (!motionAllowed.current) reset();
    };
    sync();
    reduced.addEventListener("change", sync);
    fine.addEventListener("change", sync);
    return () => {
      reduced.removeEventListener("change", sync);
      fine.removeEventListener("change", sync);
    };
  }, []);

  const tilt = (event) => {
    if (!motionAllowed.current || event.pointerType === "touch") return;
    const element = card.current;
    const { left, top, width, height } = element.getBoundingClientRect();
    if (!width || !height) return;
    const clamp = (value) => Math.max(-4, Math.min(4, value));
    const x = clamp(((event.clientX - left) / width - 0.5) * 8);
    const y = clamp(-((event.clientY - top) / height - 0.5) * 8);
    element.style.setProperty("--ace-rotate-x", `${y.toFixed(2)}deg`);
    element.style.setProperty("--ace-rotate-y", `${x.toFixed(2)}deg`);
    element.dataset.tiltActive = "true";
  };

  return (
    <Tag
      {...props}
      ref={card}
      className="client-brand-card aceternity-client-card"
      onPointerMove={tilt}
      onPointerLeave={reset}
      onPointerCancel={reset}
      onBlur={reset}
    >
      {children}
    </Tag>
  );
}
