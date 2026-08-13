import { useEffect, useState } from "react";
import { getProductById } from "../services/api";
import { getRecentlyViewedIds } from "../utils/recentlyViewed";
import ProductCard from "./ProductCard";

// excludeId: skip a product from its own "Recently Viewed" list (used on
// the Product Details page).
function RecentlyViewed({ excludeId }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const ids = getRecentlyViewedIds().filter((id) => id !== excludeId);
      if (ids.length === 0) {
        setProducts([]);
        return;
      }
      try {
        // Fetch each recently-viewed product directly by id - this works
        // regardless of category, unlike matching against the curated
        // getProducts() cache (which only covers 8 categories).
        const results = await Promise.all(
          ids.map((id) => getProductById(id).catch(() => null))
        );
        setProducts(results.filter(Boolean));
      } catch (error) {
        console.log(error);
        setProducts([]);
      }
    };
    load();
  }, [excludeId]);

  if (products.length === 0) return null;

  // No scroll-reveal animation here on purpose: this section only mounts
  // once data is ready, which made the reveal-on-scroll observer unreliable.
  return (
    <section className="recently-viewed">
      <h2>Recently Viewed</h2>
      <div className="products-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

export default RecentlyViewed;