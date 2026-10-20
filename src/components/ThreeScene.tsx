"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x09090b, 0.035);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3D OBJECTS GROUP
    const universeGroup = new THREE.Group();
    scene.add(universeGroup);

    // 1. CENTRAL CYBERNETIC ICOSAHEDRON (Floating Core)
    const coreGeometry = new THREE.IcosahedronGeometry(2.2, 1);
    const coreWireframe = new THREE.WireframeGeometry(coreGeometry);
    const coreLineMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6, // Brand primary
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const coreMesh = new THREE.LineSegments(coreWireframe, coreLineMaterial);
    universeGroup.add(coreMesh);

    // Inner glowing sphere inside core
    const innerGeo = new THREE.SphereGeometry(1.2, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Cyan
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    universeGroup.add(innerSphere);

    // 2. ORBITING TORUS RING (Cosmic Gyroscope)
    const torusGeo = new THREE.TorusGeometry(3.4, 0.04, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = Math.PI / 3;
    universeGroup.add(torus);

    const torusGeo2 = new THREE.TorusGeometry(3.8, 0.02, 16, 100);
    const torusMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7, // Purple glow accent
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const torus2 = new THREE.Mesh(torusGeo2, torusMat2);
    torus2.rotation.y = Math.PI / 4;
    universeGroup.add(torus2);

    // 3. 3D PARTICLE STARFIELD (Floating Nebula)
    const particleCount = 700;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x3b82f6); // Blue
    const color2 = new THREE.Color(0x06b6d4); // Cyan
    const color3 = new THREE.Color(0xa855f7); // Violet

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 22;
      positions[i3 + 1] = (Math.random() - 0.5) * 16;
      positions[i3 + 2] = (Math.random() - 0.5) * 18;

      const mixedColor = i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3;
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // MOUSE INTERACTION & SMOOTH LERP
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onPointerMove = (e: MouseEvent) => {
      mouseX = (e.clientX - windowHalfX) * 0.0012;
      mouseY = (e.clientY - windowHalfY) * 0.0012;
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });

    // SCROLL INTERACTION
    let scrollProgress = 0;
    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      scrollProgress = Math.min(scrollY / maxScroll, 1);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // RESIZE LISTENER
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", onResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate central cyber core
      coreMesh.rotation.x = elapsedTime * 0.15 + targetY;
      coreMesh.rotation.y = elapsedTime * 0.2 + targetX;

      innerSphere.rotation.x = -elapsedTime * 0.25;
      innerSphere.rotation.y = -elapsedTime * 0.3;

      torus.rotation.z = elapsedTime * 0.35 + targetX * 0.5;
      torus.rotation.x = Math.PI / 3 + targetY * 0.5;

      torus2.rotation.z = -elapsedTime * 0.25;
      torus2.rotation.y = Math.PI / 4 + targetX * 0.8;

      // Particle subtle wave drift
      particles.rotation.y = elapsedTime * 0.03 + targetX * 0.2;
      particles.rotation.x = elapsedTime * 0.015 + targetY * 0.2;

      // Scroll camera zoom / depth shift
      camera.position.z = 7 + scrollProgress * 3;
      camera.position.y = -scrollProgress * 4 + targetY * 1.5;
      camera.position.x = targetX * 1.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      coreGeometry.dispose();
      coreWireframe.dispose();
      coreLineMaterial.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      torusGeo2.dispose();
      torusMat2.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1] overflow-hidden opacity-90"
      aria-hidden="true"
    />
  );
}
