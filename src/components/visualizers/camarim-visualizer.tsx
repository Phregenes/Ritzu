"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import type { Mesh } from "three";
import { readBands, useAudioApi } from "@/components/audio-provider";

function Lamp() {
  const mesh = useRef<Mesh>(null);
  const { analyserRef, playingRef } = useAudioApi();

  useFrame((_, delta) => {
    const bands = readBands(analyserRef.current, 10);
    const bass = bands[0] ?? 0;
    const mid = bands[4] ?? 0;
    const live = playingRef.current ? 1 : 0.2;
    if (!mesh.current) return;
    mesh.current.rotation.z += delta * (0.12 + mid * 0.5);
    mesh.current.rotation.y += delta * 0.18;
    mesh.current.scale.setScalar(1 + bass * 0.18 * live);
  });

  return (
    <Float speed={0.7} floatIntensity={0.22} rotationIntensity={0.08}>
      <mesh ref={mesh} position={[1.7, 0, 0]}>
        <torusKnotGeometry args={[0.92, 0.26, 180, 24]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.85}
          chromaticAberration={0.14}
          anisotropy={0.28}
          distortion={0.38}
          distortionScale={0.32}
          temporalDistortion={0.08}
          color="#e8d7a8"
          roughness={0.16}
        />
      </mesh>
    </Float>
  );
}

export function CamarimVisualizer() {
  return (
    <Canvas
      camera={{ position: [0.55, 0, 7.2], fov: 28 }}
      dpr={[1, 1.6]}
      gl={{ alpha: true, antialias: true }}
      className="h-full w-full"
    >
      <ambientLight intensity={0.45} />
      <spotLight
        position={[3, 6, 4]}
        intensity={48}
        color="#e8d7a8"
        angle={0.5}
        penumbra={0.85}
      />
      <pointLight position={[-3, -1, 2]} intensity={14} color="#884800" />
      <Environment preset="warehouse" background={false} frames={1} />
      <Lamp />
    </Canvas>
  );
}

export function CamarimHeroObject() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      <CamarimVisualizer />
    </div>
  );
}
