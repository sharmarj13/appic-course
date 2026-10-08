"use client";
import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  Variants,
} from 'motion/react';
import { cn } from './utils';

export const PREMIUM_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const fadeUpItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: PREMIUM_EASE,
    },
  },
};

interface Interactive3DTiltProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  perspective?: number;
}

/**
 * Provides smooth, spring-physics 3D rotation and parallax depth on mouse movement.
 * Automatically disables tilt when `prefers-reduced-motion` is enabled.
 */
export function Interactive3DTilt({
  children,
  className,
  intensity = 8,
  perspective = 1200,
}: Interactive3DTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { damping: 26, stiffness: 180, mass: 0.6 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-intensity, intensity]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(normX);
    rawY.set(normY);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: `${perspective}px` }}
      className={cn('relative', className)}
    >
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }
        }
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

interface Floating3DLayerProps {
  children: React.ReactNode;
  className?: string;
  depthZ?: number;
  floatRange?: number;
  duration?: number;
  delay?: number;
}

/**
 * Renders a spatial child layer elevated on the Z-axis in 3D space with optional subtle ambient float.
 */
export function Floating3DLayer({
  children,
  className,
  depthZ = 30,
  floatRange = 5,
  duration = 6,
  delay = 0,
}: Floating3DLayerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      style={{
        transform: prefersReducedMotion ? undefined : `translateZ(${depthZ}px)`,
      }}
      animate={
        prefersReducedMotion
          ? undefined
          : {
              y: [0, -floatRange, 0],
            }
      }
      transition={
        prefersReducedMotion
          ? undefined
          : {
              duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay,
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
