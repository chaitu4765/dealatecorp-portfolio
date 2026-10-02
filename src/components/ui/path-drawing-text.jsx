import { useEffect, useId, useRef, useState } from "react";

async function rasterInk(svg, dash) {
  const clone = svg.cloneNode(true);
  clone.querySelector(".path-drawing-text__base")?.remove();
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("width", "1100");
  clone.setAttribute("height", "220");
  const text = clone.querySelector("text");
  text.removeAttribute("class");
  text.setAttribute("stroke", "white");
  text.style.stroke = "white";
  text.style.strokeDasharray = dash ? `${dash} 100000` : "none";
  text.style.strokeDashoffset = "0";
  const url = URL.createObjectURL(
    new Blob([new XMLSerializer().serializeToString(clone)], {
      type: "image/svg+xml;charset=utf-8",
    }),
  );
  try {
    const image = await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = 495;
    canvas.height = 99;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) throw new Error("Canvas unavailable");
    context.drawImage(image, 0, 0, 495, 99);
    const pixels = context.getImageData(0, 0, 495, 99).data;
    let ink = 0;
    for (let i = 3; i < pixels.length; i += 4) if (pixels[i] > 12) ink++;
    return ink;
  } finally {
    URL.revokeObjectURL(url);
  }
}

// The supplied component's ink measurement makes each loop finish at the actual
// glyph contour. CSS runs the drawing; React never re-renders on animation frames.
export function PathDrawingText({ text = "DealateCorp" }) {
  const id = `brand-drawing-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const svgRef = useRef(null);
  const [dash, setDash] = useState(0);
  useEffect(() => {
    let cancelled = false;
    const svg = svgRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const measure = async () => {
      if (reduced.matches || !svg?.querySelector("text")?.getComputedTextLength)
        return;
      try {
        await document.fonts?.ready;
        if (cancelled) return;
        const full = await rasterInk(svg);
        if (!full) throw new Error("Empty glyph outline");
        const covered = async (length) =>
          (await rasterInk(svg, length)) >= full * 0.994;
        let hi = 64;
        while (!cancelled && hi < 24000 && !(await covered(hi))) hi *= 2;
        let lo = 1;
        while (!cancelled && lo < hi) {
          const mid = (lo + hi) >> 1;
          if (await covered(mid)) hi = mid;
          else lo = mid + 1;
        }
        if (!cancelled) setDash(lo);
      } catch {
        if (!cancelled) setDash(600);
      }
    };
    void measure();
    const onMotionChange = () => {
      if (reduced.matches) setDash(0);
      else void measure();
    };
    reduced.addEventListener("change", onMotionChange);
    return () => {
      cancelled = true;
      reduced.removeEventListener("change", onMotionChange);
    };
  }, [text]);

  const glyph = {
    x: "50%",
    y: "50%",
    textAnchor: "middle",
    dominantBaseline: "middle",
    fill: "none",
    strokeWidth: 2.4,
    strokeLinejoin: "round",
    strokeLinecap: "round",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: 168,
    fontWeight: "bold",
    textLength: 1010,
    lengthAdjust: "spacingAndGlyphs",
  };
  return (
    <svg
      ref={svgRef}
      className="path-drawing-text"
      viewBox="0 0 1100 220"
      aria-hidden="true"
      focusable="false"
      data-ready={dash > 0}
      style={{ "--draw-length": dash || 600 }}
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" className="path-drawing-text__start" />
          <stop offset="100%" className="path-drawing-text__end" />
        </linearGradient>
      </defs>
      <text {...glyph} className="path-drawing-text__base">
        {text}
      </text>
      <text
        {...glyph}
        className="path-drawing-text__stroke"
        stroke={`url(#${id})`}
      >
        {text}
      </text>
    </svg>
  );
}
