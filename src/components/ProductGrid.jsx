import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/api";
import { useInView } from "../hooks/UseInView";
import ProductCard from "./ProductCard";
import SkeletonGrid from "./SkeletonGrid";

function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [ref, isInView] = useInView();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        // Show the 8 highest-rated products as a curated "Trending Now" pick
        const trending = [...data]
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 8);
        setProducts(trending);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section
      className={`products-section reveal ${isInView ? "in-view" : ""}`}
      ref={ref}
    >
      <div className="products-section-header">
        <h2>Trending Now</h2>
        {!loading && (
          <button className="view-all-btn" onClick={() => navigate("/products")}>
            View All →
          </button>
        )}
      </div>

      {loading ? (
        <SkeletonGrid />
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductGrid;