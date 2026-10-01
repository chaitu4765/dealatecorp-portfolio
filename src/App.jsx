import { useEffect, useState } from "react";
import { Header } from "./components/Header.jsx";
import { Home } from "./pages/Home.jsx";
import { Services } from "./pages/Services.jsx";
import { Clients } from "./pages/Clients.jsx";
import { Footer } from "./components/Footer.jsx";
import { FeaturedMedia } from "./components/FeaturedMedia.jsx";
import { Portfolio } from "./pages/Portfolio.jsx";
import { About } from "./pages/About.jsx";
import { Contact } from "./pages/Contact.jsx";
import { Adhithya } from "./pages/Adhithya.jsx";
import { Tirumalasetty } from "./pages/Tirumalasetty.jsx";
import { ProjectEnquiryModal } from "./components/ProjectEnquiryModal.jsx";
import { createAnimationScope } from "./hooks/useAnimationEffect.js";
import { initSite } from "./hooks/siteAnimations.js";

const pages = {
  "/": Home,
  "/services": Services,
  "/portfolio": Portfolio,
  "/about": About,
  "/contact": Contact,
  "/clients/adhithya-sai-promoters": Adhithya,
  "/clients/adithya-sai-promoters": Adhithya,
  "/clients/tirumalasetty": Tirumalasetty,
};

export default function App({ path }) {
  const Page = pages[path] || Home;
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  useEffect(() => {
    const scope = createAnimationScope();
    initSite(scope, path === "/" || path === "/services");
    return () => {
      scope.dispose();
      document.body.classList.remove("lightbox-open");
    };
  }, [path]);
  useEffect(() => {
    const openProjectForm = (event) => {
      const trigger = event.target.closest("[data-project-enquiry]");
      if (
        !trigger ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      event.preventDefault();
      setProjectFormOpen(true);
    };
    document.addEventListener("click", openProjectForm);
    return () => document.removeEventListener("click", openProjectForm);
  }, []);
  return (
    <>
      <Header path={path} />
      {path === "/clients" ? (
        <Clients featuredMedia={<FeaturedMedia />} />
      ) : (
        <Page />
      )}
      <Footer path={path} />
      <ProjectEnquiryModal
        open={projectFormOpen}
        onClose={() => setProjectFormOpen(false)}
      />
    </>
  );
}
