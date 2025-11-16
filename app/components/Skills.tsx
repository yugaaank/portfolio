"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

// --- Skill Data ---
// (No changes here, data is the same, 'level' is just not used)
const skillCategories = [
  {
    title: "// Core_Web_Stack",
    skills: [
      { name: "React / React Native", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 85 },
      { name: "Three.js / R3F", level: 70 },
    ],
  },
  {
    title: "// Server_&_Infra",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Python", level: 80 },
      { name: "Rust", level: 65 },
      { name: "SQL (Postgres)", level: 85 },
      { name: "Docker", level: 75 },
    ],
  },
  {
    title: "// Utility_&_Tools",
    skills: [
      { name: "Git & GitHub", level: 95 },
      { name: "Linux / Shell", level: 85 },
      { name: "Figma", level: 70 },
      { name: "AI / LLM Integration", level: 80 },
    ],
  },
];

// --- Main Skills Component (Tabbed Interface, No Bars) ---

export default function Skills() {
  const title = "> ./system-diag --skills --load-module";
  const [activeIndex, setActiveIndex] = useState(0); // Track active tab

  // --- Animation Variants ---
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  // Variants for the content area (the list of bars)
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  // Variants for the list of skills (staggering)
  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Stagger each skill
      },
    },
  };

  // Variants for each individual skill item
  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section
      id="skills"
      className="w-full bg-black text-gray-200 font-mono py-24 md:py-32 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Animated Title */}
        <motion.h2
          className="text-2xl md:text-4xl mb-12 flex"
          variants={titleContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {title.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
          <motion.span
            className="w-2 h-5 md:h-8 bg-green-400 ml-2"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          />
        </motion.h2>

        {/* --- Tab Navigation --- */}
        <div className="flex space-x-4 border-b border-gray-800 mb-8">
          {skillCategories.map((category, index) => (
            <button
              key={category.title}
              onClick={() => setActiveIndex(index)}
              className={`relative py-3 px-4 text-sm md:text-base font-medium transition-colors duration-200
                ${
                  activeIndex === index
                    ? "text-green-400" // Active tab
                    : "text-gray-500 hover:text-gray-300" // Inactive tab
                }
              `}
            >
              {category.title}
              {/* Animated Underline */}
              {activeIndex === index && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-400"
                  layoutId="skill-underline" // Framer Motion magic
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* --- Tab Content --- */}
        <div className="min-h-[250px]">
          {" "}
          {/* Min height to prevent layout jump */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex} // This makes AnimatePresence work
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Staggered list of skills */}
              <motion.ul
                className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3"
                variants={listContainerVariants}
              >
                {skillCategories[activeIndex].skills.map((skill) => (
                  <motion.li
                    key={skill.name}
                    className="flex items-center"
                    variants={listItemVariants}
                  >
                    <span className="text-green-500 mr-2 text-lg">›</span>
                    <span className="text-gray-300 text-sm md:text-base hover:text-green-300 hover:translate-x-1 transition-all duration-200 cursor-default">
                      {skill.name}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
