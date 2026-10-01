import { useEffect, useRef, useState } from "react";
const links = [
  ["Home", "/"],
  ["Services", "/services/"],
  ["Clients", "/clients/"],
  ["About", "/about/"],
];
export function Header({ path }) {
  const [open, setOpen] = useState(false);
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
  return (
    <header className="site-header">
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
    </header>
  );
}
