"use client";
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/** Stylized modular cooking/prep counter beneath the hood — primitive geometry. */
export default function CommercialRange() {
  const group = useRef();
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.position.y = -0.85 + Math.sin(t * 0.6) * 0.02;
  });

  const steelMat = { color: '#dfe2e5', metalness: 0.75, roughness: 0.3 };
  const darkSteel = { color: '#8b9096', metalness: 0.8, roughness: 0.25 };
  const goldMat = { color: '#c8912f', metalness: 0.6, roughness: 0.35 };

  return (
    <group ref={group} position={[0, -0.85, 0]}>
      {/* counter body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3.6, 0.55, 1.15]} />
        <meshStandardMaterial {...steelMat} />
      </mesh>
      {/* countertop lip */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[3.7, 0.06, 1.25]} />
        <meshStandardMaterial {...darkSteel} />
      </mesh>
      {/* gold accent strip along the front */}
      <mesh position={[0, -0.05, 0.581]}>
        <boxGeometry args={[3.6, 0.03, 0.02]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>
      {/* four legs */}
      {[[-1.6, -0.62], [1.6, -0.62]].map(([x], i) => (
        [-0.45, 0.45].map((z) => (
          <mesh key={`${i}-${z}`} position={[x, -0.62, z]}>
            <cylinderGeometry args={[0.035, 0.035, 0.5, 8]} />
            <meshStandardMaterial {...darkSteel} />
          </mesh>
        ))
      ))}
      {/* two round burner suggestions */}
      {[-0.9, 0].map((x) => (
        <mesh key={x} position={[x, 0.34, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 0.02, 24]} />
          <meshStandardMaterial color="#1a1d20" metalness={0.5} roughness={0.6} />
        </mesh>
      ))}
      {/* sink basin suggestion on the right */}
      <mesh position={[1.35, 0.32, 0]}>
        <boxGeometry args={[0.6, 0.06, 0.7]} />
        <meshStandardMaterial color="#c3c8cc" metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  );
}
