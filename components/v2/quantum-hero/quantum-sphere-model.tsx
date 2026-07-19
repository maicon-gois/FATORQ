'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { QuantumExperienceRef } from '@/components/v2/quantum-hero/quantum-interaction';

const MODEL_URL = '/models/fatorq-sphere.glb?v=18.3.1';

type QuantumSphereModelProps = {
  experience: QuantumExperienceRef;
  onReady: () => void;
};

type FragmentMaterial = {
  material: THREE.Material;
  opacity: number;
};

type SphereFragment = {
  delay: number;
  direction: THREE.Vector3;
  distance: number;
  materials: FragmentMaterial[];
  pivot: THREE.Group;
  spin: THREE.Vector3;
};

const seededDirection = (index: number) => {
  const phi = Math.acos(1 - 2 * ((index * 0.61803398875) % 1));
  const theta = index * 2.39996322973;
  return new THREE.Vector3(
    Math.sin(phi) * Math.cos(theta),
    Math.cos(phi),
    Math.sin(phi) * Math.sin(theta),
  ).normalize();
};

export function QuantumSphereModel({ experience, onReady }: QuantumSphereModelProps) {
  const { scene } = useGLTF(MODEL_URL);
  const groupRef = useRef<THREE.Group>(null);
  const elapsedRef = useRef(0);

  const { fragments, model } = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof THREE.Camera || child instanceof THREE.Light) child.visible = false;
    });

    const sourceBox = new THREE.Box3().setFromObject(clone);
    const sourceCenter = sourceBox.getCenter(new THREE.Vector3());
    const sourceSize = sourceBox.getSize(new THREE.Vector3());
    const maxAxis = Math.max(sourceSize.x, sourceSize.y, sourceSize.z) || 1;
    const normalizedRoot = new THREE.Group();
    normalizedRoot.scale.setScalar(1.38 / maxAxis);
    clone.position.copy(sourceCenter).multiplyScalar(-1);
    normalizedRoot.add(clone);
    normalizedRoot.updateMatrixWorld(true);

    const meshes: THREE.Mesh[] = [];
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) meshes.push(child);
    });

    const nextFragments: SphereFragment[] = [];
    const modelOrigin = new THREE.Vector3(0, 0, 0);

    meshes.forEach((mesh, index) => {
      const parent = mesh.parent;
      if (!parent) return;

      const sourceMaterials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      const materials = sourceMaterials.map((sourceMaterial) => {
        const material = sourceMaterial.clone();
        material.transparent = true;

        if (material instanceof THREE.MeshStandardMaterial) {
          material.roughness = Math.max(material.roughness, 0.28);
          material.metalness = Math.min(Math.max(material.metalness, 0.18), 0.72);
          material.envMapIntensity = 1.18;
          material.emissive.set('#031922');
          material.emissiveIntensity = 0.08;
        }

        return material;
      });
      mesh.material = Array.isArray(mesh.material) ? materials : materials[0];
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      mesh.frustumCulled = false;

      const worldCenter = new THREE.Box3().setFromObject(mesh).getCenter(new THREE.Vector3());
      const localCenter = parent.worldToLocal(worldCenter.clone());
      const localOrigin = parent.worldToLocal(modelOrigin.clone());
      let direction = localCenter.sub(localOrigin);
      if (direction.lengthSq() < 0.0001) direction = seededDirection(index);
      else direction.normalize();

      const parentScale = parent.getWorldScale(new THREE.Vector3());
      const worldScale = Math.max(parentScale.x, parentScale.y, parentScale.z, 0.0001);
      const pivot = new THREE.Group();
      pivot.name = `fatorq-fragment-${index}`;
      parent.remove(mesh);
      pivot.add(mesh);
      parent.add(pivot);

      nextFragments.push({
        delay: ((index * 7) % 17) / 17 * 0.1,
        direction,
        distance: (0.48 + ((index * 11) % 9) * 0.028) / worldScale,
        materials: materials.map((material) => ({ material, opacity: material.opacity })),
        pivot,
        spin: seededDirection(index + 19).multiplyScalar(0.46 + ((index * 5) % 7) * 0.045),
      });
    });

    return { fragments: nextFragments, model: normalizedRoot };
  }, [scene]);

  useEffect(() => {
    onReady();
    return () => {
      fragments.forEach((fragment) => {
        fragment.materials.forEach(({ material }) => material.dispose());
      });
    };
  }, [fragments, onReady]);

  useFrame((_, rawDelta) => {
    const group = groupRef.current;
    if (!group) return;

    const delta = Math.min(rawDelta, 1 / 30);
    elapsedRef.current += delta;
    const interaction = experience.current;
    const reveal = interaction.reveal;
    const proximity = interaction.proximity;
    const ignition = Math.max(proximity, interaction.revealRequested ? 1 - reveal : 0);
    const corePulse = Math.sin(elapsedRef.current * 9.2) * 0.012 * ignition;

    group.rotation.y += delta * (0.18 + proximity * 0.22) * (1 - reveal * 0.72);
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, interaction.look.y * -0.08, 4.8, delta);
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, interaction.look.x * 0.055, 4.8, delta);
    group.scale.setScalar(1 + ignition * 0.018 + corePulse);

    fragments.forEach((fragment) => {
      const open = THREE.MathUtils.smoothstep(reveal, 0.045 + fragment.delay, 0.96 + fragment.delay * 0.4);
      const eased = open * open * (3 - 2 * open);
      fragment.pivot.position.copy(fragment.direction).multiplyScalar(fragment.distance * eased);
      fragment.pivot.rotation.set(
        fragment.spin.x * eased,
        fragment.spin.y * eased,
        fragment.spin.z * eased,
      );
      fragment.pivot.scale.setScalar(1 - eased * 0.1);

      const opacity = 1 - THREE.MathUtils.smoothstep(open, 0.76, 0.99);
      fragment.materials.forEach(({ material, opacity: baseOpacity }) => {
        material.opacity = baseOpacity * opacity;
        material.depthWrite = opacity > 0.72;
        if (material instanceof THREE.MeshStandardMaterial) {
          material.emissiveIntensity = 0.08 + ignition * (0.18 + Math.abs(corePulse) * 7);
        }
      });
    });
  });

  return (
    <group ref={groupRef} renderOrder={3}>
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);
