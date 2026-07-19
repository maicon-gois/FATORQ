'use client';

/* eslint-disable react-hooks/immutability -- Three.js owns and mutates the WebGL scene graph. */

import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export function QuantumReflections() {
  const { gl, scene } = useThree();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const idleWindow = window as typeof window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (idleWindow.requestIdleCallback) {
      const handle = idleWindow.requestIdleCallback(() => setEnabled(true), { timeout: 900 });
      return () => idleWindow.cancelIdleCallback?.(handle);
    }

    const timeout = window.setTimeout(() => setEnabled(true), 240);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const previousEnvironment = scene.environment;
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04).texture;

    scene.environment = environment;

    return () => {
      scene.environment = previousEnvironment;
      environment.dispose();
      pmrem.dispose();
    };
  }, [enabled, gl, scene]);

  return null;
}
