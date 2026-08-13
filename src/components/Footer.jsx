import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>NovaCart</h3>
          <p>
            Shop smarter with thousands of premium products across
            electronics, fashion, beauty and accessories.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/deals">Deals</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
        </div>

        <div className="footer-links">
          <h4>Categories</h4>
          <Link to="/products?category=smartphones">Smartphones</Link>
          <Link to="/products?category=laptops">Laptops</Link>
          <Link to="/products?category=beauty">Beauty</Link>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="footer-social-icons">
            <span>
              <FaInstagram />
            </span>
            <span>
              <FaTwitter />
            </span>
            <span>
              <FaFacebook />
            </span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} NovaCart. Built with React.</p>
      </div>
    </footer>
  );
}

export default Footer;