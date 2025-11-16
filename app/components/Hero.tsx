"use client";

import React, { useEffect, useRef } from "react";
import "../globals.css";
import { TypeAnimation } from "react-type-animation";
import { Fira_Code } from "next/font/google";

// --- Fira Code ---
const fira = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// --- Extend window for THREE.js ---
declare global {
  interface Window {
    THREE?: any;
  }
}

// --- Hero Section Component ---
interface HeroSectionProps {
  scriptsLoaded: boolean;
  scrollPct: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  scriptsLoaded,
  scrollPct,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const scrollPctRef = useRef<number>(scrollPct);

  // Keep latest scrollPct
  useEffect(() => {
    scrollPctRef.current = scrollPct;
  }, [scrollPct]);

  useEffect(() => {
    if (
      !scriptsLoaded ||
      !mountRef.current ||
      !window.THREE ||
      !window.THREE.OrbitControls
    )
      return;

    const THREE = window.THREE;
    const mount = mountRef.current;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Geometry & Material
    const geometry = new THREE.TorusKnotGeometry(1.5, 0.55, 250, 24);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff55,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enabled = false;
    controls.autoRotate = false;
    controls.enableDamping = true;

    // Animate
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      const targetRotationY = scrollPctRef.current * Math.PI * 2;
      const targetRotationX = scrollPctRef.current * Math.PI * 0.5;

      torusKnot.rotation.y += (targetRotationY - torusKnot.rotation.y) * 0.05;
      torusKnot.rotation.x += (targetRotationX - torusKnot.rotation.x) * 0.05;
      torusKnot.rotation.z += 0.01;
      torusKnot.position.x = Math.sin(Date.now() * 0.001) * 0.3;
      torusKnot.position.y = Math.cos(Date.now() * 0.001) * 0.3;

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener("resize", handleResize);
      if (mount.contains(renderer.domElement))
        mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
    };
  }, [scriptsLoaded]);

  return (
    <section
      className={`relative h-screen flex items-center justify-center text-center overflow-hidden ${fira.className}`}
    >
      {/* THREE.js Mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Typing Overlay */}
      <div className="relative z-10 flex flex-col items-center p-4">
        <div className="text-2xl font-extralight text-justify">
          <TypeAnimation
            sequence={[
              "Hello",
              500,
              "Hello there,",
              500,
              "Hello there,\nI'm",
              500,
              "Hello there,\nI'm Yugank Rathore",
              500,
            ]}
            wrapper="span"
            cursor={true}
            className="whitespace-pre-line text-9xl font-firacode"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
