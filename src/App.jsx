import { useEffect } from "react";
import { Header } from "./components/Header.jsx";
import { Home } from "./pages/Home.jsx";
import { Services } from "./pages/Services.jsx";
import { Clients } from "./pages/Clients.jsx";
import { Footer } from "./components/Footer.jsx";
import { FeaturedMedia } from "./components/FeaturedMedia.jsx";
import { Portfolio } from "./pages/Portfolio.jsx";
import { About } from "./pages/About.jsx";
import { Adhithya } from "./pages/Adhithya.jsx";
import { Tirumalasetty } from "./pages/Tirumalasetty.jsx";
import { createAnimationScope } from "./hooks/useAnimationEffect.js";
import { initSite } from "./hooks/siteAnimations.js";

const pages = {
  "/": Home,
  "/services": Services,
  "/portfolio": Portfolio,
  "/about": About,
  "/clients/adhithya-sai-promoters": Adhithya,
  "/clients/adithya-sai-promoters": Adhithya,
  "/clients/tirumalasetty": Tirumalasetty,
};

export default function App({ path }) {
  const Page = pages[path] || Home;
  useEffect(() => {
    const scope = createAnimationScope();
    initSite(scope, path === "/" || path === "/services");
    return () => {
      scope.dispose();
      document.body.classList.remove("lightbox-open");
    };
  }, [path]);
  return (
    <>
      <Header path={path} />
      {path === "/clients" ? (
        <Clients featuredMedia={<FeaturedMedia />} />
      ) : (
        <Page />
      )}
      <Footer path={path} />
    </>
  );
}
