import uploads from "./client-media.json";
import existing from "./client-gallery-existing.json";

export const clientGalleries = Object.fromEntries(
  Object.entries(existing).map(([path, gallery]) => [
    path,
    {
      brand: gallery.brand,
      items: [...(uploads[path]?.items || []), ...gallery.items],
    },
  ]),
);
clientGalleries["/clients/adithya-sai-promoters"] =
  clientGalleries["/clients/adhithya-sai-promoters"];
