"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "./components/Hero";
import Navbar from "./components/Navbar";
import FeaturesSection from "./components/Projects";
import GallerySection from "./components/Skills";
import AboutMe from "./components/AboutMe";
import ContactSection from "./components/Contact";

import Lenis from "lenis";
// --- Loading Screen Component ---
const LoadingOverlay = ({ loading }: { loading: boolean }) => (
  <div
    className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${
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

  // --- Loading Screen ---
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // --- Lenis Smooth Scrolling ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // smooth animation duration
      easing: (t: number) => t, // linear easing (replace with custom if needed)
      lerp: 0.05, // interpolation for smoothness
      wheelMultiplier: 0.7,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Forward scroll percentage
    lenis.on("scroll", ({ scroll }) => {
      const viewportHeight = window.innerHeight;
      setScrollPct(Math.min(1, scroll / viewportHeight));
    });

    return () => lenis.destroy();
  }, []);

  // --- Dynamic Script Loader ---
  useEffect(() => {
    const loadScript = (src: string, onDone: () => void) => {
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
      if (threeLoaded && controlsLoaded && swiperLoaded) setScriptsLoaded(true);
    };

    // Load Three.js r128
    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js",
      () => {
        threeLoaded = true;
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

    // Swiper CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/swiper/swiper-bundle.min.css";
    document.head.appendChild(link);

    return () => {
      // Optional cleanup for scripts and link tags
    };
  }, []);

  // --- Scroll Reveal Animations ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, [loading]);

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
              <FeaturesSection />
            </section>

            <section id="skills" className="snap-start">
              <GallerySection />
            </section>

            <section id="contact" className="snap-start h-[110vh]">
              <ContactSection />
            </section>
          </main>
        </div>
      )}
    </>
  );
}
