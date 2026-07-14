import type { MutableRefObject } from 'react';

export type QuantumPhase = 'ambient' | 'reveal' | 'brand' | 'cinematic';

export type QuantumExperienceState = {
  phase: QuantumPhase;
  pointer: { x: number; y: number };
  look: { x: number; y: number };
  lookTarget: { x: number; y: number };
  orbitInput: number;
  orbitTarget: number;
  proximity: number;
  proximityTarget: number;
  hovered: boolean;
  revealRequested: boolean;
  reveal: number;
  brand: number;
  pressed: boolean;
  dragging: boolean;
  pressX: number;
  pressY: number;
  pressStartedAt: number;
  lastX: number;
  lastY: number;
  lastTime: number;
  charge: number;
  activationRequested: boolean;
  activated: boolean;
  cinematic: number;
  logoRotation: { x: number; y: number };
  logoVelocity: { x: number; y: number };
  lastLogoInteraction: number;
};

export type QuantumExperienceRef = MutableRefObject<QuantumExperienceState>;

export function createQuantumExperienceState(): QuantumExperienceState {
  return {
    phase: 'ambient',
    pointer: { x: 0, y: 0 },
    look: { x: 0, y: 0 },
    lookTarget: { x: 0, y: 0 },
    orbitInput: 0.18,
    orbitTarget: 0.18,
    proximity: 0,
    proximityTarget: 0,
    hovered: false,
    revealRequested: false,
    reveal: 0,
    brand: 0,
    pressed: false,
    dragging: false,
    pressX: 0,
    pressY: 0,
    pressStartedAt: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    charge: 0,
    activationRequested: false,
    activated: false,
    cinematic: 0,
    logoRotation: { x: 0, y: 0 },
    logoVelocity: { x: 0, y: 0 },
    lastLogoInteraction: 0,
  };
}
