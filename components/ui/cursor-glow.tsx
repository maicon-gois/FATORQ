'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const update = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', update);
    return () => window.removeEventListener('mousemove', update);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[400px] h-[400px] bg-[#06B6D4]/10 rounded-full blur-[100px] pointer-events-none z-50 mix-blend-screen hidden lg:block"
      animate={{ x: mousePosition.x - 200, y: mousePosition.y - 200 }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.5 }}
    />
  );
}
