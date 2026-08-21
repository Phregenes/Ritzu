"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import type { Mesh, Points } from "three";
import { readBands, useAudioApi } from "@/components/audio-provider";

function NightCore() {
  const mesh = useRef<Mesh>(null);
  const { analyserRef, playingRef } = useAudioApi();

  useFrame((_, delta) => {
    const bands = readBands(analyserRef.current, 8);
    const bass = bands[0] ?? 0;
    const live = playingRef.current ? 1 : 0.15;
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * (0.12 + bass * 0.8 * live);
    mesh.current.rotation.x += delta * 0.05;
    const s = 1.15 + bass * 0.55 * live;
    mesh.current.scale.setScalar(s);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.35, 24]} />
        <MeshDistortMaterial
          color="#a8b8c8"
          emissive="#480008"
          emissiveIntensity={0.35}
          roughness={0.25}
          metalness={0.55}
          distort={0.38}
          speed={2.2}
        />
      </mesh>
    </Float>
  );
}

function Field() {
  const positions = useMemo(() => {
    const count = 1400;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const r = 4 + Math.random() * 8;
      const t = Math.random() * Math.PI * 2;
      const p = (Math.random() - 0.5) * Math.PI;
      arr[i * 3] = Math.cos(t) * Math.cos(p) * r;
      arr[i * 3 + 1] = Math.sin(p) * r * 0.6;
      arr[i * 3 + 2] = Math.sin(t) * Math.cos(p) * r;
    }
    return arr;
  }, []);

  const { analyserRef, playingRef } = useAudioApi();
  const points = useRef<Points>(null);

  useFrame((_, delta) => {
    const energy = readBands(analyserRef.current, 6)[2] ?? 0;
    if (!points.current) return;
    points.current.rotation.y += delta * (0.04 + energy * 0.2);
    points.current.scale.setScalar(1 + energy * 0.12 * (playingRef.current ? 1 : 0.2));
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#e0d8d0" size={0.035} sizeAttenuation transparent opacity={0.55} />
    </points>
  );
}

export function ModernaVisualizer() {
  return (
    <Canvas camera={{ position: [0, 0, 6.2], fov: 42 }} dpr={[1, 1.75]}>
      <color attach="background" args={["#0c0c0e"]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 5]} intensity={18} color="#a8b8c8" />
      <pointLight position={[-4, -2, -3]} intensity={10} color="#480008" />
      <Stars radius={40} depth={20} count={800} factor={2} saturation={0} fade speed={0.4} />
      <NightCore />
      <Field />
    </Canvas>
  );
}
