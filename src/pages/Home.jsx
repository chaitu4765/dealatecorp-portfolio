import { Fragment } from "react";
import { useAnimationEffect } from "../hooks/useAnimationEffect.js";
import { Studio } from "./Studio.jsx";
import { DepartmentLinks } from "../components/DepartmentLinks.jsx";
const services = [
  {
    name: "Branding & Design",
    title: "A brand that feels unmistakably yours.",
    text: "Positioning, visual identity and campaign design that give your business a clear, consistent presence.",
    image: "branding",
    alt: "Brand design and creative materials",
    href: "/services/#capability-branding",
  },
  {
    name: "Websites & E-commerce",
    title: "A better experience, from the first click.",
    text: "Fast websites, focused landing pages and online stores that make it easy for people to explore, enquire and buy.",
    image: "websites",
    alt: "A digital design workspace",
    href: "/services/#capability-websites",
  },
  {
    name: "Online Marketing",
    title: "Reach the people ready to take notice.",
    text: "Google, Meta and LinkedIn campaigns shaped around your audience, your offer and the action that matters next.",
    image: "marketing",
    alt: "Advertising in an urban setting",
    href: "/services/#service-google-ads",
  },
  {
    name: "Content & Storytelling",
    title: "Give people a reason to remember you.",
    text: "A considered mix of words, design and video that makes your message useful, distinctive and worth sharing.",
    image: "content",
    alt: "Creative storytelling workspace",
    href: "/services/#service-content",
  },
  {
    name: "AI & Automation",
    title: "Less busywork. More room to grow.",
    text: "Practical workflows that connect enquiries, follow-ups and reporting, helping your team move with clarity.",
    image: "automation",
    alt: "Technology and connected systems",
    href: "/services/#capability-automation",
  },
  {
    name: "Social Media Management",
    title: "Show up with something worth saying.",
    text: "Content planning, creative production and publishing that keep your brand consistent and your audience engaged.",
    image: "social",
    alt: "Social media on a mobile device",
    href: "/services/#service-social-media",
  },
  {
    name: "SEO & Analytics",
    title: "Be discovered. Understand what works.",
    text: "Search optimisation, local visibility and clear reporting that turn digital activity into informed decisions.",
    image: "analytics",
    alt: "Digital analytics and reporting",
    href: "/services/#service-seo",
  },
  {
    name: "Video Production",
    title: "Make every frame mean something.",
    text: "Reels, product stories and campaign films, brought together with purposeful editing and a clear creative direction.",
    image: "video",
    alt: "Professional video production equipment",
    href: "/services/#capability-video",
  },
];
const selectedWork = [
  ["interiors", "Interiors", "Campaign design"],
  ["jewellery", "Jewellery", "Art direction"],
  ["hospitality", "Hospitality", "Social creative"],
  ["fashion", "Fashion", "Campaign design"],
];
export function Home() {
  useAnimationEffect(initHome);
  return (
    <main id="main-content" className="dc-home">
      <section className="dc-hero" aria-labelledby="hero-title">
        <div className="dc-hero__copy">
          <p className="dc-eyebrow">DC Creative Labs</p>

          <h1 id="hero-title">
            Good design.
            <br />
            Clear strategy.
            <br />
            <em>Lasting growth.</em>
          </h1>

          <p className="dc-hero__description">
            We bring brand, content and digital marketing together to help your
            business find its voice, reach the right people and move forward.
          </p>

          <div className="dc-actions">
            <a className="dc-button" href="tel:+919550548811">
              Let’s talk
            </a>
            <a className="dc-button dc-button--outline" href="#home-services">
              Explore our services
            </a>
          </div>

          <p className="dc-hero__signature">
            Creative strategies. Digital growth.
          </p>
        </div>

        <figure className="dc-reel">
          <div className="dc-reel__frame">
            <video
              id="dc-reel-video"
              src="/assets/dc-creative-reel.mp4"
              poster="/assets/dc-creative-reel-poster.jpg"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="DC Creative Labs introduction"
            />
            <div className="dc-reel__controls">
              <button
                type="button"
                id="reel-play"
                aria-label="Pause introduction video"
              >
                Pause
              </button>
              <button
                type="button"
                id="reel-mute"
                aria-label="Unmute introduction video"
                aria-pressed="false"
              >
                Sound off
              </button>
            </div>
          </div>

          <figcaption>
            <span>Inside DC Creative Labs</span>
            <span>00:16</span>
          </figcaption>
        </figure>

        <a className="dc-hero__scroll" href="#home-services">
          {"Discover what we do "}
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section
        className="dc-services-intro dc-wrap"
        id="home-services"
        aria-labelledby="services-title"
      >
        <p className="dc-eyebrow">01 / What we do</p>
        <div>
          <h2 id="services-title">
            Different disciplines.
            <br />
            <span>One shared direction.</span>
          </h2>
          <p>
            From the first impression to the next enquiry, every part of your
            digital presence should work together.
          </p>
        </div>
      </section>

      <div className="department-links-wrap">
        <DepartmentLinks />
      </div>

      <section className="dc-showcase" aria-label="Explore our eight services">
        <div className="dc-showcase__sticky">
          <div className="dc-service-nav">
            <p className="dc-eyebrow">Our capabilities</p>
            <nav aria-label="Services">
              {services.map((s, i) => (
                <a
                  href={"#service-" + (i + 1)}
                  data-service-link={i}
                  aria-current={i === 0 ? "true" : undefined}
                  key={i}
                >
                  <span className="dc-service-nav__marker" aria-hidden="true">
                    →
                  </span>
                  {s.name}
                </a>
              ))}
            </nav>
            <a href="#selected-work" className="dc-skip">
              {"Skip to our work "}
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="dc-service-stage" aria-hidden="true">
            <div className="dc-service-stage__images">
              {services.map((s, i) => (
                <figure
                  className="dc-service-visual"
                  data-service-visual={i}
                  key={i}
                >
                  <img
                    src={"/assets/services/" + s.image + ".jpg"}
                    alt=""
                    loading="lazy"
                    width="1000"
                    height="667"
                  />
                  <figcaption>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {s.name}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="dc-service-details">
            {services.map((s, i) => (
              <article
                className="dc-service-detail"
                data-service-detail={i}
                hidden={!!i}
                key={i}
              >
                <p className="dc-eyebrow">
                  <>
                    {String(i + 1).padStart(2, "0")}
                    {" / "}
                    {String(services.length).padStart(2, "0")}
                  </>
                </p>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <a className="dc-service-link" href={s.href}>
                  <>
                    {"Explore "}
                    {s.name}
                  </>
                </a>
              </article>
            ))}
            <div className="dc-service-progress">
              <span className="dc-service-progress__label">
                {services[0].name}
              </span>
              <span className="dc-service-progress__count">01 / 08</span>
              <div className="dc-service-progress__track">
                <i />
              </div>
            </div>
          </div>
        </div>

        <div className="dc-service-anchors" aria-hidden="true">
          {services.map((_, i) => (
            <span id={"service-" + (i + 1)} key={i} />
          ))}
        </div>
      </section>

      <section className="dc-mobile-services dc-wrap" aria-label="Services">
        {services.map((s, i) => (
          <article key={i}>
            <img
              src={"/assets/services/" + s.image + ".jpg"}
              alt={s.alt}
              loading="lazy"
              width="1000"
              height="667"
            />
            <p className="dc-eyebrow">
              <>
                {String(i + 1).padStart(2, "0")}
                {" / "}
                {s.name}
              </>
            </p>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <a className="dc-service-link" href={s.href}>
              Explore service
            </a>
          </article>
        ))}
      </section>

      <section
        id="selected-work"
        className="dc-work dc-wrap"
        aria-labelledby="work-title"
      >
        <div className="dc-section-heading">
          <div>
            <p className="dc-eyebrow">02 / Selected creative</p>
            <h2 id="work-title">
              Let the work
              <br />
              <span>do the talking.</span>
            </h2>
          </div>
          <p>
            A selection of campaign design and social creative from DC Creative
            Labs.
          </p>
        </div>
        <div className="dc-work-grid">
          {selectedWork.map(([file, name, type], i) => (
            <figure className="dc-work-item" key={i}>
              <div className="dc-work-item__image">
                <img
                  src={"/assets/work/" + file + ".jpg"}
                  alt={name + " " + type.toLowerCase() + " by DC Creative Labs"}
                  loading="lazy"
                  width="1080"
                  height="1080"
                />
              </div>
              <figcaption>
                <h3>{name}</h3>
                <span>{type}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <>
        <Studio />
      </>
      <section className="dc-contact dc-wrap" id="contact">
        <p className="dc-eyebrow">Have something in mind?</p>
        <h2>
          Let’s make
          <br />
          <span>your next move count.</span>
        </h2>
        <div>
          <a className="dc-button" href="tel:+919550548811">
            Start a conversation
          </a>
          <a href="mailto:hr@dealatecorp.com">hr@dealatecorp.com</a>
        </div>
        <p>
          {"Hyderabad, India "}
          <span>+91 95505 48811</span>
        </p>
      </section>
    </main>
  );
}
function initHome(scope) {
  const section = document.querySelector(".dc-showcase");
  if (!section) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktop = window.matchMedia(
    "(min-width: 1000px) and (min-height: 640px)",
  );
  const visuals = [...section.querySelectorAll("[data-service-visual]")];
  const links = [...section.querySelectorAll("[data-service-link]")];
  const details = [...section.querySelectorAll("[data-service-detail]")];
  const fill = section.querySelector(".dc-service-progress__track i");
  const label = section.querySelector(".dc-service-progress__label");
  const count = section.querySelector(".dc-service-progress__count");
  const stage = section.querySelector(".dc-service-stage");
  let active = -1,
    frame = 0;
  function update() {
    frame = 0;
    if (!desktop.matches || reduced.matches) return;
    const rect = section.getBoundingClientRect();
    const maxScroll = section.offsetHeight - innerHeight;
    const p = Math.max(0, Math.min(1, -rect.top / maxScroll));
    const position = p * (services.length - 1);
    const next = Math.round(position);
    if (active !== next) {
      active = next;
      links.forEach((link, i) =>
        i === active
          ? link.setAttribute("aria-current", "true")
          : link.removeAttribute("aria-current"),
      );
      details.forEach((item, i) => (item.hidden = i !== active));
      label.textContent = services[active].name;
      count.textContent = `${String(active + 1).padStart(2, "0")} / 08`;
    }
    const spacing = stage.clientHeight * 0.91;
    visuals.forEach((visual, i) => {
      const delta = i - position;
      visual.style.transform = `translate3d(${i % 2 ? "-5%" : "5%"},${delta * spacing}px,0)`;
      visual.style.visibility = Math.abs(delta) < 1.5 ? "visible" : "hidden";
    });
    fill.style.transform = `scaleX(${(position + 1) / services.length})`;
  }
  const schedule = () => {
    if (!frame) frame = scope.requestAnimationFrame(update);
  };
  scope.on(window, "scroll", schedule, {
    passive: true,
  });
  scope.on(window, "resize", schedule);
  scope.on(desktop, "change", schedule);
  scope.on(reduced, "change", schedule);
  links.forEach((link, i) =>
    scope.on(link, "click", (event) => {
      if (!desktop.matches || reduced.matches) return;
      event.preventDefault();
      const top = scrollY + section.getBoundingClientRect().top;
      window.scrollTo({
        top:
          top +
          (i / (services.length - 1)) * (section.offsetHeight - innerHeight),
        behavior: "smooth",
      });
    }),
  );
  update();
  const video = document.querySelector("#dc-reel-video");
  const play = document.querySelector("#reel-play");
  const mute = document.querySelector("#reel-mute");
  const syncVideo = () => {
    play.textContent = video.paused ? "Play" : "Pause";
    play.setAttribute(
      "aria-label",
      `${video.paused ? "Play" : "Pause"} introduction video`,
    );
  };
  if (reduced.matches) video.pause();
  else video.play().catch(syncVideo);
  scope.cleanup(() => video.pause());
  scope.on(reduced, "change", () => {
    if (reduced.matches) video.pause();
  });
  scope.on(video, "play", syncVideo);
  scope.on(video, "pause", syncVideo);
  scope.on(play, "click", () => {
    if (video.paused) video.play().catch(syncVideo);
    else video.pause();
  });
  scope.on(mute, "click", () => {
    video.muted = !video.muted;
    mute.textContent = video.muted ? "Sound off" : "Sound on";
    mute.setAttribute(
      "aria-label",
      `${video.muted ? "Unmute" : "Mute"} introduction video`,
    );
    mute.setAttribute("aria-pressed", String(!video.muted));
  });
  syncVideo();
  const reveal = scope.observe(
    IntersectionObserver,
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("dc-visible");
          reveal.unobserve(entry.target);
        }
      }),
    {
      threshold: 0.08,
    },
  );
  document
    .querySelectorAll(".dc-work-item,.dc-principles article")
    .forEach((el) => {
      el.classList.add("dc-reveal");
      reveal.observe(el);
    });
}
