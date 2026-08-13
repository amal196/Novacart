import { NavLink } from "react-router-dom";
import { FaHome, FaThLarge, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import "../styles/MobileNav.css";

function MobileNav() {
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);

  return (
    <nav className="mobile-nav">
      <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
        <FaHome />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/products"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaThLarge />
        <span>Products</span>
      </NavLink>

      <NavLink
        to="/wishlist"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <div className="mobile-nav-icon-wrap">
          <FaHeart />
          {wishlistItems.length > 0 && (
            <span className="mobile-nav-badge">{wishlistItems.length}</span>
          )}
        </div>
        <span>Wishlist</span>
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <div className="mobile-nav-icon-wrap">
          <FaShoppingCart />
          {cartItems.length > 0 && (
            <span className="mobile-nav-badge">{cartItems.length}</span>
          )}
        </div>
        <span>Cart</span>
      </NavLink>
    </nav>
  );
}

export default MobileNav;