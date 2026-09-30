import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { parseFragment } from "parse5";

// The preserved pre-React commit provides an independent regression baseline.
const baseline = "aec7abd1c6a04b21c29437fa196b18fa18bc244e";
const original = (file) =>
  execFileSync("git", ["show", `${baseline}:dist/${file}`], {
    maxBuffer: 128 * 1024 * 1024,
  });
const source = (name) => original(`assets/${name}.js`).toString("utf8");
const strip = (code) =>
  code.replace(/^import .*$/gm, "").replace(/export (const|function)/g, "$1");
const brands = new Function(
  strip(source("client-brands")) + "; return {clientBrands,clientHeroMedia}",
)();
const studio = new Function(
  strip(source("studio").split("export function initStudio")[0]) +
    "; return studio",
)();
const home = new Function(
  "studio",
  "clientBrands",
  strip(source("home").split("export function initHome")[0]) + "; return home",
)(studio, brands.clientBrands);
const services = new Function(
  strip(source("services").split("export function initServices")[0]) +
    "; return services",
)();
const clients = new Function(
  "clientBrands",
  "clientHeroMedia",
  strip(source("clients").split("export function initClients")[0]) +
    "; return clientsPage",
)(brands.clientBrands, brands.clientHeroMedia);
const appSource = source("app");
const originalPages = (path) =>
  new Function(
    "path",
    "home",
    "services",
    "currentClientsPage",
    appSource.slice(
      appSource.indexOf("const nav ="),
      appSource.indexOf("const pages ="),
    ) +
      ";return {home,services,clientsPage,portfolio,about,adhithyaSaiPromotersPage,tirumalasettyPage,header,footer}",
  )(path, home, services, clients);
const pages = {
  "/": "home",
  "/services": "services",
  "/clients": "clientsPage",
  "/about": "about",
  "/portfolio": "portfolio",
  "/clients/adhithya-sai-promoters": "adhithyaSaiPromotersPage",
  "/clients/adithya-sai-promoters": "adhithyaSaiPromotersPage",
  "/clients/tirumalasetty": "tirumalasettyPage",
};
let vite, App;
before(async () => {
  vite = await createServer({
    server: { middlewareMode: true, hmr: false },
    appType: "custom",
  });
  App = (await vite.ssrLoadModule("/src/App.jsx")).default;
});
after(async () => {
  await vite?.close();
});
const walk = (node) => [node, ...(node.childNodes || []).flatMap(walk)];
const attr = (node, name) =>
  node.attrs?.find((item) => item.name === name)?.value;
const elements = (tree, name) =>
  walk(tree).filter((node) => node.tagName === name);
const text = (tree) =>
  walk(tree)
    .filter((node) => node.nodeName === "#text")
    .map((node) => node.value)
    .join("")
    .replace(/\s/g, "");
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");

for (const [path, name] of Object.entries(pages)) {
  test(`React preserves text, media, links and section IDs: ${path}`, () => {
    const old = originalPages(path);
    const expected = parseFragment(old.header() + old[name]() + old.footer());
    const output = renderToStaticMarkup(createElement(App, { path }));
    assert.ok(!output.includes("[object Object]"));
    assert.ok(!output.includes("&lt;span"));
    const actual = parseFragment(output);
    assert.equal(
      text(actual),
      text(expected),
      "Visible and hidden page copy must remain unchanged",
    );
    for (const tag of ["img", "video", "source"]) {
      const media = (tree) =>
        elements(tree, tag).map((node) => [
          attr(node, "src"),
          attr(node, "poster"),
          attr(node, "alt"),
        ]);
      assert.deepEqual(
        media(actual),
        media(expected),
        `${tag} sources and accessibility descriptions`,
      );
    }
    const links = (tree) =>
      elements(tree, "a").map((node) => attr(node, "href"));
    assert.deepEqual(links(actual), links(expected));
    const ids = (tree) =>
      walk(tree)
        .map((node) => attr(node, "id"))
        .filter(Boolean)
        .filter((id) => id !== "site-navigation");
    assert.deepEqual(ids(actual), ids(expected));
  });
}

test("Original media bytes and stylesheet content are preserved", () => {
  const files = execFileSync(
    "git",
    ["ls-tree", "-r", "--name-only", baseline, "dist"],
    { encoding: "utf8" },
  )
    .trim()
    .split("\n")
    .filter((file) => !file.endsWith(".js") && !file.endsWith(".html"));
  assert.ok(files.length > 50);
  for (const file of files) {
    const relative = file.slice("dist/".length);
    assert.ok(
      existsSync(`public/${relative}`),
      `Missing preserved file ${relative}`,
    );
    const actual = readFileSync(`public/${relative}`),
      expected = original(relative);
    if (/\.(css|txt|svg)$/.test(relative))
      assert.equal(
        actual.toString().replaceAll("\r\n", "\n"),
        expected.toString().replaceAll("\r\n", "\n"),
        relative,
      );
    else assert.equal(digest(actual), digest(expected), relative);
  }
});

test("Shared client list includes 10 logos and 51 campaign images", async () => {
  const data = await import("../src/data/client-brands.js");
  assert.equal(data.clientBrands.length, 10);
  assert.equal(data.clientHeroMedia.length, 51);
});

test("Production has all eight direct entry points and route-specific metadata", () => {
  const routes = JSON.parse(readFileSync("src/data/routes.json", "utf8"));
  assert.equal(routes.length, 8);
  for (const route of routes) {
    const html = readFileSync(
      `dist${route.path === "/" ? "" : route.path}/index.html`,
      "utf8",
    );
    assert.ok(html.includes(route.title.replaceAll("&", "&amp;")), route.path);
    assert.ok(
      html.includes(route.description.replaceAll("&", "&amp;")),
      route.path,
    );
    assert.match(html, /assets\/index-[\w-]+\.js/);
  }
});
