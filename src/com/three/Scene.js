"use client";

import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import KKIHood from "./KKIHood";
import CommercialRange from "./CommercialRange";
import SteamParticles from "./SteamParticles";

function CameraRig({ scrollProgress }) {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = e.clientX / window.innerWidth - 0.5;
      mouse.current.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ camera }) => {
    const targetX = mouse.current.x * 0.35;
    const targetY = 1.45 - mouse.current.y * 0.18 - scrollProgress * 0.3;
    camera.position.x += (targetX - camera.position.x) * 0.025;
    camera.position.y += (targetY - camera.position.y) * 0.025;
    camera.lookAt(0, 0.45, 0);
  });

  return null;
}

export default function Scene({ scrollProgress = 0 }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      shadows
      camera={{ position: [0, 1.45, 6.15], fov: 41 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <fog attach="fog" args={["#03182d", 7, 15]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 6, 3]} intensity={1.35} color="#fff2d4" castShadow />
      <pointLight position={[-3, 1, 2]} intensity={0.7} color="#d8aa58" />
      <pointLight position={[2, -1, 4]} intensity={0.35} color="#215786" />

      <CameraRig scrollProgress={scrollProgress} />
      <KKIHood scrollProgress={scrollProgress} />
      <CommercialRange />
      <SteamParticles />
      <ContactShadows position={[0, -1.15, 0]} opacity={0.5} scale={8} blur={2.6} far={2.3} color="#020c18" />
    </Canvas>
  );
}
