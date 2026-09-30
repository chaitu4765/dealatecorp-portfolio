import { Fragment } from "react";
import { useAnimationEffect } from "../hooks/useAnimationEffect.js";
const film = (id, title, caption) => (
  <article className="studio-film" aria-label={title}>
    <div className="studio-film__heading">
      <span>Film &amp; production</span>
      <span>{title}</span>
    </div>
    <div className="studio-film__media">
      <video
        data-studio-video={id}
        data-src={"/assets/studio/" + id + "-film.mp4"}
        poster={"/assets/studio/" + id + "-poster.jpg"}
        muted
        loop
        playsInline
        preload="none"
        aria-label={title + " property film"}
      />
      <div className="studio-film__controls">
        <button
          type="button"
          data-film-play=""
          aria-label={"Play " + title + " film"}
        >
          Play
        </button>
        <button
          type="button"
          data-film-sound=""
          aria-label={"Unmute " + title + " film"}
          aria-pressed="false"
        >
          Sound off
        </button>
      </div>
    </div>
    <p>{caption}</p>
  </article>
);
export function Studio() {
  useAnimationEffect(initStudio);
  return (
    <section
      className="dc-studio"
      id="inside-dc"
      aria-labelledby="studio-title"
    >
      <div className="studio-heading dc-wrap">
        <p className="dc-eyebrow">03 / The creative perspective</p>
        <h2 id="studio-title">
          Creative thinking.
          <br />
          <span>Made visible.</span>
        </h2>
        <p>
          From the first conversation to the final frame. A look at the ideas,
          stories and craft behind DC Creative Labs.
        </p>
      </div>

      <div
        className="studio-rail"
        tabIndex="0"
        aria-label="Creative studio showcase. Scroll horizontally to explore."
        aria-describedby="studio-help"
      >
        <div className="studio-column studio-ethos">
          <p className="studio-kicker">Our ethos</p>
          <h3>
            Listen closely.
            <br />
            Think clearly.
            <br />
            Create with purpose.
          </h3>
          <div
            className="studio-ethos__diagram"
            aria-label="Strategy and creativity working together"
          >
            <span>Strategy</span>
            <span>Creativity</span>
          </div>
          <p>
            We start with your business and the people you want to reach. Then
            we bring the right ideas, design and channels together.
          </p>
          <a href="/about/">Inside DC Creative Labs</a>
        </div>

        <div className="studio-column studio-films">
          <>
            {film("surya", "Sri Surya", "A place to live. A story to tell.")}
            {film(
              "ssm",
              "SSM Developers",
              "Property stories, brought into focus.",
            )}
          </>
        </div>

        <div className="studio-column studio-campaigns">
          <figure>
            <img
              src="/assets/studio/denim-campaign.jpg"
              width="1080"
              height="1080"
              loading="lazy"
              alt="Denim fashion campaign with cream typography on black fabric"
            />
            <figcaption>Fashion / Campaign creative</figcaption>
          </figure>
          <figure>
            <img
              src="/assets/studio/hotel-campaign.jpg"
              width="1086"
              height="1086"
              loading="lazy"
              alt="Hotel campaign with a twilight building and the headline Where Comfort Meets Luxury"
            />
            <figcaption>Hospitality / Visual storytelling</figcaption>
          </figure>
        </div>

        <article className="studio-column studio-art">
          <p className="studio-kicker">Art direction</p>
          <img
            src="/assets/studio/jewellery-campaign.jpg"
            width="1122"
            height="1402"
            loading="lazy"
            alt="Jewellery campaign artwork by DC Creative Labs"
          />
          <div>
            <h3>
              Every detail
              <br />
              sets the tone.
            </h3>
            <p>
              Colour, composition and a point of view. Creative that gives a
              brand its own presence.
            </p>
          </div>
        </article>

        <div className="studio-column studio-method">
          <div className="studio-brand">
            <img
              src="/assets/icons/dc-logo.png"
              alt="DC Creative Labs"
              width="96"
              height="81"
            />
            <p>
              Creative strategies.
              <br />
              Digital growth.
            </p>
          </div>
          <article>
            <p className="studio-kicker">How we work</p>
            <ol>
              <li>
                <span>01</span>
                <div>
                  <h3>Understand</h3>
                  <p>Know the audience. Define the goal.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Create</h3>
                  <p>Give the strategy a distinctive voice.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Refine</h3>
                  <p>Learn from the response. Improve the next move.</p>
                </div>
              </li>
            </ol>
            <a href="/services/">Explore our services</a>
          </article>
        </div>
      </div>

      <div className="studio-toolbar dc-wrap">
        <p id="studio-help">
          Campaigns, films and a shared creative direction.
        </p>
        <div>
          <button
            type="button"
            data-studio-prev=""
            aria-label="Previous showcase cards"
          >
            Previous
          </button>
          <button type="button" data-studio-motion="" aria-pressed="false">
            Pause movement
          </button>
          <button
            type="button"
            data-studio-next=""
            aria-label="Next showcase cards"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
function initStudio(scope) {
  const section = document.querySelector(".dc-studio");
  if (!section) return;
  const rail = section.querySelector(".studio-rail");
  const toggle = section.querySelector("[data-studio-motion]");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const automatic = matchMedia("(min-width: 850px) and (hover: hover)");
  const videos = [...section.querySelectorAll("video")];
  scope.cleanup(() => videos.forEach((video) => video.pause()));
  const visibleVideos = new Set();
  let visible = false,
    paused = false,
    hover = false,
    focused = false,
    frame = 0,
    last = 0,
    direction = 1,
    position = 0,
    disposed = false;
  function stop() {
    scope.cancelAnimationFrame(frame);
    frame = 0;
    last = 0;
  }
  function tick(time) {
    const delta = last ? Math.min(time - last, 50) : 0;
    last = time;
    const end = rail.scrollWidth - rail.clientWidth;
    if (end > 0) {
      position = Math.max(
        0,
        Math.min(end, position + direction * delta * 0.027),
      );
      rail.scrollLeft = position;
      if (position >= end) direction = -1;
      if (position <= 0) direction = 1;
    }
    frame = scope.requestAnimationFrame(tick);
  }
  function sync() {
    stop();
    const canMove = automatic.matches && !reduced.matches;
    toggle.disabled = !canMove;
    toggle.textContent = reduced.matches
      ? "Reduced motion on"
      : !automatic.matches
        ? "Swipe to explore"
        : paused
          ? "Play movement"
          : "Pause movement";
    toggle.setAttribute("aria-pressed", String(paused));
    if (
      visible &&
      !paused &&
      !hover &&
      !focused &&
      canMove &&
      !document.hidden &&
      !disposed
    ) {
      position = rail.scrollLeft;
      frame = scope.requestAnimationFrame(tick);
    }
  }
  function load(video) {
    if (!video.getAttribute("src")) {
      video.src = video.dataset.src;
      video.load();
    }
  }
  function syncVideo(video) {
    const button = video.closest("article").querySelector("[data-film-play]");
    button.textContent = video.paused ? "Play" : "Pause";
    button.setAttribute(
      "aria-label",
      `${video.paused ? "Play" : "Pause"} ${video.getAttribute("aria-label")}`,
    );
  }
  function mediaState() {
    videos.forEach((video) => {
      if (!visibleVideos.has(video) || document.hidden) {
        video.pause();
        return;
      }
      if (!reduced.matches && video.dataset.userPaused !== "true") {
        load(video);
        video.play().catch(() => syncVideo(video));
      }
    });
  }
  const motion = () => {
    if (reduced.matches) videos.forEach((video) => video.pause());
    sync();
    mediaState();
  };
  const intersection = scope.observe(
    IntersectionObserver,
    (entries) => {
      visible = entries[0].isIntersecting;
      sync();
    },
    {
      threshold: 0,
    },
  );
  intersection.observe(section);
  const mediaObserver = scope.observe(
    IntersectionObserver,
    (entries) => {
      entries.forEach((entry) => {
        entry.isIntersecting
          ? visibleVideos.add(entry.target)
          : visibleVideos.delete(entry.target);
      });
      mediaState();
    },
    {
      threshold: 0.2,
    },
  );
  videos.forEach((video) => {
    mediaObserver.observe(video);
    const article = video.closest("article"),
      play = article.querySelector("[data-film-play]"),
      sound = article.querySelector("[data-film-sound]");
    scope.on(video, "play", () => syncVideo(video));
    scope.on(video, "pause", () => syncVideo(video));
    scope.on(play, "click", () => {
      if (video.paused) {
        video.dataset.userPaused = "false";
        load(video);
        video.play().catch(() => syncVideo(video));
      } else {
        video.dataset.userPaused = "true";
        video.pause();
      }
    });
    scope.on(sound, "click", () => {
      const muted = !video.muted;
      videos.forEach((other) => {
        other.muted = true;
        const b = other.closest("article").querySelector("[data-film-sound]");
        b.textContent = "Sound off";
        b.setAttribute("aria-pressed", "false");
        b.setAttribute(
          "aria-label",
          `Unmute ${other.getAttribute("aria-label")}`,
        );
      });
      video.muted = muted;
      sound.textContent = muted ? "Sound off" : "Sound on";
      sound.setAttribute("aria-pressed", String(!muted));
      sound.setAttribute(
        "aria-label",
        `${muted ? "Unmute" : "Mute"} ${video.getAttribute("aria-label")}`,
      );
      if (!muted) {
        paused = true;
        load(video);
        video.dataset.userPaused = "false";
        video.play().catch(() => syncVideo(video));
        sync();
      }
    });
  });
  scope.on(toggle, "click", () => {
    paused = !paused;
    sync();
  });
  scope.on(rail, "pointerenter", (event) => {
    if (event.pointerType === "mouse") {
      hover = true;
      sync();
    }
  });
  scope.on(rail, "pointerleave", () => {
    hover = false;
    sync();
  });
  scope.on(
    rail,
    "pointerdown",
    () => {
      paused = true;
      sync();
    },
    {
      passive: true,
    },
  );
  scope.on(
    rail,
    "wheel",
    () => {
      paused = true;
      sync();
    },
    {
      passive: true,
    },
  );
  scope.on(rail, "focusin", () => {
    focused = true;
    sync();
  });
  scope.on(rail, "focusout", (event) => {
    if (!rail.contains(event.relatedTarget)) {
      focused = false;
      sync();
    }
  });
  const move = (step) => {
    paused = true;
    sync();
    rail.scrollBy({
      left: step * Math.min(rail.clientWidth * 0.8, 640),
      behavior: reduced.matches ? "instant" : "smooth",
    });
  };
  scope.on(section.querySelector("[data-studio-prev]"), "click", () =>
    move(-1),
  );
  scope.on(section.querySelector("[data-studio-next]"), "click", () => move(1));
  const visibilityChange = () => {
    sync();
    mediaState();
  };
  scope.on(reduced, "change", motion);
  scope.on(automatic, "change", sync);
  scope.on(document, "visibilitychange", visibilityChange);
  scope.on(window, "pagehide", (event) => {
    stop();
    videos.forEach((video) => video.pause());
    if (event.persisted) return;
    disposed = true;
    intersection.disconnect();
    mediaObserver.disconnect();
    reduced.removeEventListener("change", motion);
    automatic.removeEventListener("change", sync);
    document.removeEventListener("visibilitychange", visibilityChange);
  });
  scope.on(window, "pageshow", () => {
    if (!disposed) {
      sync();
      mediaState();
    }
  });
  sync();
}
