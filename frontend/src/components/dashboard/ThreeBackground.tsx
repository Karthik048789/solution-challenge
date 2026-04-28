"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 2, 12);
    camera.lookAt(0, 0, 0);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0x6366f1, 0.15);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 0.8, 50);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 0.6, 50);
    pointLight2.position.set(-5, 3, -5);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x06b6d4, 0.4, 50);
    pointLight3.position.set(0, -3, 8);
    scene.add(pointLight3);

    // --- Materials ---
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });

    const wireframeMaterial2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });

    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });

    // --- Wireframe Sphere 1 (large, background) ---
    const sphere1Geo = new THREE.SphereGeometry(4, 24, 24);
    const sphere1 = new THREE.Mesh(sphere1Geo, wireframeMaterial);
    sphere1.position.set(-6, 1, -8);
    scene.add(sphere1);

    // --- Wireframe Sphere 2 (smaller, foreground) ---
    const sphere2Geo = new THREE.SphereGeometry(2.5, 20, 20);
    const sphere2 = new THREE.Mesh(sphere2Geo, wireframeMaterial2);
    sphere2.position.set(7, -1, -5);
    scene.add(sphere2);

    // --- Wireframe Sphere 3 (medium) ---
    const sphere3Geo = new THREE.SphereGeometry(1.8, 16, 16);
    const sphere3 = new THREE.Mesh(sphere3Geo, wireframeMaterial);
    sphere3.position.set(2, 4, -10);
    scene.add(sphere3);

    // --- Torus Ring 1 ---
    const torus1Geo = new THREE.TorusGeometry(3, 0.08, 16, 100);
    const torus1 = new THREE.Mesh(torus1Geo, torusMaterial);
    torus1.position.set(-3, 0, -4);
    torus1.rotation.x = Math.PI * 0.4;
    scene.add(torus1);

    // --- Torus Ring 2 ---
    const torus2Geo = new THREE.TorusGeometry(2, 0.05, 16, 80);
    const torus2 = new THREE.Mesh(torus2Geo, wireframeMaterial2);
    torus2.position.set(5, 2, -6);
    torus2.rotation.x = Math.PI * 0.6;
    torus2.rotation.z = Math.PI * 0.2;
    scene.add(torus2);

    // --- Grid Plane ---
    const gridHelper = new THREE.GridHelper(30, 30, 0x6366f1, 0x6366f1);
    gridHelper.position.y = -4;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.04;
    scene.add(gridHelper);

    // --- Floating Particles ---
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const particleMat = new THREE.PointsMaterial({
      color: 0x6366f1,
      size: 0.03,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Mouse tracking for subtle parallax ---
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // --- Resize handler ---
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // --- Animation loop ---
    const timer = new THREE.Timer();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      timer.update();
      const elapsed = timer.getElapsed();

      // Rotate wireframe shapes
      sphere1.rotation.y = elapsed * 0.08;
      sphere1.rotation.x = elapsed * 0.05;

      sphere2.rotation.y = -elapsed * 0.1;
      sphere2.rotation.z = elapsed * 0.06;

      sphere3.rotation.y = elapsed * 0.12;
      sphere3.rotation.x = -elapsed * 0.04;

      // Torus orbiting
      torus1.rotation.z = elapsed * 0.15;
      torus1.rotation.y = elapsed * 0.08;

      torus2.rotation.z = -elapsed * 0.12;
      torus2.rotation.y = elapsed * 0.06;

      // Grid subtle pulse
      const gridOpacity = 0.03 + Math.sin(elapsed * 0.5) * 0.015;
      (gridHelper.material as THREE.Material).opacity = gridOpacity;

      // Particles slow rotation
      particles.rotation.y = elapsed * 0.02;
      particles.rotation.x = elapsed * 0.01;

      // Subtle camera parallax from mouse
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (2 + mouseY * -0.3 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      // Dispose geometries and materials
      sphere1Geo.dispose();
      sphere2Geo.dispose();
      sphere3Geo.dispose();
      torus1Geo.dispose();
      torus2Geo.dispose();
      particleGeo.dispose();

      wireframeMaterial.dispose();
      wireframeMaterial2.dispose();
      torusMaterial.dispose();
      particleMat.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
