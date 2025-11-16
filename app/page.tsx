"use client";
import React, { useState, useEffect, useRef } from "react";
import HeroSection from "./components/Hero";
import Navbar from "./components/Navbar";
import FeaturesSection from "./components/Projects";
import GallerySection from "./components/Skills";
import HowItWorksSection from "./components/AboutMe";
import PricingCTASection from "./components/Contact";
import Footer from "./components/FooterSection";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";

import Lenis from "lenis";
import ContactSection from "./components/Contact";

// --- Loading Screen Component ---
const LoadingOverlay = ({ loading }: any) => (
  <div
    className={`fixed inset-0 z-100 flex items-center justify-center bg-black transition-opacity duration-500 ${
      loading ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    <div className="glitch-bg" />
    <div className="absolute top-0 left-0 w-full h-[5px] bg-lime-400 shadow-glow-lime animate-[scan_2s_cubic-bezier(0.645,0.045,0.355,1)_forwards]" />
  </div>
);

// --- Main App Component ---
export default function App() {
  const [loading, setLoading] = useState(true);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  // Handle loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll percentage
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.05,
      wheelMultiplier: 0.7,
      duration: 1.2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // forward scroll events so your existing logic still works
    lenis.on("scroll", ({ scroll }) => {
      const viewportHeight = window.innerHeight;
      const pct = Math.min(1, scroll / viewportHeight);
      setScrollPct(pct);
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  // Handle dynamic script loading for Three.js and Swiper
  useEffect(() => {
    const loadScript = (src: any, onDone: any) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = onDone;
      script.onerror = () => console.error(`Failed to load script: ${src}`);
      document.body.appendChild(script);
      return script;
    };

    let threeLoaded = false;
    let controlsLoaded = false;
    let swiperLoaded = false;

    const checkAllLoaded = () => {
      if (threeLoaded && controlsLoaded && swiperLoaded) {
        setScriptsLoaded(true);
      }
    };

    // Load Three.js r128
    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js",
      () => {
        threeLoaded = true;
        // Load OrbitControls (dependent on Three.js)
        loadScript(
          "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js",
          () => {
            controlsLoaded = true;
            checkAllLoaded();
          }
        );
      }
    );

    // Load Swiper.js
    loadScript("https://unpkg.com/swiper/swiper-bundle.min.js", () => {
      swiperLoaded = true;
      checkAllLoaded();
    });

    // Also load Swiper CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/swiper/swiper-bundle.min.css";
    document.head.appendChild(link);

    // Cleanup scripts on unmount
    return () => {
      // In a real app, you might want to find and remove the scripts/link
      // For this single-page context, it's less critical.
    };
  }, []);

  // Handle scroll-reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [loading]); // Re-run when loading is done to find elements

  return (
    <>
      <LoadingOverlay loading={loading} />

      {!loading && (
        <div className="bg-black snap-y snap-mandatory">
          <Navbar />
          <main>
            <section id="hero" className="snap-start h-[110vh]">
              <HeroSection
                scriptsLoaded={scriptsLoaded}
                scrollPct={scrollPct}
              />
            </section>

            <section id="about" className="snap-start h-[110vh]">
              <AboutMe />
            </section>

            <section id="projects" className="snap-start h-[110vh]">
              <FeaturesSection scriptsLoaded={scriptsLoaded} />
            </section>
            <Skills />

            <section id="contact" className="snap-start h-[110vh]">
              <ContactSection />
            </section>
          </main>
        </div>
      )}
    </>
  );
}
