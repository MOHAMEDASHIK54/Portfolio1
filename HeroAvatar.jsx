import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * HeroAvatar Component
 * 
 * Features:
 * - 60fps GPU-accelerated cursor parallax 3D tilt (Framer Motion springs)
 * - Clockwise slowly rotating cyan-to-purple conic gradient border
 * - Counter-clockwise rotating outer dashed cyan ring
 * - Ambient pulsing neon glow with dynamic blur
 * - Floating up-down levitation motion
 * - Multi-depth 3D pop effect (translateZ)
 * - Fully responsive with Tailwind CSS
 * 
 * @param {string} src - Avatar image source URL
 * @param {string} alt - Image alt text
 * @param {string} className - Optional container styling override
 */
export default function HeroAvatar({
  src = 'ashik-3d.jpg',
  alt = 'Mohamed Ashik - Full Stack Developer',
  className = '',
}) {
  const containerRef = useRef(null);

  // Normalized mouse coordinates from center (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Physics springs for silky smooth 60fps tilt
  const springX = useSpring(mouseX, { stiffness: 220, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 22 });

  // 3D Tilt angles mapped from cursor position
  const rotateX = useTransform(springY, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-14, 14]);

  // Handle smooth mouse tracking
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center p-6 [perspective:1000px] select-none ${className}`}
    >
      {/* 3D Tilt Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative flex items-center justify-center"
      >
        {/* 1. Subtle Floating Up-Down Levitation */}
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{
            repeat: Infinity,
            duration: 4.5,
            ease: 'easeInOut',
          }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative flex items-center justify-center"
        >
          {/* 2. Soft Pulsing Neon Glow Aura (Layer behind avatar) */}
          <motion.div
            className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-cyan-500/40 via-purple-600/35 to-pink-500/35 blur-2xl pointer-events-none -z-10"
            animate={{
              scale: [0.92, 1.1, 0.92],
              opacity: [0.55, 0.9, 0.55],
            }}
            transition={{
              repeat: Infinity,
              duration: 3.2,
              ease: 'easeInOut',
            }}
          />

          {/* 3. Outer Dashed Ring (Counter-Clockwise Rotation) */}
          <motion.div
            aria-hidden="true"
            className="absolute -inset-3.5 sm:-inset-4.5 rounded-full border-2 border-dashed border-cyan-400/70 shadow-[0_0_15px_rgba(6,182,212,0.4)] pointer-events-none"
            animate={{ rotate: -360 }}
            transition={{
              repeat: Infinity,
              duration: 18,
              ease: 'linear',
            }}
          />

          {/* 3B. Secondary Outer Dotted Purple Ring for Extra Cyber Depth */}
          <motion.div
            aria-hidden="true"
            className="absolute -inset-6 sm:-inset-7.5 rounded-full border border-dotted border-fuchsia-500/40 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 26,
              ease: 'linear',
            }}
          />

          {/* 4. Clockwise Rotating Gradient Border (Cyan to Purple) */}
          <motion.div
            aria-hidden="true"
            className="w-48 h-48 sm:w-60 sm:h-60 md:w-68 md:h-68 lg:w-72 lg:h-72 rounded-full p-[3px] sm:p-[4px] shadow-[0_0_35px_rgba(6,182,212,0.5),0_0_60px_rgba(168,85,247,0.35)]"
            style={{
              background:
                'conic-gradient(from 0deg, #00f2fe 0%, #7928ca 35%, #ec4899 70%, #00f2fe 100%)',
            }}
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: 'linear',
            }}
          />

          {/* 5. Circular Profile Image with 3D Depth Pop */}
          <div
            style={{ transform: 'translateZ(26px)' }}
            className="absolute inset-[3px] sm:inset-[4px] rounded-full overflow-hidden bg-slate-950 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]"
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover object-center rounded-full transition-transform duration-500 hover:scale-105"
              loading="eager"
            />

            {/* Subtle Holographic Glass Glare Overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/15 pointer-events-none mix-blend-overlay"
            />
          </div>

          {/* 6. Live Status Beacon (Online / Available Indicator) */}
          <motion.div
            style={{ transform: 'translateZ(36px)' }}
            className="absolute bottom-1 right-2 sm:bottom-2 sm:right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-emerald-400/40 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.4)]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-mono font-medium text-emerald-300">
              AVAILABLE
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
