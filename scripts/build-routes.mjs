import { readFile, writeFile, mkdir } from "node:fs/promises";
const routes = JSON.parse(
  await readFile(new URL("../src/data/routes.json", import.meta.url), "utf8"),
);
const output = new URL("../dist/", import.meta.url);
const shell = await readFile(new URL("index.html", output), "utf8");
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");
for (const route of routes) {
  const directory = new URL(`.${route.path}/`, output);
  await mkdir(directory, { recursive: true });
  const html = shell
    .replace(/<title>.*?<\/title>/s, `<title>${escape(route.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?\s*>/,
      `<meta name="description" content="${escape(route.description)}">`,
    );
  await writeFile(new URL("index.html", directory), html);
}
console.log(`Built ${routes.length} directly accessible routes.`);
