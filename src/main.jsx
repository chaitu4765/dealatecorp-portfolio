import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import routes from "./data/routes.json";

const requested = window.location.pathname.replace(/\/+$/, "") || "/";
const route = routes.find((item) => item.path === requested) || routes[0];
const path = route.path;
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
document.title = route.title;
document.querySelector('meta[name="description"]').content = route.description;

// Route-specific sheets preserve the established cascade without leaking themes.
const sheets = editorial
  ? ["home", path === "/" ? "studio" : "services"]
  : ["effects", ...(path === "/clients" ? ["clients"] : [])];
sheets.push("uniform");
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
