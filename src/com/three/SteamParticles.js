"use client";
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Lightweight instanced steam wisps rising between the range and the hood. */
export default function SteamParticles({ count = 18 }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => (
    Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 1.6,
      z: (Math.random() - 0.5) * 0.6,
      speed: 0.15 + Math.random() * 0.2,
      offset: Math.random() * 10,
      scale: 0.05 + Math.random() * 0.08,
    }))
  ), [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    particles.forEach((p, i) => {
      const y = ((t * p.speed + p.offset) % 1.6) - 0.3;
      dummy.position.set(p.x + Math.sin(t + p.offset) * 0.08, y, p.z);
      const s = p.scale * (1 - y / 1.6);
      dummy.scale.setScalar(Math.max(s, 0.001));
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]} position={[0, -0.4, 0]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="#e8edf2" transparent opacity={0.25} depthWrite={false} />
    </instancedMesh>
  );
}
