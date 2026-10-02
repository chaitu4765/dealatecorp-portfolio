import { useEffect, useRef, useState } from "react";
import { SkyToggle } from "./ui/SkyToggle.jsx";
import { nav as links } from "../data/content.js";
export function Header({ path }) {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.dataset.theme === "dark",
  );
  const menu = useRef(null);
  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    const onKey = (event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menu.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("nav-open");
    };
  }, [open]);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try {
      localStorage.setItem("dealate-theme", dark ? "dark" : "light");
    } catch {
      // The current page theme still works when storage is unavailable.
    }
  }, [dark]);
  return (
    <header
      className={`site-header${path === "/" ? " site-header--home" : ""}`}
    >
      <a className="brand" href="/" aria-label="Dealatecorp home">
        <span className="brand-mark brand-mark--logo" aria-hidden="true">
          <img
            className="brand-logo"
            src="/assets/logo.png"
            alt=""
            width="44"
            height="44"
          />
        </span>
        <span>
          <b>DEALATECORP</b>
          <small>For a better tomorrow</small>
        </span>
      </a>
      <div className="site-header__actions">
        <nav id="site-navigation">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              aria-current={
                path === href.replace(/\/$/, "") ||
                (path.startsWith("/clients/") && href === "/clients/") ||
                (path === "/" && href === "/")
                  ? "page"
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            className="nav-cta interactive-hover"
            href="/contact/"
            data-project-enquiry
            onClick={() => setOpen(false)}
          >
            <span>Start a project</span>
            <i aria-hidden="true">↗</i>
          </a>
        </nav>
        <SkyToggle checked={dark} onChange={setDark} />
      </div>
      <button
        ref={menu}
        type="button"
        className="menu"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="site-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <i />
        <i />
      </button>
    </header>
  );
}
