//////////////////////////////////////////////////////
// Imports
//////////////////////////////////////////////////////
"use client";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import PortfolioSection from "./components/PortfolioSection";
import Footer from "./components/Footer";

//////////////////////////////////////////////////////
// Home Page Component
//////////////////////////////////////////////////////
export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <AboutSection />
      <PortfolioSection />
      <Footer />
    </>
  );
}
