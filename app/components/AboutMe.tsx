// AboutMe Modal - Cinematic, Dialogue-Style, Terminal Vibe

import { motion } from "framer-motion";
import { Cpu, Terminal, HardDrive, Sparkles } from "lucide-react";
import { useRef } from "react";

export default function AboutMe() {
  const constraintsRef = useRef(null);

  const logContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const logItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const instructionVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { yoyo: Infinity, duration: 1, ease: "easeInOut" },
    },
  };

  return (
    <section
      id="about"
      ref={constraintsRef}
      className="w-full bg-black text-gray-200 font-mono py-24 md:py-32 px-4 relative overflow-hidden"
    >
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-4xl mb-10 font-light tracking-tight select-none text-gray-300"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
        >
          &gt; ./whoami
        </motion.h2>

        <motion.div
          className="bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-xl backdrop-blur-xl select-none relative"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.3}
          dragMomentum={true}
          whileDrag={{ scale: 1.02 }}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 15 }}
        >
          {/* Drag Instruction */}
          <motion.div
            className="absolute top-2 left-1/2 -translate-x-1/2 text-gray-500 text-xs md:text-sm font-mono select-none pointer-events-none"
            variants={instructionVariants}
            initial="hidden"
            animate="visible"
          >
            Drag the card to explore
          </motion.div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 cursor-grab active:cursor-grabbing">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <span className="text-sm text-gray-400">/usr/bin/profile</span>
          </div>

          {/* Body */}
          <motion.div
            className="px-6 py-6 space-y-4 text-[15px] leading-relaxed"
            variants={logContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Log
              icon={<HardDrive size={16} className="text-blue-400" />}
              label="[BOOT]"
              variants={logItemVariants}
            >
              System check... <span className="text-green-400">OK</span>
            </Log>

            <Log
              icon={<Cpu size={16} className="text-purple-400" />}
              label="[AUTH]"
              variants={logItemVariants}
            >
              Name: <span className="text-white">Yugaank Rathore</span> | Age:
              18
            </Log>

            <Log
              icon={<Sparkles size={16} className="text-pink-400" />}
              label="[INFO]"
              variants={logItemVariants}
            >
              Field: Computer Science (AI/ML) @ Christ University
            </Log>

            <Log
              icon={<Terminal size={16} className="text-green-400" />}
              label="[STATUS]"
              variants={logItemVariants}
            >
              Processing... No shortcuts. No surrender. Only forward.
            </Log>

            <Log
              icon={<Sparkles size={16} className="text-pink-400" />}
              label="[NOTE]"
              variants={logItemVariants}
            >
              Every line of code is a choice. Every choice leaves a mark.
            </Log>

            <Log
              icon={<HardDrive size={16} className="text-blue-400" />}
              label="[EXIT]"
              variants={logItemVariants}
            >
              ./profile complete. <span className="text-green-400">READY</span>
            </Log>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Log({ icon, label, children, variants }) {
  return (
    <motion.div className="flex items-start select-none" variants={variants}>
      <div className="flex items-center mr-3 text-gray-500 gap-2">
        {icon}
        <span className="text-green-400 font-medium">{label}</span>
      </div>
      <span
        className="flex-1 text-gray-300"
        dangerouslySetInnerHTML={{ __html: children }}
      />
    </motion.div>
  );
}
