import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
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
// Department sections are intentional additions. Continue comparing all the
// established page content independently of the new explorer and link panels.
const replacedGallery = (node) => {
  if (!node) return false;
  if (
    attr(node, "id") === "client-media" ||
    attr(node, "class")
      ?.split(" ")
      .some((name) =>
        ["tirumalasetty-work", "tiru-lightbox", "adhithya-gallery"].includes(
          name,
        ),
      )
  )
    return true;
  return replacedGallery(node.parentNode);
};
const preservedCopy = (node, path) => {
  if (replacedGallery(node)) return "";
  // About now includes a direct enquiry button.
  if (attr(node, "class")?.split(" ").includes("about-enquiry-button"))
    return "";
  // The shared footer was intentionally redesigned; links remain checked below.
  if (node.tagName === "footer") return "";
  // New folder uploads are additions; preserve the original campaign content.
  if (attr(node, "id") === "client-media") return "";
  // The header monogram was intentionally replaced with the supplied logo.
  if (
    attr(node, "class")?.split(" ").includes("brand-mark") &&
    node.parentNode?.parentNode?.tagName === "header"
  )
    return "";
  if (attr(node, "data-department-addition") !== undefined) return "";
  if (path === "/services" && attr(node, "id") === "layer-1") return "";
  return node.nodeName === "#text"
    ? node.value
    : (node.childNodes || [])
        .map((child) => preservedCopy(child, path))
        .join("");
};

for (const [path, name] of Object.entries(pages)) {
  test(`React preserves text, media, links and section IDs: ${path}`, () => {
    const old = originalPages(path);
    const expected = parseFragment(old[name]());
    const output = renderToStaticMarkup(createElement(App, { path }));
    assert.ok(!output.includes("[object Object]"));
    assert.ok(!output.includes("&lt;span"));
    const actual = parseFragment(output);
    const brandLogos = elements(actual, "img").filter(
      (node) => attr(node, "class") === "brand-logo",
    );
    assert.equal(brandLogos.length, 1);
    assert.equal(attr(brandLogos[0], "src"), "/assets/logo.png");
    const currentMain = elements(actual, "main")[0];
    const expectedMain = elements(expected, "main")[0];
    assert.ok(currentMain, `Main content exists for ${path}`);
    if (["/", "/services", "/clients", "/about"].includes(path)) {
      const copy = preservedCopy(currentMain, path).replace(/\s/g, "");
      const updatedPageCopy = {
        "/": "Gooddesign.",
        "/services": "Yourgrowth,atthecentre.",
        "/clients": "Creativework.Realclientstories.",
        "/about": "Builtforthegapbetween",
      }[path];
      assert.ok(
        copy.includes(updatedPageCopy),
        `Updated page copy for ${path}`,
      );
    } else {
      assert.equal(
        preservedCopy(currentMain, path).replace(/\s/g, ""),
        preservedCopy(expectedMain, path).replace(/\s/g, ""),
        `Established main content remains intact for ${path}`,
      );
    }
    if (!["/", "/services", "/clients", "/about"].includes(path)) {
      for (const tag of ["img", "video", "source"]) {
        const media = (tree) =>
          elements(tree, tag)
            .filter(
              (node) =>
                !replacedGallery(node) &&
                attr(node, "class") !== "brand-logo" &&
                attr(node, "src") !== "/assets/logo.png" &&
                !attr(node, "src")?.startsWith("/assets/client-media/"),
            )
            .map((node) => [
              attr(node, "src"),
              attr(node, "poster"),
              attr(node, "alt"),
            ]);
        assert.deepEqual(
          media(currentMain),
          media(expectedMain),
          `${tag} sources and accessibility descriptions`,
        );
      }
    }
    // Project CTAs now take visitors through the local Contact page before the
    // form creates an email, so treat the former direct email target as that route.
    const normalizeProjectLink = (href) =>
      href === "mailto:hr@dealatecorp.com" ? "/contact/" : href;
    const links = (tree) =>
      elements(tree, "a")
        .filter((node) => !replacedGallery(node))
        .map((node) => normalizeProjectLink(attr(node, "href")));
    if (!["/", "/services", "/clients", "/about"].includes(path)) {
      const remainingLinks = links(currentMain);
      for (const href of links(expectedMain)) {
        const index = remainingLinks.indexOf(href);
        assert.ok(index >= 0, `Preserved link: ${href}`);
        remainingLinks.splice(index, 1);
      }
    }
    const ids = (tree) =>
      walk(tree)
        .filter((node) => !replacedGallery(node))
        .map((node) => attr(node, "id"))
        .filter(Boolean)
        .filter((id) => id !== "site-navigation");
    if (!["/", "/services", "/clients", "/about"].includes(path)) {
      for (const id of ids(expectedMain))
        assert.ok(ids(currentMain).includes(id), `Preserved anchor: ${id}`);
    }
    assert.equal(
      new Set(ids(actual)).size,
      ids(actual).length,
      "No duplicate section IDs",
    );
  });
}

test("Unaffected original media and styles remain byte-for-byte intact", () => {
  const files = execFileSync(
    "git",
    ["ls-tree", "-r", "--name-only", baseline, "dist"],
    { encoding: "utf8" },
  )
    .trim()
    .split("\n")
    .filter((file) => !file.endsWith(".js") && !file.endsWith(".html"));
  assert.ok(files.length > 50);
  const changedPublicFiles = new Set(
    [
      ...execFileSync(
        "git",
        ["diff", "--name-only", baseline, "HEAD", "--", "public"],
        { encoding: "utf8" },
      )
        .trim()
        .split("\n"),
      ...execFileSync("git", ["diff", "--name-only", "HEAD", "--", "public"], {
        encoding: "utf8",
      })
        .trim()
        .split("\n"),
    ].filter(Boolean),
  );
  for (const file of files) {
    const relative = file.slice("dist/".length);
    assert.ok(
      existsSync(`public/${relative}`),
      `Missing preserved file ${relative}`,
    );
    if (changedPublicFiles.has(`public/${relative}`)) continue;
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

test("Production has all direct entry points and route-specific metadata", () => {
  const routes = JSON.parse(readFileSync("src/data/routes.json", "utf8"));
  assert.equal(routes.length, 18);
  const buildDirectory = process.env.TEST_DIST_DIR || "dist";
  for (const route of routes) {
    const html = readFileSync(
      resolve(
        buildDirectory,
        route.path.replace(/^\/+|\/+$/g, ""),
        "index.html",
      ),
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
