import { useEffect, useState } from "react";
import { Header } from "./components/Header.jsx";
import { Home } from "./pages/Home.jsx";
import { Services } from "./pages/Services.jsx";
import { Products } from "./pages/Products.jsx";
import { Clients } from "./pages/Clients.jsx";
import { Footer } from "./components/Footer.jsx";
import { FeaturedMedia } from "./components/FeaturedMedia.jsx";
import { Portfolio } from "./pages/Portfolio.jsx";
import { Contact } from "./pages/Contact.jsx";
import { Adhithya } from "./pages/Adhithya.jsx";
import { Tirumalasetty } from "./pages/Tirumalasetty.jsx";
import {
  ClientBrandCaseStudy,
  clientBrandCaseStudyPaths,
} from "./pages/ClientBrandCaseStudy.jsx";
import { ProjectEnquiryModal } from "./components/ProjectEnquiryModal.jsx";
import { DealateAssistant } from "./components/DealateAssistant.jsx";
import { createAnimationScope } from "./hooks/useAnimationEffect.js";
import { initSite } from "./hooks/siteAnimations.js";
import { ScrollLockedDoorHero } from "./components/ui/scroll-locked-door-hero.jsx";

const pages = {
  "/": Home,
  "/services": Services,
  "/products": Products,
  "/portfolio": Portfolio,
  "/contact": Contact,
  "/clients/adhithya-sai-promoters": Adhithya,
  "/clients/adithya-sai-promoters": Adhithya,
  "/clients/tirumalasetty": Tirumalasetty,
  ...Object.fromEntries(
    clientBrandCaseStudyPaths.map((clientPath) => [
      clientPath,
      ClientBrandCaseStudy,
    ]),
  ),
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
  const site = (
    <>
      <Header path={path} />
      {path === "/clients" ? (
        <Clients featuredMedia={<FeaturedMedia />} />
      ) : (
        <Page path={path} />
      )}
      <Footer path={path} />
      <ProjectEnquiryModal
        open={projectFormOpen}
        onClose={() => setProjectFormOpen(false)}
      />
      <DealateAssistant onStartProject={() => setProjectFormOpen(true)} />
    </>
  );
  return path === "/" ? (
    <ScrollLockedDoorHero>{site}</ScrollLockedDoorHero>
  ) : (
    site
  );
}
