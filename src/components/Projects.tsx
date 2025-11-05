"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

export default function Projects() {
  const projects = ["Project One", "Project Two", "Project Three"];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 🔹 Initialize Lenis (smooth scroll)
    const lenis = new Lenis({
      duration: 1.3,
      smoothWheel: true,
      smoothTouch: false,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // 🔹 Animate each card individually
    const cards = containerRef.current?.querySelectorAll(".project-card");
    cards?.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: -100,
          opacity: 1,
          scale: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1, // ← increase to slow down animation
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // cleanup
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="text-white flex flex-col items-center space-y-[5vh]"
    >
      {projects.map((p, i) => (
        <div
          key={i}
          className="project-card w-[90vw] h-[80vh] mx-auto rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 flex justify-center items-center text-center shadow-[0_0_40px_rgba(255,255,255,0.1)]"
        >
          <h2 className="text-3xl font-bold">{p}</h2>
        </div>
      ))}
    </div>
  );
}
