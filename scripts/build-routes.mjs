import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
const routes = JSON.parse(
  await readFile(new URL("../src/data/routes.json", import.meta.url), "utf8"),
);
const output = resolve(
  process.env.BUILD_OUTPUT_DIR || fileURLToPath(new URL("../dist/", import.meta.url)),
);
const shell = await readFile(join(output, "index.html"), "utf8");
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");
for (const route of routes) {
  const directory = join(output, route.path.replace(/^\/+|\/+$/g, ""));
  await mkdir(directory, { recursive: true });
  const html = shell
    .replace(/<title>.*?<\/title>/s, `<title>${escape(route.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?\s*>/,
      `<meta name="description" content="${escape(route.description)}">`,
    );
  await writeFile(join(directory, "index.html"), html);
}
console.log(`Built ${routes.length} directly accessible routes.`);
