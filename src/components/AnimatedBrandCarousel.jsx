import { useMemo } from "react";
import { MoltenRingCarousel } from "./ui/molten-ring-carousel.tsx";

export function AnimatedBrandCarousel({ brands }) {
  const items = useMemo(
    () => brands.map(([title, image, href]) => ({ title, image, href })),
    [brands],
  );

  return (
    <MoltenRingCarousel
      items={items}
      brand="Client brand stories"
      cardSize={0.285}
      cardRatio={1.55}
      arc={1}
      threads
      glass
    />
  );
}
