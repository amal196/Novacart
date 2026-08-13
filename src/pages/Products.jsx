import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";
import SkeletonGrid from "../components/SkeletonGrid";
import Footer from "../components/Footer";
import { getProducts } from "../services/api";
import "../styles/Products.css";

const ITEMS_PER_PAGE = 8;

function Products() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [priceLimit, setPriceLimit] = useState(2000);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        const highest = Math.ceil(Math.max(...data.map((p) => p.price), 100));
        setMaxPrice(highest);
        setPriceLimit(highest);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Whenever a filter/search/sort changes, go back to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, priceLimit, selectedRatings, sortBy]);

  const categoryFiltered = useMemo(() => {
    return selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  const searchFiltered = useMemo(() => {
    if (!searchQuery.trim()) return categoryFiltered;
    return categoryFiltered.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categoryFiltered, searchQuery]);

  const ratingCounts = useMemo(() => {
    const thresholds = [4.5, 4.0, 3.5, 3.0];
    const counts = {};
    thresholds.forEach((t) => {
      counts[t] = searchFiltered.filter((p) => p.rating >= t).length;
    });
    return counts;
  }, [searchFiltered]);

  const filteredProducts = useMemo(() => {
    let result = searchFiltered.filter((p) => p.price <= priceLimit);

    if (selectedRatings.length > 0) {
      const minRating = Math.min(...selectedRatings);
      result = result.filter((p) => p.rating >= minRating);
    }

    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [searchFiltered, priceLimit, selectedRatings, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleApplyFilter = (limit, ratings) => {
    setPriceLimit(limit);
    setSelectedRatings(ratings);
  };

  return (
    <>
      <Navbar />
      <div className="products-page">
        <p className="breadcrumb">Home / Products</p>
        <h1>All Products</h1>

        <div className="products-layout">
          <ProductFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            maxPrice={maxPrice}
            ratingCounts={ratingCounts}
            onApply={handleApplyFilter}
          />

          <div className="products-main">
            <div className="products-toolbar">
              <input
                type="text"
                className="products-search-input"
                placeholder="Search in products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <p>{filteredProducts.length} products found</p>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">Sort by: Latest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
              </select>
            </div>

            {loading ? (
              <SkeletonGrid />
            ) : paginatedProducts.length === 0 ? (
              <h3>No products match these filters</h3>
            ) : (
              <div className="products-grid">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
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
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Products;