import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-left">
        <span className="hero-badge">Best Quality, Best Prices</span>
        <h1>
          Discover Amazing <span>Products</span>
        </h1>
        <p>
          Shop smarter with thousands of premium products across
          electronics, fashion, beauty and accessories.
        </p>
        <div className="hero-buttons">
          <button className="shop-btn" onClick={() => navigate("/products")}>
            Shop Now
          </button>
          <button className="explore-btn" onClick={() => navigate("/deals")}>
            Explore Deals
          </button>
        </div>
      </div>

      <div className="hero-right">
        <svg
          className="hero-illustration"
          width="100%"
          viewBox="0 0 680 520"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bagGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <linearGradient id="boxGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f9a8d4" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient id="tagGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fcd34d" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          <ellipse cx="520" cy="150" rx="190" ry="170" fill="#fce7f3" opacity="0.6" />
          <ellipse cx="400" cy="270" rx="260" ry="230" fill="var(--accent-soft)" />
          <ellipse cx="240" cy="410" rx="90" ry="16" fill="#000000" opacity="0.06" />
          <ellipse cx="420" cy="400" rx="110" ry="18" fill="#000000" opacity="0.06" />
          <ellipse cx="540" cy="230" rx="60" ry="12" fill="#000000" opacity="0.06" />

          <g className="hero-float-1" transform="rotate(-12 235 340)">
            <rect x="175" y="280" width="120" height="110" rx="10" fill="url(#boxGrad)" />
            <rect x="225" y="280" width="20" height="110" fill="#ffffff" opacity="0.85" />
            <rect x="175" y="322" width="120" height="20" fill="#ffffff" opacity="0.85" />
            <path
              d="M215 280 Q205 250 235 250 Q265 250 255 280"
              fill="none"
              stroke="#ec4899"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </g>

          <g className="hero-float-2" transform="rotate(-4 420 280)">
            <path
              d="M370 232 Q370 182 410 182 Q450 182 450 232"
              fill="none"
              stroke="#ffffff"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <rect x="340" y="232" width="140" height="150" rx="18" fill="url(#bagGrad)" />
            <circle cx="410" cy="307" r="9" fill="#ffffff" opacity="0.9" />
          </g>

          <g className="hero-float-3" transform="rotate(18 540 175)">
            <rect x="495" y="140" width="90" height="70" rx="12" fill="url(#tagGrad)" />
            <circle cx="515" cy="160" r="8" fill="var(--accent-soft)" />
          </g>

          <path
            className="hero-float-1"
            d="M580 90 L586 106 L602 112 L586 118 L580 134 L574 118 L558 112 L574 106 Z"
            fill="#7c3aed"
          />
          <path
            className="hero-float-3"
            d="M120 200 L124 210 L134 214 L124 218 L120 228 L116 218 L106 214 L116 210 Z"
            fill="#f59e0b"
          />
          <circle className="hero-float-2" cx="150" cy="330" r="6" fill="#ec4899" opacity="0.7" />
          <circle className="hero-float-1" cx="610" cy="260" r="5" fill="#7c3aed" opacity="0.6" />
          <circle className="hero-float-3" cx="300" cy="150" r="5" fill="#f59e0b" opacity="0.7" />
        </svg>
      </div>
    </section>
  );
}

export default Hero;