import { ServiceNetwork } from "../components/ServiceNetwork.jsx";
import { DepartmentExplorer } from "../components/DepartmentExplorer.jsx";
import { Fragment, useState, useRef } from "react";
// Native SVG adaptation of Inspira UI Animated Beam. See third-party-notices.txt.
export const serviceCatalog = [
  {
    id: "seo",
    name: "Search Engine Optimization",
    short: "SEO",
    group: "Search & discovery",
    icon: "search",
    color: "#176bf5",
    description:
      "Technical, on-page and off-page SEO that strengthens search visibility, organic traffic and qualified enquiries.",
    includes: ["Technical SEO", "On-page optimisation", "Off-page authority"],
    alias: 3,
  },
  {
    id: "local-seo",
    name: "Local SEO",
    short: "Local SEO",
    group: "Search & discovery",
    icon: "pin",
    color: "#176bf5",
    description:
      "A stronger local presence for Google Maps, near-me searches, local enquiries and visits to your business.",
    includes: [
      "Google Maps visibility",
      "Local search",
      "Business profile optimisation",
    ],
  },
  {
    id: "google-ads",
    name: "Google Ads (PPC)",
    short: "Google Ads",
    group: "Paid acquisition",
    icon: "googleads",
    color: "#4285f4",
    description:
      "High-intent paid campaigns that bring the right traffic to your business, with ongoing attention to qualified leads, conversions and ad spend.",
    includes: [
      "Search campaigns",
      "Audience & keyword targeting",
      "Campaign optimisation",
    ],
    alias: 4,
  },
  {
    id: "social-media",
    name: "Social Media Marketing",
    short: "Social Media",
    group: "Content & community",
    icon: "users",
    color: "#8b5cf6",
    description:
      "Platform-focused strategies that grow your audience, encourage engagement and build a consistent brand presence.",
    includes: ["Platform strategy", "Audience engagement", "Community growth"],
  },
  {
    id: "meta-ads",
    name: "Meta Ads",
    short: "Meta Ads",
    subtitle: "Facebook & Instagram Ads",
    group: "Paid acquisition",
    icon: "meta",
    color: "#0866ff",
    description:
      "Facebook and Instagram advertising that combines purposeful creative with audience targeting to support reach, qualified leads and conversions.",
    includes: ["Facebook Ads", "Instagram Ads", "Creative & audience testing"],
  },
  {
    id: "linkedin",
    name: "LinkedIn Marketing",
    short: "LinkedIn",
    group: "B2B marketing",
    icon: "linkedin",
    color: "#0a66c2",
    description:
      "B2B marketing that builds professional visibility, meaningful connections and qualified business enquiries.",
    includes: ["B2B positioning", "Professional audiences", "Lead generation"],
  },
  {
    id: "youtube",
    name: "YouTube Marketing",
    short: "YouTube",
    group: "Video & discovery",
    icon: "youtube",
    color: "#ff0033",
    description:
      "Video content, YouTube SEO and advertising that help people discover your brand, watch your stories and take the next step.",
    includes: ["Video content", "YouTube SEO", "YouTube advertising"],
  },
  {
    id: "content",
    name: "Content Marketing",
    short: "Content",
    group: "Content & community",
    icon: "file",
    color: "#8b5cf6",
    description:
      "Search-focused content that develops organic authority, earns audience trust and supports long-term website visibility.",
    includes: [
      "Search-focused content",
      "Brand storytelling",
      "Content planning",
    ],
    alias: 2,
  },
  {
    id: "email",
    name: "Email Marketing",
    short: "Email",
    group: "Engagement & retention",
    icon: "mail",
    color: "#d97706",
    description:
      "Personalised email campaigns that nurture leads, keep customers engaged and support repeat purchases and retention.",
    includes: ["Email campaigns", "Lead nurturing", "Customer retention"],
  },
  {
    id: "whatsapp",
    name: "WhatsApp Marketing",
    short: "WhatsApp",
    group: "Engagement & retention",
    icon: "whatsapp",
    color: "#16a34a",
    description:
      "Targeted messaging and automated customer journeys that turn interest into useful conversations, enquiries and customer action.",
    includes: [
      "Targeted messaging",
      "Automated journeys",
      "Customer engagement",
    ],
    alias: 6,
  },
  {
    id: "influencer",
    name: "Influencer Marketing",
    short: "Influencers",
    group: "Content & community",
    icon: "spark",
    color: "#d946a6",
    description:
      "Relevant creator partnerships that help your brand reach new audiences with an authentic voice and trusted recommendations.",
    includes: [
      "Creator partnerships",
      "Audience relevance",
      "Campaign coordination",
    ],
  },
  {
    id: "reputation",
    name: "Online Reputation Management",
    short: "Reputation",
    group: "Trust & credibility",
    icon: "shield",
    color: "#0d9488",
    description:
      "A considered approach to reviews and your digital reputation, helping people feel confident choosing your business.",
    includes: ["Review presence", "Brand credibility", "Reputation monitoring"],
  },
  {
    id: "cro",
    name: "Conversion Rate Optimization",
    short: "Conversion",
    group: "Conversion & experience",
    icon: "target",
    color: "#ea580c",
    description:
      "Landing-page and user-experience improvements that help more of your existing visitors become enquiries and customers.",
    includes: ["Landing pages", "Customer journeys", "Conversion optimisation"],
    alias: 5,
  },
  {
    id: "analytics",
    name: "Marketing Analytics & Reporting",
    short: "Analytics",
    group: "Measurement & insight",
    icon: "analytics",
    color: "#e37400",
    description:
      "Clear campaign reporting and actionable insights that explain performance and help you decide what to improve next.",
    includes: [
      "Campaign analytics",
      "Performance reports",
      "Actionable insights",
    ],
    alias: 7,
  },
];
const supportingCapabilities = [
  {
    id: "branding",
    name: "Branding & Design",
    description:
      "Positioning, visual identity and campaign design that give your business a clear, consistent presence.",
  },
  {
    id: "websites",
    name: "Websites & E-commerce",
    description:
      "Fast websites, focused landing pages and online stores that make it easy for people to explore, enquire and buy.",
  },
  {
    id: "automation",
    name: "AI & Automation",
    description:
      "Practical workflows that connect enquiries, follow-ups and reporting, helping your team move with clarity.",
  },
  {
    id: "video",
    name: "Video Production",
    description:
      "Reels, product stories and campaign films, brought together with purposeful editing and a clear creative direction.",
  },
];
const symbolPaths = {
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 21v-3a6 6 0 0 1 12 0v3M17 5a3 3 0 0 1 0 6m1 4a5 5 0 0 1 3 4v2" />
    </>
  ),
  file: (
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6M8 13h8M8 17h6" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  spark: (
    <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" />
  ),
  shield: (
    <>
      <path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6l8-4Z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
};
function icon(service) {
  if (
    ["googleads", "meta", "youtube", "whatsapp", "analytics"].includes(
      service.icon,
    )
  )
    return (
      <img
        src={"/assets/icons/" + service.icon + ".svg"}
        width="25"
        height="25"
        alt=""
      />
    );
  if (service.icon === "linkedin")
    return (
      <b className="service-linkedin" aria-hidden="true">
        in
      </b>
    );
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {symbolPaths[service.icon]}
    </svg>
  );
}
export function Services() {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const focus = useRef(null);
  const selectService = (index) => {
    setSelectedIndex(index);
    if (window.innerWidth < 640)
      focus.current?.scrollIntoView({
        block: "start",
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  };
  const selected = serviceCatalog[selectedIndex];
  return (
    <main className="dc-services-page" id="main-content">
      <section className="services-heading dc-wrap" id="layer-1">
        <p className="dc-eyebrow">Dealatecorp / Our services</p>
        <h1>
          Two disciplines.
          <br />
          <em>One shared direction.</em>
        </h1>
        <div>
          <p>
            Technology and digital marketing—connected around your business.
            Explore the expertise, the implementation and the difference a
            considered approach can make.
          </p>
          <a className="dc-service-link" href="#departments">
            Find your starting point
          </a>
        </div>
      </section>

      <DepartmentExplorer services={serviceCatalog} />

      <section
        className="service-network-section dc-wrap"
        id="digital-network"
        aria-labelledby="network-title"
      >
        <div className="network-heading">
          <div>
            <p className="dc-eyebrow">
              02 / Digital Marketing · DC Creative Labs
            </p>
            <h2 id="network-title">Your growth, at the centre.</h2>
          </div>
          <p id="network-help">
            Select a service to explore what it can do for your business.
            <a
              className="dc-service-link"
              href="#service-directory"
              data-department-addition
            >
              View every service
            </a>
          </p>
        </div>

        <ServiceNetwork
          services={serviceCatalog}
          selected={selectedIndex}
          onSelect={selectService}
          renderIcon={icon}
        />

        <div
          className="service-focus"
          id="service-focus"
          style={{
            "--selected-color": selected.color,
          }}
          ref={focus}
        >
          <span className="service-focus__number" aria-hidden="true">
            {String(selectedIndex + 1).padStart(2, "0")} <small>/ 14</small>
          </span>
          <div
            className="service-focus__copy"
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="dc-eyebrow">{selected.group}</p>
            <h3>{selected.name}</h3>
            <p className="service-focus__description">{selected.description}</p>
            <ul>
              {selected.includes.map((t, index) => (
                <li key={index}>{t}</li>
              ))}
            </ul>
          </div>
          <a
            className="dc-button service-focus__cta"
            href={
              "mailto:hr@dealatecorp.com?subject=" +
              encodeURIComponent("Enquiry: " + selected.name)
            }
          >
            Discuss this service
          </a>
        </div>
      </section>

      <section
        className="service-directory dc-wrap"
        id="service-directory"
        aria-labelledby="directory-title"
      >
        <div className="dc-section-heading">
          <div>
            <p className="dc-eyebrow">The full service suite</p>
            <h2 id="directory-title">
              A clear role
              <br />
              <span>for every channel.</span>
            </h2>
          </div>
          <p>
            Choose the services your business needs today. Build on them as your
            priorities evolve.
          </p>
        </div>
        <div className="service-directory__grid">
          {serviceCatalog.map((s, i) => (
            <article id={"service-" + s.id} key={i}>
              {s.alias ? (
                <span className="service-anchor" id={"layer-" + s.alias} />
              ) : (
                ""
              )}
              <div className="service-directory__title">
                <span
                  className="service-directory__icon"
                  style={{
                    color: s.color,
                  }}
                >
                  {icon(s)}
                </span>
                <span className="dc-eyebrow">
                  <>
                    {String(i + 1).padStart(2, "0")}
                    {" / "}
                    {s.group}
                  </>
                </span>
              </div>
              <h3>{s.name}</h3>
              {s.subtitle ? (
                <p className="service-directory__subtitle">{s.subtitle}</p>
              ) : (
                ""
              )}
              <p>{s.description}</p>
              <ul>
                {s.includes.map((t, index) => (
                  <li key={index}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section
        className="service-directory service-capabilities dc-wrap"
        aria-labelledby="capabilities-title"
      >
        <div className="dc-section-heading">
          <div>
            <p className="dc-eyebrow">Supporting capabilities</p>
            <h2 id="capabilities-title">
              Brand, digital
              <br />
              <span>and creative.</span>
            </h2>
          </div>
          <p>
            Branding, websites, practical automation and video production
            complement the marketing services above.
          </p>
        </div>
        <div className="service-directory__grid">
          {supportingCapabilities.map((s, index) => (
            <article id={"capability-" + s.id} key={index}>
              <p className="dc-eyebrow" data-department-addition>
                {["websites", "automation"].includes(s.id)
                  ? "IT Department"
                  : "Digital Marketing"}
              </p>
              <h3>{s.name}</h3>
              <p>{s.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="services-next dc-wrap">
        <div>
          <p className="dc-eyebrow">Not sure where to begin?</p>
          <h2>
            Start with your goal.
            <br />
            <span>We’ll connect the pieces.</span>
          </h2>
        </div>
        <div>
          <p>
            Tell us about your business, your audience and what you want to
            achieve next.
          </p>
          <a className="dc-button" href="tel:+919550548811">
            Talk to our team
          </a>
        </div>
      </section>
    </main>
  );
}
