const tirumalasettyWork = [
  {
    src: "/assets/postors/tg.png",
    alt: "Tirumalasetty Projects LLP creative work - TG artwork",
  },
  {
    src: "/assets/postors/ts1.jpg",
    alt: "Tirumalasetty Projects LLP creative work - TS1 artwork",
  },
  {
    src: "/assets/postors/ts2.jpg",
    alt: "Tirumalasetty Projects LLP creative work - TS2 artwork",
  },
];
export function initSite(scope, usesEditorialTheme) {
  const scrollToCurrentHash = () => {
    if (!location.hash) return;
    scope.requestAnimationFrame(() => {
      const target = document.getElementById(
        decodeURIComponent(location.hash.slice(1)),
      );
      // The department explorer owns its hash navigation and tab selection.
      if (target?.matches(".department-tabs [role='tab']")) return;
      if (target)
        target.scrollIntoView({
          block: "start",
        });
    });
  };
  scrollToCurrentHash();
  scope.on(window, "load", () => scope.setTimeout(scrollToCurrentHash, 80));
  const reveal = scope.observe(
    IntersectionObserver,
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          reveal.unobserve(entry.target);
        }
      }),
    {
      threshold: 0.12,
    },
  );
  document
    .querySelectorAll("body:not(.home-page) main section, .project, .layer")
    .forEach((el) => {
      el.classList.add("reveal");
      reveal.observe(el);
    });
  const adhithyaHero = document.querySelector(".adhithya-hero");
  if (adhithyaHero) {
    const video = adhithyaHero.querySelector("video");
    const toggle = adhithyaHero.querySelector(".adhithya-video-toggle");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setPaused = (paused) => {
      if (paused) video.pause();
      else video.play().catch(() => {});
      toggle.textContent = paused ? "Play" : "Pause";
      toggle.setAttribute("aria-pressed", String(paused));
      toggle.setAttribute(
        "aria-label",
        `${paused ? "Play" : "Pause"} hero video`,
      );
    };
    scope.on(toggle, "click", () => setPaused(!video.paused));
    setPaused(motionQuery.matches);
    scope.cleanup(() => video.pause());
    scope.on(motionQuery, "change", (event) => setPaused(event.matches));
  }
  const featuredCarousel = document.querySelector(".featured-media-carousel");
  if (featuredCarousel) {
    const slides = [
      ...featuredCarousel.querySelectorAll(".featured-media-slide"),
    ];
    const status = featuredCarousel.querySelector(".featured-media-status");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let activeFeatured = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    const setFeaturedVideos = () => {
      const carouselRect = featuredCarousel.getBoundingClientRect();
      const visibleHeight =
        Math.min(carouselRect.bottom, window.innerHeight) -
        Math.max(carouselRect.top, 0);
      const carouselVisible =
        Math.max(0, visibleHeight) / Math.max(1, carouselRect.height) > 0.18;
      slides.forEach((slide, index) => {
        slide.querySelectorAll("video").forEach((video) => {
          if (
            index === activeFeatured &&
            carouselVisible &&
            !motionQuery.matches
          ) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      });
    };
    const showFeatured = (nextIndex) => {
      activeFeatured = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, index) => {
        const active = index === activeFeatured;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
      });
      status.textContent = `${activeFeatured + 1} of ${slides.length}`;
      setFeaturedVideos();
    };
    scope.on(
      featuredCarousel.querySelector(".featured-media-arrow--prev"),
      "click",
      () => showFeatured(activeFeatured - 1),
    );
    scope.on(
      featuredCarousel.querySelector(".featured-media-arrow--next"),
      "click",
      () => showFeatured(activeFeatured + 1),
    );
    scope.on(featuredCarousel, "keydown", (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      showFeatured(activeFeatured + (event.key === "ArrowRight" ? 1 : -1));
    });
    scope.on(
      featuredCarousel,
      "touchstart",
      (event) => {
        const touch = event.changedTouches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
      },
      {
        passive: true,
      },
    );
    scope.on(
      featuredCarousel,
      "touchend",
      (event) => {
        const touch = event.changedTouches[0];
        const dx = touch.clientX - touchStartX;
        const dy = touch.clientY - touchStartY;
        if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy))
          showFeatured(activeFeatured + (dx < 0 ? 1 : -1));
      },
      {
        passive: true,
      },
    );
    featuredCarousel
      .querySelectorAll(".featured-media-mute")
      .forEach((button) => {
        const video = button
          .closest(".featured-media-card")
          .querySelector("video");
        scope.on(button, "click", () => {
          video.muted = !video.muted;
          button.textContent = video.muted ? "Muted" : "Sound on";
          button.setAttribute("aria-pressed", String(video.muted));
          button.setAttribute(
            "aria-label",
            `${video.muted ? "Unmute" : "Mute"} featured video`,
          );
          if (!video.paused) video.play().catch(() => {});
        });
      });
    scope.on(motionQuery, "change", setFeaturedVideos);
    scope.on(window, "scroll", setFeaturedVideos, {
      passive: true,
    });
    scope.on(window, "resize", setFeaturedVideos);
    setFeaturedVideos();
  }
  const tiruWork = document.querySelector(".tirumalasetty-work");
  if (tiruWork) {
    const panels = [...tiruWork.querySelectorAll(".tirumalasetty-panel")];
    const dots = [...tiruWork.querySelectorAll("[data-tiru-dot]")];
    const count = tiruWork.querySelector(".tiru-count");
    const lightbox = tiruWork.querySelector(".tiru-lightbox");
    const lightboxImg = lightbox.querySelector("img");
    let activeTiru = 0;
    let lastFocus = null;
    let touchStartX = 0;
    let touchStartY = 0;
    let autoTiru = null;
    let tiruPaused = false;
    let tiruVisible = false;
    const autoplayToggle = tiruWork.querySelector(".tiru-toggle");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setTiru = (index) => {
      activeTiru = (index + panels.length) % panels.length;
      panels.forEach((panel, panelIndex) => {
        const offset =
          (panelIndex - activeTiru + panels.length) % panels.length;
        panel.dataset.position =
          offset === 0 ? "active" : offset === 1 ? "next" : "prev";
        panel.setAttribute("aria-pressed", String(panelIndex === activeTiru));
      });
      dots.forEach((dot, dotIndex) => {
        if (dotIndex === activeTiru) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
      count.textContent = `${String(activeTiru + 1).padStart(2, "0")} / ${String(panels.length).padStart(2, "0")}`;
      lightboxImg.src = tirumalasettyWork[activeTiru].src;
      lightboxImg.alt = tirumalasettyWork[activeTiru].alt;
    };
    const stopTiruAuto = () => {
      if (autoTiru) scope.clearInterval(autoTiru);
      autoTiru = null;
    };
    const startTiruAuto = () => {
      stopTiruAuto();
      if (motionQuery.matches || tiruPaused || !tiruVisible || document.hidden)
        return;
      autoTiru = scope.setInterval(() => {
        if (!lightbox.hidden) return;
        setTiru(activeTiru + 1);
      }, 2200);
    };
    const openTiruLightbox = (index, trigger) => {
      lastFocus = trigger;
      stopTiruAuto();
      setTiru(index);
      lightbox.hidden = false;
      document.body.classList.add("lightbox-open");
      lightbox.querySelector(".tiru-lightbox-close").focus();
    };
    const closeTiruLightbox = () => {
      lightbox.hidden = true;
      document.body.classList.remove("lightbox-open");
      if (lastFocus) lastFocus.focus();
      startTiruAuto();
    };
    scope.on(tiruWork.querySelector(".tiru-prev"), "click", () =>
      setTiru(activeTiru - 1),
    );
    scope.on(tiruWork.querySelector(".tiru-next"), "click", () =>
      setTiru(activeTiru + 1),
    );
    dots.forEach((dot) =>
      scope.on(dot, "click", () => setTiru(Number(dot.dataset.tiruDot))),
    );
    panels.forEach((panel) =>
      scope.on(panel, "click", () =>
        openTiruLightbox(Number(panel.dataset.tiruPanel), panel),
      ),
    );
    scope.on(tiruWork, "keydown", (event) => {
      if (!lightbox.hidden) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setTiru(activeTiru + 1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setTiru(activeTiru - 1);
      }
    });
    scope.on(
      tiruWork,
      "touchstart",
      (event) => {
        stopTiruAuto();
        const touch = event.changedTouches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
      },
      {
        passive: true,
      },
    );
    scope.on(
      tiruWork,
      "touchend",
      (event) => {
        const touch = event.changedTouches[0];
        const dx = touch.clientX - touchStartX;
        const dy = touch.clientY - touchStartY;
        if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy))
          setTiru(activeTiru + (dx < 0 ? 1 : -1));
        startTiruAuto();
      },
      {
        passive: true,
      },
    );
    scope.on(
      lightbox.querySelector(".tiru-lightbox-close"),
      "click",
      closeTiruLightbox,
    );
    scope.on(lightbox.querySelector(".tiru-lightbox-prev"), "click", () =>
      setTiru(activeTiru - 1),
    );
    scope.on(lightbox.querySelector(".tiru-lightbox-next"), "click", () =>
      setTiru(activeTiru + 1),
    );
    scope.on(lightbox, "click", (event) => {
      if (event.target === lightbox) closeTiruLightbox();
    });
    scope.on(document, "keydown", (event) => {
      if (lightbox.hidden) return;
      if (event.key === "Escape") closeTiruLightbox();
      if (event.key === "ArrowRight") setTiru(activeTiru + 1);
      if (event.key === "ArrowLeft") setTiru(activeTiru - 1);
      if (event.key === "Tab") {
        const focusable = [...lightbox.querySelectorAll("button")];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
    scope.on(motionQuery, "change", startTiruAuto);
    scope.on(autoplayToggle, "click", () => {
      tiruPaused = !tiruPaused;
      autoplayToggle.textContent = tiruPaused ? "Play" : "Pause";
      autoplayToggle.setAttribute("aria-pressed", String(tiruPaused));
      startTiruAuto();
    });
    const artworkVisibility = scope.observe(IntersectionObserver, (entries) => {
      tiruVisible = entries[0].isIntersecting;
      startTiruAuto();
    });
    artworkVisibility.observe(tiruWork);
    scope.on(document, "visibilitychange", startTiruAuto);
    setTiru(0);
    startTiruAuto();
  }
  const siteHeader = document.querySelector(".site-header");
  const updateHeader = () =>
    siteHeader.classList.toggle("site-header--scrolled", window.scrollY > 24);
  updateHeader();
  scope.on(window, "scroll", updateHeader, {
    passive: true,
  });
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (!reducedMotion && finePointer) {
    const aura = document.createElement("div");
    aura.className = "pointer-aura";
    document.body.append(aura);
    scope.cleanup(() => aura.remove());
    const cursorDot = document.createElement("div");
    const cursorRing = document.createElement("div");
    cursorDot.className = "smooth-cursor smooth-cursor--dot";
    cursorRing.className = "smooth-cursor smooth-cursor--ring";
    document.body.append(cursorDot, cursorRing);
    scope.cleanup(() => {
      cursorDot.remove();
      cursorRing.remove();
    });
    let targetX = -40;
    let targetY = -40;
    let ringX = -40;
    let ringY = -40;
    const animateCursor = () => {
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      cursorDot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      scope.requestAnimationFrame(animateCursor);
    };
    animateCursor();
    scope.on(
      window,
      "pointermove",
      (event) => {
        targetX = event.clientX;
        targetY = event.clientY;
        aura.style.setProperty("--pointer-x", `${event.clientX}px`);
        aura.style.setProperty("--pointer-y", `${event.clientY}px`);
        aura.classList.add("pointer-aura--visible");
        cursorDot.classList.add("smooth-cursor--visible");
        cursorRing.classList.add("smooth-cursor--visible");
      },
      {
        passive: true,
      },
    );
    scope.on(document, "pointerover", (event) => {
      const interactive = event.target.closest('a, button, [tabindex="0"]');
      cursorRing.classList.toggle(
        "smooth-cursor--interactive",
        Boolean(interactive),
      );
    });
    scope.on(document, "pointerleave", () => {
      cursorDot.classList.remove("smooth-cursor--visible");
      cursorRing.classList.remove("smooth-cursor--visible");
    });
    document
      .querySelectorAll(".button, .nav-cta, .story-controls button")
      .forEach((control) => {
        scope.on(control, "pointermove", (event) => {
          const rect = control.getBoundingClientRect();
          control.style.setProperty(
            "--magnetic-x",
            `${(event.clientX - rect.left - rect.width / 2) * 0.12}px`,
          );
          control.style.setProperty(
            "--magnetic-y",
            `${(event.clientY - rect.top - rect.height / 2) * 0.12}px`,
          );
        });
        scope.on(control, "pointerleave", () => {
          control.style.setProperty("--magnetic-x", "0px");
          control.style.setProperty("--magnetic-y", "0px");
        });
      });
    document.querySelectorAll(".story-panel, .project").forEach((card) => {
      scope.on(card, "pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--tilt-x", `${(-y * 1.4).toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${(x * 1.4).toFixed(2)}deg`);
        card.style.setProperty("--glow-x", `${((x + 0.5) * 100).toFixed(1)}%`);
        card.style.setProperty("--glow-y", `${((y + 0.5) * 100).toFixed(1)}%`);
      });
      scope.on(card, "pointerleave", () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      });
    });
  }
}
