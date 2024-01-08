"use client";
import Header from "./components/Header";
import { useTheme } from "next-themes";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import PortfolioSection from "./components/PortfolioSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <AboutSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </>
  );
}
