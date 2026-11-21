import React from 'react';
import { motion } from 'motion/react';

interface CrestProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

export default function Crest({ size = 'lg', animated = true }: CrestProps) {
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-44 h-44 md:w-52 md:h-52',
    xl: 'w-52 h-52 md:w-60 md:h-60',
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.94, y: 6 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      initial={animated ? 'hidden' : false}
      whileInView={animated ? 'visible' : false}
      viewport={{ once: true, margin: '-40px' }}
      variants={containerVariants}
      className={`relative flex items-center justify-center ${sizeClasses[size]} select-none mx-auto`}
      id="wedding-crest-container"
    >
      <svg
        viewBox="0 0 260 260"
        className="w-full h-full drop-shadow-[0_6px_18px_rgba(154,116,46,0.18)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id="wedding-monogram-svg"
      >
        <defs>
          <linearGradient id="crest-champagne-primary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F4E9CC" />
            <stop offset="30%" stopColor="#D4B475" />
            <stop offset="70%" stopColor="#B58E43" />
            <stop offset="100%" stopColor="#7A5A1F" />
          </linearGradient>

          <linearGradient id="crest-champagne-secondary" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B58E43" />
            <stop offset="50%" stopColor="#E6D2A2" />
            <stop offset="100%" stopColor="#9A742E" />
          </linearGradient>
        </defs>

        {/* Crisp White Center Medallion */}
        <circle cx="130" cy="130" r="118" fill="#FFFFFF" opacity="0.92" />

        {/* Outer Champagne Gold Ring */}
        <circle
          cx="130"
          cy="130"
          r="122"
          stroke="url(#crest-champagne-primary)"
          strokeWidth="3.5"
        />

        {/* Fine Inner Concentric Champagne Gold Ring */}
        <circle
          cx="130"
          cy="130"
          r="114"
          stroke="url(#crest-champagne-secondary)"
          strokeWidth="1.2"
          opacity="0.85"
        />

        {/* KO Monogram */}
        <g fill="#7A5A1F">
          <text
            x="130"
            y="112"
            textAnchor="middle"
            dominantBaseline="central"
            fill="url(#crest-champagne-primary)"
            stroke="#7A5A1F"
            strokeWidth="0.6"
            className="font-serif"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '68px',
              fontWeight: '700',
              fontStyle: 'italic',
              letterSpacing: '0.04em',
            }}
          >
            KO
          </text>
        </g>

        {/* Delicate Botanical Blossom & Sprig Beneath KO */}
        <g stroke="#9A742E" fill="#B58E43">
          <path
            d="M 130 158 C 112 158, 90 155, 62 152"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 130 158 C 148 158, 170 155, 198 152"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />

          <circle cx="130" cy="158" r="2.6" stroke="none" />
          <path d="M 130 154 C 126 147, 134 147, 130 154 Z" strokeWidth="0.8" />
          <path d="M 130 162 C 126 169, 134 169, 130 162 Z" strokeWidth="0.8" />
          <path d="M 126 158 C 119 154, 119 162, 126 158 Z" strokeWidth="0.8" />
          <path d="M 134 158 C 141 154, 141 162, 134 158 Z" strokeWidth="0.8" />

          <circle cx="126" cy="154" r="1.1" stroke="none" />
          <circle cx="134" cy="154" r="1.1" stroke="none" />
          <circle cx="126" cy="162" r="1.1" stroke="none" />
          <circle cx="134" cy="162" r="1.1" stroke="none" />

          {/* Left Foliage Sprig */}
          <path d="M 112 157 C 106 151, 99 150, 92 152 C 98 157, 105 158, 112 157 Z" strokeWidth="0.5" />
          <path d="M 102 156 C 97 162, 90 163, 83 161 C 89 156, 96 155, 102 156 Z" strokeWidth="0.5" />
          <path d="M 76 154 C 68 149, 61 150, 54 152 C 61 155, 69 156, 76 154 Z" strokeWidth="0.5" />
          <circle cx="78" cy="150" r="1.4" stroke="none" />
          <circle cx="52" cy="152" r="1.5" stroke="none" />

          {/* Right Foliage Sprig */}
          <path d="M 148 157 C 154 151, 161 150, 168 152 C 162 157, 155 158, 148 157 Z" strokeWidth="0.5" />
          <path d="M 158 156 C 163 162, 170 163, 177 161 C 171 156, 164 155, 158 156 Z" strokeWidth="0.5" />
          <path d="M 184 154 C 192 149, 199 150, 206 152 C 199 155, 191 156, 184 154 Z" strokeWidth="0.5" />
          <circle cx="182" cy="150" r="1.4" stroke="none" />
          <circle cx="208" cy="152" r="1.5" stroke="none" />
        </g>
      </svg>
    </motion.div>
  );
}
