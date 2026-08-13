import { useState } from "react";

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "smartphones", label: "Smartphones" },
  { value: "laptops", label: "Laptops" },
  { value: "mens-shoes", label: "Men's Shoes" },
  { value: "womens-shoes", label: "Women's Shoes" },
  { value: "mens-watches", label: "Men's Watches" },
  { value: "womens-watches", label: "Women's Watches" },
  { value: "sunglasses", label: "Sunglasses" },
  { value: "beauty", label: "Beauty" },
];

const RATING_OPTIONS = [4.5, 4.0, 3.5, 3.0];

function ProductFilters({
  selectedCategory,
  onCategoryChange,
  maxPrice,
  ratingCounts,
  onApply,
}) {
  const [localPrice, setLocalPrice] = useState(maxPrice);
  const [localRatings, setLocalRatings] = useState([]);

  const toggleRating = (value) => {
    setLocalRatings((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value]
    );
  };

  return (
    <aside className="filters-sidebar">
      <h3>Categories</h3>
      <ul className="filter-categories">
        {CATEGORIES.map((cat) => (
          <li
            key={cat.value}
            className={cat.value === selectedCategory ? "active" : ""}
            onClick={() => onCategoryChange(cat.value)}
          >
            {cat.label}
          </li>
        ))}
      </ul>

      <h3>Price Range</h3>
      <input
        type="range"
        min="0"
        max={maxPrice}
        value={localPrice}
        onChange={(e) => setLocalPrice(Number(e.target.value))}
        className="price-slider"
      />
      <p className="price-value">
        ₹0 - ₹{localPrice.toLocaleString("en-IN")}
      </p>

      <h3>Rating</h3>
      <ul className="filter-ratings">
        {RATING_OPTIONS.map((r) => (
          <li key={r}>
            <label>
              <input
                type="checkbox"
                checked={localRatings.includes(r)}
                onChange={() => toggleRating(r)}
              />
              {r}★ &amp; above ({ratingCounts[r] || 0})
            </label>
          </li>
        ))}
      </ul>

      <button
        className="apply-filter-btn"
        onClick={() => onApply(localPrice, localRatings)}
      >
        Apply Filter
      </button>
    </aside>
  );
}

export default ProductFilters;