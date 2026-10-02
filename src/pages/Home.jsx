import { HomeHero } from "../components/HomeHero.jsx";
import { Studio } from "./Studio.jsx";

export function Home() {
  return (
    <main id="main-content" className="dc-home">
      <HomeHero />
      <Studio />
    </main>
  );
}
