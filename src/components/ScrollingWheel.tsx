import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ScrollingWheelProps {
  className?: string;
  size?: number;
  floating?: boolean;
}

export default function ScrollingWheel({ className = '', size = 120, floating = false }: ScrollingWheelProps) {
  const { scrollYProgress } = useScroll();
  // Map scroll progress (0 to 1) to rotation (0 to 1080 degrees, i.e., 3 full rotations)
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 1080]);

  const wheelSvg = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="w-full h-full drop-shadow-[0_8px_24px_rgba(212,175,55,0.15)]"
    >
      {/* Outer Tire */}
      <circle cx="50" cy="50" r="46" fill="#111" stroke="#222" strokeWidth="2" />
      <circle cx="50" cy="50" r="41" fill="none" stroke="#2a2a2a" strokeWidth="1" />
      
      {/* Tire Tread Patterns */}
      <g stroke="#1a1a1a" strokeWidth="1.5" fill="none">
        {[...Array(24)].map((_, i) => {
          const angle = (i * 360) / 24;
          return (
            <line
              key={i}
              x1="50"
              y1="4"
              x2="50"
              y2="8"
              transform={`rotate(${angle} 50 50)`}
            />
          );
        })}
      </g>

      {/* Rim Outer Lip */}
      <circle cx="50" cy="50" r="34" fill="#1e1e1e" stroke="#c5a850" strokeWidth="1" />
      <circle cx="50" cy="50" r="31" fill="#111111" stroke="#333333" strokeWidth="0.5" />

      {/* Rotating Wheel spokes (This is the group we rotate) */}
      <motion.g style={{ rotate, originX: '50px', originY: '50px' }}>
        {/* Hub Cap and center logo */}
        <circle cx="50" cy="50" r="8" fill="#1a1a1a" stroke="#d4af37" strokeWidth="1" />
        <circle cx="50" cy="50" r="3" fill="#000" />
        
        {/* Lug nuts */}
        {[...Array(5)].map((_, i) => {
          const angle = (i * 360) / 5;
          return (
            <circle
              key={i}
              cx="50"
              cy="44"
              r="1.2"
              fill="#c0c0c0"
              transform={`rotate(${angle} 50 50)`}
            />
          );
        })}

        {/* Double Spokes (BMW M / Mercedes AMG design) */}
        {[...Array(10)].map((_, i) => {
          const angle = (i * 360) / 10;
          return (
            <g key={i} transform={`rotate(${angle} 50 50)`}>
              {/* Spoke 1 */}
              <path
                d="M48.5 42 L42 18 L43.5 17 L49.5 42 Z"
                fill="url(#gold-metal)"
                stroke="#000"
                strokeWidth="0.2"
              />
              {/* Spoke 2 */}
              <path
                d="M51.5 42 L58 18 L56.5 17 L50.5 42 Z"
                fill="url(#gold-metal)"
                stroke="#000"
                strokeWidth="0.2"
              />
              {/* Inner alloy mesh */}
              <line x1="50" y1="42" x2="50" y2="22" stroke="#444" strokeWidth="0.5" />
            </g>
          );
        })}
        
        {/* Metallic rim highlights */}
        <circle cx="50" cy="50" r="29" fill="none" stroke="#d4af37" strokeWidth="0.4" strokeDasharray="10, 5" />
        <circle cx="50" cy="50" r="16" fill="none" stroke="#fff" strokeWidth="0.2" opacity="0.3" />
      </motion.g>

      {/* Definitions for metallic gold gradients */}
      <defs>
        <linearGradient id="gold-metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#aa7c11" />
          <stop offset="25%" stopColor="#e5b842" />
          <stop offset="50%" stopColor="#f7e1a0" />
          <stop offset="75%" stopColor="#e5b842" />
          <stop offset="100%" stopColor="#aa7c11" />
        </linearGradient>
      </defs>
    </svg>
  );

  if (floating) {
    return (
      <div
        className={`fixed bottom-8 right-8 z-40 hidden md:block select-none pointer-events-none transition-opacity duration-300 ${className}`}
        id="floating-wheel-container"
      >
        <div className="relative group">
          {/* Subtle rotation speed glowing badge */}
          <div className="absolute inset-0 bg-[#d4af37] opacity-20 blur-xl group-hover:opacity-40 transition-opacity rounded-full" />
          <div className="relative p-2 bg-black/60 backdrop-blur-md border border-neutral-800 rounded-full">
            {wheelSvg}
            <div className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex justify-center items-center select-none py-12 ${className}`} id="decorative-wheel-container">
      <div className="relative flex flex-col items-center">
        {/* Subtle horizontal connecting lines */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-80 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
        <div className="relative p-4 bg-neutral-950 rounded-full border border-neutral-800/60 z-10">
          {wheelSvg}
        </div>
      </div>
    </div>
  );
}
