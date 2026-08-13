import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { ToastContext } from "../context/ToastContext";

function ProductCard({ product }) {
  const { addToWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);

  const handleWishlist = (e) => {
    e.preventDefault();
    const added = addToWishlist(product);
    if (added) {
      showToast("Added to Wishlist", "success");
    } else {
      showToast("Already in Wishlist", "info");
    }
  };

  const handleCart = (e) => {
    e.preventDefault();
    const result = addToCart(product, 1);
    showToast(
      result === "added" ? "Added to Cart" : "Cart updated (+1 quantity)",
      "success"
    );
  };

  return (
    <Link to={`/product/${product.id}`} className="product-link">
      <div className="product-card">
        <img src={product.thumbnail} alt={product.title} />
        <h3>
          {product.title.length > 35
            ? product.title.slice(0, 35) + "..."
            : product.title}
        </h3>
        <div className="product-price-row">
          <p className="product-price">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
          {typeof product.rating === "number" && (
            <span className="product-rating">
              <FaStar /> {product.rating.toFixed(1)}
            </span>
          )}
        </div>
        <div className="card-buttons">
          <button onClick={handleWishlist}>
            <FaHeart />
          </button>
          <button onClick={handleCart}>
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;