'use client';

/* eslint-disable react-hooks/immutability -- R3F owns the reusable particle buffer updated inside the render loop. */

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { QuantumExperienceRef } from '@/components/v2/quantum-hero/quantum-interaction';

type QuantumCinematicFieldProps = {
  experience: QuantumExperienceRef;
};

export function QuantumCinematicField({ experience }: QuantumCinematicFieldProps) {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const modelX = Math.min(Math.max(viewport.width * 0.2, 1.02), 1.5);
  const positions = useMemo(() => {
    const points = new Float32Array(420 * 3);

    for (let index = 0; index < 420; index += 1) {
      const radialNoise = ((index * 73) % 421) / 420;
      const angle = index * 2.399963 + radialNoise * 0.42;
      const radius = 0.72 + radialNoise * 3.55 + Math.sin(index * 0.73) * 0.18;
      const offset = index * 3;

      points[offset] = Math.cos(angle) * radius;
      points[offset + 1] = Math.sin(angle) * radius * 0.72;
      points[offset + 2] = -1.5 - (index % 70) * 0.18;
    }

    return points;
  }, []);
  const speeds = useMemo(() => {
    const values = new Float32Array(420);
    for (let index = 0; index < 420; index += 1) values[index] = 0.22 + ((index * 37) % 91) / 190;
    return values;
  }, []);
  useFrame((state, delta) => {
    const group = groupRef.current;
    const geometry = geometryRef.current;
    const material = materialRef.current;
    if (!group || !geometry || !material) return;

    const progress = experience.current.cinematic;
    group.visible = progress > 0.015;
    group.rotation.z += delta * (0.035 + progress * 0.075);
    group.position.x = THREE.MathUtils.lerp(modelX, 0, THREE.MathUtils.smoothstep(progress, 0.28, 0.82));
    group.position.y = Math.sin(state.clock.elapsedTime * 0.31) * progress * 0.08;
    group.position.z = -0.12 + Math.sin(state.clock.elapsedTime * 0.42) * progress * 0.08;
    group.scale.set(0.72 + progress * 1.75, 0.72 + progress * 1.18, 1);
    material.opacity = THREE.MathUtils.smoothstep(progress, 0.08, 0.48) * (0.5 + Math.sin(state.clock.elapsedTime * 1.4) * 0.06);
    material.size = 0.011 + progress * 0.019;

    if (progress > 0.08) {
      const positionAttribute = geometry.attributes.position as THREE.BufferAttribute;
      for (let index = 0; index < speeds.length; index += 1) {
        const offset = index * 3;
        positions[offset + 1] -= delta * speeds[index] * (0.7 + progress * 1.35);
        positions[offset + 2] += delta * speeds[index] * progress * 0.54;
        if (positions[offset + 1] < -4.2) positions[offset + 1] = 3.3;
        if (positions[offset + 2] > 1.2) positions[offset + 2] = -12.5;
      }
      positionAttribute.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[modelX, 0, 0]} visible={false}>
      <points frustumCulled={false}>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={materialRef}
          color="#77ecff"
          size={0.012}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
