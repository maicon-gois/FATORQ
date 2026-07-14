'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { QuantumExperienceRef } from '@/components/v2/quantum-hero/quantum-interaction';

type QuantumLightsProps = {
  experience: QuantumExperienceRef;
};

export function QuantumLights({ experience }: QuantumLightsProps) {
  const keyLightRef = useRef<THREE.PointLight>(null);
  const rimLightRef = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    const key = keyLightRef.current;
    const rim = rimLightRef.current;
    if (!key || !rim) return;

    const interaction = experience.current;
    const chargeBoost = interaction.charge * 24 + interaction.cinematic * 12;
    key.position.x = THREE.MathUtils.damp(key.position.x, 2.5 + interaction.pointer.x * 1.05, 12, delta);
    key.position.y = THREE.MathUtils.damp(key.position.y, 2.7 + interaction.pointer.y * 0.78, 12, delta);
    key.intensity = THREE.MathUtils.damp(key.intensity, 30 + chargeBoost, 10, delta);
    rim.intensity = THREE.MathUtils.damp(rim.intensity, 24 + chargeBoost * 0.8, 10, delta);
  });

  return (
    <>
      <ambientLight intensity={0.7} color="#dff9ff" />
      <hemisphereLight args={['#e8fbff', '#01060a', 1.5]} />
      <directionalLight position={[4.8, 5.5, 4]} intensity={3.4} color="#ffffff" />
      <directionalLight position={[-4.5, -1.8, 2.8]} intensity={2.1} color="#0089ba" />
      <pointLight ref={keyLightRef} position={[2.5, 2.7, 3.8]} intensity={30} distance={11} color="#8cf4ff" />
      <pointLight ref={rimLightRef} position={[-2.5, 0.4, 2]} intensity={24} distance={9} color="#05a9df" />
      <pointLight position={[0.8, -2.2, 2.6]} intensity={12} distance={8} color="#d7fbff" />
    </>
  );
}
