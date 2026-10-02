import { useEffect, useRef } from "react";

const featuredSites = [
  {
    name: "Sri Parasakthi Peetam",
    url: "https://www.sriparasakthipeetam.com/",
    category: "Spiritual & devotional",
  },
  {
    name: "DC Real Estate",
    url: "https://dcreal-estate.vercel.app/",
    category: "Real estate",
  },
  {
    name: "DC College",
    url: "https://dc-college-zeta.vercel.app/",
    category: "Education",
  },
  {
    name: "DC Imports & Exports",
    url: "https://dc-importsandexports.vercel.app/",
    category: "Trade & commerce",
  },
  {
    name: "Visionary Builds",
    url: "https://visionary-builds-iyhh.vercel.app/",
    category: "Construction",
  },
  {
    name: "Radiant Dreams",
    url: "https://dc-radiant-dreams-website.vercel.app/",
    category: "Brand website",
  },
  {
    name: "Lumi-Re Lumina",
    url: "https://lumi-re-lumina.vercel.app/",
    category: "Brand website",
  },
  {
    name: "DC Interiors Studio",
    url: "https://dc-interiors-studio.vercel.app/",
    category: "Interior design",
  },
  {
    name: "Sanjeevi Digital Health",
    url: "https://sanjeevi-digital-health-7vzs.vercel.app/",
    category: "Digital healthcare",
  },
  {
    name: "Ganesh Constructions",
    url: "https://ganesh-constructionsweb-w331.vercel.app/",
    category: "Construction",
  },
  {
    name: "SS Dental",
    url: "https://ssdental-six.vercel.app/",
    category: "Dental care",
  },
  {
    name: "Physiotherapy",
    url: "https://physiotherapy1.vercel.app/",
    category: "Healthcare",
  },
];

function SitePreviewCard({ site, index }) {
  const frameRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;

    const updateScale = () => {
      frame.style.setProperty(
        "--preview-scale",
        String(frame.clientWidth / 1440),
      );
    };

    updateScale();
    if (typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver(updateScale);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  const hostname = new URL(site.url).hostname.replace(/^www\./, "");

  return (
    <article className="site-preview-card" style={{ "--preview-index": index }}>
      <div className="site-preview-card__browser" aria-hidden="true">
        <span className="site-preview-card__lights">
          <i />
          <i />
          <i />
        </span>
        <span className="site-preview-card__address">{hostname}</span>
        <span className="site-preview-card__external">↗</span>
      </div>
      <div className="site-preview-card__viewport" ref={frameRef}>
        <iframe
          src={site.url}
          title={`${site.name} homepage preview`}
          width="1440"
          height="900"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin"
          tabIndex={-1}
          aria-hidden="true"
        />
        <span className="site-preview-card__preview-label" aria-hidden="true">
          Homepage preview
        </span>
      </div>
      <div className="site-preview-card__details">
        <div>
          <p className="dc-eyebrow">{site.category}</p>
          <h3>{site.name}</h3>
        </div>
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${site.name}`}
        >
          Visit site <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

export function SiteShowcase() {
  return (
    <section
      className="site-showcase dc-wrap"
      aria-labelledby="site-showcase-title"
    >
      <div className="site-showcase__heading">
        <div>
          <p className="dc-eyebrow">Made by Dealatecorp</p>
          <h2 id="site-showcase-title">
            Built for different worlds.
            <br />
            <span>Connected by good work.</span>
          </h2>
        </div>
        <p>
          Explore a selection of live websites we’ve designed and built for
          businesses across different industries.
        </p>
      </div>
      <div className="site-showcase__grid">
        {featuredSites.map((site, index) => (
          <SitePreviewCard key={site.url} site={site} index={index} />
        ))}
      </div>
    </section>
  );
}
