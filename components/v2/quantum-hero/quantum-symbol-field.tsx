'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { QuantumExperienceRef } from '@/components/v2/quantum-hero/quantum-interaction';

type QuantumSymbolFieldProps = {
  experience: QuantumExperienceRef;
};

const SYMBOLS = ['Q', 'f(x)', '\u03a3', '\u221a', '\u03c0', '\u03bb', 'x\u00b2', '{ }', '01', 'AI', 'n!', '\u0394', '\u221e', '</>', '\u222b', 'FQ', '2\u207f', 'API'];

function createSymbolTexture(label: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const context = canvas.getContext('2d');

  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = '600 46px "Segoe UI", sans-serif';
    context.shadowColor = '#22d3ee';
    context.shadowBlur = 18;
    context.fillStyle = '#d9fbff';
    context.fillText(label, canvas.width / 2, canvas.height / 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

export function QuantumSymbolField({ experience }: QuantumSymbolFieldProps) {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const materialsRef = useRef<Array<THREE.SpriteMaterial | null>>([]);
  const modelX = viewport.width * 0.2;
  const symbols = useMemo(() => SYMBOLS.map((label, index) => {
    const angle = index * 2.399963;
    const radius = 1.15 + (index % 4) * 0.62;
    return {
      label,
      texture: createSymbolTexture(label),
      position: [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.74, -1.4 - (index % 6) * 1.08] as [number, number, number],
      scale: 0.34 + (index % 3) * 0.09,
    };
  }), []);

  useEffect(() => () => {
    symbols.forEach(({ texture }) => texture.dispose());
  }, [symbols]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const progress = experience.current.cinematic;
    const visibility = THREE.MathUtils.smoothstep(progress, 0.24, 0.72);
    group.visible = progress > 0.12;
    group.rotation.z += delta * (0.06 + progress * 0.14);
    group.rotation.y = Math.sin(state.clock.elapsedTime * 0.24) * progress * 0.12;
    group.rotation.x = Math.cos(state.clock.elapsedTime * 0.19) * progress * 0.05;
    group.position.x = THREE.MathUtils.lerp(modelX, 0, THREE.MathUtils.smoothstep(progress, 0.28, 0.82));
    group.position.y = -THREE.MathUtils.smoothstep(progress, 0.24, 1) * viewport.height * 0.32;
    group.position.z = 0.08 + Math.sin(state.clock.elapsedTime * 0.4) * progress * 0.06;
    group.scale.set(0.82 + progress * 0.42, 0.82 + progress * 0.12, 1);

    materialsRef.current.forEach((material, index) => {
      if (!material) return;
      material.opacity = visibility * (0.36 + (index % 4) * 0.09) * (0.88 + Math.sin(state.clock.elapsedTime * 1.1 + index) * 0.12);
      material.rotation += delta * (index % 2 === 0 ? 0.08 : -0.06);
    });
  });

  return (
    <group ref={groupRef} position={[modelX, 0, 0]} visible={false}>
      {symbols.map((symbol, index) => (
        <sprite key={`${symbol.label}-${index}`} position={symbol.position} scale={[symbol.scale * 2, symbol.scale, 1]}>
          <spriteMaterial
            ref={(material) => { materialsRef.current[index] = material; }}
            map={symbol.texture}
            color={index % 4 === 0 ? '#5ee8ff' : '#d8fbff'}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </sprite>
      ))}
    </group>
  );
}
