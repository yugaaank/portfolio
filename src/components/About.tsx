"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 3, ease: "easeIn" }}
      className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-0% via-black to-background text-white"
    >
      <section className="py-10 text-center">
        <h1 className="text-3xl font-bold mb-2">About me</h1>
        <p>Some content here...</p>
      </section>
      <motion.div
        className="w-3/4 border-2 rounded-full border-white/60 my-8"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{
          opacity: [0.6, 2, 0.6],
          scaleX: [1, 1.2, 1],
        }}
        transition={{
          opacity: {
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          },
          scaleX: { duration: 2.5, ease: [0.45, 0, 0.55, 1], repeat: Infinity },
        }}
        style={{ originX: 0.5 }}
      />
      {/* Separator */}
      <section className="py-10 text-center">
        <h1 className="text-3xl font-bold mb-2">What I know</h1>
        <p>More content...</p>
      </section>
    </motion.div>
  );
}
