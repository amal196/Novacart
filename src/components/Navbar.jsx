import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaSearch, FaMoon, FaSun } from "react-icons/fa";
import { useContext, useState, useEffect, useRef } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { ThemeContext } from "../context/ThemeContext";
import { getProducts } from "../services/api";
import MobileNav from "./MobileNav";
import "../styles/Navbar.css";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const blurTimeout = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Live search suggestions, debounced so we don't re-filter on every keystroke
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const data = await getProducts();
        const matches = data
          .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .slice(0, 5);
        setSuggestions(matches);
      } catch (error) {
        console.log(error);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/products");
    }
  };

  const handleSuggestionClick = (id) => {
    clearTimeout(blurTimeout.current);
    setSearchTerm("");
    setSuggestions([]);
    setShowSuggestions(false);
    navigate(`/product/${id}`);
  };

  // Small delay on blur so a click on a suggestion registers before the list hides
  const handleBlur = () => {
    blurTimeout.current = setTimeout(() => setShowSuggestions(false), 150);
  };

  // "Categories" scrolls to the Shop By Category section on Home.
  // If we're not on Home, go there first, then scroll once it's rendered.
  const handleCategoriesClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          NovaCart
        </Link>

        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={handleBlur}
          />
          <button type="submit">
            <FaSearch />
          </button>

          {showSuggestions && suggestions.length > 0 && (
            <div className="search-suggestions">
              {suggestions.map((p) => (
                <div
                  key={p.id}
                  className="search-suggestion-item"
                  onMouseDown={() => handleSuggestionClick(p.id)}
                >
                  <img src={p.thumbnail} alt={p.title} />
                  <div>
                    <p>{p.title}</p>
                    <span>₹{p.price.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </form>

        {/* Home / Products / Categories / Deals - hidden on mobile, MobileNav takes over */}
        <div className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Products
          </NavLink>
          <a href="/#categories" onClick={handleCategoriesClick}>
            Categories
          </a>
          <NavLink
            to="/deals"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Deals
          </NavLink>
        </div>

        {/* Theme toggle + wishlist/cart - stay visible on mobile too */}
        <div className="navbar-icons">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          <NavLink
            to="/wishlist"
            className={({ isActive }) => `cart-link ${isActive ? "active" : ""}`}
          >
            <FaHeart />
            <span className="cart-count">{wishlistItems.length}</span>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => `cart-link ${isActive ? "active" : ""}`}
          >
            <FaShoppingCart />
            <span className="cart-count">{cartItems.length}</span>
          </NavLink>
        </div>
      </nav>

      <MobileNav />
    </>
  );
}

export default Navbar;