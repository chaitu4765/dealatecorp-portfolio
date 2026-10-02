import { ThreeDPhotoCarousel } from "./ui/3d-carousel.jsx";
import { clientGalleries } from "../data/client-gallery.js";

export function ClientMediaGallery({ path }) {
  const gallery = clientGalleries[path];
  if (!gallery) return null;
  const photos = gallery.items.filter((item) => item.type === "image").length;
  const films = gallery.items.length - photos;
  const counts = [
    photos && `${photos} photo${photos === 1 ? "" : "s"}`,
    films && `${films} film${films === 1 ? "" : "s"}`,
  ]
    .filter(Boolean)
    .join(" · ");
  return (
    <section
      id="client-media"
      className="client-media"
      aria-label={`${gallery.brand} photos and films`}
    >
      <div className="client-media__heading">
        <div>
          <p className="client-media__eyebrow">Our work / {gallery.brand}</p>
          <h2>A different perspective.</h2>
        </div>
        <p className="client-media__total">{counts}</p>
      </div>
      <ThreeDPhotoCarousel key={path} {...gallery} />
    </section>
  );
}
