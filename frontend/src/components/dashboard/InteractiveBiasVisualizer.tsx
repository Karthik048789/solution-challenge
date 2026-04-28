"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface InteractiveBiasVisualizerProps {
  score: number;
  label: string;
}

function FairnessSphere({ score }: { score: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Color interpolates from red (low score) to green (high score)
  const color = new THREE.Color().setHSL((score / 100) * 0.35, 0.8, 0.5);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.2;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <MeshDistortMaterial
        color={color}
        speed={2}
        distort={0.2}
        radius={1}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

export default function InteractiveBiasVisualizer({ score, label }: InteractiveBiasVisualizerProps) {
  return (
    <div className="h-[300px] w-full rounded-2xl overflow-hidden glass relative group">
      <div className="absolute top-4 left-4 z-10">
        <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</h4>
        <p className="text-3xl font-bold text-slate-900 dark:text-white">{score}%</p>
      </div>
      
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <FairnessSphere score={score} />
        </Float>
      </Canvas>

      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
        <p className="text-xs text-slate-400 group-hover:text-indigo-400 transition-colors">
          Interactive Fairness Visualization
        </p>
      </div>
    </div>
  );
}
