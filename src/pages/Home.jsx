import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustBadges from "../components/TrustBadges";
import Categories from "../components/Categories";
import ProductGrid from "../components/ProductGrid";
import RecentlyViewed from "../components/RecentlyViewed";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustBadges />
      <Categories />
      <ProductGrid />
      <RecentlyViewed />
      <Footer />
    </>
  );
}

export default Home;