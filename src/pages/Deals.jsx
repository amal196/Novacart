import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import SkeletonGrid from "../components/SkeletonGrid";
import Footer from "../components/Footer";
import { getProducts } from "../services/api";
import "../styles/Deals.css";

const ITEMS_PER_PAGE = 8;

function Deals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await getProducts();
        const onSale = data
          .filter((p) => p.discountPercentage && p.discountPercentage > 0)
          .sort((a, b) => b.discountPercentage - a.discountPercentage);
        setDeals(onSale);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const totalPages = Math.max(1, Math.ceil(deals.length / ITEMS_PER_PAGE));
  const paginatedDeals = deals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Navbar />
      <div className="deals-page">
        <p className="breadcrumb">Home / Deals</p>

        <div className="deals-header">
          <h1>🔥 Today's Best Deals</h1>
          <p>Biggest discounts across NovaCart, sorted highest first</p>
        </div>

        {loading ? (
          <SkeletonGrid />
        ) : paginatedDeals.length === 0 ? (
          <h3>No deals right now, check back soon</h3>
        ) : (
          <div className="products-grid">
            {paginatedDeals.map((product) => (
              <div key={product.id} className="deal-card-wrap">
                <span className="deal-badge">
                  -{Math.round(product.discountPercentage)}%
                </span>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={page === currentPage ? "active" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              ›
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Deals;