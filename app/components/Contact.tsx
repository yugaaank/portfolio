"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ICONS
const IconCopy = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 4h8a2 2 0 002-2V8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

const IconCheck = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

// SCRAMBLE HOOK
const useScramble = (text, delay = 50, chars = "!<>-_\\/[]{}—=+*^?#") => {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef(null);

  const scramble = () => {
    let i = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const out = text
        .split("")
        .map((c, idx) =>
          idx < i
            ? text[idx]
            : c === " "
            ? " "
            : chars[Math.floor(Math.random() * chars.length)]
        )
        .join("");

      setDisplay(out);

      if (i >= text.length) clearInterval(intervalRef.current);
      i += 1 / 3;
    }, delay);
  };

  const unscramble = () => {
    let i = text.length;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const out = text
        .split("")
        .map((c, idx) =>
          idx > i
            ? text[idx]
            : c === " "
            ? " "
            : chars[Math.floor(Math.random() * chars.length)]
        )
        .join("");

      setDisplay(out);

      if (i <= 0) {
        clearInterval(intervalRef.current);
        setDisplay(text);
      }

      i -= 1 / 2;
    }, delay);
  };

  return [
    display,
    {
      onMouseEnter: scramble,
      onMouseLeave: unscramble,
    },
  ];
};

// MAIN COMPONENT
const ContactSection = () => {
  const [isCopied, setIsCopied] = useState(false);
  const email = "yugaankrathore@gmail.com";

  const [scrambled, events] = useScramble(email, 30);

  const logLines = [
    "Initializing secure channel...",
    "Establishing handshake...",
    "Connection verified.",
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-36 bg-transparent">
      <motion.div
        className="container mx-auto px-6 max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-10 shadow-[0_0_40px_-10px_rgba(255,255,255,0.15)]">
          <h2 className="text-3xl font-medium text-white tracking-tight mb-4 font-mono">
            Contact
          </h2>

          <p className="text-md text-white/60 font-mono mb-8 leading-relaxed">
            Reach out via the secure ID below.
          </p>

          {/* LOG BLOCK */}
          <div className="bg-black/40 p-4 rounded-lg border border-white/10 mb-8">
            <AnimatePresence>
              {logLines.map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.25 }}
                  className="font-mono text-sm text-white/60"
                >
                  <span className="text-white/40 mr-2">&gt;</span> {line}
                </motion.p>
              ))}
            </AnimatePresence>
          </div>

          {/* EMAIL */}
          <div className="text-center">
            <h3 className="font-mono text-white/40 text-xs tracking-widest mb-3">
              TRANSMISSION ID
            </h3>

            <div
              className="inline-block cursor-pointer group"
              onClick={handleCopy}
              {...events}
            >
              <div className="font-mono text-2xl md:text-3xl text-white border-b border-white/10 px-4 py-3 transition-colors duration-300 group-hover:border-white/30">
                {scrambled}
              </div>
            </div>

            {/* COPY INDICATOR */}
            <div className="h-8 mt-4">
              <AnimatePresence mode="wait">
                {isCopied ? (
                  <motion.div
                    key="copied"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center justify-center gap-2 font-mono text-white"
                  >
                    <IconCheck className="w-5 h-5" />
                    COPIED
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ delay: 1 }}
                    className="flex items-center justify-center gap-2 font-mono text-white/40"
                  >
                    <IconCopy className="w-5 h-5" />
                    CLICK TO COPY
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
