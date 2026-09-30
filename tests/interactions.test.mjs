import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { createServer } from "vite";
import { createElement, StrictMode, act } from "react";
import { createRoot } from "react-dom/client";

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
let vite, App, root;
before(async () => {
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

test("All 14 services update React state, selected beam and enquiry target", async () => {
  await mount("/services");
  assert.equal(document.querySelectorAll(".service-node").length, 14);
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
    assert.equal(
      document
        .querySelector(".service-focus__number")
        .textContent.replace(/\s/g, ""),
      `${String(index + 1).padStart(2, "0")}/14`,
    );
    assert.equal(document.querySelectorAll(".service-focus li").length, 3);
    assert.ok(
      decodeURIComponent(
        document.querySelector(".service-focus__cta").href,
      ).includes(document.querySelector(".service-focus h3").textContent),
    );
    assert.equal(
      document.querySelectorAll(".service-beams g").length,
      14,
      "StrictMode must not duplicate SVG beams",
    );
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
      '.capability-nav [role="group"] button',
    );
    assert.equal(buttons.length, count);
    assert.equal(
      document.querySelectorAll("#capability-choice option").length,
      count,
    );
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

test("Home keeps all logos, studio cards, working video and pause controls", async () => {
  await mount("/");
  assert.equal(document.querySelectorAll(".dc-client-card").length, 10);
  assert.equal(document.querySelectorAll(".dc-studio").length, 1);
  assert.equal(document.querySelectorAll(".studio-film video").length, 2);
  assert.equal(document.querySelectorAll(".dc-service-detail").length, 8);
  await click("#reel-play");
  assert.ok(document.querySelector("#dc-reel-video").paused);
  await click("#reel-play");
  assert.ok(!document.querySelector("#dc-reel-video").paused);
  await click("#reel-mute");
  assert.equal(document.querySelector("#reel-mute").textContent, "Sound on");
  await click(".dc-client-motion");
  assert.ok(
    document.querySelector(".dc-clients").classList.contains("is-paused"),
  );
  await click("[data-studio-motion]");
  assert.equal(
    document.querySelector("[data-studio-motion]").getAttribute("aria-pressed"),
    "true",
  );
});

test("Client campaigns, gallery keyboard wrapping and linked brand stories work", async () => {
  await mount("/clients");
  assert.equal(
    document.querySelectorAll(".clients-media-sequence:first-child img").length,
    51,
  );
  assert.equal(document.querySelectorAll(".client-brand-card").length, 10);
  const tiltCard = document.querySelector(".aceternity-client-card");
  tiltCard.getBoundingClientRect = () => ({
    left: 0,
    top: 0,
    width: 200,
    height: 200,
  });
  const moveOverCard = async () =>
    act(async () => {
      tiltCard.dispatchEvent(
        new window.MouseEvent("pointermove", {
          bubbles: true,
          clientX: 1000,
          clientY: 1000,
        }),
      );
    });
  await moveOverCard();
  assert.equal(tiltCard.dataset.tiltActive, "true");
  assert.equal(
    tiltCard.style.getPropertyValue("--ace-rotate-y"),
    "4.00deg",
    "Tilt remains bounded",
  );
  await act(async () =>
    tiltCard.dispatchEvent(
      new window.Event("pointercancel", { bubbles: true }),
    ),
  );
  assert.equal(tiltCard.dataset.tiltActive, undefined);
  assert.equal(tiltCard.style.getPropertyValue("--ace-rotate-y"), "");
  await moveOverCard();
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  await act(async () => {
    reduced.matches = true;
    reduced.dispatchEvent(new window.Event("change"));
  });
  await moveOverCard();
  assert.equal(
    tiltCard.dataset.tiltActive,
    undefined,
    "Reduced motion resets and disables tilt",
  );
  await act(async () => {
    reduced.matches = false;
    reduced.dispatchEvent(new window.Event("change"));
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    fine.matches = false;
    fine.dispatchEvent(new window.Event("change"));
  });
  await moveOverCard();
  assert.equal(
    tiltCard.dataset.tiltActive,
    undefined,
    "Coarse pointer does not tilt",
  );
  assert.equal(
    document
      .querySelector("article.aceternity-client-card")
      .getAttribute("tabindex"),
    null,
  );
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

test("Tirumalasetty lightbox keyboard navigation, close and focus restore", async () => {
  await mount("/clients/tirumalasetty");
  assert.equal(
    document
      .querySelector('.site-header a[href="/clients/"]')
      .getAttribute("aria-current"),
    "page",
  );
  await click('[data-tiru-panel="0"]');
  assert.ok(!document.querySelector(".tiru-lightbox").hidden);
  assert.equal(
    document.activeElement,
    document.querySelector(".tiru-lightbox-close"),
  );
  await press(document.activeElement, "ArrowRight");
  assert.equal(document.querySelector(".tiru-count").textContent, "02 / 03");
  await press(document.activeElement, "Escape");
  assert.ok(document.querySelector(".tiru-lightbox").hidden);
  assert.equal(
    document.activeElement,
    document.querySelector('[data-tiru-panel="0"]'),
  );
  assert.ok(!document.body.classList.contains("lightbox-open"));
});

test("Adhithya video controls work and route unmount cleans animation resources", async () => {
  await mount("/clients/adhithya-sai-promoters");
  await click(".adhithya-video-toggle");
  assert.ok(document.querySelector(".adhithya-hero video").paused);
  await click(".adhithya-video-toggle");
  assert.ok(!document.querySelector(".adhithya-hero video").paused);
  assert.equal(
    document.querySelectorAll(".smooth-cursor").length,
    2,
    "No duplicated StrictMode cursors",
  );
  await act(async () => root.unmount());
  root = null;
  assert.equal(
    document.querySelectorAll(".smooth-cursor,.pointer-aura").length,
    0,
  );
  assert.equal(observers.size, 0, "All observers disconnect on unmount");
  assert.ok(!document.body.classList.contains("nav-open"));
});
