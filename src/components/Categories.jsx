import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/api";
import { useInView } from "../hooks/UseInView";

const CATEGORY_META = [
  { value: "smartphones", label: "Smartphones", icon: "📱" },
  { value: "laptops", label: "Laptops", icon: "💻" },
  { value: "mens-shoes", label: "Men's Shoes", icon: "👞" },
  { value: "womens-shoes", label: "Women's Shoes", icon: "👠" },
  { value: "mens-watches", label: "Men's Watches", icon: "⌚" },
  { value: "womens-watches", label: "Women's Watches", icon: "⌚" },
  { value: "sunglasses", label: "Sunglasses", icon: "🕶️" },
  { value: "beauty", label: "Beauty", icon: "💄" },
];

function Categories() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});
  const [ref, isInView] = useInView();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const data = await getProducts();
        const map = {};
        data.forEach((p) => {
          map[p.category] = (map[p.category] || 0) + 1;
        });
        setCounts(map);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCounts();
  }, []);

  return (
    <section
      className={`categories-section reveal ${isInView ? "in-view" : ""}`}
      id="categories"
      ref={ref}
    >
      <div className="section-header">
        <h2>Shop By Category</h2>
      </div>

      <div className="categories-grid">
        {CATEGORY_META.map((cat) => (
          <div
            key={cat.value}
            className="category-card"
            onClick={() => navigate(`/products?category=${cat.value}`)}
          >
            <div className="category-icon">{cat.icon}</div>
            <div>
              <h4>{cat.label}</h4>
              <p>{counts[cat.value] || 0} Items</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;