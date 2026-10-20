"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeHeroBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability gracefully
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) return;
    } catch (e) {
      return;
    }

    // 1. SCENE SETUP
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 2. 3D GEOMETRIES (CLEAN, MINIMALIST & SOPHISTICATED)
    
    // Core Outer Cage: Icosahedron with pristine electric blue wireframe
    const coreGeo = new THREE.IcosahedronGeometry(2.3, 1);
    const coreWireframe = new THREE.WireframeGeometry(coreGeo);
    const coreMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6, // Brand Primary Blue
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const coreMesh = new THREE.LineSegments(coreWireframe, coreMat);
    rootGroup.add(coreMesh);

    // Inner Glowing Polyhedron (Cyan jewel)
    const innerGeo = new THREE.OctahedronGeometry(1.3, 0);
    const innerWireframe = new THREE.WireframeGeometry(innerGeo);
    const innerMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4, // Cyan Accent
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const innerMesh = new THREE.LineSegments(innerWireframe, innerMat);
    rootGroup.add(innerMesh);

    // Gyroscopic Ring 1
    const ringGeo1 = new THREE.TorusGeometry(3.6, 0.025, 16, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3.2;
    rootGroup.add(ring1);

    // Gyroscopic Ring 2
    const ringGeo2 = new THREE.TorusGeometry(4.1, 0.02, 16, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x818cf8, // Indigo / violet accent
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = Math.PI / 6;
    rootGroup.add(ring2);

    // Ambient floating star dust / particles
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x3b82f6); // Brand blue
    const c2 = new THREE.Color(0x38bdf8); // Sky blue
    const c3 = new THREE.Color(0xa5b4fc); // Soft purple

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 20;
      positions[idx + 1] = (Math.random() - 0.5) * 14;
      positions[idx + 2] = (Math.random() - 0.5) * 16;

      const clr = i % 3 === 0 ? c1 : i % 3 === 1 ? c2 : c3;
      colors[idx] = clr.r;
      colors[idx + 1] = clr.g;
      colors[idx + 2] = clr.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 3. INTERACTIVE MOUSE PARALLAX WITH DAMPED SPRING
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mouseX = (e.clientX - w / 2) / (w / 2);
      mouseY = (e.clientY - h / 2) / (h / 2);
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });

    // Handle Resize
    const onResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", onResize);

    // 4. SMOOTH ANIMATION LOOP (60FPS+ with delta clock)
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth lerp toward mouse target
      targetX += (mouseX * 0.45 - targetX) * 0.05;
      targetY += (mouseY * 0.35 - targetY) * 0.05;

      // Clean, elegant rotations
      coreMesh.rotation.y = elapsed * 0.12 + targetX * 0.6;
      coreMesh.rotation.x = elapsed * 0.08 - targetY * 0.4;

      innerMesh.rotation.y = -elapsed * 0.18 + targetX * 0.4;
      innerMesh.rotation.z = elapsed * 0.14;

      ring1.rotation.z = elapsed * 0.15;
      ring1.rotation.x = Math.PI / 3.2 + targetY * 0.5;

      ring2.rotation.z = -elapsed * 0.12;
      ring2.rotation.y = Math.PI / 4 + targetX * 0.5;

      // Particle subtle ambient breathing
      particles.rotation.y = elapsed * 0.02 + targetX * 0.2;
      particles.rotation.x = -targetY * 0.15;

      // Subtle camera parallax
      camera.position.x = targetX * 0.8;
      camera.position.y = -targetY * 0.6;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 5. CLEANUP
    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationId);

      renderer.dispose();
      coreGeo.dispose();
      coreWireframe.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerWireframe.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    />
  );
}
