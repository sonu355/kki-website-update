"use client";
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * Stylized low-poly reinterpretation of the KKI logo's exhaust hood —
 * two angled steel wings meeting a navy central pillar, gold trim at the
 * lip. Built from primitive geometry (no external .glb dependency) so the
 * hero works today; swap in a real optimized .glb at this same slot later.
 */
export default function KKIHood({ scrollProgress = 0 }) {
  const group = useRef();
  const wingL = useRef();
  const wingR = useRef();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    // gentle idle bob + scroll-linked settle rotation
    group.current.rotation.y = Math.sin(t * 0.15) * 0.06 + scrollProgress * 0.35;
    group.current.position.y = Math.sin(t * 0.6) * 0.05 + 1.15;
    if (wingL.current) wingL.current.rotation.z = 0.02 * Math.sin(t * 0.5);
    if (wingR.current) wingR.current.rotation.z = -0.02 * Math.sin(t * 0.5);
  });

  const steelMat = { color: '#c7ccd1', metalness: 0.85, roughness: 0.25 };
  const navyMat = { color: '#0a3768', metalness: 0.4, roughness: 0.4 };
  const goldMat = { color: '#c8912f', metalness: 0.7, roughness: 0.3, emissive: '#a3721f', emissiveIntensity: 0.15 };

  return (
    <group ref={group} position={[0, 1.15, 0]}>
      {/* central navy pillar */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.55, 1.3, 0.55]} />
        <meshStandardMaterial {...navyMat} />
      </mesh>

      {/* left steel wing */}
      <group ref={wingL} position={[-1.05, -0.15, 0]} rotation={[0, 0, 0.5]}>
        <mesh castShadow>
          <boxGeometry args={[2.1, 0.12, 1.1]} />
          <meshStandardMaterial {...steelMat} />
        </mesh>
      </group>

      {/* right steel wing */}
      <group ref={wingR} position={[1.05, -0.15, 0]} rotation={[0, 0, -0.5]}>
        <mesh castShadow>
          <boxGeometry args={[2.1, 0.12, 1.1]} />
          <meshStandardMaterial {...steelMat} />
        </mesh>
      </group>

      {/* gold lip trim, left + right */}
      <mesh position={[-1.85, -0.55, 0]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.5, 0.05, 1.12]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>
      <mesh position={[1.85, -0.55, 0]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.5, 0.05, 1.12]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>

      {/* chef-hat outline suggestion — a torus arc sitting above the pillar */}
      <mesh position={[0, 1.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.035, 12, 32, Math.PI * 1.7]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>
    </group>
  );
}
