"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
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
  const cursorPosition = useStore((s) => s.cursorPosition);
  const isTouchDevice = useStore((s) => s.isTouchDevice);

  const normalizedCursor = useMemo(() => {
    if (typeof window === "undefined") return { x: 0, y: 0 };
    return {
      x: (cursorPosition.x / window.innerWidth) * 2 - 1,
      y: -(cursorPosition.y / window.innerHeight) * 2 + 1,
    };
  }, [cursorPosition]);

  useFrame(() => {
    if (!meshRef.current) return;

    // Slow rotation
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.0007;

    // Cursor attraction (desktop)
    if (!isTouchDevice) {
      const targetX = position[0] + normalizedCursor.x * 0.4;
      const targetY = position[1] + normalizedCursor.y * 0.4;
      meshRef.current.position.x +=
        (targetX - meshRef.current.position.x) * 0.006;
      meshRef.current.position.y +=
        (targetY - meshRef.current.position.y) * 0.006;
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
          color={color}
          emissive={emissive ? color : "#000000"}
          emissiveIntensity={emissive ? 0.5 : 0}
          wireframe={wireframe}
          transparent
          opacity={wireframe ? 0.5 : 0.8}
        />
      </mesh>
    </Float>
  );
}

function Shapes() {
  const shapes = useMemo(
    () => [
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


function SceneSetup() {
  const { gl } = useThree();
  const setSceneReady = useStore((s) => s.setSceneReady);
  const hasSetReady = useRef(false);

  useEffect(() => {
    if (gl && !hasSetReady.current) {
      hasSetReady.current = true;
      // Small delay to ensure everything is initialized
      const timer = setTimeout(() => {
        setSceneReady(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [gl, setSceneReady]);

  return null;
}

export function Scene() {
  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <SceneSetup />
        <ambientLight intensity={0.5} color="#FFF9F0" />
        <directionalLight position={[5, 5, 5]} intensity={0.4} />
        <directionalLight
          position={[-3, -3, -3]}
          intensity={0.2}
          color="#F5D49B"
        />
        <Shapes />
      </Canvas>
    </div>
  );
}
