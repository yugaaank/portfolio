import React, { useEffect, useRef } from "react";
import "../globals.css";
import { TypeAnimation } from "react-type-animation";
import { Fira_Code } from "next/font/google";

const fira = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// --- Hero Section Component ---
const HeroSection = ({ scriptsLoaded, scrollPct }: any) => {
  const mountRef = useRef(null);
  const animationFrameId = useRef(null);
  const scrollPctRef = useRef(scrollPct);

  // Keep a ref to the latest scrollPct to avoid re-triggering the main effect
  // This allows the animation loop to access the latest value
  useEffect(() => {
    scrollPctRef.current = scrollPct;
  }, [scrollPct]);

  useEffect(() => {
    // Wait for scripts, mount, THREE, and THREE.OrbitControls
    if (
      !scriptsLoaded ||
      !mountRef.current ||
      !window.THREE ||
      !window.THREE.OrbitControls
    ) {
      return;
    }

    const THREE = window.THREE; // Get THREE object from window
    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Geometry
    const geometry = new THREE.TorusKnotGeometry(
      1.5, // was 1.8 — slightly larger
      0.55, // was 0.5 — barely thicker
      250, // a bit smoother, nothing crazy
      24
    );

    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff55, // hacker green
      wireframe: true,
      transparent: true,
      opacity: 0.22, // a bit more presence
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement); // Use THREE.OrbitControls
    controls.autoRotate = false; // Disable auto-rotate
    controls.enabled = false; // Disable all user interaction (zoom, pan, rotate)
    controls.enableDamping = true;

    // Animation loop
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      // Calculate target rotation based on scroll percentage
      const targetRotationY = scrollPctRef.current * Math.PI * 2; // Full 360-degree rotation
      const targetRotationX = scrollPctRef.current * Math.PI * 0.5; // 90-degree tilt

      // Smoothly interpolate (LERP) to the target rotation for a smoother feel
      torusKnot.rotation.y += (targetRotationY - torusKnot.rotation.y) * 0.05;
      torusKnot.rotation.x += (targetRotationX - torusKnot.rotation.x) * 0.05;
      torusKnot.rotation.z += 0.01; // constant spin
      torusKnot.position.x = Math.sin(Date.now() * 0.001) * 0.3; // subtle drift
      torusKnot.position.y = Math.cos(Date.now() * 0.001) * 0.3; // floating motion
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener("resize", handleResize);
      currentMount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
    };
  }, [scriptsLoaded]);

  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden font-firacode">
      <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />
      <div className="relative z-10 flex flex-col items-center p-4">
        <div className=" text-2xl font-extralight text-justify   ">
          <div className="{fira.classname}">
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
      </div>
    </section>
  );
};

export default HeroSection;
