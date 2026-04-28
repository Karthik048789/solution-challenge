"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function AnimatedShapes() {
  return (
    <>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1, 32, 32]} position={[-3, 2, -5]}>
          <MeshDistortMaterial
            color="#6366f1"
            speed={2}
            distort={0.4}
            radius={1}
            opacity={0.3}
            transparent
          />
        </Sphere>
      </Float>
      <Float speed={3} rotationIntensity={0.5} floatIntensity={1.5}>
        <Sphere args={[1.5, 32, 32]} position={[4, -2, -8]}>
          <MeshDistortMaterial
            color="#a855f7"
            speed={1.5}
            distort={0.3}
            radius={1}
            opacity={0.2}
            transparent
          />
        </Sphere>
      </Float>
    </>
  );
}

function ParticleField({ count = 500 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function Dashboard3DBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-slate-50 dark:bg-[#030303] overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
        
        <AnimatedShapes />
        <ParticleField count={800} />
      </Canvas>
      
      {/* Decorative Gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-purple-500/10 pointer-events-none" />
    </div>
  );
}
