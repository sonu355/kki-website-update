
"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";

const C = {
  steel: "#b7c2cb",
  bright: "#e5ebf0",
  dark: "#64727f",
  black: "#222d37",
  blue: "#102d46",
  rubber: "#292e34",
};

const CONFIG = {
  "single-burner-gas-range": { type: "range", n: 1 },
  "two-burner-gas-range": { type: "range", n: 2 },
  "three-burner-gas-range": { type: "range", n: 3 },
  "four-burner-gas-range": { type: "range", n: 4 },
  "deep-fryer-two-tank": { type: "fryer", n: 2 },
  "deep-fat-fryer": { type: "fryer", n: 1 },
  "sandwich-griller": { type: "griller" },
  "pulverizer": { type: "machine" },
  "vegetable-cutting-machine": { type: "machine" },
  "tilting-wet-grinder": { type: "mixer" },
  "potato-peeler": { type: "machine" },
  "electric-meat-mincer": { type: "machine" },
  "heavy-duty-industrial-mixer": { type: "mixer" },
  "ice-crusher": { type: "machine" },
  "wet-masala-grinder": { type: "mixer" },
  "dough-kneading-machine": { type: "mixer" },
  "spiral-dough-mixer": { type: "mixer" },
  "planetary-bakery-mixer": { type: "mixer" },
  "four-door-vertical-refrigerator": { type: "fridge", n: 4 },
  "under-counter-refrigerator": { type: "fridge", n: 2 },
  "blast-freezer-mrbs-121-sa": { type: "fridge", n: 1 },
  "tea-snacks-service-trolley": { type: "trolley" },
  "electric-plate-warmer": { type: "fridge", n: 2 },
  "masala-trolley": { type: "trolley" },
  "water-cooler": { type: "machine" },
  "hood-type-dishwasher": { type: "dishwasher" },
  "dining-table-with-seater": { type: "table" },
  "work-table-with-cross-bracing": { type: "table" },
  "roti-making-machine-850": { type: "machine" },
  "roti-making-machine-1000": { type: "machine" },
  "roti-making-machine-650": { type: "machine" },
  "roti-machine-850": { type: "machine" },
  "roti-machine-1000": { type: "machine" },
  "roti-machine-650-700": { type: "machine" },
};

export function has3DProduct(slug) {
  return Object.prototype.hasOwnProperty.call(CONFIG, slug);
}

function Metal({
  p = [0, 0, 0],
  s = [1, 1, 1],
  color = C.steel,
  r = [0, 0, 0],
  children,
}) {
  return (
    <group position={p} rotation={r}>
      <RoundedBox
        args={s}
        radius={Math.min(0.035, ...s.map(v => v / 5))}
        smoothness={3}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={color}
          metalness={0.82}
          roughness={0.24}
        />
      </RoundedBox>
      {children}
    </group>
  );
}

function Cyl({
  p = [0, 0, 0],
  radius = 0.15,
  h = 0.2,
  color = C.dark,
  r = [0, 0, 0],
}) {
  return (
    <mesh position={p} rotation={r} castShadow>
      <cylinderGeometry args={[radius, radius, h, 28]} />
      <meshStandardMaterial
        color={color}
        metalness={0.7}
        roughness={0.29}
      />
    </mesh>
  );
}

function Moving({ children, to = [0, 0, 0], active }) {
  const ref = useRef();

  useFrame((_, dt) => {
    if (!ref.current) return;
    [0, 1, 2].forEach((i) => {
      ref.current.position.setComponent(
        i,
        THREE.MathUtils.damp(
          ref.current.position.getComponent(i),
          active ? to[i] : 0,
          5,
          dt
        )
      );
    });
  });

  return <group ref={ref}>{children}</group>;
}

function Legs({ w = 1.5, d = 0.9, y = -1, wheels = false }) {
  return [-1, 1].flatMap((x) =>
    [-1, 1].map((z) => (
      <group key={`${x}-${z}`} position={[x * w / 2, y, z * d / 2]}>
        <Cyl radius={0.055} h={0.75} />
        <Cyl
          p={[0, -0.39, 0]}
          radius={wheels ? 0.12 : 0.08}
          h={0.07}
          color={C.rubber}
          r={wheels ? [Math.PI / 2, 0, 0] : [0, 0, 0]}
        />
      </group>
    ))
  );
}

function Door({ p, size, right, open, explode }) {
  const hinge = useRef();

  useFrame((_, dt) => {
    if (!hinge.current) return;
    hinge.current.rotation.y = THREE.MathUtils.damp(
      hinge.current.rotation.y,
      open ? (right ? 1.55 : -1.55) : 0,
      5,
      dt
    );
    hinge.current.position.z = THREE.MathUtils.damp(
      hinge.current.position.z,
      p[2] + (explode ? 0.65 : 0),
      5,
      dt
    );
  });

  const edge = right ? -size[0] / 2 : size[0] / 2;

  return (
    <group ref={hinge} position={p}>
      <group position={[edge, 0, 0]}>
        <Metal p={[-edge, 0, 0]} s={size} color={C.bright} />
        <Metal
          p={[right ? size[0] - 0.12 : -size[0] + 0.12, 0, 0.09]}
          s={[0.045, size[1] * 0.35, 0.05]}
          color={C.dark}
        />
      </group>
    </group>
  );
}

function Refrigerator({ n, open, explode }) {
  const isCounter = n === 2;
  const w = isCounter ? 3 : 2.25;
  const h = isCounter ? 1.65 : 3.15;
  const depth = 1.4;
  const rows = n === 4 ? 2 : 1;
  const cols = n === 1 ? 1 : 2;
  const doorW = w / cols - 0.055;
  const doorH = h / rows - 0.065;

  return (
    <group>
      {/* Hollow cabinet with visible interior */}
      <Metal p={[0, 0, -depth / 2]} s={[w, h, 0.08]} />
      <Metal p={[-w / 2, 0, 0]} s={[0.09, h, depth]} />
      <Metal p={[w / 2, 0, 0]} s={[0.09, h, depth]} />
      <Metal p={[0, h / 2, 0]} s={[w, 0.09, depth]} />
      <Metal p={[0, -h / 2, 0]} s={[w, 0.09, depth]} />

      {cols === 2 && <Metal s={[0.055, h, depth]} color={C.dark} />}
      {rows === 2 && <Metal s={[w, 0.07, depth]} color={C.dark} />}

      {/* Interior wire shelves */}
      {[-1, 0, 1].map((y) => (
        <Moving key={y} active={explode} to={[0, y * 0.18, 0.85]}>
          <Metal p={[0, y * h / 3, 0]} s={[w - 0.18, 0.035, depth - 0.18]} />
          {Array.from({ length: 7 }, (_, i) => (
            <Metal
              key={i}
              p={[(i - 3) * (w - 0.3) / 7, y * h / 3 + 0.04, 0]}
              s={[0.018, 0.015, depth - 0.26]}
              color={C.bright}
            />
          ))}
        </Moving>
      ))}

      {Array.from({ length: n }, (_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const right = cols === 2 && col === 1;

        return (
          <Door
            key={i}
            p={[
              (col - (cols - 1) / 2) * (w / cols),
              (rows - 1) * doorH / 2 - row * doorH,
              depth / 2 + 0.065,
            ]}
            size={[doorW, doorH, 0.09]}
            right={right}
            open={open}
            explode={explode}
          />
        );
      })}

      {/* Top refrigeration compartment */}
      <Moving active={explode} to={[0, 0.8, 0]}>
        <Metal p={[0, h / 2 + 0.22, 0]} s={[w, 0.36, depth]} />
        <Metal
          p={[0, h / 2 + 0.25, depth / 2 + 0.03]}
          s={[0.6, 0.17, 0.04]}
          color={C.blue}
        />
        <Cyl p={[-0.48, h / 2 + 0.55, 0]} radius={0.19} h={0.28} color={C.black} />
        <Cyl
          p={[0.48, h / 2 + 0.5, 0]}
          radius={0.22}
          h={0.09}
          color={C.black}
          r={[Math.PI / 2, 0, 0]}
        />
      </Moving>

      <Legs w={w - 0.35} d={1.1} y={-h / 2 - 0.29} />
    </group>
  );
}

function Dishwasher({ open, explode }) {
  return (
    <group>
      {/* Central dishwasher body */}
      <Metal p={[0, -0.38, 0]} s={[1.15, 1.06, 1.12]} />
      <Metal p={[0, -0.27, 0.58]} s={[0.45, 0.13, 0.04]} color={C.blue} />

      {/* Entry and exit tables */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 1.33, 0, 0]}>
          <Metal s={[1.6, 0.12, 1.2]} color={C.bright} />
          <Legs w={1.35} d={0.9} y={-0.63} />
          <Metal p={[0, -0.47, -0.45]} s={[1.4, 0.055, 0.07]} />
        </group>
      ))}

      {/* Entry-side wash sink */}
      <Metal p={[-1.36, -0.14, 0]} s={[0.65, 0.25, 0.75]} color={C.dark} />
      <Cyl p={[-1.65, 0.47, -0.32]} radius={0.025} h={0.9} color={C.bright} />

      {/* Lifting hood */}
      <Moving active={open || explode} to={[0, explode ? 1.5 : 0.77, 0]}>
        <Metal p={[0, 0.75, 0]} s={[1.2, 0.9, 1.16]} color={C.bright} />
        <Metal p={[0.55, 0.8, 0.26]} s={[0.08, 0.08, 0.44]} color={C.dark} />
      </Moving>

      {/* Removable wash rack */}
      <Moving active={explode} to={[0, 0, 1.35]}>
        <Metal p={[0, 0.22, 0]} s={[0.91, 0.06, 0.9]} color={C.dark} />
        {Array.from({ length: 7 }, (_, i) => (
          <Metal
            key={i}
            p={[(i - 3) * 0.115, 0.33, 0]}
            s={[0.025, 0.25, 0.75]}
            color={C.bright}
          />
        ))}
      </Moving>
    </group>
  );
}

function Range({ n, explode }) {
  const w = n === 1 ? 1.25 : n === 2 ? 2 : 2.75;
  const cols = n === 4 ? 2 : n;
  const rows = Math.ceil(n / cols);

  return (
    <group>
      <Metal s={[w, 0.24, 1.55]} />
      <Metal p={[0, 0.4, -0.73]} s={[w, 0.55, 0.11]} />
      <Legs w={w - 0.2} d={1.1} y={-0.7} />

      {Array.from({ length: n }, (_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = (col - (cols - 1) / 2) * 0.67;
        const z = (row - (rows - 1) / 2) * 0.66;

        return (
          <group key={i} position={[x, 0.15, z]}>
            <Cyl radius={0.22} h={0.07} color={C.black} />
            <Cyl p={[0, 0.055, 0]} radius={0.1} h={0.06} />
            <Moving active={explode} to={[0, 0.5 + i * 0.1, 0]}>
              <Metal p={[0, 0.12, 0]} s={[0.55, 0.05, 0.065]} color={C.black} />
              <Metal p={[0, 0.12, 0]} s={[0.065, 0.05, 0.55]} color={C.black} />
            </Moving>
          </group>
        );
      })}

      {Array.from({ length: n }, (_, i) => (
        <Cyl
          key={i}
          p={[(i - (n - 1) / 2) * 0.32, -0.045, 0.78]}
          radius={0.06}
          h={0.08}
          color={C.black}
          r={[Math.PI / 2, 0, 0]}
        />
      ))}
    </group>
  );
}

function Mixer({ explode }) {
  return (
    <group>
      <Metal p={[0, -0.75, -0.15]} s={[1.5, 0.55, 1.4]} />
      <Metal p={[0, 0.25, -0.58]} s={[0.48, 1.9, 0.45]} />
      <Moving active={explode} to={[0, 0.85, 0]}>
        <Metal p={[0, 1.22, -0.1]} s={[1.27, 0.46, 1.12]} color={C.bright} />
        <Cyl p={[0, 0.72, 0.24]} radius={0.07} h={0.61} />
        <Metal p={[0, 1.27, 0.48]} s={[0.47, 0.15, 0.04]} color={C.blue} />
      </Moving>

      {/* Bowl and visible internal mixing shaft */}
      <Moving active={explode} to={[0.9, 0, 0.6]}>
        <Cyl p={[0, -0.16, 0.3]} radius={0.53} h={0.7} />
        <Cyl p={[0, 0.2, 0.3]} radius={0.49} h={0.07} color={C.bright} />
      </Moving>

      {/* Safety guard bars */}
      {Array.from({ length: 7 }, (_, i) => {
        const angle = (i / 6) * Math.PI;
        return (
          <Metal
            key={i}
            p={[
              Math.cos(angle) * 0.5,
              0.38,
              0.3 + Math.sin(angle) * 0.5,
            ]}
            s={[0.022, 0.25, 0.025]}
            color={C.dark}
          />
        );
      })}
    </group>
  );
}

function Fryer({ n, explode }) {
  return (
    <group>
      <Metal p={[0, -0.35, 0]} s={[2.2, 1.25, 1.4]} />
      <Metal p={[0, 0.37, -0.62]} s={[2.2, 0.48, 0.13]} />
      <Legs w={1.9} d={1.1} y={-1.25} />

      {Array.from({ length: n }, (_, i) => (
        <Moving key={i} active={explode} to={[0, 0.8, 0.55]}>
          <group position={[(i - (n - 1) / 2) * 0.9, 0.37, 0]}>
            <Metal s={[n === 1 ? 1.45 : 0.81, 0.12, 1.02]} color={C.dark} />
            <Metal p={[0, 0.1, 0]} s={[n === 1 ? 1.26 : 0.66, 0.09, 0.84]} />
            <Metal p={[0, 0.15, 0.66]} s={[0.075, 0.07, 0.5]} color={C.black} />
          </group>
        </Moving>
      ))}

      <Cyl
        p={[0.64, 0.48, 0.76]}
        radius={0.07}
        h={0.08}
        color={C.black}
        r={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

function Table({ trolley, explode }) {
  return (
    <group>
      <Moving active={explode} to={[0, 0.68, 0]}>
        <Metal p={[0, 0.43, 0]} s={[2.85, 0.14, 1.36]} color={C.bright} />
      </Moving>
      <Legs w={2.55} d={1.13} y={-0.44} wheels={trolley} />
      <Moving active={explode} to={[0, -0.55, 0]}>
        <Metal p={[0, -0.6, 0]} s={[2.55, 0.085, 1.12]} />
      </Moving>
      <Metal p={[0, -0.3, -0.57]} s={[2.5, 0.055, 0.07]} />
      <Metal p={[0, -0.3, 0.57]} s={[2.5, 0.055, 0.07]} />
    </group>
  );
}

function Machine({ explode }) {
  return (
    <group>
      <Metal p={[0, -0.48, 0]} s={[1.8, 1.1, 1.4]} />
      <Moving active={explode} to={[0, 0.9, 0]}>
        <Metal p={[0, 0.22, 0]} s={[1.68, 0.32, 1.31]} color={C.bright} />
      </Moving>
      <Cyl p={[-0.42, 0.54, 0]} radius={0.29} h={0.5} color={C.dark} />
      <Metal p={[0.47, 0.51, 0]} s={[0.52, 0.61, 0.55]} />
      <Metal p={[0.48, 0.55, 0.31]} s={[0.33, 0.17, 0.04]} color={C.blue} />
      <Legs w={1.5} d={1.06} y={-1.3} />
    </group>
  );
}

function Griller({ open, explode }) {
  const lid = useRef();

  useFrame((_, dt) => {
    if (!lid.current) return;
    lid.current.rotation.x = THREE.MathUtils.damp(
      lid.current.rotation.x,
      open ? -1.05 : 0,
      5,
      dt
    );
    lid.current.position.y = THREE.MathUtils.damp(
      lid.current.position.y,
      explode ? 0.95 : 0.38,
      5,
      dt
    );
  });

  return (
    <group>
      <Metal p={[0, -0.16, 0]} s={[1.8, 0.55, 1.25]} />
      <Metal p={[0, 0.17, 0]} s={[1.58, 0.08, 1.04]} color={C.black} />
      <group ref={lid} position={[0, 0.38, -0.5]}>
        <Metal p={[0, 0, 0.5]} s={[1.65, 0.14, 1.04]} />
        <Metal p={[0, 0.08, 1.03]} s={[0.1, 0.1, 0.36]} color={C.black} />
      </group>
    </group>
  );
}

function Model({ config, open, explode }) {
  switch (config.type) {
    case "fridge":
      return <Refrigerator n={config.n} open={open} explode={explode} />;
    case "dishwasher":
      return <Dishwasher open={open} explode={explode} />;
    case "range":
      return <Range n={config.n} explode={explode} />;
    case "mixer":
      return <Mixer explode={explode} />;
    case "fryer":
      return <Fryer n={config.n} explode={explode} />;
    case "table":
    case "trolley":
      return <Table trolley={config.type === "trolley"} explode={explode} />;
    case "griller":
      return <Griller open={open} explode={explode} />;
    default:
      return <Machine explode={explode} />;
  }
}

function Scene({ config, open, explode, rotating, controlsRef }) {
  return (
    <Canvas
      shadows
      camera={{ position: [4.3, 2.7, 6.1], fov: 39 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#f8fafc"]} />
      <ambientLight intensity={1.6} />

      <directionalLight
        position={[5, 8, 7]}
        intensity={3}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 4, -4]} intensity={1.8} />

      <Suspense fallback={null}>
        <Model config={config} open={open} explode={explode} />
        <Environment preset="city" />
        <ContactShadows
          position={[0, -2.1, 0]}
          opacity={0.28}
          scale={10}
          blur={2.5}
          far={5}
        />
      </Suspense>

      <OrbitControls
        ref={controlsRef}
        makeDefault
        autoRotate={rotating}
        autoRotateSpeed={1}
        enablePan={false}
        minDistance={3.2}
        maxDistance={11}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}

export default function UniversalProduct3D({ slug, name }) {
  const config = CONFIG[slug];
  const controlsRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [explode, setExplode] = useState(false);
  const [rotating, setRotating] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  if (!config) return null;

  const openable = ["fridge", "dishwasher", "griller"].includes(config.type);
  const openLabel =
    config.type === "dishwasher"
      ? "Hood"
      : config.type === "griller"
      ? "Lid"
      : "Doors";

  function zoom(multiplier) {
    const controls = controlsRef.current;
    if (!controls) return;

    const camera = controls.object;
    const offset = camera.position.clone().sub(controls.target);
    offset.setLength(
      THREE.MathUtils.clamp(offset.length() * multiplier, 3.2, 11)
    );
    camera.position.copy(controls.target).add(offset);
    controls.update();
  }

  function reset() {
    setOpen(false);
    setExplode(false);
    setRotating(false);
    setResetKey(v => v + 1);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#ded8ce] bg-white">
      <div className="flex items-start justify-between gap-3 p-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#bd8431]">
            Interactive product experience
          </p>
          <h3 className="mt-1 font-bold text-[#061b2f]">{name}</h3>
        </div>
        <span className="shrink-0 rounded-full bg-[#e8f1f7] px-2 py-1 text-xs text-[#12466f]">
          3D Concept
        </span>
      </div>

      <div className="relative h-[420px] w-full sm:h-[510px]">
        <Scene
          key={`${slug}-${resetKey}`}
          config={config}
          open={open}
          explode={explode}
          rotating={rotating}
          controlsRef={controlsRef}
        />

        <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg bg-white/90 px-3 py-2 text-xs text-[#061b2f]">
          Drag to rotate · Scroll or pinch to zoom
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-[#ded8ce] p-3 sm:grid-cols-3">
        {openable && (
          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            className="rounded-lg bg-[#061b2f] px-3 py-3 text-xs font-semibold text-white"
          >
            {open ? "Close" : "Open"} {openLabel}
          </button>
        )}

        <button
          type="button"
          onClick={() => setExplode(v => !v)}
          className="rounded-lg bg-[#061b2f] px-3 py-3 text-xs font-semibold text-white"
        >
          {explode ? "Assemble" : "Explode"}
        </button>

        <button
          type="button"
          onClick={() => setRotating(v => !v)}
          className="rounded-lg border border-[#ded8ce] px-3 py-3 text-xs font-semibold"
        >
          {rotating ? "Stop Rotation" : "Auto Rotate"}
        </button>

        <button
          type="button"
          onClick={() => zoom(0.82)}
          className="rounded-lg border border-[#ded8ce] px-3 py-3 text-xs font-semibold"
        >
          Zoom +
        </button>

        <button
          type="button"
          onClick={() => zoom(1.22)}
          className="rounded-lg border border-[#ded8ce] px-3 py-3 text-xs font-semibold"
        >
          Zoom -
        </button>

        <button
          type="button"
          onClick={reset}
          className="rounded-lg border border-[#ded8ce] px-3 py-3 text-xs font-semibold"
        >
          Reset
        </button>
      </div>

      <p className="px-4 pb-4 text-xs leading-relaxed text-[#64727f]">
        Interactive conceptual visualization. Component placement,
        internal construction and proportions may differ from the
        actual manufactured equipment.
      </p>
    </div>
  );
}
