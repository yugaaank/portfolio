"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "./components/Hero";
import Navbar from "./components/Navbar";
import FeaturesSection from "./components/Projects";
import GallerySection from "./components/Skills";
import AboutMe from "./components/AboutMe";
import ContactSection from "./components/Contact";

import Lenis from "lenis";

const LoadingOverlay = ({ loading }: { loading: boolean }) => (
  <div
    className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-95 backdrop-blur-sm transition-opacity duration-500 ${
      loading ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    {/* Sliding neon bar */}
    <div className="relative w-80 h-1 bg-lime-900 overflow-hidden mb-6">
      <div className="absolute top-0 left-[-100%] w-full h-full bg-lime-400 animate-[slide_2s_linear_infinite]"></div>
    </div>

    {/* Glitch-style text */}
    <span className="text-lime-400 font-mono text-xl tracking-widest relative after:content-['LOADING...'] after:absolute after:left-0 after:text-lime-600 after:translate-x-0.5 after:blur-sm animate-[glitch_1s_steps(2)_infinite]">
      LOADING...
    </span>

    <style jsx>{`
      @keyframes slide {
        0% {
          left: -100%;
        }
        50% {
          left: 100%;
        }
        100% {
          left: -100%;
        }
      }
      @keyframes glitch {
        0% {
          transform: translate(0, 0);
        }
        20% {
          transform: translate(-2px, 2px);
        }
        40% {
          transform: translate(2px, -2px);
        }
        60% {
          transform: translate(-1px, 1px);
        }
        80% {
          transform: translate(1px, -1px);
        }
        100% {
          transform: translate(0, 0);
        }
      }
    `}</style>
  </div>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // --- Simple Slow Lenis Scroll ---
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
      smoothWheel: true,
    });

    // Animation function
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    // Start the animation loop
    requestAnimationFrame(raf);

    // Cleanup on component unmount
    return () => lenis.destroy();
  }, []);
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
  return (
    <>
      <LoadingOverlay loading={loading} />

      {!loading && (
        <div className="bg-black">
          <Navbar />
          <main>
            <section id="hero" className="h-[110vh]">
              <HeroSection
                scriptsLoaded={scriptsLoaded}
                scrollPct={scrollPct}
              />
            </section>

            <section id="about" className="h-[110vh]">
              <AboutMe />
            </section>

            <section id="projects" className="h-[110vh]">
              <FeaturesSection />
            </section>

            <section id="skills" className="h-[110vh]">
              <GallerySection />
            </section>

            <section id="contact" className="h-[90vh]">
              <ContactSection />
            </section>
          </main>
        </div>
      )}
    </>
  );
}
