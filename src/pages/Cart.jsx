import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ToastContext } from "../context/ToastContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import "../styles/Cart.css";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);
  const { showToast } = useContext(ToastContext);
  const [showConfirm, setShowConfirm] = useState(false);

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  // Original (pre-discount) subtotal, using each product's own discountPercentage
  const originalSubtotal = cartItems.reduce((sum, item) => {
    const qty = item.quantity || 1;
    const original = item.discountPercentage
      ? item.price / (1 - item.discountPercentage / 100)
      : item.price;
    return sum + original * qty;
  }, 0);

  const discount = Math.max(0, originalSubtotal - totalPrice);

  const confirmCheckout = () => {
    clearCart();
    setShowConfirm(false);
    showToast("🎉 Order placed! Thank you for shopping with NovaCart.", "success");
  };

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <h1>Your Cart {cartItems.length > 0 && `(${totalItems} items)`}</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p className="empty-icon">🛒</p>
            <h3>Your cart is empty</h3>
            <Link to="/products" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.thumbnail} alt={item.title} />
                  <div className="cart-info">
                    <h3>{item.title}</h3>
                    <p className="cart-item-price">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="qty-stepper">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, (item.quantity || 1) - 1)
                      }
                      disabled={(item.quantity || 1) <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span>{item.quantity || 1}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, (item.quantity || 1) + 1)
                      }
                    >
                      <FaPlus />
                    </button>
                  </div>

                  <p className="cart-item-total">
                    ₹
                    {(item.price * (item.quantity || 1)).toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  <button
                    className="remove-btn"
                    onClick={() => {
                      removeFromCart(item.id);
                      showToast("Removed from Cart", "info");
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}

              <Link to="/products" className="continue-shopping-link">
                ← Continue Shopping
              </Link>
            </div>

            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{originalSubtotal.toLocaleString("en-IN")}</span>
              </div>
              {discount > 0 && (
                <div className="summary-row discount-row">
                  <span>Discount</span>
                  <span>-₹{discount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free-shipping">FREE</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>

              <button
                className="checkout-btn"
                onClick={() => setShowConfirm(true)}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}

        {showConfirm && (
          <div className="confirm-overlay" onClick={() => setShowConfirm(false)}>
            <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
              <h3>Place your order?</h3>
              <p>Total amount: ₹{totalPrice.toLocaleString("en-IN")}</p>
              <div className="confirm-actions">
                <button
                  className="confirm-cancel"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
                <button className="confirm-yes" onClick={confirmCheckout}>
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;