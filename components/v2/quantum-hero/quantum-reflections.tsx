'use client';

/* eslint-disable react-hooks/immutability -- Three.js owns and mutates the WebGL scene graph. */

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export function QuantumReflections() {
  const { gl, scene } = useThree();

  useEffect(() => {
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
  }, [gl, scene]);

  return null;
}
