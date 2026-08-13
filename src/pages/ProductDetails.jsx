import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, getProducts } from "../services/api";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { ToastContext } from "../context/ToastContext";
import { recordView } from "../utils/recentlyViewed";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import RecentlyViewed from "../components/RecentlyViewed";
import Footer from "../components/Footer";
import { FaHeart, FaStar, FaMinus, FaPlus } from "react-icons/fa";
import "../styles/ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [related, setRelated] = useState([]);

  const { addToCart } = useContext(CartContext);
  const { addToWishlist, wishlistItems } = useContext(WishlistContext);
  const { showToast } = useContext(ToastContext);

  const inWishlist = product
    ? wishlistItems.some((item) => item.id === product.id)
    : false;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setQty(1);
      setActiveTab("description");

      const data = await getProductById(id);
      setProduct(data);
      setMainImage(data.images?.[0] || data.thumbnail);
      setLoading(false);
      recordView(data.id);

      const all = await getProducts();
      const sameCategory = all.filter(
        (p) => p.category === data.category && p.id !== data.id
      );
      setRelated(sameCategory.slice(0, 4));
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading || !product) {
    return (
      <>
        <Navbar />
        <section className="product-details-page">
          <div className="pd-top">
            <div className="skeleton-shimmer pd-skeleton-gallery" />
            <div className="pd-skeleton-info">
              <div className="skeleton-shimmer pd-skeleton-title" />
              <div className="skeleton-shimmer pd-skeleton-sub" />
              <div className="skeleton-shimmer pd-skeleton-price" />
              <div className="skeleton-shimmer pd-skeleton-desc" />
            </div>
          </div>
        </section>
      </>
    );
  }

  const handleAddToCart = () => {
    const result = addToCart(product, qty);
    showToast(
      result === "added" ? "Added to Cart" : `Cart updated (+${qty})`,
      "success"
    );
  };

  const handleWishlist = () => {
    const added = addToWishlist(product);
    showToast(
      added ? "Added to Wishlist" : "Already in Wishlist",
      added ? "success" : "info"
    );
  };

  const images = product.images?.length ? product.images : [product.thumbnail];

  return (
    <>
      <Navbar />
      <section className="product-details-page">
        <p className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/products">Products</Link> /{" "}
          {product.title}
        </p>

        <div className="pd-top">
          <div className="pd-gallery">
            <div className="pd-thumbnails">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.title} ${idx + 1}`}
                  className={img === mainImage ? "active" : ""}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
            <div className="pd-main-image">
              <img src={mainImage} alt={product.title} />
            </div>
          </div>

          <div className="pd-info">
            <h1>{product.title}</h1>

            <div className="pd-rating">
              <FaStar color="#f59e0b" /> {product.rating}
              {product.reviews?.length ? (
                <span>&nbsp;({product.reviews.length} reviews)</span>
              ) : null}
            </div>

            <div className="pd-price-row">
              <h2>₹{product.price.toLocaleString("en-IN")}</h2>
              {product.discountPercentage ? (
                <span className="pd-discount">
                  {Math.round(product.discountPercentage)}% OFF
                </span>
              ) : null}
            </div>

            <p className="pd-description">{product.description}</p>

            {typeof product.stock === "number" && (
              <p className="pd-stock">
                {product.stock > 0
                  ? `✅ In Stock (${product.stock} left)`
                  : "❌ Out of Stock"}
              </p>
            )}

            <div className="pd-qty">
              <span>Qty:</span>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <FaMinus />
              </button>
              <span className="qty-value">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}>
                <FaPlus />
              </button>
            </div>

            <div className="pd-actions">
              <button className="pd-add-cart" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button
                className={`pd-wishlist-btn ${inWishlist ? "active" : ""}`}
                onClick={handleWishlist}
              >
                <FaHeart /> {inWishlist ? "In Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>

        <div className="pd-tabs-section">
          <div className="pd-tabs">
            <button
              className={activeTab === "description" ? "active" : ""}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={activeTab === "specs" ? "active" : ""}
              onClick={() => setActiveTab("specs")}
            >
              Specifications
            </button>
            <button
              className={activeTab === "reviews" ? "active" : ""}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews {product.reviews?.length ? `(${product.reviews.length})` : ""}
            </button>
          </div>

          <div className="pd-tab-content">
            {activeTab === "description" && <p>{product.description}</p>}

            {activeTab === "specs" && (
              <ul className="pd-specs-list">
                {product.brand && (
                  <li>
                    <strong>Brand:</strong> {product.brand}
                  </li>
                )}
                {product.category && (
                  <li>
                    <strong>Category:</strong> {product.category}
                  </li>
                )}
                {product.sku && (
                  <li>
                    <strong>SKU:</strong> {product.sku}
                  </li>
                )}
                {product.weight && (
                  <li>
                    <strong>Weight:</strong> {product.weight}g
                  </li>
                )}
                {product.dimensions && (
                  <li>
                    <strong>Dimensions:</strong> {product.dimensions.width} x{" "}
                    {product.dimensions.height} x {product.dimensions.depth} cm
                  </li>
                )}
                {product.warrantyInformation && (
                  <li>
                    <strong>Warranty:</strong> {product.warrantyInformation}
                  </li>
                )}
                {product.returnPolicy && (
                  <li>
                    <strong>Return Policy:</strong> {product.returnPolicy}
                  </li>
                )}
              </ul>
            )}

            {activeTab === "reviews" &&
              (product.reviews?.length ? (
                <div className="pd-reviews-list">
                  {product.reviews.map((rev, idx) => (
                    <div key={idx} className="pd-review-card">
                      <div className="pd-review-head">
                        <strong>{rev.reviewerName}</strong>
                        <span>
                          <FaStar color="#f59e0b" /> {rev.rating}
                        </span>
                      </div>
                      <p>{rev.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No reviews yet.</p>
              ))}
          </div>
        </div>

        {related.length > 0 && (
          <div className="pd-related">
            <h2>Related Products</h2>
            <div className="products-grid">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}

        <RecentlyViewed excludeId={product.id} />
      </section>
      <Footer />
    </>
  );
}

export default ProductDetails;