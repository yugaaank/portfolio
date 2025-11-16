"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Github, Linkedin, Apple } from "lucide-react";

const islandVariants: Variants = {
  hidden: {
    y: -40,
    opacity: 0,
    width: "120px",
    borderRadius: "9999px",
  },
  visible: {
    y: 0,
    opacity: 1,
    width: "calc(100% - 32px)",
    borderRadius: "12px",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 26,
      opacity: { duration: 0.2 },
      width: { type: "spring", stiffness: 240, damping: 22 },
    },
  },
};

const NAV_ITEMS = [
  { label: "Home", id: "hero" },
  { label: "Who Am I?", id: "about" },
  { label: "Things I Create", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id)
    ).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const lenis = (window as any).lenis;

    if (lenis) {
      lenis.scrollTo(el, {
        offset: 0,
        duration: 1.2,
        easing: (x: number) => 1 - Math.pow(1 - x, 3),
      });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      variants={islandVariants}
      className="
        fixed top-4 left-1/2 -translate-x-1/2
        max-w-[900px] h-14 z-50
        bg-black/70 backdrop-blur-xl
        border border-white/10
        rounded-2xl px-6
        flex items-center justify-between
        overflow-hidden
      "
    >
      <div className="flex items-center gap-2 cursor-pointer select-none">
        <Apple size={20} />
        <span className="font-semibold text-sm">Welcome</span>
      </div>

      <div className="hidden sm:flex items-center gap-6">
        {NAV_ITEMS.map((item) => (
          <span
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`text-sm font-medium cursor-pointer transition ${
              active === item.id ? "text-white" : "text-gray-400"
            }`}
          >
            {item.label}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-5">
        <a
          href="https://github.com/yugaaank/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          <Github size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/yugank-rathore-617614317/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          <Linkedin size={20} />
        </a>
      </div>
    </motion.nav>
  );
}
