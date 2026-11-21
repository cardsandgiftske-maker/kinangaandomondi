import React from 'react';
import { motion } from 'motion/react';

interface CrestProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

export default function Crest({ size = 'md', animated = true }: CrestProps) {
  // Dimension definitions for sizes
  const dimensions = {
    sm: { outer: 'w-20 h-20', inner: 'w-16 h-16', svg: 'w-10 h-10' },
    md: { outer: 'w-28 h-28', inner: 'w-22 h-22', svg: 'w-14 h-14' },
    lg: { outer: 'w-40 h-40', inner: 'w-32 h-32', svg: 'w-20 h-20' },
    xl: { outer: 'w-52 h-52', inner: 'w-42 h-42', svg: 'w-26 h-26' },
  };

  const dim = dimensions[size] || dimensions.md;

  return (
    <div className="relative flex items-center justify-center select-none" id="wedding-crest-container">
      {/* Background ambient warm champagne glow */}
      <div className="absolute -inset-4 rounded-full bg-[#D4AF37]/25 blur-xl" />
      <div className="absolute -inset-2 rounded-full bg-[#B89347]/20 blur-lg" />

      {/* Main Wax Seal Container that Rotates */}
      <motion.div
        animate={animated ? { rotate: 360 } : { rotate: 0 }}
        transition={animated ? { repeat: Infinity, duration: 28, ease: 'linear' } : {}}
        className={`relative ${dim.outer} rounded-full flex items-center justify-center p-1.5 bg-gradient-to-br from-[#F2DFB3] via-[#C5A059] to-[#8A6621] shadow-[0_12px_28px_rgba(138,102,33,0.35),_inset_0_3px_6px_rgba(255,255,255,0.5),_inset_0_-4px_8px_rgba(74,53,16,0.45)] border-2 border-[#FFFFFF]/90 cursor-pointer`}
      >
        {/* Outer Rotating Dotted Gold Decorative Ring */}
        <div className="absolute inset-1 rounded-full border-2 border-dashed border-[#FFFFFF]/80 pointer-events-none opacity-90" />

        {/* Inner Wax Ring */}
        <div className={`relative ${dim.inner} rounded-full bg-gradient-to-tl from-[#FFFFFF] via-[#FAF5EB] to-[#F3E7CE] flex items-center justify-center shadow-[inset_0_4px_10px_rgba(138,102,33,0.2)] border border-[#D4AF37]/70 overflow-hidden`}>
          
          {/* Inner Accent Circle */}
          <div className="absolute inset-1.5 rounded-full border border-[#D4AF37]/50 pointer-events-none" />

          {/* Radial Gold Flare overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-transparent to-transparent opacity-80" />

          {/* Gold Monogram SVG */}
          <div className="flex items-center justify-center text-center select-none pointer-events-none relative z-10">
            <svg className={dim.svg} viewBox="0 0 100 100" fill="none">
              <defs>
                <linearGradient id="crest-gold-seal" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B89347" />
                  <stop offset="50%" stopColor="#8A6621" />
                  <stop offset="100%" stopColor="#6B4E18" />
                </linearGradient>
              </defs>
              
              <g>
                <text 
                  x="50" 
                  y="58" 
                  fontFamily="'Playfair Display', 'Didot', 'Georgia', serif" 
                  fontSize="18" 
                  fontWeight="bold"
                  fill="url(#crest-gold-seal)"
                  textAnchor="middle"
                  letterSpacing="0.04em"
                >
                  KO
                </text>
              </g>
            </svg>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
