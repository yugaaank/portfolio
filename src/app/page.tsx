"use client";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Lenis from "@studio-freight/lenis";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // ✅ Tie Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // ✅ Base scroll speed
    let currentDuration = 1.2;

    const setDuration = (value) => {
      if (currentDuration !== value) {
        lenis.options.duration = value;
        currentDuration = value;
      }
    };

    // ✅ Create section-based triggers
    ScrollTrigger.create({
      trigger: "#projects",
      start: "top center",
      end: "bottom center",
      onEnter: () => setDuration(5),
      onLeave: () => setDuration(3),
      onEnterBack: () => setDuration(5),
      onLeaveBack: () => setDuration(3),
    });

    ScrollTrigger.create({
      trigger: "#achievements",
      start: "top center",
      end: "bottom center",
      onEnter: () => setDuration(5),
      onLeave: () => setDuration(5),
      onEnterBack: () => setDuration(5),
      onLeaveBack: () => setDuration(5),
    });

    ScrollTrigger.create({
      trigger: "#about",
      start: "top center",
      end: "bottom center",
      onEnter: () => setDuration(5),
      onLeave: () => setDuration(5),
      onEnterBack: () => setDuration(5),
      onLeaveBack: () => setDuration(5),
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  // example scroll-based animation
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);
  return (
    <div>
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `
        linear-gradient(to right, #d1d5db 1px, transparent 1px),
        linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
      `,
            backgroundSize: "32px 32px",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
          }}
        ></div>

        {/* your actual content */}
        <div id="hero" className="relative z-10 text-white text-4xl font-light">
          <Hero />
        </div>
      </div>

      <div className=" flex justify-center m-10 fixed inset-0 z-100">
        <Navbar />
      </div>

      <div id="about">
        <About />
      </div>

      <div
        id="projects"
        className="flex flex-col items-center justify-center min-h-screen bg-background text-white"
      >
        <Projects />
      </div>
      <div id="achievements">
        <Achievements />
      </div>
    </div>
  );
}
