
"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  RoundedBox,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
import { RotateCcw, Box, DoorOpen, ZoomIn, ZoomOut } from "lucide-react";

const STEEL = "#aab4bc";
const STEEL_LIGHT = "#d9e0e5";
const STEEL_DARK = "#62717c";

function SteelBox({ position, args, color = STEEL, ...props }) {
  return (
    <mesh position={position} castShadow receiveShadow {...props}>
      <boxGeometry args={args} />
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.24}
      />
    </mesh>
  );
}

function RefrigeratorDoor({
  x,
  y,
  side,
  opened,
  exploded,
  onClick,
}) {
  const pivot = useRef();
  const isLeft = side === "left";
  const width = 1.32;
  const targetAngle = opened ? (isLeft ? -1.45 : 1.45) : 0;

  useFrame((_, delta) => {
    if (!pivot.current) return;
    pivot.current.rotation.y = THREE.MathUtils.damp(
      pivot.current.rotation.y,
      targetAngle,
      5,
      delta
    );
    pivot.current.position.z = THREE.MathUtils.damp(
      pivot.current.position.z,
      exploded ? 1.2 : 0,
      4,
      delta
    );
  });

  return (
    <group
      ref={pivot}
      position={[x, y, 0.74]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <group position={[isLeft ? width / 2 : -width / 2, 0, 0]}>
        <RoundedBox
          args={[width, 1.51, 0.095]}
          radius={0.035}
          smoothness={4}
          castShadow
        >
          <meshStandardMaterial
            color={STEEL_LIGHT}
            metalness={0.83}
            roughness={0.23}
          />
        </RoundedBox>

        <SteelBox
          args={[0.035, 1.3, 0.04]}
          position={[isLeft ? 0.51 : -0.51, 0, 0.075]}
          color={STEEL_DARK}
        />

        <SteelBox
          args={[0.052, 0.42, 0.065]}
          position={[isLeft ? 0.54 : -0.54, 0, 0.105]}
          color="#e4e9ed"
        />
      </group>
    </group>
  );
}

function RefrigerationSystem({ exploded, onSelect }) {
  const ref = useRef();

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.position.y = THREE.MathUtils.damp(
      ref.current.position.y,
      exploded ? 4.65 : 4.02,
      4,
      delta
    );
  });

  return (
    <group ref={ref} position={[0, 4.02, 0]} onClick={(e) => {
      e.stopPropagation();
      onSelect("Refrigeration unit");
    }}>
      <SteelBox position={[0, 0, 0]} args={[2.65, 0.45, 1.22]} />

      <mesh position={[-0.55, 0.34, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.3, 0.62, 24]} />
        <meshStandardMaterial
          color="#202c35"
          metalness={0.45}
          roughness={0.32}
        />
      </mesh>

      <mesh
        position={[0.57, 0.26, 0.15]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
      >
        <cylinderGeometry args={[0.32, 0.32, 0.15, 32]} />
        <meshStandardMaterial color="#273540" metalness={0.6} />
      </mesh>

      {Array.from({ length: 5 }, (_, i) => (
        <SteelBox
          key={i}
          position={[0.55, 0.04 + i * 0.09, -0.42]}
          args={[0.9, 0.035, 0.08]}
          color={STEEL_DARK}
        />
      ))}
    </group>
  );
}

function RefrigeratorModel({
  opened,
  exploded,
  selected,
  setSelected,
  toggleDoor,
}) {
  const body = useRef();

  useFrame((_, delta) => {
    if (!body.current) return;
    body.current.rotation.y = THREE.MathUtils.damp(
      body.current.rotation.y,
      0,
      3,
      delta
    );
  });

  return (
    <group ref={body} position={[0, -2.2, 0]}>
      {/* Cabinet rear, side walls, top and bottom */}
      <SteelBox position={[0, 2.2, -0.64]} args={[2.8, 3.35, 0.11]} />
      <SteelBox position={[-1.39, 2.2, 0]} args={[0.09, 3.4, 1.35]} />
      <SteelBox position={[1.39, 2.2, 0]} args={[0.09, 3.4, 1.35]} />
      <SteelBox position={[0, 3.88, 0]} args={[2.8, 0.09, 1.35]} />
      <SteelBox position={[0, 0.52, 0]} args={[2.8, 0.1, 1.35]} />

      {/* Central divider and chamber divider */}
      <SteelBox position={[0, 2.2, 0]} args={[0.075, 3.3, 1.3]} />
      <SteelBox position={[0, 2.2, 0]} args={[2.75, 0.075, 1.3]} />

      {/* Four chamber shelves */}
      {[1.02, 1.7, 2.55, 3.25].map((y) => (
        <group
          key={y}
          onClick={(e) => {
            e.stopPropagation();
            setSelected("Adjustable shelves");
          }}
        >
          <SteelBox position={[0, y, 0]} args={[2.65, 0.045, 1.12]} />
          {Array.from({ length: 7 }, (_, i) => (
            <SteelBox
              key={i}
              position={[-1.15 + i * 0.38, y + 0.027, 0]}
              args={[0.025, 0.012, 1.05]}
              color={STEEL_LIGHT}
            />
          ))}
        </group>
      ))}

      {/* Four adjustable legs */}
      {[-1.04, 1.04].flatMap((x) =>
        [-0.42, 0.42].map((z) => (
          <group key={`${x}-${z}`}>
            <mesh position={[x, 0.23, z]} castShadow>
              <cylinderGeometry args={[0.065, 0.065, 0.47, 16]} />
              <meshStandardMaterial color={STEEL_DARK} metalness={0.85} />
            </mesh>
            <mesh position={[x, 0.03, z]}>
              <cylinderGeometry args={[0.105, 0.105, 0.06, 16]} />
              <meshStandardMaterial color="#34434e" />
            </mesh>
          </group>
        ))
      )}

      {/* Door pivots are at the outside edges */}
      <RefrigeratorDoor
        x={-1.36}
        y={3.05}
        side="left"
        opened={opened}
        exploded={exploded}
        onClick={toggleDoor}
      />
      <RefrigeratorDoor
        x={1.36}
        y={3.05}
        side="right"
        opened={opened}
        exploded={exploded}
        onClick={toggleDoor}
      />
      <RefrigeratorDoor
        x={-1.36}
        y={1.36}
        side="left"
        opened={opened}
        exploded={exploded}
        onClick={toggleDoor}
      />
      <RefrigeratorDoor
        x={1.36}
        y={1.36}
        side="right"
        opened={opened}
        exploded={exploded}
        onClick={toggleDoor}
      />

      {/* Digital controller */}
      <group onClick={(e) => {
        e.stopPropagation();
        setSelected("Digital temperature controller");
      }}>
        <SteelBox
          position={[0, 4.03, 0.665]}
          args={[0.69, 0.22, 0.065]}
          color="#132942"
        />
        <mesh position={[0, 4.03, 0.706]}>
          <planeGeometry args={[0.36, 0.125]} />
          <meshBasicMaterial color="#102116" />
        </mesh>
        <Html position={[0, 4.03, 0.72]} transform distanceFactor={4}>
          <div style={{
            color: "#39e478",
            fontSize: 13,
            fontFamily: "monospace",
            pointerEvents: "none",
          }}>
            -02°
          </div>
        </Html>
      </group>

      <RefrigerationSystem
        exploded={exploded}
        onSelect={setSelected}
      />
    </group>
  );
}

export default function Refrigerator3DViewer() {
  const [opened, setOpened] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [selected, setSelected] = useState("");
  const [zoom, setZoom] = useState(7.4);
  const [resetKey, setResetKey] = useState(0);

  const reset = () => {
    setOpened(false);
    setExploded(false);
    setSelected("");
    setZoom(7.4);
    setResetKey((k) => k + 1);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#ded8ce] bg-white">
      <div className="flex items-center justify-between px-4 pt-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#bd8431]">
            Interactive product experience
          </p>
          <h3 className="mt-1 text-lg font-bold text-[#061b2f]">
            Four Door Refrigerator
          </h3>
        </div>
        <span className="rounded-full bg-[#edf4f8] px-3 py-1 text-xs text-[#12466f]">
          3D Prototype
        </span>
      </div>

      <div className="relative h-[410px] w-full sm:h-[510px]">
        <Canvas
          shadows
          camera={{ position: [5, 3.1, 7.4], fov: 37 }}
          dpr={[1, 1.7]}
          gl={{ antialias: true }}
        >
          <color attach="background" args={["#f9fafb"]} />
          <ambientLight intensity={1.4} />
          <directionalLight
            position={[5, 9, 7]}
            intensity={3}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-4, 3, -5]} intensity={1.5} />

          <Suspense fallback={null}>
            <RefrigeratorModel
              opened={opened}
              exploded={exploded}
              selected={selected}
              setSelected={setSelected}
              toggleDoor={() => setOpened((v) => !v)}
            />
            <Environment preset="city" />
            <ContactShadows
              position={[0, -2.25, 0]}
              opacity={0.3}
              scale={10}
              blur={2.5}
              far={5}
            />
          </Suspense>

          <OrbitControls
            key={resetKey}
            target={[0, 0, 0]}
            enablePan={false}
            minDistance={4.5}
            maxDistance={11}
            minPolarAngle={0.3}
            maxPolarAngle={Math.PI / 2.05}
          />
        </Canvas>

        <div className="pointer-events-none absolute bottom-4 left-4 rounded-lg bg-white/90 px-3 py-2 text-xs font-medium text-[#061b2f] shadow-sm">
          Drag to rotate · Scroll to zoom
        </div>
      </div>

      {selected && (
        <div className="mx-4 mb-3 rounded-lg border border-[#e2d4bc] bg-[#fcf8ef] px-3 py-2 text-sm text-[#061b2f]">
          Selected: <strong>{selected}</strong>
          <button
            className="ml-3 text-xs underline"
            onClick={() => setSelected("")}
          >
            Clear
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 border-t border-[#ded8ce] p-3 sm:grid-cols-5">
        <button
          onClick={() => setOpened((v) => !v)}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#061b2f] px-3 py-3 text-xs font-semibold text-white"
        >
          <DoorOpen size={15} />
          {opened ? "Close doors" : "Open doors"}
        </button>

        <button
          onClick={() => setExploded((v) => !v)}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#061b2f] px-3 py-3 text-xs font-semibold text-white"
        >
          <Box size={15} />
          {exploded ? "Assemble" : "Explode"}
        </button>

        <button
          onClick={() => setZoom((z) => Math.max(4.5, z - 0.5))}
          className="flex items-center justify-center gap-2 rounded-lg border border-[#ded8ce] px-3 py-3 text-xs font-semibold"
          title="Use mouse wheel or touch pinch to zoom in"
        >
          <ZoomIn size={15} />
          Zoom in
        </button>

        <button
          onClick={() => setZoom((z) => Math.min(11, z + 0.5))}
          className="flex items-center justify-center gap-2 rounded-lg border border-[#ded8ce] px-3 py-3 text-xs font-semibold"
          title="Use mouse wheel or touch pinch to zoom out"
        >
          <ZoomOut size={15} />
          Zoom out
        </button>

        <button
          onClick={reset}
          className="col-span-2 flex items-center justify-center gap-2 rounded-lg border border-[#ded8ce] px-3 py-3 text-xs font-semibold sm:col-span-1"
        >
          <RotateCcw size={15} />
          Reset
        </button>
      </div>

      <p className="px-4 pb-4 text-xs leading-relaxed text-[#62717c]">
        Conceptual 3D visualization. Geometry and internal assembly are illustrative,
        not certified engineering specifications.
      </p>
    </div>
  );
}
