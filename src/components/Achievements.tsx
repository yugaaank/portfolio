"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const achievements = [
  { title: "Hackathon Winner", desc: "Won 1st place at XYZ Hackathon." },
  { title: "Research Paper", desc: "Published ML paper in IEEE." },
  { title: "Open Source", desc: "Contributed to React ecosystem." },
  { title: "Project Lead", desc: "Led a 5-member robotics project." },
];

export default function AchievementsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Text behavior
  const titleScale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1.2]);
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);
  const sectionOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  // All cards appear together
  const cardsOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const cardsY = useTransform(scrollYProgress, [0.35, 0.55], [100, 0]);

  return (
    <section
      ref={ref}
      className="relative flex flex-col justify-center items-center min-h-[150vh] bg-linear-to-b from-0% via-black to-background text-white overflow-hidden"
    >
      {/* Big Text */}
      <motion.h1
        style={{ scale: titleScale, opacity: titleOpacity }}
        className="absolute top-1/2 -translate-y-1/2 text-[10vw] font-bold tracking-tight text-white/10"
      >
        Achievements
      </motion.h1>

      {/* Cards */}
      <motion.div
        style={{ opacity: sectionOpacity }}
        className="sticky top-0 h-screen flex justify-center items-center backdrop-blur-lg"
      >
        <motion.div
          style={{ opacity: cardsOpacity, y: cardsY }}
          className="grid grid-cols-2 gap-10"
        >
          {achievements.map((item, i) => (
            <div
              key={i}
              className="w-[250px] h-[200px] rounded-xl bg-white/10 backdrop-blur-lg p-6 border border-white/20 shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-sm text-white/70">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
