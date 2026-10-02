import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { clientBrandCaseStudyPaths } from "./pages/ClientBrandCaseStudy.jsx";
import routes from "./data/routes.json";

const requested = window.location.pathname.replace(/\/+$/, "") || "/";
const route = routes.find((item) => item.path === requested) || routes[0];
const path = route.path;
try {
  document.documentElement.dataset.theme =
    localStorage.getItem("dealate-theme") === "dark" ? "dark" : "light";
} catch {
  document.documentElement.dataset.theme = "light";
}
const editorial = path === "/" || path === "/services";
document.body.classList.toggle("home-page", editorial);
document.body.classList.toggle("is-clients-page", path === "/clients");
document.body.classList.toggle(
  "is-adhithya-page",
  [
    "/clients/adhithya-sai-promoters",
    "/clients/adithya-sai-promoters",
  ].includes(path),
);
document.body.classList.toggle(
  "is-tirumalasetty-page",
  path === "/clients/tirumalasetty",
);
const clientCaseClasses = {
  "/clients/ganesh-constructions": "is-ganesh-page",
  "/clients/spark": "is-spark-page",
  "/clients/sree-surya-infra": "is-sree-surya-page",
  "/clients/sri-conventions": "is-sri-conventions-page",
  "/clients/sri-parasakthi-peetam": "is-parasakthi-page",
  "/clients/sri-venkateswara-constructions": "is-svc-page",
  "/clients/ssm-construction": "is-ssm-page",
  "/clients/ubic": "is-ubic-page",
};
document.body.classList.toggle(
  "is-client-case-page",
  clientBrandCaseStudyPaths.includes(path),
);
for (const [clientPath, className] of Object.entries(clientCaseClasses)) {
  document.body.classList.toggle(className, path === clientPath);
}
document.title = route.title;
document.querySelector('meta[name="description"]').content = route.description;

// Route-specific sheets preserve the established cascade without leaking themes.
const sheets = editorial
  ? ["home", path === "/" ? "studio" : "services"]
  : [
      "effects",
      ...(path === "/clients"
        ? ["clients", "brand-carousel", "industry-portfolio"]
        : []),
    ];
sheets.push("uniform");
if (path === "/services") sheets.push("services-redesign");
if (clientBrandCaseStudyPaths.includes(path)) {
  sheets.push("client-case-studies");
}
sheets.push("theme");
if (path === "/") sheets.push("home-hero", "home-entrance");
sheets.push("palette");
if (path.startsWith("/clients/")) sheets.push("client-media");
if (path === "/products") sheets.push("products");
const stylesReady = sheets.map(
  (name) =>
    new Promise((resolve) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `/assets/${name}.css`;
      link.onload = resolve;
      link.onerror = resolve;
      document.head.append(link);
    }),
);
await Promise.all(stylesReady);
createRoot(document.getElementById("app")).render(
  <StrictMode>
    <App path={path} />
  </StrictMode>,
);
