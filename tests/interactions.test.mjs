import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
import { createServer } from "vite";
import { createElement, StrictMode, act } from "react";

// Component tests, not a substitute for real-browser visual verification.
const dom = new JSDOM(
  '<!doctype html><html><body><div id="app"></div></body></html>',
  { url: "http://localhost:4173/", pretendToBeVisual: true },
);
const { window } = dom;
Object.assign(globalThis, {
  window,
  document: window.document,
  location: window.location,
  HTMLElement: window.HTMLElement,
  Element: window.Element,
  IS_REACT_ACT_ENVIRONMENT: true,
  innerHeight: 800,
  innerWidth: 1200,
  scrollY: 0,
});
const queries = new Map();
const matchMedia = (query) => {
  if (!queries.has(query)) {
    const target = new window.EventTarget();
    Object.assign(target, {
      media: query,
      matches: !query.includes("reduced-motion"),
    });
    queries.set(query, target);
  }
  return queries.get(query);
};
globalThis.matchMedia = window.matchMedia = matchMedia;
const observers = new Set();
class Observer {
  constructor(callback) {
    this.callback = callback;
    observers.add(this);
  }
  observe() {}
  unobserve() {}
  disconnect() {
    observers.delete(this);
  }
}
globalThis.IntersectionObserver = window.IntersectionObserver = Observer;
globalThis.ResizeObserver = window.ResizeObserver = Observer;
globalThis.requestAnimationFrame = window.requestAnimationFrame.bind(window);
globalThis.cancelAnimationFrame = window.cancelAnimationFrame.bind(window);
Object.defineProperty(document, "fonts", {
  value: { ready: Promise.resolve() },
});
window.Element.prototype.scrollIntoView = function () {};
window.Element.prototype.scrollBy = function () {};
window.scrollTo = () => {};
window.SVGElement.prototype.pauseAnimations = function () {};
window.SVGElement.prototype.unpauseAnimations = function () {};
const playing = new WeakSet();
Object.defineProperty(window.HTMLMediaElement.prototype, "paused", {
  get() {
    return !playing.has(this);
  },
});
window.HTMLMediaElement.prototype.play = function () {
  if (!playing.has(this)) {
    playing.add(this);
    this.dispatchEvent(new window.Event("play"));
  }
  return Promise.resolve();
};
window.HTMLMediaElement.prototype.pause = function () {
  if (playing.has(this)) {
    playing.delete(this);
    this.dispatchEvent(new window.Event("pause"));
  }
};
window.HTMLMediaElement.prototype.load = function () {};
let vite, App, root, createRoot;
before(async () => {
  ({ createRoot } = await import("react-dom/client"));
  vite = await createServer({
    server: { middlewareMode: true, hmr: false },
    appType: "custom",
  });
  App = (await vite.ssrLoadModule("/src/App.jsx")).default;
});
after(async () => {
  await act(async () => root?.unmount());
  await vite?.close();
  window.close();
});
const mount = async (path) => {
  if (root) await act(async () => root.unmount());
  document.body.className =
    path === "/" || path === "/services" ? "home-page" : "";
  queries.forEach(
    (query) => (query.matches = !query.media.includes("reduced-motion")),
  );
  root = createRoot(document.getElementById("app"));
  await act(async () => {
    root.render(createElement(StrictMode, null, createElement(App, { path })));
  });
};
const click = async (selector) => {
  const element = document.querySelector(selector);
  assert.ok(element, selector);
  await act(async () =>
    element.dispatchEvent(new window.MouseEvent("click", { bubbles: true })),
  );
};
const press = async (element, key, shiftKey = false) => {
  await act(async () =>
    element.dispatchEvent(
      new window.KeyboardEvent("keydown", { key, shiftKey, bubbles: true }),
    ),
  );
};

test("All 14 service branches open accessible detail popups", async () => {
  await mount("/services");
  assert.equal(document.querySelectorAll(".service-node").length, 14);
  assert.equal(document.querySelector("#service-directory"), null);
  for (let index = 0; index < 14; index++) {
    await click(`[data-beam-node="${index}"]`);
    assert.equal(
      document.querySelectorAll('.service-node[aria-pressed="true"]').length,
      1,
    );
    assert.equal(
      document.querySelector('[aria-pressed="true"].service-node').dataset
        .beamNode,
      String(index),
    );
    const dialog = document.querySelector('[role="dialog"]');
    assert.ok(dialog);
    assert.equal(dialog.getAttribute("aria-modal"), "true");
    assert.equal(dialog.querySelectorAll("li").length, 3);
    assert.ok(
      decodeURIComponent(
        dialog.querySelector(".service-dialog__cta").href,
      ).includes(dialog.querySelector("h2").textContent),
    );
    assert.equal(
      document.querySelectorAll(".service-beams g").length,
      14,
      "StrictMode must not duplicate SVG beams",
    );
    await press(document, "Escape");
    assert.equal(document.querySelector('[role="dialog"]'), null);
  }
  await click(".beam-motion-toggle");
  assert.equal(
    document.querySelector(".beam-motion-toggle").textContent,
    "Play animation",
  );
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  await act(async () => {
    reduced.matches = true;
    reduced.dispatchEvent(new window.Event("change"));
  });
  assert.ok(document.querySelector(".beam-motion-toggle").disabled);
  assert.equal(document.querySelectorAll(".service-beams animate").length, 0);
});

test("Two departments keep complete capabilities, comparisons and keyboard selection", async () => {
  window.history.replaceState(null, "", "/services/");
  await mount("/services");
  const departmentTabs = document.querySelectorAll(
    '.department-tabs [role="tab"]',
  );
  assert.equal(departmentTabs.length, 2);
  assert.equal(
    document.querySelector(".capability-branches"),
    null,
    "capability cards should not have decorative branch paths behind them",
  );
  assert.deepEqual(
    [...departmentTabs].map((node) => node.querySelector("strong").textContent),
    ["IT Department", "Digital Marketing"],
  );
  assert.ok(!document.querySelector("main").textContent.includes("Finance"));
  for (const [id, count] of [
    ["it", 6],
    ["digital", 14],
  ]) {
    await click(`#department-${id}`);
    const buttons = document.querySelectorAll(
      ".capability-wheel button.capability-flip-card",
    );
    assert.equal(buttons.length, count);
    const front = buttons[0].querySelector(".capability-flip-card__front");
    assert.equal(front.querySelectorAll("strong").length, 1);
    assert.equal(
      front.querySelectorAll("small, p").length,
      0,
      "Capability fronts show only the bold heading; detail stays on the reverse",
    );
    assert.ok(front.querySelector('img[aria-hidden="true"]'));
    const wheelStage = document.querySelector(".capability-wheel__stage");
    assert.ok(wheelStage);
    assert.equal(
      document.querySelectorAll(".capability-wheel__index button").length,
      count,
      "The wheel index exposes every capability in the selected department",
    );
    assert.equal(
      document.querySelectorAll("#capability-choice option").length,
      count,
    );
    const downScroll = new window.WheelEvent("wheel", {
      deltaY: 160,
      bubbles: true,
      cancelable: true,
    });
    wheelStage.dispatchEvent(downScroll);
    assert.equal(
      downScroll.defaultPrevented,
      true,
      "Downward page scrolling stays locked while the capability wheel is in motion",
    );
    const lastWheelItem = document.querySelector(
      ".capability-wheel__index button:last-child",
    );
    await act(async () => lastWheelItem.click());
    assert.equal(
      document.querySelector(".capability-detail__heading h3").textContent,
      lastWheelItem.textContent,
      "Wheel index selection updates the matching capability detail",
    );
    const reactiveCard = buttons[0];
    reactiveCard.getBoundingClientRect = () => ({
      left: 0,
      top: 0,
      width: 100,
      height: 100,
    });
    await act(async () =>
      reactiveCard.dispatchEvent(
        new window.MouseEvent("pointermove", {
          bubbles: true,
          clientX: 80,
          clientY: 25,
        }),
      ),
    );
    assert.equal(reactiveCard.style.getPropertyValue("--spot-x"), "80%");
    assert.equal(reactiveCard.style.getPropertyValue("--spot-y"), "25%");
    for (const button of buttons) {
      await act(async () => button.click());
      assert.equal(document.querySelectorAll(".capability-scope li").length, 3);
      assert.equal(document.querySelectorAll(".implementation li").length, 3);
      assert.equal(document.querySelectorAll(".comparison-step").length, 6);
      assert.equal(document.querySelector('input[type="range"]').value, "50");
      assert.match(
        document.querySelector(".comparison-disclaimer").textContent,
        /Illustrative workflow/,
      );
      assert.ok(
        decodeURIComponent(
          document.querySelector(".capability-scope a").href,
        ).includes(document.querySelector(".capability-detail h3").textContent),
      );
      await click(".comparison-controls button:last-child");
      assert.equal(document.querySelector('input[type="range"]').value, "0");
      assert.equal(
        document
          .querySelector(".comparison-canvas")
          .style.getPropertyValue("--split"),
        "0%",
      );
      await click(".comparison-controls button:first-of-type");
      assert.equal(document.querySelector('input[type="range"]').value, "100");
      assert.match(
        document
          .querySelector('input[type="range"]')
          .getAttribute("aria-valuetext"),
        /100 percent before/,
      );
    }
  }
  await press(document.querySelector("#department-digital"), "ArrowRight");
  assert.equal(document.activeElement.id, "department-it");
  assert.equal(location.hash, "#department-it");
  await press(document.activeElement, "End");
  assert.equal(document.activeElement.id, "department-digital");
  const canvas = document.querySelector(".comparison-canvas");
  canvas.getBoundingClientRect = () => ({ left: 0, width: 400 });
  await act(async () =>
    canvas.dispatchEvent(
      new window.MouseEvent("pointerdown", {
        bubbles: true,
        button: 0,
        clientX: 100,
      }),
    ),
  );
  assert.equal(document.querySelector('input[type="range"]').value, "25");
  await act(async () => {
    const select = document.querySelector("#capability-choice");
    select.value = "4";
    select.dispatchEvent(new window.Event("change", { bubbles: true }));
  });
  assert.equal(
    document.querySelector(".capability-detail h3").textContent,
    "Meta Ads",
  );
  assert.equal(document.querySelector('input[type="range"]').value, "50");
  window.history.replaceState(null, "", "/");
});

test("Campaign trail and expandable gallery follow the live client artwork", async () => {
  window.history.replaceState(null, "", "/services/");
  await mount("/services");
  const trail = document.querySelector(".digital-marketing-trail");
  assert.ok(trail);
  trail.getBoundingClientRect = () => ({
    left: 0,
    top: 0,
    width: 600,
    height: 300,
  });
  await act(async () => {
    trail.dispatchEvent(
      new window.MouseEvent("pointermove", {
        bubbles: true,
        clientX: 20,
        clientY: 20,
      }),
    );
    trail.dispatchEvent(
      new window.MouseEvent("pointermove", {
        bubbles: true,
        clientX: 130,
        clientY: 40,
      }),
    );
  });
  assert.equal(
    document.querySelectorAll(".digital-marketing-trail__image").length,
    1,
  );
  const campaignCards = document.querySelectorAll(
    ".digital-campaign-gallery__card",
  );
  assert.equal(campaignCards.length, 8);
  assert.ok(document.querySelector(".services-heading__accent"));
  assert.ok(
    document
      .querySelector(".site-showcase")
      .compareDocumentPosition(
        document.querySelector(".digital-marketing-showcase"),
      ) & window.Node.DOCUMENT_POSITION_FOLLOWING,
    "the campaign gallery follows the website previews",
  );
  assert.match(campaignCards[0].querySelector("img").src, /\/assets\//);
  await act(async () => campaignCards[5].click());
  assert.equal(campaignCards[5].getAttribute("aria-pressed"), "true");
  assert.equal(campaignCards[0].getAttribute("aria-pressed"), "false");
  window.history.replaceState(null, "", "/");
});

test("Department deep links restore the selected panel", async () => {
  window.history.replaceState(null, "", "/services/#department-digital");
  await mount("/services");
  assert.equal(
    document.querySelector("#department-digital").getAttribute("aria-selected"),
    "true",
  );
  assert.equal(
    document.querySelector(".capability-detail h3").textContent,
    "Search Engine Optimization",
  );
  await act(async () => {
    window.history.replaceState(null, "", "/services/#department-it");
    window.dispatchEvent(new window.HashChangeEvent("hashchange"));
  });
  assert.equal(
    document.querySelector("#department-it").getAttribute("aria-selected"),
    "true",
  );
  window.history.replaceState(null, "", "/");
});

test("Navigation uses React state and Escape restores focus", async () => {
  await mount("/about");
  await click(".menu");
  assert.ok(document.body.classList.contains("nav-open"));
  assert.equal(
    document.querySelector(".menu").getAttribute("aria-expanded"),
    "true",
  );
  await press(document, "Escape");
  assert.equal(
    document.querySelector(".menu").getAttribute("aria-expanded"),
    "false",
  );
  assert.equal(document.activeElement, document.querySelector(".menu"));
  await click(".menu");
  const cta = document.querySelector(".nav-cta");
  cta.addEventListener("click", (event) => event.preventDefault(), {
    once: true,
  });
  await act(async () =>
    cta.dispatchEvent(
      new window.MouseEvent("click", { bubbles: true, cancelable: true }),
    ),
  );
  assert.ok(!document.body.classList.contains("nav-open"));
  assert.equal(
    document.querySelector(".menu").getAttribute("aria-expanded"),
    "false",
  );
});

test("Home presents the logo story, four linked frames and unchanged studio controls", async () => {
  await mount("/");
  assert.equal(document.querySelectorAll("[data-logo-scene]").length, 6);
  assert.equal(document.querySelector(".dc-showcase"), null);
  assert.deepEqual(
    [...document.querySelectorAll(".logo-specimen__service-links a")].map((a) =>
      a.textContent.replace("↗", ""),
    ),
    ["IT Department", "Digital Marketing"],
  );
  assert.equal(document.querySelectorAll("[data-work-frame]").length, 4);
  const frames = [...document.querySelectorAll("[data-work-frame]")];
  assert.equal(
    frames.filter((a) => a.getAttribute("href") === "/clients/#client-brands")
      .length,
    4,
  );
  assert.deepEqual(
    frames.filter((a) => a.target === "_blank").map((a) => a.href),
    [],
  );
  assert.equal(
    document.querySelectorAll(".logo-specimen__website iframe").length,
    0,
    "Website previews load when their scene is shown",
  );
  assert.equal(document.querySelectorAll(".dc-studio").length, 1);
  assert.equal(document.querySelectorAll(".studio-film video").length, 1);
  assert.equal(
    document.querySelector(".studio-website iframe").src,
    "https://dcreal-estate.vercel.app/",
  );
  assert.equal(document.querySelectorAll("[data-work-frame] img").length, 4);
  assert.ok(document.querySelector("footer"));
  await click(".studio-film [data-film-play]");
  assert.ok(!document.querySelector(".studio-film video").paused);
  await click(".studio-film [data-film-play]");
  assert.ok(document.querySelector(".studio-film video").paused);
  assert.equal(document.querySelector(".studio-film [data-film-sound]"), null);
  assert.ok(document.querySelector(".studio-film video").muted);
  await click("[data-studio-motion]");
  assert.equal(
    document.querySelector("[data-studio-motion]").getAttribute("aria-pressed"),
    "true",
    "The moving rail can still be paused independently",
  );
  await click("[data-studio-motion]");
  assert.equal(
    document.querySelector("[data-studio-motion]").getAttribute("aria-pressed"),
    "false",
  );
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  await act(async () => {
    reduced.matches = true;
    reduced.dispatchEvent(new window.Event("change"));
  });
  assert.equal(document.querySelector(".logo-specimen").dataset.static, "true");
  assert.equal(
    document.querySelectorAll(".logo-specimen__website iframe").length,
    0,
    "All four frames remain posters in static mode",
  );
  assert.ok(
    [...document.querySelectorAll("[data-logo-scene]")].every(
      (scene) => scene.getAttribute("aria-hidden") === "false" && !scene.inert,
    ),
  );
});

// jsdom has no native modal-dialog implementation; the browser checks cover
// focus containment while this shim exercises input and scroll-lock cleanup.
async function withEntranceDialog(run) {
  const prototype = window.HTMLDialogElement.prototype;
  const showModal = prototype.showModal;
  const close = prototype.close;
  prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  prototype.close = function () {
    this.removeAttribute("open");
  };
  try {
    await run();
  } finally {
    await act(async () => root?.unmount());
    root = null;
    if (showModal) prototype.showModal = showModal;
    else delete prototype.showModal;
    if (close) prototype.close = close;
    else delete prototype.close;
    window.history.replaceState(null, "", "/");
  }
}

test("Homepage doors scrub both ways, reveal the live page and release scrolling", async () => {
  await withEntranceDialog(async () => {
    await mount("/");
    const dialog = document.querySelector(".home-entrance__dialog");
    assert.ok(dialog.open);
    assert.equal(document.body.style.position, "fixed");
    assert.equal(document.documentElement.style.overflow, "hidden");
    assert.equal(dialog.querySelectorAll(".home-entrance__door").length, 2);
    const wheel = async (deltaY) => {
      const event = new window.WheelEvent("wheel", {
        deltaY,
        bubbles: true,
        cancelable: true,
      });
      await act(async () => {
        dialog.dispatchEvent(event);
        await new Promise((resolve) => setTimeout(resolve, 400));
      });
      assert.ok(event.defaultPrevented);
    };
    await wheel(600);
    const before = Number(
      dialog
        .querySelector('[role="progressbar"]')
        .getAttribute("aria-valuenow"),
    );
    assert.ok(before > 25 && before < 45);
    await wheel(-300);
    assert.ok(
      Number(
        dialog
          .querySelector('[role="progressbar"]')
          .getAttribute("aria-valuenow"),
      ) < before,
    );
    await wheel(1500);
    await act(async () => new Promise((resolve) => setTimeout(resolve, 450)));
    assert.equal(document.querySelector(".home-entrance__dialog"), null);
    assert.equal(document.body.style.position, "");
    assert.equal(document.documentElement.style.overflow, "");
    assert.equal(document.activeElement.id, "hero-title");
    assert.ok(document.querySelector(".logo-specimen"));
    assert.equal(document.querySelector(".founder-hero__portrait"), null);
    assert.equal(
      document.querySelector(".home-entrance").dataset.active,
      undefined,
    );
  });
});

test("Skipping or unmounting the homepage doors restores existing body styles", async () => {
  document.body.style.position = "relative";
  document.body.style.overflow = "clip";
  try {
    await withEntranceDialog(async () => {
      await mount("/");
      await act(async () =>
        document
          .querySelector(".home-entrance__dialog")
          .dispatchEvent(new window.Event("cancel", { cancelable: true })),
      );
      assert.equal(document.querySelector(".home-entrance__dialog"), null);
      assert.equal(document.body.style.position, "relative");
      assert.equal(document.body.style.overflow, "clip");
      await mount("/");
      assert.equal(document.body.style.position, "fixed");
      await mount("/about");
      assert.equal(document.body.style.position, "relative");
      assert.equal(document.body.style.overflow, "clip");
      assert.equal(document.documentElement.style.overflow, "");
    });
  } finally {
    document.body.style.position = "";
    document.body.style.overflow = "";
  }
});

test("Homepage doors respect reduced motion and direct section links", async () => {
  await withEntranceDialog(async () => {
    await mount("/");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    // MediaQueryList's native change event supplies its new matches value.
    // The shim supplies that value explicitly for the entrance listener.
    await act(async () => {
      reduced.matches = true;
      const event = new window.Event("change");
      Object.defineProperty(event, "matches", { value: true });
      reduced.dispatchEvent(event);
    });
    assert.equal(document.querySelector(".home-entrance__dialog"), null);
    assert.equal(document.body.style.position, "");
    window.history.replaceState(null, "", "/#home-services");
    await mount("/");
    assert.equal(document.querySelector(".home-entrance__dialog"), null);
    assert.equal(document.body.style.position, "");
  });
});

test("Client campaigns, gallery keyboard wrapping and linked brand stories work", async () => {
  await mount("/clients");
  assert.equal(document.querySelector(".clients-project-cta"), null);
  assert.equal(document.querySelectorAll(".industry-tab[role=tab]").length, 7);
  for (const industry of [
    "real-estate",
    "healthcare",
    "fashion",
    "spiritual",
    "hospitality",
    "logistics",
    "education",
  ]) {
    const imagePath = `/assets/industry/theme-${industry}.jpeg`;
    const tab = document.querySelector(`#industry-tab-${industry}`);
    assert.ok(
      tab.style.getPropertyValue("--industry-theme-image").includes(imagePath),
      `${industry} has its themed image overlay`,
    );
    assert.ok(
      readFileSync(new URL(`../public${imagePath}`, import.meta.url)).length >
        0,
      `${industry} theme image exists`,
    );
  }
  assert.equal(
    document.querySelectorAll(".industry-panel[role=tabpanel]").length,
    7,
  );
  assert.equal(
    document.querySelectorAll(".industry-panel:not([hidden])").length,
    1,
  );
  assert.equal(
    document.querySelectorAll("#industry-panel-real-estate iframe").length,
    3,
    "The selected industry shows its live site previews",
  );
  await click("#industry-tab-healthcare");
  assert.equal(
    document
      .querySelector("#industry-tab-healthcare")
      .getAttribute("aria-selected"),
    "true",
  );
  assert.equal(
    document.querySelectorAll(".industry-panel:not([hidden])").length,
    1,
    "Only the chosen industry panel is visible",
  );
  assert.equal(
    document
      .querySelector("#industry-panel-healthcare iframe")
      .getAttribute("src"),
    "https://sanjeevi-digital-health-7vzs.vercel.app/",
  );
  await press(document.querySelector("#industry-tab-healthcare"), "ArrowLeft");
  assert.equal(
    document
      .querySelector("#industry-tab-real-estate")
      .getAttribute("aria-selected"),
    "true",
    "Arrow keys change the active industry tab",
  );
  await click(".industry-gallery-toggle");
  assert.equal(
    document
      .querySelector(".industry-gallery-toggle")
      .getAttribute("aria-pressed"),
    "true",
  );
  assert.equal(
    document.querySelectorAll(".clients-media-sequence:first-child img").length,
    51,
  );
  assert.equal(
    document.querySelector(".brand-carousel__card"),
    null,
    "The old stacked carousel is completely replaced",
  );
  assert.equal(
    document.querySelector(".molten-ring").dataset.renderer,
    "fallback",
    "Browsers without WebGL retain a usable linked-logo carousel",
  );
  assert.equal(
    document.querySelectorAll(".molten-ring__fallback-card[href]").length,
    10,
  );
  assert.equal(
    document
      .querySelector(".molten-ring__fallback-card img")
      .getAttribute("alt"),
    "Ganesh Constructions logo",
  );
  await click('[aria-label="Next brand"]');
  assert.equal(
    document.querySelector(".molten-ring__status").textContent.trim(),
    "02 / 10",
  );
  assert.equal(
    document.querySelector(".molten-ring__visit").getAttribute("href"),
    "/clients/tirumalasetty/",
  );
  await click('[aria-label="Previous brand"]');
  assert.equal(
    document.querySelector(".molten-ring__status").textContent.trim(),
    "01 / 10",
  );
  await press(document.querySelector(".molten-ring"), "ArrowUp");
  assert.equal(
    document.querySelector(".molten-ring__status").textContent.trim(),
    "10 / 10",
    "The supplied vertical-ring keyboard navigation wraps across every brand",
  );
  await click('[aria-label="Show Ganesh Constructions"]');
  assert.equal(
    document.querySelector(".molten-ring__visit").getAttribute("href"),
    "/clients/ganesh-constructions/",
  );
  for (const link of document.querySelectorAll(".molten-ring__fallback-card")) {
    assert.ok(link.getAttribute("href").startsWith("/clients/"));
    assert.ok(link.querySelector("img").getAttribute("alt"));
  }
  assert.equal(document.querySelectorAll(".featured-media-slide").length, 13);
  await click(".featured-media-arrow--next");
  assert.equal(
    document.querySelector(".featured-media-status").textContent,
    "2 of 13",
  );
  await press(document.querySelector(".featured-media-carousel"), "ArrowLeft");
  assert.equal(
    document.querySelector(".featured-media-status").textContent,
    "1 of 13",
  );
  await click(".featured-media-arrow--prev");
  assert.equal(
    document.querySelector(".featured-media-status").textContent,
    "13 of 13",
  );
  assert.equal(
    document.querySelectorAll(".featured-media-slide.is-active").length,
    1,
  );
  await click(".clients-toggle");
  assert.ok(
    document.querySelector(".clients-hero").classList.contains("is-paused"),
  );
});

test("Tirumalasetty media preview wraps, closes and restores focus", async () => {
  await withEntranceDialog(async () => {
    await mount("/clients/tirumalasetty");
    assert.equal(
      document
        .querySelector('.site-header a[href="/clients/"]')
        .getAttribute("aria-current"),
      "page",
    );
    const trigger = document.querySelector(".media-orbit__open");
    await click(".media-orbit__open");
    const dialog = document.querySelector(".client-media__lightbox");
    assert.ok(dialog.open);
    const firstSource = dialog.querySelector("img").src;
    await press(dialog, "ArrowLeft");
    assert.notEqual(dialog.querySelector("img").src, firstSource);
    await press(dialog, "ArrowRight");
    assert.equal(dialog.querySelector("img").src, firstSource);
    await act(async () =>
      dialog.dispatchEvent(new window.Event("cancel", { cancelable: true })),
    );
    assert.ok(!dialog.open);
    assert.equal(document.activeElement, trigger);
  });
});

test("Adhithya video controls work and route unmount cleans animation resources", async () => {
  await mount("/clients/adhithya-sai-promoters");
  await click(".adhithya-video-toggle");
  assert.ok(document.querySelector(".adhithya-hero video").paused);
  await click(".adhithya-video-toggle");
  assert.ok(!document.querySelector(".adhithya-hero video").paused);
  assert.equal(
    document.querySelectorAll(".inverted-cursor,.smooth-cursor,.pointer-aura")
      .length,
    0,
    "The site keeps the native pointer",
  );
  assert.doesNotMatch(
    readFileSync("public/assets/uniform.css", "utf8"),
    /cursor\s*:\s*none\s*;/,
    "Shared styles do not hide the native cursor",
  );
  await act(async () => root.unmount());
  root = null;
  assert.equal(
    document.querySelectorAll(".inverted-cursor,.smooth-cursor,.pointer-aura")
      .length,
    0,
  );
  assert.equal(observers.size, 0, "All observers disconnect on unmount");
  assert.ok(!document.body.classList.contains("nav-open"));
});

test("Service-branch brand case studies render from the Clients links", async () => {
  const brands = [
    ["/clients/ganesh-constructions", ".ganesh-case", "Ganesh Constructions"],
    ["/clients/spark", ".spark-case", "Spark"],
    ["/clients/sree-surya-infra", ".sree-surya-case", "Sree Surya"],
    ["/clients/sri-conventions", ".sri-conventions-case", "Sri Convention"],
    ["/clients/sri-parasakthi-peetam", ".parasakthi-case", "Sri Parasakthi"],
    [
      "/clients/sri-venkateswara-constructions",
      ".svc-case",
      "Sri Venkateswara",
    ],
    ["/clients/ssm-construction", ".ssm-case", "SSM Construction"],
    ["/clients/ubic", ".ubic-case", "UBIC"],
  ];

  for (const [path, selector, expectedText] of brands) {
    await mount(path);
    assert.ok(document.querySelector(selector), `${path} has its case layout`);
    assert.ok(
      document.querySelector(selector).textContent.includes(expectedText),
      `${path} contains its brand details`,
    );
    assert.ok(document.querySelector(".site-header"));
    assert.ok(document.querySelector(".dc-footer"));
  }
});

test("New uploads are matched to five client galleries and every client uses the shared footer", async () => {
  const media = JSON.parse(readFileSync("src/data/client-media.json", "utf8"));
  const expected = {
    "/clients/ganesh-constructions": [1, 1],
    "/clients/spark": [3, 0],
    "/clients/sri-venkateswara-constructions": [0, 1],
    "/clients/ssm-construction": [1, 3],
    "/clients/tirumalasetty": [3, 2],
  };
  for (const [path, counts] of Object.entries(expected)) {
    const items = media[path].items;
    assert.deepEqual(
      [
        items.filter((item) => item.type === "image").length,
        items.filter((item) => item.type === "video").length,
      ],
      counts,
    );
    for (const item of items) {
      for (const file of [item.src, item.thumbnail, item.poster].filter(
        Boolean,
      )) {
        assert.ok(
          readFileSync(`public${file}`).length > 100,
          `${path}: ${file} is present`,
        );
      }
    }
    await mount(path);
    assert.equal(document.querySelectorAll("#client-media").length, 1);
    assert.equal(
      document.querySelectorAll(".media-orbit__card").length,
      items.length +
        JSON.parse(
          readFileSync("src/data/client-gallery-existing.json", "utf8"),
        )[path].items.length,
    );
    assert.equal(document.querySelectorAll("footer.dc-footer").length, 1);
    assert.equal(
      document.querySelector(
        ".ganesh-cta,.ssm-cta,.parasakthi-cta,.tirumalasetty-footer-card",
      ),
      null,
    );
  }
  for (const path of [
    "/clients",
    "/clients/adhithya-sai-promoters",
    "/clients/adithya-sai-promoters",
    "/clients/sree-surya-infra",
    "/clients/sri-conventions",
    "/clients/sri-parasakthi-peetam",
    "/clients/ubic",
  ]) {
    await mount(path);
    assert.equal(document.querySelectorAll("footer.dc-footer").length, 1, path);
    assert.equal(
      document.querySelector(
        ".ganesh-cta,.ssm-cta,.parasakthi-cta,.tirumalasetty-footer-card",
      ),
      null,
    );
  }
});

test("Client cylinder keeps photo previews separate and honors reduced motion", async () => {
  await withEntranceDialog(async () => {
    await mount("/clients/ganesh-constructions");
    await click(".media-orbit__open");
    const dialog = document.querySelector(".client-media__lightbox");
    assert.ok(dialog.open);
    await click('[aria-label="Next media preview"]');
    assert.ok(dialog.querySelector("img"));
    assert.equal(
      dialog.querySelector("video"),
      null,
      "Photo navigation skips films",
    );
    await click('[aria-label="Close media preview"]');
    await click('[aria-label="Next photo or film"]');
    assert.equal(
      document
        .querySelectorAll(".media-orbit__card")[1]
        .getAttribute("aria-current"),
      "true",
    );
    assert.equal(
      document
        .querySelector(".media-orbit__motion")
        .getAttribute("aria-pressed"),
      "false",
    );
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    await act(async () => {
      reduced.matches = true;
      reduced.dispatchEvent(new window.Event("change"));
    });
    await press(document.querySelector(".media-orbit"), "ArrowLeft");
    assert.equal(
      document.querySelector(".media-orbit__card").getAttribute("aria-current"),
      "true",
    );
  });
});

test("Client films play inside their frame and stop on navigation or unmount", async () => {
  await mount("/clients/spark");
  assert.equal(document.querySelector(".media-orbit__stage video"), null);
  await click('.media-orbit__open[aria-label^="Play "]');
  const player = document.querySelector(".media-orbit__card video");
  assert.ok(player.controls);
  assert.ok(player.playsInline);
  assert.equal(player.preload, "metadata");
  assert.ok(!player.paused, "Selecting a film starts playback in the frame");
  assert.ok(player.muted);
  assert.equal(player.volume, 0);
  await act(async () => {
    player.muted = false;
    player.volume = 1;
    player.dispatchEvent(new window.Event("volumechange"));
  });
  assert.ok(player.muted, "Native controls cannot enable video sound");
  assert.equal(player.volume, 0);
  assert.equal(document.activeElement, player);
  assert.ok(!document.querySelector(".client-media__lightbox").open);
  assert.equal(document.querySelector(".client-media__lightbox video"), null);
  assert.equal(
    document.querySelector(".media-orbit__motion").getAttribute("aria-pressed"),
    "false",
  );

  const active = document.querySelector(
    '.media-orbit__card[aria-current="true"]',
  );
  await press(player, "ArrowRight");
  assert.equal(
    document.querySelector('.media-orbit__card[aria-current="true"]'),
    active,
    "Video seek keys do not navigate the carousel",
  );
  await click('.media-orbit__open[aria-label^="Play "]');
  const replacement = document.querySelector(".media-orbit__card video");
  assert.notEqual(replacement, player);
  assert.ok(player.paused, "Starting another film stops the previous one");
  assert.equal(
    document.querySelectorAll(".media-orbit__stage video").length,
    1,
  );
  await click('[aria-label="Next photo or film"]');
  assert.ok(replacement.paused);
  assert.equal(document.querySelector(".media-orbit__stage video"), null);

  await click('.media-orbit__open[aria-label^="Play "]');
  const lastPlayer = document.querySelector(".media-orbit__card video");
  await mount("/clients");
  assert.ok(lastPlayer.paused, "Leaving the client page stops playback");
});

test("Project enquiry keeps its fields and keyboard navigation with the smoke effect", async () => {
  await mount("/clients/ganesh-constructions");
  const opener = document.querySelector(".site-header [data-project-enquiry]");
  opener.focus();
  await click(".site-header [data-project-enquiry]");
  const dialog = document.querySelector(".project-enquiry-modal__dialog");
  assert.ok(dialog.querySelector('.smokey-background[aria-hidden="true"]'));
  assert.deepEqual(
    [...dialog.querySelectorAll("input,textarea")].map((field) => field.name),
    ["name", "phone", "email", "message"],
  );
  const name = dialog.querySelector('[name="name"]');
  assert.equal(name.closest("label").textContent, "Name");
  assert.equal(dialog.querySelector('[type="password"]'), null);
  const submit = dialog.querySelector('[type="submit"]');
  submit.focus();
  await press(submit, "Tab");
  assert.equal(document.activeElement, dialog.querySelector("a"));
  await press(document.activeElement, "Tab", true);
  assert.equal(document.activeElement, submit);
  await press(submit, "Escape");
  assert.equal(document.querySelector(".project-enquiry-modal"), null);
  assert.equal(document.activeElement, opener);
  assert.ok(!document.body.classList.contains("project-enquiry-open"));
});

test("Products navigation opens all imported concepts and returns to the catalogue", async () => {
  window.history.replaceState(null, "", "/products/");
  await mount("/products");
  const products = JSON.parse(readFileSync("src/data/products.json", "utf8"));
  const nav = [...document.querySelectorAll("#site-navigation a")].map(
    (a) => a.textContent,
  );
  assert.deepEqual(nav.slice(0, 4), [
    "Home",
    "Services",
    "Products",
    "Clients",
  ]);
  assert.equal(
    document
      .querySelector('.site-header a[href="/products/"]')
      .getAttribute("aria-current"),
    "page",
  );
  assert.equal(document.querySelectorAll(".product-card").length, 15);
  for (const product of products) {
    await act(async () => {
      window.history.replaceState(null, "", `/products/#${product.id}`);
      window.dispatchEvent(new window.HashChangeEvent("hashchange"));
    });
    assert.equal(document.querySelector("h1").textContent, product.name);
    assert.equal(document.querySelectorAll(".case-study").length, 1);
    for (const img of document.querySelectorAll(".products-detail img")) {
      assert.ok(readFileSync(`public${img.getAttribute("src")}`).length > 100);
    }
    assert.ok(document.querySelector("footer.dc-footer"));
  }
  await act(async () => {
    window.history.replaceState(null, "", "/products/#products");
    window.dispatchEvent(new window.HashChangeEvent("hashchange"));
  });
  assert.equal(document.querySelectorAll(".product-card").length, 15);
  window.history.replaceState(null, "", "/");
});

test("Imported chatbot sends prompts, renders replies safely and opens the project form", async () => {
  await mount("/clients/spark");
  const originalFetch = globalThis.fetch;
  const requests = [];
  globalThis.fetch = async (url, options) => {
    requests.push([url, JSON.parse(options.body)]);
    return {
      ok: true,
      json: async () => ({
        text: "## Our services\n- **Websites**\n- Digital marketing\n<script>alert(1)</script>",
      }),
    };
  };
  try {
    assert.ok(document.querySelector(".dealate-assistant__launcher svg"));
    await click(".dealate-assistant__launcher");
    await click(".dealate-assistant__prompts button:first-child");
    assert.equal(requests.length, 1);
    assert.equal(requests[0][0], "/api/dealate-assistant");
    assert.equal(requests[0][1].messages.at(-1).text, "Our services");
    assert.ok(requests[0][1].sessionId);
    assert.equal(
      document.querySelectorAll(".dealate-assistant__list li").length,
      2,
    );
    assert.equal(document.querySelector(".dealate-assistant script"), null);
    await press(document.querySelector(".dealate-assistant input"), "Escape");
    assert.equal(document.querySelector(".dealate-assistant__panel"), null);
    assert.equal(
      document.activeElement,
      document.querySelector(".dealate-assistant__launcher"),
    );
    await click(".dealate-assistant__launcher");
    await click(".dealate-assistant__prompts button:nth-child(2)");
    assert.ok(document.querySelector(".project-enquiry-modal"));
    assert.equal(document.querySelector(".dealate-assistant__panel"), null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
