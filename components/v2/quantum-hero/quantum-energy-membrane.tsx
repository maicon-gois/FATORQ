'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { QuantumExperienceRef } from '@/components/v2/quantum-hero/quantum-interaction';

type QuantumEnergyMembraneProps = {
  experience: QuantumExperienceRef;
};

const vertexShader = `
  uniform float uTime;
  uniform float uEnergy;
  uniform vec2 uPointer;

  varying vec3 vNormalView;
  varying vec3 vViewDirection;
  varying float vWave;
  varying vec3 vLocalPosition;

  void main() {
    vec3 p = position;
    float waveA = sin(p.y * 8.0 + uTime * 1.8 + sin(p.x * 3.0));
    float waveB = sin(p.z * 10.0 - uTime * 1.35 + p.y * 2.8);
    float waveC = cos(p.x * 7.0 + uTime * 1.1 - p.z * 3.2);
    float wave = (waveA + waveB + waveC) / 3.0;
    float pointerPull = dot(normalize(p.xy + vec2(0.001)), normalize(uPointer + vec2(0.001)));
    float displacement = wave * (0.016 + uEnergy * 0.054) + pointerPull * uEnergy * 0.012;

    p += normal * displacement;
    vec4 viewPosition = modelViewMatrix * vec4(p, 1.0);
    vNormalView = normalize(normalMatrix * normal);
    vViewDirection = normalize(-viewPosition.xyz);
    vWave = wave;
    vLocalPosition = p;
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uEnergy;
  uniform float uOpacity;
  uniform vec3 uColor;

  varying vec3 vNormalView;
  varying vec3 vViewDirection;
  varying float vWave;
  varying vec3 vLocalPosition;

  void main() {
    float fresnel = pow(1.0 - max(dot(normalize(vNormalView), normalize(vViewDirection)), 0.0), 3.15);
    float folds = sin(vLocalPosition.y * 14.0 + vWave * 4.0 - uTime * 2.2) * 0.5 + 0.5;
    folds *= sin(vLocalPosition.x * 9.0 - uTime * 1.15) * 0.5 + 0.5;
    folds = smoothstep(0.68, 0.97, folds);
    float sideLobes = smoothstep(0.12, 0.9, abs(vLocalPosition.x));
    float energyVeil = folds * (0.22 + sideLobes * 0.78);
    float pulse = 0.84 + sin(uTime * 3.1) * 0.16;
    float alpha = (fresnel * 0.15 + energyVeil * (0.08 + fresnel * 0.5)) * uOpacity * pulse;
    vec3 color = mix(uColor * 0.44, vec3(0.32, 0.88, 0.98), clamp(fresnel * 0.72 + energyVeil * 0.16, 0.0, 1.0));

    if (alpha < 0.012) discard;
    gl_FragColor = vec4(color, alpha);
  }
`;

export function QuantumEnergyMembrane({ experience }: QuantumEnergyMembraneProps) {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const modelX = Math.min(Math.max(viewport.width * 0.2, 1.02), 1.5);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uEnergy: { value: 0 },
    uOpacity: { value: 0.14 },
    uPointer: { value: new THREE.Vector2() },
    uColor: { value: new THREE.Color('#43dff5') },
  }), []);

  useFrame((state, delta) => {
    const group = groupRef.current;
    const material = materialRef.current;
    if (!group || !material) return;

    const interaction = experience.current;
    const proximityEnergy = interaction.proximity * 0.72;
    const revealEnergy = interaction.reveal * 0.38;
    const fieldEnergy = THREE.MathUtils.smoothstep(interaction.cinematic, 0.02, 0.88);
    const brandFade = 1 - THREE.MathUtils.smoothstep(interaction.reveal, 0.16, 0.86);
    const cinematicFade = 1 - THREE.MathUtils.smoothstep(interaction.cinematic, 0.02, 0.62);
    const energy = Math.max(0.12, proximityEnergy, revealEnergy, fieldEnergy);
    const targetScale = 0.53 + interaction.reveal * 0.12 + fieldEnergy * 0.22;

    group.visible = true;
    group.position.x = THREE.MathUtils.damp(group.position.x, modelX + interaction.look.x * 0.035 * energy, 7, delta);
    group.position.y = THREE.MathUtils.damp(group.position.y, interaction.look.y * 0.028 * energy, 7, delta);
    group.rotation.x += delta * (0.045 + energy * 0.08);
    group.rotation.y -= delta * (0.075 + energy * 0.12);
    group.rotation.z += delta * (0.03 + energy * 0.055);
    group.scale.setScalar(THREE.MathUtils.damp(group.scale.x, targetScale, 6.5, delta));

    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uEnergy.value = energy;
    material.uniforms.uOpacity.value = (0.08 + interaction.proximity * 0.13 + interaction.reveal * 0.04) * brandFade * cinematicFade;
    material.uniforms.uPointer.value.set(interaction.look.x, interaction.look.y);
  });

  return (
    <group ref={groupRef} position={[modelX, 0, -0.08]} scale={0.53}>
      <mesh renderOrder={1}>
        <sphereGeometry args={[1.04, 44, 30]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
