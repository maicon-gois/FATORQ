'use client';

/* eslint-disable react-hooks/immutability -- R3F frame state is intentionally mutable outside React renders. */

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { QuantumExperienceRef } from '@/components/v2/quantum-hero/quantum-interaction';

const MODEL_URL = '/models/logo-3d-model-realtime.glb';
const MODEL_FACE_ROTATION = -Math.PI / 2;

type QuantumLogoModelProps = {
  experience: QuantumExperienceRef;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function QuantumLogoModel({ experience }: QuantumLogoModelProps) {
  const { scene } = useGLTF(MODEL_URL);
  const groupRef = useRef<THREE.Group>(null);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;

    const scale = 0.96 / maxAxis;
    clone.scale.setScalar(scale);
    clone.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.castShadow = false;
      child.receiveShadow = false;
      child.frustumCulled = false;

      if (Array.isArray(child.material)) {
        child.material = child.material.map((material) => material.clone());
      } else if (child.material) {
        child.material = child.material.clone();
      }

      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => {
        if (!(material instanceof THREE.MeshStandardMaterial)) return;

        material.metalness = Math.min(material.metalness, 0.32);
        material.roughness = Math.max(material.roughness, 0.3);
        material.envMapIntensity = 1.2;
        material.color.offsetHSL(0, 0, 0.09);
        material.emissive.set('#063847');
        material.emissiveIntensity = 0.2;
        material.needsUpdate = true;
      });
    });

    return clone;
  }, [scene]);

  useFrame((state, rawDelta) => {
    const group = groupRef.current;
    if (!group) return;
    const delta = Math.min(rawDelta, 1 / 30);

    const interaction = experience.current;
    const rotation = interaction.logoRotation;
    const velocity = interaction.logoVelocity;
    const inertia = Math.abs(velocity.x) + Math.abs(velocity.y);

    if (!interaction.dragging && inertia > 0.0025) {
      const frameScale = delta * 60;
      rotation.y += velocity.y * frameScale;
      rotation.x = clamp(rotation.x + velocity.x * frameScale, -0.62, 0.62);

      const decay = Math.pow(0.91, frameScale);
      velocity.y *= decay;
      velocity.x *= decay;
    } else if (!interaction.dragging) {
      velocity.x = 0;
      velocity.y = 0;
      const idleYaw = Math.sin(state.clock.elapsedTime * 0.62) * 0.07;
      const wrappedY = THREE.MathUtils.euclideanModulo(rotation.y + Math.PI, Math.PI * 2) - Math.PI;
      rotation.y = THREE.MathUtils.damp(wrappedY, idleYaw, 2.4, delta);
      rotation.x = THREE.MathUtils.damp(rotation.x, interaction.pointer.y * 0.045, 2.8, delta);
    }

    const ejection = interaction.brand;
    const logoReveal = THREE.MathUtils.smoothstep(ejection, 0.01, 0.72);
    const overshoot = logoReveal + Math.sin(logoReveal * Math.PI) * 0.12;
    const logoExit = 1 - THREE.MathUtils.smoothstep(interaction.cinematic, 0.06, 0.48);

    group.scale.setScalar(Math.max(overshoot * logoExit, 0.001));
    group.position.z = THREE.MathUtils.lerp(0.16, 0.38, ejection) + Math.sin(ejection * Math.PI) * 0.14 + interaction.cinematic * 0.22;
    group.rotation.x = rotation.x;
    group.rotation.y = rotation.y;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0.16]} scale={0.001} renderOrder={5}>
      <group rotation={[0, MODEL_FACE_ROTATION, 0]}>
        <primitive object={model} />
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_URL);
