import Header from "./components/Header";
import Hero from "./components/Hero";
import ArticlesSection from "./components/ArticlesSection";
import PortfolioSection from "./components/PortfolioSection";
import Footer from "./components/Footer";
import ShootingStars from "./components/ShootingStars";


export default function Home() {
  return (
    <>
      <ShootingStars />
      <Header />
      <Hero />
      <ArticlesSection />
      <PortfolioSection />
      <Footer />
    </>
  );
}
