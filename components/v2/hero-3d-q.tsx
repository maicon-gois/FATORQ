'use client';

import { Suspense, useEffect, useMemo, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_URL = '/models/logo-3d-model-realtime.glb';
const BASE_Y_ROTATION = Math.PI;
const AUTO_ROTATION_SPEED = 0.11;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

type PointerTarget = {
  x: number;
  y: number;
};

type DragState = {
  active: boolean;
  lastX: number;
  lastY: number;
  lastTime: number;
};

function getHotspotRect() {
  return document.querySelector<HTMLElement>('[data-hero-3d-hotspot]')?.getBoundingClientRect();
}

function getPointerTarget(event: PointerEvent): PointerTarget {
  const rect = getHotspotRect();

  if (!rect) {
    return {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -((event.clientY / window.innerHeight) * 2 - 1),
    };
  }

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  return {
    x: clamp((event.clientX - centerX) / (rect.width / 2), -1, 1),
    y: clamp(-(event.clientY - centerY) / (rect.height / 2), -1, 1),
  };
}

function isInsideHotspot(event: PointerEvent) {
  const rect = getHotspotRect();
  if (!rect) return false;

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const radius = Math.min(rect.width, rect.height) * 0.46;

  return Math.hypot(event.clientX - centerX, event.clientY - centerY) <= radius;
}

function ModelScene() {
  const { scene } = useGLTF(MODEL_URL);
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const reactiveLightRef = useRef<THREE.PointLight>(null);
  const pointer = useRef<PointerTarget>({ x: 0, y: 0 });
  const drag = useRef<DragState>({ active: false, lastX: 0, lastY: 0, lastTime: 0 });
  const rotation = useRef({ x: 0, y: BASE_Y_ROTATION });
  const velocity = useRef({ x: 0, y: 0 });
  const modelX = clamp(viewport.width * 0.12, 0.62, 1.18);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 3.05;
    const scale = targetSize / maxAxis;

    clone.position.sub(center);
    clone.scale.setScalar(scale);

    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.castShadow = true;
      child.receiveShadow = true;

      if (Array.isArray(child.material)) {
        child.material = child.material.map((material) => material.clone());
      } else if (child.material) {
        child.material = child.material.clone();
      }
    });

    return clone;
  }, [scene]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!isInsideHotspot(event)) return;

      drag.current.active = true;
      drag.current.lastX = event.clientX;
      drag.current.lastY = event.clientY;
      drag.current.lastTime = performance.now();
      velocity.current.x = 0;
      velocity.current.y = 0;
      event.preventDefault();
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.current = getPointerTarget(event);

      if (!drag.current.active) return;

      const now = performance.now();
      const dx = event.clientX - drag.current.lastX;
      const dy = event.clientY - drag.current.lastY;
      const dt = Math.max(16, now - drag.current.lastTime);

      rotation.current.y += dx * 0.008;
      rotation.current.x = clamp(rotation.current.x + dy * 0.006, -0.9, 0.9);
      velocity.current.y = clamp((dx / dt) * 0.18, -0.36, 0.36);
      velocity.current.x = clamp((dy / dt) * 0.13, -0.22, 0.22);

      drag.current.lastX = event.clientX;
      drag.current.lastY = event.clientY;
      drag.current.lastTime = now;
      event.preventDefault();
    };

    const onPointerUp = () => {
      drag.current.active = false;
    };

    const resetTracking = () => {
      pointer.current = { x: 0, y: 0 };
      drag.current.active = false;
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    window.addEventListener('blur', resetTracking);

    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('blur', resetTracking);
    };
  }, []);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const time = state.clock.elapsedTime;
    const inertia = Math.abs(velocity.current.x) + Math.abs(velocity.current.y);

    if (!drag.current.active && inertia > 0.003) {
      const frameScale = delta * 60;

      rotation.current.y += velocity.current.y * frameScale;
      rotation.current.x = clamp(rotation.current.x + velocity.current.x * frameScale, -0.9, 0.9);

      const decay = Math.pow(0.935, frameScale);
      velocity.current.y *= decay;
      velocity.current.x *= decay;
    }

    if (!drag.current.active && inertia <= 0.003) {
      velocity.current.x = 0;
      velocity.current.y = 0;
      const targetX = Math.sin(time * 0.27) * 0.018;

      rotation.current.y += delta * AUTO_ROTATION_SPEED;
      rotation.current.x = THREE.MathUtils.lerp(rotation.current.x, targetX, 0.035);
    }

    group.rotation.y = rotation.current.y;
    group.rotation.x = rotation.current.x;
    group.rotation.z = Math.sin(time * 0.22) * 0.012;
    group.position.y = Math.sin(time * 0.72) * 0.055;

    if (reactiveLightRef.current) {
      reactiveLightRef.current.position.x = modelX + pointer.current.x * 0.72;
      reactiveLightRef.current.position.y = 1.35 + pointer.current.y * 0.45;
    }
  });

  return (
    <>
      <group ref={groupRef} position={[modelX, 0.02, 0]}>
        <primitive object={model} />
      </group>
      <pointLight ref={reactiveLightRef} position={[modelX, 1.35, 2.8]} intensity={25} distance={9} color="#67e8f9" />
    </>
  );
}

function SceneLoading() {
  return (
    <Html center position={[1.1, 0, 0]}>
      <div className="h-20 w-20 animate-pulse rounded-full bg-cyan-300/10 blur-xl" />
    </Html>
  );
}

const telemetry = [
  { label: 'AI CORE', value: 'ACTIVE', className: 'right-[8%] top-[24%]' },
  { label: 'SYSTEMS', value: 'ONLINE', className: 'right-[31%] bottom-[18%]' },
  { label: 'CLOUD', value: '99.9%', className: 'right-[3%] bottom-[34%]' },
];

export function Hero3DQ() {
  const glowX = useMotionValue(72);
  const glowY = useMotionValue(42);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const target = getPointerTarget(event);

      glowX.set(clamp(target.x * 28 + 70, 42, 96));
      glowY.set(clamp(48 - target.y * 30, 14, 84));
    };

    const reset = () => {
      glowX.set(72);
      glowY.set(42);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', reset);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', reset);
    };
  }, [glowX, glowY]);

  const reactiveGlow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(125, 211, 252, 0.3), rgba(6, 182, 212, 0.13) 22%, rgba(2, 6, 23, 0.02) 48%, transparent 68%)`;

  return (
    <div className="relative h-full min-h-[860px] w-full overflow-hidden bg-[#030609] lg:min-h-[900px] xl:min-h-screen">
      <motion.div aria-hidden className="absolute inset-0" style={{ background: reactiveGlow }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_69%_46%,rgba(34,211,238,0.22),rgba(8,145,178,0.1)_28%,transparent_55%)]" />

      <div className="pointer-events-none absolute inset-x-[-15%] bottom-[-34%] h-[74%] [perspective:700px]">
        <div className="h-full w-full origin-top -rotate-x-[62deg] bg-[linear-gradient(rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.1)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:linear-gradient(to_bottom,black,transparent_74%)]" />
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-1/2 h-[min(58vw,700px)] w-[min(58vw,700px)] -translate-y-1/2 rounded-full border border-cyan-200/12"
        animate={{ rotate: 360 }}
        transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute left-[13%] top-[7%] h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_22px_rgba(103,232,249,0.9)]" />
        <span className="absolute bottom-[18%] right-[4%] h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,0.8)]" />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[12%] top-1/2 h-[min(47vw,560px)] w-[min(47vw,560px)] -translate-y-1/2 rounded-full border border-dashed border-cyan-300/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 64, repeat: Infinity, ease: 'linear' }}
      />

      <div
        data-hero-3d-hotspot
        className="pointer-events-none absolute inset-y-[13%] right-[5%] w-[62%] rounded-[50%]"
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0">
        <Canvas
          dpr={[1, 1.35]}
          camera={{ position: [0, 0.12, 6.4], fov: 34 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="!h-full !w-full"
        >
          <ambientLight intensity={0.86} />
          <hemisphereLight args={['#dbeafe', '#020617', 1.1]} />
          <directionalLight position={[4.5, 5.5, 4]} intensity={2.55} color="#f8fafc" castShadow />
          <directionalLight position={[-3.5, -1.5, 3]} intensity={1.25} color="#0284c7" />
          <Suspense fallback={<SceneLoading />}>
            <ModelScene />
          </Suspense>
        </Canvas>
      </div>

      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {telemetry.map((item, index) => (
          <motion.div
            key={item.label}
            className={`absolute ${item.className} min-w-28 border-l border-cyan-300/35 bg-gradient-to-r from-cyan-300/[0.06] to-transparent px-3 py-2 backdrop-blur-sm`}
            animate={{ y: index % 2 === 0 ? [-4, 5, -4] : [5, -4, 5] }}
            transition={{ duration: 6 + index * 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <p className="text-[8px] font-medium tracking-[0.24em] text-slate-500">{item.label}</p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.18em] text-cyan-200/80">{item.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-cyan-200/15 to-transparent" />
      <div className="pointer-events-none absolute right-[16%] top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-200/[0.07] to-transparent" />
    </div>
  );
}

useGLTF.preload(MODEL_URL);
