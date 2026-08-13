import { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { ToastContext } from "../context/ToastContext";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import "../styles/Wishlist.css";

function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } =
    useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);

  const handleMoveToCart = (item) => {
    addToCart(item, 1);
    removeFromWishlist(item.id);
    showToast("Moved to Cart", "success");
  };

  const handleMoveAllToCart = () => {
    wishlistItems.forEach((item) => addToCart(item, 1));
    clearWishlist();
    showToast("All items moved to Cart", "success");
  };

  const handleRemove = (id) => {
    removeFromWishlist(id);
    showToast("Removed from Wishlist", "info");
  };

  return (
    <>
      <Navbar />
      <section className="wishlist-page">
        <h1>
          My Wishlist{" "}
          {wishlistItems.length > 0 && `(${wishlistItems.length} items)`}
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <p className="empty-icon">🤍</p>
            <h3>Your wishlist is empty</h3>
            <Link to="/products" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="products-grid">
              {wishlistItems.map((item) => (
                <div key={item.id} className="product-card wishlist-card">
                  <img src={item.thumbnail} alt={item.title} />
                  <h3>{item.title}</h3>
                  <p className="product-price">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                  <div className="wishlist-card-buttons">
                    <button
                      className="move-to-cart-btn"
                      onClick={() => handleMoveToCart(item)}
                    >
                      <FaShoppingCart /> Move to Cart
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="move-all-btn" onClick={handleMoveAllToCart}>
              <FaShoppingCart /> Move All to Cart
            </button>
          </>
        )}
      </section>
      <Footer />
    </>
  );
}

export default Wishlist;