"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// --- ICONS (Completed your SVG paths) ---

const IconCube = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24">
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
    />
  </svg>
);

const IconRobot = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24">
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M8.25 21v-1.5m1.125-1.125c.371-.371.532-.88.284-1.32C9.384 16.5 8.25 15.75 8.25 15.75s-1.134.75-1.38 1.28c-.248.44-.087.949.284 1.32.37.37.88.53 1.32.28.53-.275 1.28-1.135 1.28-1.135s.86.755 1.135 1.28c.44.248.949.087 1.32-.28M15.75 8.25h1.5m-3.375-3.375c.371.371.532.88.284 1.32C13.616 6.75 12.75 7.5 12.75 7.5s-1.134-.75-1.38-1.28c-.248-.44-.087-.949.284-1.32.37-.37.88-.53 1.32-.28.53.275 1.28 1.135 1.28 1.135s.86-.755 1.135-1.28c.44-.248.949-.087 1.32.28M3 15.75h1.5m16.5 0h-1.5"
    />
  </svg>
);

const IconHeadset = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24">
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
    />
  </svg>
);

// --- EXPANDED DATA FOR MODAL ---

// --- PROJECTS DATA ---

const features = [
  {
    id: "SPO2_001",
    icon: IconHeadset, // can swap with a better icon if you want
    title: "SpO₂ Measurer",
    desc: "Real-time blood oxygen level measurement using sensors.",
    status: "ONLINE",
    longDesc:
      "A wearable device that accurately measures blood oxygen saturation using photoplethysmography (PPG) sensors. Includes signal processing, calibration, and real-time display of SpO₂ levels for health monitoring.",
    details: [
      "PPG Sensor Integration",
      "Real-Time Signal Processing",
      "Calibration for Accuracy",
      "Portable & Lightweight Design",
    ],
  },
  {
    id: "PROSTH_ARM_002",
    icon: IconRobot,
    title: "Prosthetic Arm",
    desc: "3D-printed prosthetic arm with servo-driven finger movement.",
    status: "STABLE",
    longDesc:
      "A mechanical prosthetic arm with 3D-printed fingers controlled via servo motors and string tendons. Designed to mimic human hand movements with modular components and easy adjustability.",
    details: [
      "3D-Printed Fingers & Arm",
      "Servo Motor Control",
      "String/Tendon Mechanism",
      "Customizable Grip Patterns",
    ],
  },
  {
    id: "INTERVENTION_GPT_003",
    icon: IconCube,
    title: "Intervention GPT for Road",
    desc: "AI model for detecting and recommending interventions on road networks.",
    status: "BETA",
    longDesc:
      "A GPT-based model analyzing traffic and road conditions to recommend interventions for maintenance, safety, and congestion reduction. Integrates AI predictions with real-world road datasets for actionable insights.",
    details: [
      "Traffic Data Analysis",
      "AI-Based Intervention Recommendations",
      "Predictive Modeling",
      "Integration with Road Databases",
    ],
  },
  {
    id: "ALGOSCAN_004",
    icon: IconCube,
    title: "Encryption Algorithm Identifier (AlgoScan)",
    desc: "Automatically detects encryption algorithms used in data streams.",
    status: "EXPERIMENTAL",
    longDesc:
      "AlgoScan analyzes data streams and identifies encryption algorithms using pattern recognition and feature extraction. Supports multiple encryption types and provides detailed reporting on detected schemes.",
    details: [
      "Feature Extraction from Ciphertext",
      "Multi-Algorithm Support",
      "Pattern Recognition Engine",
      "Detailed Reporting Interface",
    ],
  },
];

// --- NEW MODAL COMPONENT ---

const FeatureModal = ({ feature, onClose }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "ONLINE":
        return "text-lime-400";
      case "STABLE":
        return "text-cyan-400";
      case "EXPERIMENTAL":
        return "text-yellow-400";
      case "BETA":
        return "text-purple-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm cursor-pointer"
      />

      {/* Modal Window */}
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.05}
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 100 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="fixed inset-0 m-auto z-50 flex flex-col w-11/12 max-w-3xl h-auto max-h-[80vh] bg-black/90 rounded-lg border border-lime-500/30 overflow-hidden shadow-2xl shadow-lime-500/20 cursor-grab active:cursor-grabbing"
      >
        {/* Title Bar */}
        <div className="flex-shrink-0 flex items-center justify-between p-4 bg-gray-900/50 border-b border-lime-500/30">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-lime-500 rounded-full" />
            <span className="w-3 h-3 bg-gray-600 rounded-full" />
            <span className="w-3 h-3 bg-gray-600 rounded-full" />
          </div>
          <span className="font-mono text-sm text-lime-400">{feature.id}</span>
          <button
            onClick={onClose}
            className="font-mono text-lg text-gray-500 hover:text-red-500 transition-colors duration-200"
          >
            [X]
          </button>
        </div>

        {/* Scanline Overlay */}
        <div className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none z-10 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,1)_0px,rgba(255,255,255,1)_1px,transparent_1px,transparent_3px)]" />

        {/* Content */}
        <div className="flex-grow p-8 overflow-y-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Left Column (Icon & Status) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              className="flex flex-col items-center text-center"
            >
              <feature.icon className="w-24 h-24 text-lime-400 mb-4" />
              <h3 className="font-mono text-2xl text-white mb-2 tracking-tight">
                {feature.title}
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className={`relative flex h-3 w-3 ${
                    feature.status === "ONLINE" ? "animate-pulse" : ""
                  }`}
                >
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full ${getStatusColor(
                      feature.status
                    ).replace("text-", "bg-")} opacity-75`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-3 w-3 ${getStatusColor(
                      feature.status
                    ).replace("text-", "bg-")}`}
                  ></span>
                </span>
                <span
                  className={`font-mono text-sm ${getStatusColor(
                    feature.status
                  )}`}
                >
                  STATUS: {feature.status}
                </span>
              </div>
            </motion.div>

            {/* Right Column (Details) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 },
              }}
              className="md:col-span-2"
            >
              <h4 className="font-mono text-lg text-lime-400 mb-2">
                // EXECUTION_BRIEF
              </h4>
              <p className="text-white/70 text-base leading-relaxed font-mono mb-6">
                {feature.longDesc}
              </p>

              <h4 className="font-mono text-lg text-lime-400 mb-3">
                // SYSTEM_SPECS
              </h4>
              <ul className="space-y-2">
                {feature.details.map((detail, i) => (
                  <motion.li
                    key={i}
                    custom={i}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="font-mono text-white/60 text-sm flex items-center"
                  >
                    <span className="text-lime-400 mr-2">»</span> {detail}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

// --- MAIN FEATURES SECTION ---

const FeaturesSection = () => {
  const [selectedId, setSelectedId] = useState(null);

  const selectedFeature = features.find((f) => f.id === selectedId) || null;

  return (
    <>
      <section id="features" className="py-40 bg-transparent">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-24">
            {/* LEFT BLOCK */}
            <div className="max-w-[550px] text-white/80 leading-relaxed">
              <h2 className="text-5xl font-medium text-white tracking-tight mb-8 font-mono">
                Things I Build
              </h2>

              <p className="text-lg text-white/60 font-mono leading-loose mb-6">
                I design and develop real-world tech solutions—from medical
                devices and prosthetics to AI-driven analysis tools and
                cybersecurity systems. Each project is engineered for
                functionality, reliability, and measurable impact.
              </p>

              <p className="text-lg text-white/60 font-mono leading-loose">
                My work combines hardware, software, and AI to create devices
                and algorithms that perform, adapt, and solve complex problems.
                No fluff, just results.
              </p>
            </div>

            {/* RIGHT — Card Stack */}
            <div
              className="mx-auto"
              style={{ width: 320, height: 420, perspective: "1200px" }}
            >
              <div className="text-center mb-8">
                <p className="text-white/60 font-mono text-sm ml-1.5 md:text-base">
                  Drag the cards left or right to explore my projects.
                </p>
              </div>
              <Swiper
                modules={[EffectCards]}
                effect="cards"
                grabCursor={true}
                loop={false}
                className="h-full w-full"
                cardsEffect={{
                  perSlideOffset: 12,
                  perSlideRotate: 2,
                  rotate: true,
                  slideShadows: false,
                }}
              >
                {features.map((feature) => (
                  <SwiperSlide key={feature.id}>
                    <div
                      className="relative w-full h-full p-8 bg-transparent cursor-pointer"
                      onClick={() => setSelectedId(feature.id)}
                    >
                      <div
                        className="relative w-full h-full rounded-2xl
                        bg-black/90 backdrop-blur-xl border border-gray-400/10
                        shadow-[0_0_60px_-15px_rgba(255,255,255,0.15)]
                        p-10 flex flex-col items-center justify-center text-center
                        transition-all duration-300 hover:scale-[1.03] hover:shadow-lime-500/20"
                      >
                        <feature.icon className="w-16 h-16 text-lime-400 mb-6" />

                        <h3 className="font-mono text-2xl text-white mb-3 tracking-tight">
                          {feature.title}
                        </h3>

                        <p className="text-white/50 text-sm leading-relaxed font-mono">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* Render Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <FeatureModal
            feature={selectedFeature}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default FeaturesSection;
