'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { type MotionValue } from 'motion/react';
import * as THREE from 'three';
import { QuantumCinematicField } from '@/components/v2/quantum-hero/quantum-cinematic-field';
import { QuantumEnergyMembrane } from '@/components/v2/quantum-hero/quantum-energy-membrane';
import { QuantumEnvironment } from '@/components/v2/quantum-hero/quantum-environment';
import { createQuantumExperienceState, type QuantumExperienceRef } from '@/components/v2/quantum-hero/quantum-interaction';
import { QuantumLights } from '@/components/v2/quantum-hero/quantum-lights';
import { QuantumModel } from '@/components/v2/quantum-hero/quantum-model';
import { QuantumReflections } from '@/components/v2/quantum-hero/quantum-reflections';

type QuantumCanvasProps = {
  scrollProgress: MotionValue<number>;
  active: boolean;
  onReady: () => void;
};

function QuantumCameraRig({ scrollProgress, experience }: Pick<QuantumCanvasProps, 'scrollProgress'> & { experience: QuantumExperienceRef }) {
  useFrame((state, delta) => {
    const progress = scrollProgress.get();
    const cinematic = experience.current.cinematic;
    const camera = state.camera;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, cinematic * 0.05, 7, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 6.55 - progress * 0.42 - cinematic * 0.16, 7, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.06 + progress * 0.04, 7, delta);
  });

  return null;
}

function QuantumReadySignal({ onReady }: Pick<QuantumCanvasProps, 'onReady'>) {
  const sent = useRef(false);
  const stableFrames = useRef(0);

  useFrame((_, delta) => {
    if (sent.current) return;
    stableFrames.current = delta <= 1 / 35 ? stableFrames.current + 1 : 0;
    if (stableFrames.current < 12) return;
    sent.current = true;
    onReady();
  });

  return null;
}

export function QuantumCanvas({ scrollProgress, active, onReady }: QuantumCanvasProps) {
  const experience = useRef(createQuantumExperienceState());

  return (
    <Canvas
      dpr={1}
      camera={{ position: [0, 0.06, 6.55], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.18;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
      frameloop={active ? 'always' : 'never'}
      className="!h-full !w-full"
    >
      <QuantumCameraRig scrollProgress={scrollProgress} experience={experience} />
      <QuantumReadySignal onReady={onReady} />
      <QuantumReflections />
      <QuantumLights experience={experience} />
      <QuantumEnergyMembrane experience={experience} />
      <QuantumCinematicField experience={experience} />
      <QuantumEnvironment experience={experience} />
      <QuantumModel experience={experience} />
    </Canvas>
  );
}
