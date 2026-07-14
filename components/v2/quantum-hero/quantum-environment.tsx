'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import type { QuantumExperienceRef } from '@/components/v2/quantum-hero/quantum-interaction';

type QuantumEnvironmentProps = {
  experience: QuantumExperienceRef;
};

export function QuantumEnvironment({ experience }: QuantumEnvironmentProps) {
  const { viewport } = useThree();
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const modelX = viewport.width * 0.2;

  useFrame((_, rawDelta) => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const delta = Math.min(rawDelta, 1 / 30);

    const interaction = experience.current;
    const reveal = interaction.reveal;
    const cinematic = interaction.cinematic;
    const proximity = interaction.proximity;
    const speed = 1.08 + proximity * 5.1 + reveal * 0.52 + cinematic * 2.4;

    outer.rotation.z += delta * speed;
    outer.rotation.y += delta * (0.12 + proximity * 0.62 + cinematic * 0.48);
    outer.rotation.x = THREE.MathUtils.damp(outer.rotation.x, -interaction.look.y * proximity * 0.14, 7, delta);
    inner.rotation.z -= delta * (speed * 1.46);
    inner.rotation.x += delta * (0.1 + proximity * 0.4 + cinematic * 0.34);
    inner.rotation.y = THREE.MathUtils.damp(inner.rotation.y, interaction.look.x * proximity * 0.2, 7, delta);

    outer.position.x = THREE.MathUtils.damp(outer.position.x, interaction.look.x * proximity * 0.1, 7, delta);
    outer.position.y = THREE.MathUtils.damp(outer.position.y, interaction.look.y * proximity * 0.08, 7, delta);
    inner.position.x = THREE.MathUtils.damp(inner.position.x, interaction.look.x * proximity * 0.17, 8, delta);
    inner.position.y = THREE.MathUtils.damp(inner.position.y, interaction.look.y * proximity * 0.13, 8, delta);

    const expansion = (1 - proximity * 0.1) * (1 + cinematic * 2.15);
    outer.scale.setScalar(expansion);
    inner.scale.setScalar(expansion);
  });

  return (
    <group position={[modelX, 0, -0.15]}>
      <group ref={outerRef}>
        <Sparkles count={46} scale={[3.9, 3.9, 1.5]} size={1.2} speed={0.28} opacity={0.52} color="#82efff" />
      </group>
      <group ref={innerRef} rotation={[0.4, 0.2, 0]}>
        <Sparkles count={34} scale={[2.45, 2.45, 1.1]} size={0.86} speed={0.4} opacity={0.72} color="#e3fcff" />
      </group>
    </group>
  );
}
