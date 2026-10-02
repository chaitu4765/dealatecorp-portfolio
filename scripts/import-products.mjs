import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { JSDOM } from "jsdom";

// Import the supplied showcase as static content; its global scripts and styles
// stay out of the main site's navigation, theme and animation lifecycle.
const source = "poc--master/medistock-case-study/index.html";
const { document } = new JSDOM(readFileSync(source, "utf8")).window;
const imagePath = (src) =>
  src
    .replace("images/", "/assets/products/")
    .replace(/\.(jpe?g|png)$/i, ".webp");
const products = [...document.querySelectorAll(".poc-logo-card")].map(
  (card) => {
    const id = card.hash.slice(1);
    const section = document.getElementById(id).cloneNode(true);
    section.removeAttribute("id");
    section.querySelectorAll("script,style").forEach((node) => node.remove());
    section.querySelectorAll("*").forEach((node) => {
      [...node.attributes]
        .filter((attribute) => /^on/i.test(attribute.name))
        .forEach((attribute) => node.removeAttribute(attribute.name));
      node.classList.remove("reveal");
    });
    section.querySelectorAll("img").forEach((img) => {
      img.src = imagePath(img.getAttribute("src"));
      img.loading = "lazy";
      img.decoding = "async";
    });
    const heading = section.querySelector("h2");
    heading.id = `product-${id}-title`;
    section.setAttribute("aria-labelledby", heading.id);
    return {
      id,
      name: card.querySelector("span").firstChild.textContent.trim(),
      description: card.querySelector("em").textContent,
      image: imagePath(card.querySelector("img").getAttribute("src")),
      html: section.outerHTML,
    };
  },
);
mkdirSync("src/data", { recursive: true });
writeFileSync(
  "src/data/products.json",
  JSON.stringify(products, null, 2) + "\n",
);
console.log(`Imported ${products.length} product case studies.`);
