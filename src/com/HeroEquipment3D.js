
"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Rotate3D } from "lucide-react";

// Converts the visible pixels of the original KKI artwork
// into a solid 3D extrusion: front, rear and side walls.
// The flat background is excluded from the geometry.

const LOGO_PATH = "/logo.PNG";
const SAMPLE_WIDTH = 220;
const EXTRUSION_DEPTH = 0.34;

// The symbol occupies the upper portion of the KKI logo.
// The company name is rendered as readable HTML below.
const SYMBOL_CROP = 0.74;

function createLogoGeometry(image) {
  const originalWidth = image.naturalWidth;
  const originalHeight = image.naturalHeight;
  const cropHeight = Math.round(
    originalHeight * SYMBOL_CROP
  );

  const aspect = originalWidth / cropHeight;

  const width = SAMPLE_WIDTH;
  const height = Math.max(
    32,
    Math.round(width / aspect)
  );

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d", {
    willReadFrequently: true,
  });

  if (!ctx) {
    throw new Error("Canvas 2D is not available.");
  }

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(
    image,
    0,
    0,
    originalWidth,
    cropHeight,
    0,
    0,
    width,
    height
  );

  const imageData = ctx.getImageData(
    0,
    0,
    width,
    height
  );

  const data = imageData.data;

  // Detect whether the image has a transparent background.
  let transparentPixels = 0;

  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 240) transparentPixels++;
  }

  const hasTransparency =
    transparentPixels > width * height * 0.005;

  // Determine background colour from the outer corners.
  const corners = [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
  ];

  const background = [0, 0, 0];

  corners.forEach(([x, y]) => {
    const offset = (y * width + x) * 4;

    background[0] += data[offset] / 4;
    background[1] += data[offset + 1] / 4;
    background[2] += data[offset + 2] / 4;
  });

  const mask = new Uint8Array(width * height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = y * width + x;
      const offset = index * 4;

      const r = data[offset];
      const g = data[offset + 1];
      const b = data[offset + 2];
      const originalAlpha = data[offset + 3];

      let alpha = originalAlpha;

      if (!hasTransparency) {
        const difference = Math.sqrt(
          (r - background[0]) ** 2 +
          (g - background[1]) ** 2 +
          (b - background[2]) ** 2
        );

        // Remove the source image's flat background.
        alpha = Math.max(
          0,
          Math.min(255, (difference - 17) * 5)
        );
      }

      data[offset + 3] = alpha;
      mask[index] = alpha > 100 ? 1 : 0;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;

  // Keep the logo's original proportions.
  const modelWidth = 3.35;
  const modelHeight = modelWidth / aspect;

  const dx = modelWidth / width;
  const dy = modelHeight / height;

  const frontZ = EXTRUSION_DEPTH / 2;
  const rearZ = -EXTRUSION_DEPTH / 2;

  const facePositions = [];
  const faceUVs = [];
  const wallPositions = [];

  function addQuad(
    target,
    a,
    b,
    c,
    d
  ) {
    target.push(
      ...a, ...b, ...c,
      ...a, ...c, ...d
    );
  }

  function addTexturedQuad(
    a,
    b,
    c,
    d,
    uvA,
    uvB,
    uvC,
    uvD
  ) {
    addQuad(facePositions, a, b, c, d);

    faceUVs.push(
      ...uvA, ...uvB, ...uvC,
      ...uvA, ...uvC, ...uvD
    );
  }

  function isFilled(x, y) {
    if (
      x < 0 ||
      y < 0 ||
      x >= width ||
      y >= height
    ) {
      return false;
    }

    return mask[y * width + x] === 1;
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!isFilled(x, y)) continue;

      const x0 = x * dx - modelWidth / 2;
      const x1 = (x + 1) * dx - modelWidth / 2;

      const y0 =
        modelHeight / 2 - (y + 1) * dy;

      const y1 =
        modelHeight / 2 - y * dy;

      const u0 = x / width;
      const u1 = (x + 1) / width;
      const v0 = 1 - (y + 1) / height;
      const v1 = 1 - y / height;

      // Front face
      addTexturedQuad(
        [x0, y0, frontZ],
        [x1, y0, frontZ],
        [x1, y1, frontZ],
        [x0, y1, frontZ],
        [u0, v0],
        [u1, v0],
        [u1, v1],
        [u0, v1]
      );

      // Rear face
      addTexturedQuad(
        [x1, y0, rearZ],
        [x0, y0, rearZ],
        [x0, y1, rearZ],
        [x1, y1, rearZ],
        [u1, v0],
        [u0, v0],
        [u0, v1],
        [u1, v1]
      );

      // Left outside edge
      if (!isFilled(x - 1, y)) {
        addQuad(
          wallPositions,
          [x0, y0, rearZ],
          [x0, y0, frontZ],
          [x0, y1, frontZ],
          [x0, y1, rearZ]
        );
      }

      // Right outside edge
      if (!isFilled(x + 1, y)) {
        addQuad(
          wallPositions,
          [x1, y0, frontZ],
          [x1, y0, rearZ],
          [x1, y1, rearZ],
          [x1, y1, frontZ]
        );
      }

      // Top outside edge
      if (!isFilled(x, y - 1)) {
        addQuad(
          wallPositions,
          [x0, y1, frontZ],
          [x1, y1, frontZ],
          [x1, y1, rearZ],
          [x0, y1, rearZ]
        );
      }

      // Bottom outside edge
      if (!isFilled(x, y + 1)) {
        addQuad(
          wallPositions,
          [x0, y0, rearZ],
          [x1, y0, rearZ],
          [x1, y0, frontZ],
          [x0, y0, frontZ]
        );
      }
    }
  }

  if (!facePositions.length) {
    texture.dispose();
    throw new Error(
      "No visible logo pixels were found."
    );
  }

  const faceGeometry = new THREE.BufferGeometry();
  faceGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      facePositions,
      3
    )
  );
  faceGeometry.setAttribute(
    "uv",
    new THREE.Float32BufferAttribute(
      faceUVs,
      2
    )
  );
  faceGeometry.computeVertexNormals();

  const wallGeometry = new THREE.BufferGeometry();
  wallGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      wallPositions,
      3
    )
  );
  wallGeometry.computeVertexNormals();

  return {
    faceGeometry,
    wallGeometry,
    texture,
  };
}

function KKIModel({ model }) {
  const faceMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: model.texture,
        transparent: true,
        alphaTest: 0.1,
        metalness: 0.3,
        roughness: 0.45,
        side: THREE.DoubleSide,
      }),
    [model.texture]
  );

  const edgeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c79a53",
        metalness: 0.82,
        roughness: 0.28,
        side: THREE.DoubleSide,
      }),
    []
  );

  useEffect(() => {
    return () => {
      faceMaterial.dispose();
      edgeMaterial.dispose();
    };
  }, [faceMaterial, edgeMaterial]);

  return (
    <Float
      speed={1.2}
      rotationIntensity={0}
      floatIntensity={0.18}
    >
      <group>
        <mesh
          geometry={model.wallGeometry}
          material={edgeMaterial}
        />

        <mesh
          geometry={model.faceGeometry}
          material={faceMaterial}
        />
      </group>
    </Float>
  );
}

function LogoScene({ model, isHovered, controlsRef }) {
  return (
    <>
      <ambientLight intensity={2.1} />

      <hemisphereLight
        args={[
          "#ffffff",
          "#182e45",
          2.2,
        ]}
      />

      <directionalLight
        position={[4, 5, 5]}
        intensity={3.2}
        color="#ffffff"
      />

      <directionalLight
        position={[-4, 1, -4]}
        intensity={2.4}
        color="#ebcd91"
      />

      <pointLight
        position={[2, -2, 3]}
        intensity={12}
        distance={10}
        color="#d0a154"
      />

      <KKIModel model={model} />

        <OrbitControls
            ref={controlsRef}
            makeDefault
            enablePan={false}
            enableRotate={isHovered}
            enableZoom={isHovered}
            enableDamping
            dampingFactor={0.065}
            autoRotate={isHovered}
            autoRotateSpeed={0.9}
            rotateSpeed={0.65}
            minDistance={3.8}
            maxDistance={8}
            minPolarAngle={0.35}
            maxPolarAngle={Math.PI - 0.35}
            target={[0, 0, 0]}
        />
    </>
  );
}

export default function HeroEquipment3D() {
  const [model, setModel] = useState(null);
  const [error, setError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const controlsRef = useRef(null);

  const resetLogo = () => {
    setIsHovered(false);

    const controls = controlsRef.current;
    if (!controls) return;

    const camera = controls.object;

    const startPosition = camera.position.clone();
    const startTarget = controls.target.clone();

    const endPosition = new THREE.Vector3(0, 0.1, 5.8);
    const endTarget = new THREE.Vector3(0, 0, 0);

    const startTime = performance.now();
    const duration = 650;

    function animate(now) {
        if (controlsRef.current !== controls) return;

        const progress = Math.min(
        (now - startTime) / duration,
        1
        );

        const eased = 1 - Math.pow(1 - progress, 3);

        camera.position.lerpVectors(
        startPosition,
        endPosition,
        eased
        );

        controls.target.lerpVectors(
        startTarget,
        endTarget,
        eased
        );

        controls.update();

        if (progress < 1) {
        requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
    };

  useEffect(() => {
    let cancelled = false;
    let createdModel = null;

    const image = new window.Image();

    image.onload = () => {
      if (cancelled) return;

      try {
        createdModel = createLogoGeometry(image);

        if (!cancelled) {
          setModel(createdModel);
        }
      } catch (err) {
        console.error(
          "KKI 3D logo generation failed:",
          err
        );
        setError(true);
      }
    };

    image.onerror = () => {
      if (!cancelled) setError(true);
    };

    image.src = LOGO_PATH;

    return () => {
      cancelled = true;
      image.onload = null;
      image.onerror = null;

      if (createdModel) {
        createdModel.faceGeometry.dispose();
        createdModel.wallGeometry.dispose();
        createdModel.texture.dispose();
      }
    };
  }, []);

  return (
    <div className="relative mx-auto flex w-full max-w-[680px] flex-col items-center justify-center">
      {/* Ambient light only — no surrounding card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[12%] rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, rgba(208,161,84,0.11), transparent 70%)",
        }}
      />

        <div
            className="relative h-[350px] w-full sm:h-[430px<LogoScene model={model} />] lg:h-[500px]"
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={resetLogo}
        >
        {model && !error ? (
          <Canvas
            dpr={[1, 1.5]}
            camera={{
              position: [0, 0.1, 5.8],
              fov: 37,
            }}
            gl={{
              alpha: true,
              antialias: true,
              powerPreference: "high-performance",
            }}
            style={{
              background: "transparent",
              touchAction: "pan-y",
            }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
              gl.outputColorSpace =
                THREE.SRGBColorSpace;
            }}
          >
            <LogoScene
                model={model}
                isHovered={isHovered}
                controlsRef={controlsRef}
            />
          </Canvas>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {/* Logo remains visible during loading
                or when WebGL is unavailable. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO_PATH}
              alt="Kitchen King Industries"
              className="max-h-[80%] max-w-[75%] object-contain"
            />
          </div>
        )}
      </div>

      <div className="relative -mt-4 flex flex-col items-center gap-2 text-center">
        <h2 className="font-display text-xl font-extrabold tracking-[0.15em] text-white sm:text-2xl">
          KITCHEN KING
        </h2>

        <p className="text-[11px] font-bold tracking-[0.48em] text-[var(--gold-300)]">
          INDUSTRIES
        </p>

        <div className="mt-3 flex items-center gap-2 text-[11px] text-[var(--muted-dark)]">
          <Rotate3D
            size={15}
            className="text-[var(--gold-300)]"
          />
          <span>
            Drag to rotate 360° · Scroll to zoom
          </span>
        </div>
      </div>
    </div>
  );
}
