import { useEffect, useRef, useState } from "react";
import products from "../data/products.json";

const selectedProduct = () =>
  typeof window === "undefined"
    ? null
    : products.find((product) => `#${product.id}` === window.location.hash) ||
      null;

export function Products() {
  const [selected, setSelected] = useState(selectedProduct);
  const title = useRef(null);
  useEffect(() => {
    const change = () => setSelected(selectedProduct());
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  useEffect(() => {
    title.current?.focus({ preventScroll: true });
    if (window.location.hash) title.current?.scrollIntoView({ block: "start" });
  }, [selected]);
  return (
    <main className="products-page" id="products">
      {selected ? (
        <>
          <nav className="products-breadcrumb" aria-label="Product navigation">
            <a href="#products">← All products</a>
            <span>{selected.name}</span>
          </nav>
          <h1
            id={selected.id}
            ref={title}
            tabIndex={-1}
            className="products-detail-title"
          >
            {selected.name}
          </h1>
          <div
            className="products-detail"
            dangerouslySetInnerHTML={{ __html: selected.html }}
          />
          <a className="products-back" href="#products">
            ← Explore more products
          </a>
        </>
      ) : (
        <>
          <header className="products-intro">
            <p className="products-eyebrow">
              Products / {String(products.length).padStart(2, "0")} concepts
            </p>
            <h1 ref={title} tabIndex={-1}>
              Ideas that work.
              <br />
              <span>Built for your world.</span>
            </h1>
            <p>
              Explore our product concepts, the needs behind them, and the
              experiences we’re building.
            </p>
          </header>
          <div className="products-grid">
            {products.map((product, index) => (
              <a
                className="product-card"
                key={product.id}
                href={`#${product.id}`}
              >
                <div className="product-card__image">
                  <img
                    src={product.image}
                    alt={`${product.name} concept`}
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
                <div className="product-card__copy">
                  <span className="product-card__number">
                    {String(index + 1).padStart(2, "0")} / Concept
                  </span>
                  <h2>
                    {product.name}
                    <span aria-hidden="true">↗</span>
                  </h2>
                  <p>{product.description}</p>
                  <span className="product-card__link">
                    Explore product <span aria-hidden="true">→</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
