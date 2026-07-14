'use client';

/* eslint-disable react-hooks/immutability -- R3F frame state is intentionally mutable outside React renders. */

import { Suspense, useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { QuantumLogoModel } from '@/components/v2/quantum-hero/quantum-logo-model';
import type { QuantumExperienceRef, QuantumPhase } from '@/components/v2/quantum-hero/quantum-interaction';

type QuantumModelProps = {
  experience: QuantumExperienceRef;
};

type HotspotBounds = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const silverShell = new THREE.Color('#808a92');
const cyanShell = new THREE.Color('#86edfa');
const magneticStart = new THREE.Vector3();
const magneticEnd = new THREE.Vector3();
const ARC_POINT_COUNT = 28;

function getPointerMetrics(event: PointerEvent, rect: HotspotBounds) {
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const radius = Math.min(rect.width, rect.height) * 0.49;
  const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);

  return {
    inside: distance <= radius,
    localX: clamp((event.clientX - centerX) / radius, -1.35, 1.35),
    localY: clamp((centerY - event.clientY) / radius, -1.35, 1.35),
    proximity: clamp(1 - distance / (radius * 1.48), 0, 1),
  };
}

function announcePhase(phase: QuantumPhase) {
  window.dispatchEvent(new CustomEvent('fatorq:core-phase', { detail: { phase } }));
}

export function QuantumModel({ experience }: QuantumModelProps) {
  const { viewport } = useThree();
  const rootRef = useRef<THREE.Group>(null);
  const coreFollowerRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const middleRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const outerMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const middleMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const innerMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const outerHighlightMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const middleHighlightMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const shellMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const energyRef = useRef<THREE.Mesh>(null);
  const energyMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const contactRef = useRef<THREE.Mesh>(null);
  const contactMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const ignitionPulseRef = useRef<THREE.Mesh>(null);
  const ignitionPulseMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const hotspotRectRef = useRef<HotspotBounds | null>(null);
  const introStart = useRef<number | null>(null);
  const phaseSent = useRef<QuantumPhase>('ambient');
  const activationTime = useRef<number | null>(null);
  const modelX = Math.min(Math.max(viewport.width * 0.2, 1.02), 1.5);
  const magneticArcPositions = useMemo(() => new Float32Array(ARC_POINT_COUNT * 3), []);
  const magneticArcSecondaryPositions = useMemo(() => new Float32Array(ARC_POINT_COUNT * 3), []);
  const magneticArc = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(magneticArcPositions, 3));
    const material = new THREE.LineBasicMaterial({
      color: '#9af5ff',
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    const line = new THREE.Line(geometry, material);
    line.visible = false;
    line.renderOrder = 8;
    return line;
  }, [magneticArcPositions]);
  const magneticArcSecondary = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(magneticArcSecondaryPositions, 3));
    const material = new THREE.LineBasicMaterial({
      color: '#3dddf4',
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    const line = new THREE.Line(geometry, material);
    line.visible = false;
    line.renderOrder = 8;
    return line;
  }, [magneticArcSecondaryPositions]);

  useEffect(() => () => {
    magneticArc.geometry.dispose();
    magneticArc.material.dispose();
    magneticArcSecondary.geometry.dispose();
    magneticArcSecondary.material.dispose();
  }, [magneticArc, magneticArcSecondary]);

  useEffect(() => {
    const interaction = experience.current;
    let hotspot: HTMLElement | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let discoveryFrame = 0;
    const updateHotspotRect = () => {
      const rect = hotspot?.getBoundingClientRect();
      hotspotRectRef.current = rect
        ? { left: rect.left, top: rect.top, width: rect.width, height: rect.height }
        : null;
    };
    const connectHotspot = () => {
      hotspot = document.querySelector<HTMLElement>('[data-quantum-logo-hotspot]');

      if (!hotspot) {
        discoveryFrame = window.requestAnimationFrame(connectHotspot);
        return;
      }

      updateHotspotRect();
      resizeObserver = new ResizeObserver(updateHotspotRect);
      resizeObserver.observe(hotspot);
    };

    connectHotspot();

    const onPointerMove = (event: PointerEvent) => {
      const now = performance.now();
      interaction.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      interaction.pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
      const rect = hotspotRectRef.current;
      const metrics = rect ? getPointerMetrics(event, rect) : null;
      interaction.hovered = metrics?.inside ?? false;

      if (metrics) {
        interaction.proximityTarget = metrics.proximity;
        interaction.orbitTarget = clamp(metrics.localX, -1, 1);
        interaction.lookTarget.x = metrics.localX;
        interaction.lookTarget.y = metrics.localY;

        window.dispatchEvent(new CustomEvent('fatorq:core-pointer', { detail: { x: metrics.localX, y: metrics.localY } }));
        if (interaction.proximityTarget > 0.68) interaction.revealRequested = true;
      } else {
        interaction.proximityTarget = 0;
      }
      if (!interaction.pressed) return;

      const totalDistance = Math.hypot(event.clientX - interaction.pressX, event.clientY - interaction.pressY);
      if (totalDistance > 7) {
        interaction.dragging = true;
        interaction.charge = 0;
      }

      if (interaction.dragging) {
        interaction.activationRequested = false;
        const dx = event.clientX - interaction.lastX;
        const dy = event.clientY - interaction.lastY;
        const dt = Math.max(10, now - interaction.lastTime);

        interaction.logoRotation.y += dx * 0.011;
        interaction.logoRotation.x = clamp(interaction.logoRotation.x + dy * 0.008, -0.62, 0.62);
        interaction.logoVelocity.y = clamp((dx / dt) * 0.22, -0.52, 0.52);
        interaction.logoVelocity.x = clamp((dy / dt) * 0.16, -0.3, 0.3);
        interaction.lastLogoInteraction = now;
      }

      interaction.lastX = event.clientX;
      interaction.lastY = event.clientY;
      interaction.lastTime = now;
    };

    const onPointerDown = (event: PointerEvent) => {
      const rect = hotspotRectRef.current;
      if (!rect) return;
      const metrics = getPointerMetrics(event, rect);
      if (!metrics.inside) return;

      interaction.revealRequested = true;
      interaction.hovered = true;
      interaction.orbitTarget = clamp(metrics.localX, -1, 1);
      interaction.lookTarget.x = metrics.localX;
      interaction.lookTarget.y = metrics.localY;
      interaction.pressed = true;
      interaction.dragging = false;
      interaction.activationRequested = false;
      interaction.pressX = event.clientX;
      interaction.pressY = event.clientY;
      interaction.pressStartedAt = performance.now();
      interaction.lastX = event.clientX;
      interaction.lastY = event.clientY;
      interaction.lastTime = performance.now();
      interaction.logoVelocity.x = 0;
      interaction.logoVelocity.y = 0;

      const target = event.target;
      if (target instanceof HTMLElement && target.hasPointerCapture && !target.hasPointerCapture(event.pointerId)) {
        target.setPointerCapture(event.pointerId);
      }
      event.preventDefault();
    };

    const release = () => {
      interaction.pressed = false;
      interaction.dragging = false;
    };

    const requestActivation = () => {
      interaction.revealRequested = true;
      interaction.charge = 1;
      interaction.activationRequested = true;
    };

    const reset = () => {
      interaction.pressed = false;
      interaction.dragging = false;
      interaction.hovered = false;
      interaction.activationRequested = false;
      interaction.proximityTarget = 0;
      interaction.orbitTarget = 0.18;
      interaction.lookTarget.x = 0;
      interaction.lookTarget.y = 0;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', release);
    window.addEventListener('blur', reset);
    window.addEventListener('fatorq:request-activation', requestActivation);
    window.addEventListener('resize', updateHotspotRect, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', release);
      window.removeEventListener('blur', reset);
      window.removeEventListener('fatorq:request-activation', requestActivation);
      window.removeEventListener('resize', updateHotspotRect);
      window.cancelAnimationFrame(discoveryFrame);
      resizeObserver?.disconnect();
    };
  }, [experience]);

  useFrame((state, delta) => {
    const root = rootRef.current;
    const coreFollower = coreFollowerRef.current;
    if (!root || !coreFollower) return;

    const interaction = experience.current;
    const clockTime = state.clock.elapsedTime;
    if (introStart.current === null) introStart.current = clockTime;
    const time = introStart.current === null ? 0 : clockTime - introStart.current;
    const intro = THREE.MathUtils.smoothstep(time, 0.02, 0.55);

    interaction.proximity = THREE.MathUtils.damp(interaction.proximity, interaction.proximityTarget, 8.5, delta);
    interaction.reveal = THREE.MathUtils.damp(interaction.reveal, interaction.revealRequested ? 1 : 0, 6.8, delta);
    interaction.brand = interaction.reveal;
    interaction.orbitInput = THREE.MathUtils.damp(interaction.orbitInput, interaction.orbitTarget, 5.8, delta);
    interaction.look.x = THREE.MathUtils.damp(interaction.look.x, interaction.lookTarget.x, 7.5, delta);
    interaction.look.y = THREE.MathUtils.damp(interaction.look.y, interaction.lookTarget.y, 7.5, delta);

    if (!interaction.activated && interaction.pressed && !interaction.dragging && interaction.brand > 0.72) {
      interaction.charge = Math.min((performance.now() - interaction.pressStartedAt) / 620, 1);
    } else if (!interaction.activated && interaction.charge < 0.999) {
      interaction.charge = THREE.MathUtils.damp(interaction.charge, 0, 8, delta);
    }

    if (!interaction.activated && (interaction.charge >= 0.995 || interaction.activationRequested) && interaction.brand > 0.72) {
      interaction.activated = true;
      interaction.activationRequested = false;
      interaction.pressed = false;
      interaction.dragging = false;
      activationTime.current = clockTime;
      window.dispatchEvent(new Event('fatorq:core-activated'));
    }

    if (interaction.activated && activationTime.current !== null) {
      interaction.cinematic = Math.min((clockTime - activationTime.current) / 1.55, 1);
    }

    let nextPhase: QuantumPhase = 'ambient';
    if (interaction.cinematic > 0.01) nextPhase = 'cinematic';
    else if (interaction.brand > 0.9) nextPhase = 'brand';
    else if (interaction.reveal > 0.02) nextPhase = 'reveal';
    interaction.phase = nextPhase;

    if (phaseSent.current !== nextPhase) {
      phaseSent.current = nextPhase;
      announcePhase(nextPhase);
    }

    const cinematic = interaction.cinematic;
    const reveal = interaction.reveal;
    const systemReveal = THREE.MathUtils.smoothstep(reveal, 0.01, 0.72);
    const charge = interaction.charge;
    const ringBurst = THREE.MathUtils.smoothstep(cinematic, 0.02, 0.78);
    const ringFade = 1 - THREE.MathUtils.smoothstep(cinematic, 0.12, 0.82);
    const ringExpansion = (1 + ringBurst * 3.4) * (1 - charge * 0.08);
    const localOrbit = interaction.orbitInput;
    const orbitDirection = localOrbit < -0.06 ? -1 : 1;
    const orbitEnergy = 0.52 + Math.abs(localOrbit) * 1.6 + charge * 7.8 + cinematic * 1.8;
    const orbitalStep = delta * orbitEnergy * orbitDirection;

    root.visible = true;

    root.position.x = THREE.MathUtils.damp(root.position.x, modelX, 12, delta);
    root.position.y = THREE.MathUtils.damp(root.position.y, Math.sin(time * 0.68) * 0.012, 12, delta);
    root.scale.setScalar(0.98 + intro * 0.02);

    const followerStrength = interaction.brand * (interaction.dragging ? 0.35 : 1);
    coreFollower.position.x = THREE.MathUtils.damp(coreFollower.position.x, interaction.look.x * 0.13 * followerStrength, 8.5, delta);
    coreFollower.position.y = THREE.MathUtils.damp(coreFollower.position.y, interaction.look.y * 0.1 * followerStrength, 8.5, delta);
    coreFollower.rotation.x = THREE.MathUtils.damp(coreFollower.rotation.x, -interaction.look.y * 0.12 * followerStrength, 7.5, delta);
    coreFollower.rotation.y = THREE.MathUtils.damp(coreFollower.rotation.y, interaction.look.x * 0.16 * followerStrength, 7.5, delta);

    if (outerRingRef.current) {
      outerRingRef.current.visible = true;
      outerRingRef.current.rotation.x += orbitalStep * 0.72;
      outerRingRef.current.rotation.y += orbitalStep * 0.46;
      outerRingRef.current.rotation.z += orbitalStep * 0.18;
      outerRingRef.current.scale.setScalar(Math.max(systemReveal * ringExpansion, 0.001));
    }

    if (middleRingRef.current) {
      middleRingRef.current.visible = true;
      middleRingRef.current.rotation.x -= orbitalStep * 0.56;
      middleRingRef.current.rotation.y += orbitalStep * 0.82;
      middleRingRef.current.rotation.z -= orbitalStep * 0.27;
      middleRingRef.current.scale.setScalar(Math.max(systemReveal * ringExpansion * 1.08, 0.001));
    }

    if (innerRingRef.current) {
      innerRingRef.current.visible = true;
      innerRingRef.current.rotation.x += orbitalStep * 0.94;
      innerRingRef.current.rotation.y -= orbitalStep * 0.64;
      innerRingRef.current.rotation.z += orbitalStep * 0.38;
      innerRingRef.current.scale.setScalar(Math.max(systemReveal * ringExpansion * 1.16, 0.001));
    }

    [outerMaterialRef.current, middleMaterialRef.current, innerMaterialRef.current].forEach((material, index) => {
      if (!material) return;
      material.opacity = ringFade * systemReveal;
      material.emissiveIntensity = 0.34 + charge * 2.2 + Math.sin(time * 2.1 + index) * 0.08;
    });

    if (outerHighlightMaterialRef.current) {
      outerHighlightMaterialRef.current.opacity = ringFade * systemReveal;
    }
    if (middleHighlightMaterialRef.current) {
      middleHighlightMaterialRef.current.opacity = ringFade * systemReveal;
    }

    if (shellRef.current) {
      shellRef.current.visible = true;
      const shellScale = (0.6 + interaction.brand * 0.4) * (1 + cinematic * 0.08) * (1 - charge * 0.04);
      shellRef.current.scale.setScalar(Math.max(shellScale, 0.001));
      shellRef.current.rotation.y += delta * (0.12 + Math.abs(localOrbit) * 0.1);
      shellRef.current.rotation.x = Math.sin(time * 0.42) * 0.08;
    }

    if (shellMaterialRef.current) {
      shellMaterialRef.current.color.lerpColors(silverShell, cyanShell, interaction.brand);
      shellMaterialRef.current.metalness = THREE.MathUtils.lerp(0.9, 0.24, interaction.brand);
      shellMaterialRef.current.roughness = THREE.MathUtils.lerp(0.22, 0.42, interaction.brand);
      shellMaterialRef.current.opacity = 1 - THREE.MathUtils.smoothstep(interaction.brand, 0.04, 0.9);
      shellMaterialRef.current.emissiveIntensity = 0.08 + interaction.brand * 0.42 + charge * 2.6;
    }

    if (energyRef.current && energyMaterialRef.current) {
      energyRef.current.visible = true;
      const pulse = 0.84 + Math.sin(time * 2.8) * 0.08;
      energyRef.current.scale.setScalar(Math.max((0.42 + interaction.brand * 0.58 + charge * 0.28 + cinematic * 0.24) * pulse, 0.001));
      energyMaterialRef.current.opacity = (0.05 + interaction.brand * 0.08 + charge * 0.42) * (1 - THREE.MathUtils.smoothstep(cinematic, 0.08, 0.72)) + cinematic * 0.018;
    }

    if (contactRef.current && contactMaterialRef.current && ignitionPulseRef.current && ignitionPulseMaterialRef.current) {
      const proximity = interaction.proximity;
      const magneticVisibility = THREE.MathUtils.smoothstep(proximity, 0.12, 0.82) * (1 - THREE.MathUtils.smoothstep(reveal, 0.16, 0.84));
      magneticStart.set(interaction.look.x * 0.22, interaction.look.y * 0.18, 0.5);
      magneticEnd.set(interaction.look.x * 1.28, interaction.look.y * 1.02, 0.72);
      const directionX = magneticEnd.x - magneticStart.x;
      const directionY = magneticEnd.y - magneticStart.y;
      const directionLength = Math.max(Math.hypot(directionX, directionY), 0.001);
      const perpendicularX = -directionY / directionLength;
      const perpendicularY = directionX / directionLength;

      for (let index = 0; index < ARC_POINT_COUNT; index += 1) {
        const offset = index * 3;
        const progress = index / (ARC_POINT_COUNT - 1);
        const envelope = Math.sin(progress * Math.PI);
        const primaryNoise = (Math.sin(index * 2.17 + time * 31) + Math.sin(index * 5.07 - time * 19) * 0.46) * envelope * 0.045;
        const secondaryNoise = (Math.cos(index * 2.73 - time * 27) + Math.sin(index * 4.31 + time * 23) * 0.38) * envelope * 0.03;

        magneticArcPositions[offset] = THREE.MathUtils.lerp(magneticStart.x, magneticEnd.x, progress) + perpendicularX * primaryNoise;
        magneticArcPositions[offset + 1] = THREE.MathUtils.lerp(magneticStart.y, magneticEnd.y, progress) + perpendicularY * primaryNoise;
        magneticArcPositions[offset + 2] = THREE.MathUtils.lerp(magneticStart.z, magneticEnd.z, progress) + Math.sin(index * 1.83 + time * 24) * envelope * 0.028;
        magneticArcSecondaryPositions[offset] = THREE.MathUtils.lerp(magneticStart.x, magneticEnd.x, progress) - perpendicularX * secondaryNoise;
        magneticArcSecondaryPositions[offset + 1] = THREE.MathUtils.lerp(magneticStart.y, magneticEnd.y, progress) - perpendicularY * secondaryNoise;
        magneticArcSecondaryPositions[offset + 2] = THREE.MathUtils.lerp(magneticStart.z, magneticEnd.z, progress) + Math.cos(index * 1.57 - time * 21) * envelope * 0.02;
      }

      magneticArc.visible = magneticVisibility > 0.01;
      magneticArcSecondary.visible = magneticVisibility > 0.08;
      magneticArc.geometry.attributes.position.needsUpdate = true;
      magneticArcSecondary.geometry.attributes.position.needsUpdate = true;
      magneticArc.material.opacity = magneticVisibility * (0.64 + Math.abs(Math.sin(time * 21)) * 0.3);
      magneticArcSecondary.material.opacity = magneticVisibility * (0.22 + Math.abs(Math.sin(time * 17 + 0.8)) * 0.24);

      contactRef.current.visible = magneticVisibility > 0.01;
      contactRef.current.position.copy(magneticStart);
      contactRef.current.scale.setScalar(Math.max(magneticVisibility * (0.9 + Math.abs(Math.sin(time * 19)) * 0.42), 0.001));
      contactMaterialRef.current.opacity = magneticVisibility;

      ignitionPulseRef.current.visible = magneticVisibility > 0.01;
      ignitionPulseRef.current.position.copy(magneticStart);
      ignitionPulseRef.current.scale.setScalar(Math.max(0.7 + proximity * 2.2 + Math.sin(time * 8.4) * 0.14, 0.001));
      ignitionPulseMaterialRef.current.opacity = magneticVisibility * (0.34 + proximity * 0.4);
    }
  });

  return (
    <group ref={rootRef} position={[modelX, 0, 0]}>
      <mesh ref={outerRingRef} rotation={[0.42, 0.1, 0.18]} scale={0.001}>
        <torusGeometry args={[1.2, 0.078, 18, 128]} />
        <meshStandardMaterial ref={outerMaterialRef} color="#14323c" metalness={0.24} roughness={0.46} emissive="#08728a" emissiveIntensity={0.4} transparent opacity={0} />
        <mesh rotation={[0, 0, 0.26]}>
          <torusGeometry args={[1.2, 0.014, 8, 28, 0.72]} />
          <meshBasicMaterial ref={outerHighlightMaterialRef} color="#c7f9ff" transparent opacity={0} toneMapped={false} />
        </mesh>
      </mesh>

      <mesh ref={middleRingRef} rotation={[-0.58, 0.62, -0.22]} scale={0.001}>
        <torusGeometry args={[0.93, 0.045, 16, 112]} />
        <meshStandardMaterial ref={middleMaterialRef} color="#21889a" metalness={0.2} roughness={0.4} emissive="#0b9fbd" emissiveIntensity={0.42} transparent opacity={0} />
        <mesh rotation={[0, 0, 2.48]}>
          <torusGeometry args={[0.93, 0.01, 8, 22, 0.56]} />
          <meshBasicMaterial ref={middleHighlightMaterialRef} color="#45e9ff" transparent opacity={0} toneMapped={false} />
        </mesh>
      </mesh>

      <mesh ref={innerRingRef} rotation={[0.86, -0.38, 0.34]} scale={0.001}>
        <torusGeometry args={[0.69, 0.023, 12, 96]} />
        <meshStandardMaterial ref={innerMaterialRef} color="#d8faff" metalness={0.14} roughness={0.34} emissive="#22d3ee" emissiveIntensity={0.5} transparent opacity={0} />
      </mesh>

      <group ref={coreFollowerRef}>
        <mesh ref={energyRef} position={[0, 0, -0.34]} scale={0.42}>
          <sphereGeometry args={[0.42, 24, 24]} />
          <meshBasicMaterial ref={energyMaterialRef} color="#23d9f5" transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
        </mesh>

        <mesh ref={shellRef} position={[0, 0, -0.04]} scale={0.6} renderOrder={2}>
          <sphereGeometry args={[0.7, 48, 48]} />
          <meshStandardMaterial
            ref={shellMaterialRef}
            color="#808a92"
            emissive="#0b4352"
            emissiveIntensity={0.08}
            metalness={0.9}
            roughness={0.22}
            transparent
            opacity={1}
            depthWrite={false}
          />
        </mesh>

        <Suspense fallback={null}>
          <QuantumLogoModel experience={experience} />
        </Suspense>
      </group>

      <primitive object={magneticArc} />
      <primitive object={magneticArcSecondary} />
      <mesh ref={contactRef} visible={false} renderOrder={9}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial
          ref={contactMaterialRef}
          color="#effeff"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={ignitionPulseRef} visible={false} renderOrder={8}>
        <ringGeometry args={[0.055, 0.072, 40]} />
        <meshBasicMaterial
          ref={ignitionPulseMaterialRef}
          color="#51e8fa"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
