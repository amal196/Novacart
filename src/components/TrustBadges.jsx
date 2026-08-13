import { FaTruck, FaUndo, FaShieldAlt, FaHeadset } from "react-icons/fa";

const BADGES = [
  {
    icon: <FaTruck />,
    title: "Free Delivery",
    subtitle: "On orders above ₹499",
  },
  {
    icon: <FaUndo />,
    title: "7 Days Return",
    subtitle: "No questions asked",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Payment",
    subtitle: "100% secure payment",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    subtitle: "We are here to help",
  },
];

function TrustBadges() {
  return (
    <section className="trust-badges">
      {BADGES.map((b, i) => (
        <div key={i} className="trust-badge">
          <span className="trust-badge-icon">{b.icon}</span>
          <div>
            <h4>{b.title}</h4>
            <p>{b.subtitle}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default TrustBadges;