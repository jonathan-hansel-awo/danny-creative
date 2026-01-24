"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { useStore } from "@/stores/useStore";

function FloatingShape({
  position,
  geometry,
  color,
  emissive = false,
  wireframe = false,
  scale = 1,
}: {
  position: [number, number, number];
  geometry: "sphere" | "octahedron" | "torus" | "icosahedron";
  color: string;
  emissive?: boolean;
  wireframe?: boolean;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const initialPosition = useRef(position);

  const cursorPosition = useStore((s) => s.cursorPosition);
  const isTouchDevice = useStore((s) => s.isTouchDevice);
  const loadingPhase = useStore((s) => s.loadingPhase);

  // Start invisible, fade in during spark-born phase
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.opacity = 0;
    }
  }, []);

  const normalizedCursor = useMemo(() => {
    if (typeof window === "undefined") return { x: 0, y: 0 };
    return {
      x: (cursorPosition.x / window.innerWidth) * 2 - 1,
      y: -(cursorPosition.y / window.innerHeight) * 2 + 1,
    };
  }, [cursorPosition]);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    // Fade in based on loading phase
    let targetOpacity = 0;
    if (loadingPhase === "spark-born") {
      targetOpacity = wireframe ? 0.4 : 0.6;
    } else if (
      loadingPhase === "content-revealing" ||
      loadingPhase === "complete"
    ) {
      targetOpacity = wireframe ? 0.6 : 0.9;
    }
    materialRef.current.opacity +=
      (targetOpacity - materialRef.current.opacity) * 0.02;

    // Slow rotation
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.0007;

    // Cursor attraction (desktop only, after loading)
    if (!isTouchDevice && loadingPhase === "complete") {
      const targetX = initialPosition.current[0] + normalizedCursor.x * 0.4;
      const targetY = initialPosition.current[1] + normalizedCursor.y * 0.4;
      meshRef.current.position.x +=
        (targetX - meshRef.current.position.x) * 0.006;
      meshRef.current.position.y +=
        (targetY - meshRef.current.position.y) * 0.006;
    }

    // During loading, shapes drift outward slightly then back
    if (loadingPhase === "spark-born" || loadingPhase === "content-revealing") {
      const time = state.clock.elapsedTime;
      const drift = Math.sin(time * 0.5) * 0.1;
      meshRef.current.position.x = initialPosition.current[0] * (1 + drift);
      meshRef.current.position.y = initialPosition.current[1] * (1 + drift);
    }
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case "sphere":
        return <sphereGeometry args={[0.5, 32, 32]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.5]} />;
      case "torus":
        return <torusGeometry args={[0.4, 0.15, 16, 32]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[0.5, 0]} />;
    }
  }, [geometry]);

  return (
    <Float speed={0.4} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geo}
        <meshStandardMaterial
          ref={materialRef}
          color={color}
          emissive={emissive ? color : "#000000"}
          emissiveIntensity={emissive ? 0.5 : 0}
          wireframe={wireframe}
          transparent
          opacity={0}
        />
      </mesh>
    </Float>
  );
}

function Shapes() {
  const shapes = useMemo(
    () => [
      {
        position: [-3, 1.5, -2] as [number, number, number],
        geometry: "sphere" as const,
        color: "#E8A54B",
        emissive: true,
        scale: 0.4,
      },
      {
        position: [2.5, -1, -3] as [number, number, number],
        geometry: "sphere" as const,
        color: "#E8A54B",
        emissive: true,
        scale: 0.3,
      },
      {
        position: [0, 2, -4] as [number, number, number],
        geometry: "sphere" as const,
        color: "#F5D49B",
        emissive: true,
        scale: 0.5,
      },
      {
        position: [-2, -1.5, -2.5] as [number, number, number],
        geometry: "sphere" as const,
        color: "#F0EBE3",
        scale: 0.25,
      },
      {
        position: [3, 0.5, -3.5] as [number, number, number],
        geometry: "sphere" as const,
        color: "#FAF7F2",
        scale: 0.35,
      },
      {
        position: [1.5, 1.8, -2] as [number, number, number],
        geometry: "octahedron" as const,
        color: "#F5D49B",
        wireframe: true,
        scale: 0.5,
      },
      {
        position: [-2.5, 0, -3] as [number, number, number],
        geometry: "octahedron" as const,
        color: "#E8A54B",
        wireframe: true,
        scale: 0.4,
      },
      {
        position: [0.5, -1.8, -2.5] as [number, number, number],
        geometry: "torus" as const,
        color: "#E8A54B",
        scale: 0.6,
      },
      {
        position: [-1, 1, -4] as [number, number, number],
        geometry: "torus" as const,
        color: "#F5D49B",
        scale: 0.4,
      },
      {
        position: [2, -0.5, -2] as [number, number, number],
        geometry: "icosahedron" as const,
        color: "#F0EBE3",
        scale: 0.35,
      },
    ],
    [],
  );

  return (
    <>
      {shapes.map((props, i) => (
        <FloatingShape key={i} {...props} />
      ))}
    </>
  );
}

function Effects() {
  const loadingPhase = useStore((s) => s.loadingPhase);

  // Adjust bloom based on loading phase
  const bloomIntensity = loadingPhase === "complete" ? 0.4 : 0.6;

  return (
    <EffectComposer>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.9}
        radius={0.8}
      />
      <Noise opacity={0.02} />
      <Vignette darkness={0.3} offset={0.5} />
    </EffectComposer>
  );
}

// Component to signal scene is ready
function SceneReadySignal() {
  const setSceneReady = useStore((s) => s.setSceneReady);
  const { gl } = useThree();

  useEffect(() => {
    // Signal ready after a short delay to ensure everything is loaded
    const timer = setTimeout(() => {
      setSceneReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [setSceneReady, gl]);

  return null;
}

export function Scene() {
  const isTouchDevice = useStore((s) => s.isTouchDevice);

  return (
    <div className="three-canvas">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, isTouchDevice ? 1.5 : 2]}
      >
        <SceneReadySignal />
        <ambientLight intensity={0.4} color="#FFF9F0" />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <directionalLight
          position={[-5, -5, -5]}
          intensity={0.2}
          color="#F5D49B"
        />
        <Shapes />
        <Effects />
      </Canvas>
    </div>
  );
}
