'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import type { MotionValue } from 'motion/react';
import * as THREE from 'three';
import type { QuantumExperienceRef } from '@/components/v2/quantum-hero/quantum-interaction';

type QuantumDataHorizonProps = {
  experience: QuantumExperienceRef;
  scrollProgress: MotionValue<number>;
};

export function QuantumDataHorizon({ experience, scrollProgress }: QuantumDataHorizonProps) {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.Mesh>(null);
  const lineMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const glowMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const sourceRef = useRef<THREE.Mesh>(null);
  const sourceMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const streamRef = useRef<THREE.Points>(null);
  const streamMaterialRef = useRef<THREE.PointsMaterial>(null);
  const modelX = viewport.width * 0.2;
  const streamPositions = useMemo(() => {
    const positions = new Float32Array(120 * 3);

    for (let index = 0; index < 120; index += 1) {
      const offset = index * 3;
      const lane = ((index * 47) % 121) / 120;
      positions[offset] = lane * 2 - 1;
      positions[offset + 1] = -0.05 - ((index * 31) % 97) / 97;
      positions[offset + 2] = -0.08 - (index % 7) * 0.06;
    }

    return positions;
  }, []);

  useFrame((state, delta) => {
    const group = groupRef.current;
    const line = lineRef.current;
    const lineMaterial = lineMaterialRef.current;
    const glow = glowRef.current;
    const glowMaterial = glowMaterialRef.current;
    const source = sourceRef.current;
    const sourceMaterial = sourceMaterialRef.current;
    const stream = streamRef.current;
    const streamMaterial = streamMaterialRef.current;
    if (!group || !line || !lineMaterial || !glow || !glowMaterial || !source || !sourceMaterial || !stream || !streamMaterial) return;

    const cinematic = experience.current.cinematic;
    const scroll = scrollProgress.get();
    const birth = THREE.MathUtils.smoothstep(cinematic, 0.1, 0.72);
    const streamIn = THREE.MathUtils.smoothstep(cinematic, 0.42, 0.92);
    const scrollFade = 1 - THREE.MathUtils.smoothstep(scroll, 0.76, 1);
    const pulse = 0.82 + Math.sin(state.clock.elapsedTime * 4.2) * 0.18;
    const width = THREE.MathUtils.lerp(0.14, viewport.width * 1.24, birth);

    group.visible = cinematic > 0.025;
    group.position.x = THREE.MathUtils.damp(group.position.x, THREE.MathUtils.lerp(modelX, 0, birth), 8, delta);
    group.position.y = THREE.MathUtils.damp(group.position.y, THREE.MathUtils.lerp(0, -viewport.height * 0.32, birth), 8, delta);
    group.position.z = 0.48;

    line.scale.set(width, 1, 1);
    lineMaterial.opacity = birth * scrollFade * 0.72;
    glow.scale.set(width, 1 + birth * 1.35, 1);
    glowMaterial.opacity = birth * scrollFade * (0.1 + pulse * 0.05);

    source.scale.setScalar(Math.max((1 - birth * 0.72) * (0.7 + pulse * 0.3), 0.001));
    sourceMaterial.opacity = (1 - birth * 0.42) * scrollFade * 0.95;

    stream.position.y = -scroll * viewport.height * 0.16;
    stream.scale.set(viewport.width * 0.56, 1.1 + streamIn * 0.7, 1);
    streamMaterial.opacity = streamIn * scrollFade * 0.5;
    streamMaterial.size = 0.012 + streamIn * 0.012;
  });

  return (
    <group ref={groupRef} position={[modelX, 0, 0.48]} visible={false}>
      <mesh ref={glowRef} renderOrder={8}>
        <planeGeometry args={[1, 0.1]} />
        <meshBasicMaterial
          ref={glowMaterialRef}
          color="#21d8f4"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={lineRef} renderOrder={9}>
        <boxGeometry args={[1, 0.012, 0.01]} />
        <meshBasicMaterial ref={lineMaterialRef} color="#d9fbff" transparent opacity={0} toneMapped={false} />
      </mesh>
      <mesh ref={sourceRef} renderOrder={10}>
        <sphereGeometry args={[0.055, 18, 18]} />
        <meshBasicMaterial
          ref={sourceMaterialRef}
          color="#ffffff"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <points ref={streamRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[streamPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={streamMaterialRef}
          color="#70eafa"
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
