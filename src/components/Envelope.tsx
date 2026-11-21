import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import rusticHallImage from '../assets/images/client_venue.jpg';
import couplePortrait from '../assets/images/client_couple_cover.jpg';

interface EnvelopeProps {
  onOpen: () => void;
  onSealBreak?: () => void;
}

export default function Envelope({ onOpen, onSealBreak }: EnvelopeProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isSealed, setIsSealed] = useState(true);

  const handleOpen = () => {
    if (!isSealed) return;
    setIsSealed(false);

    if (onSealBreak) {
      onSealBreak();
    }

    setIsOpened(true);

    setTimeout(() => {
      onOpen();
    }, 700);
  };

  const handleOpenManage = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.dispatchEvent(new Event('open_admin_panel'));
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: 'blur(4px)',
        transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
      }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none"
    >
      {/* End-to-End Background: Rustic Wedding Barn Hall with Ambient Warm Lights & Reflection */}
      <div className="absolute inset-0 z-0">
        <img
          src={rusticHallImage}
          alt="Wedding Venue Ballroom"
          className="w-full h-full object-cover object-center scale-105 transform filter brightness-90"
        />
        {/* Soft dark vignette & warm spotlight focused on envelope */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/30 to-black/75 pointer-events-none" />
      </div>

      {/* Discrete MANAGE access text in bottom right corner */}
      <button
        onClick={handleOpenManage}
        className="fixed bottom-4 right-5 z-30 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-sans text-stone-300/40 hover:text-stone-100/90 transition-all cursor-pointer select-none"
        title="Admin Portal"
      >
        MANAGE
      </button>

      {/* Main Envelope & Invitation Folio Container */}
      <div className="relative z-10 p-4 w-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -4, 0],
          }}
          transition={{
            opacity: { duration: 0.7, ease: 'easeOut' },
            scale: { duration: 0.7, ease: 'easeOut' },
            y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          }}
          onClick={handleOpen}
          className="relative w-full max-w-[420px] sm:max-w-[460px] cursor-pointer group select-none filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)]"
        >
          {/* Outer Envelope / Folio Card (Clean Crisp Ivory / Warm White Paper) */}
          <div className="relative w-full bg-[#FFFFFF] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#E5D7BC] p-5 sm:p-6 flex flex-col items-center">
            
            {/* Top V-Flap Header Decoration */}
            <div className="absolute top-0 inset-x-0 h-8 pointer-events-none z-10 opacity-80">
              <svg
                viewBox="0 0 460 30"
                fill="none"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <path
                  d="M0 0 L230 25 L460 0 Z"
                  fill="#FAF5EB"
                  stroke="#E5D7BC"
                  strokeWidth="1"
                />
              </svg>
            </div>

            {/* Four Elegant Champagne Gold Corner Photo Mount Accents */}
            <div className="absolute top-0 left-0 w-6 h-6 sm:w-7 sm:h-7 pointer-events-none z-20">
              <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
                <polygon points="0,0 28,0 0,28" fill="#D4AF37" fillOpacity="0.45" />
                <polygon points="0,0 20,0 0,20" fill="#B89347" fillOpacity="0.55" />
              </svg>
            </div>

            <div className="absolute top-0 right-0 w-6 h-6 sm:w-7 sm:h-7 pointer-events-none z-20">
              <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
                <polygon points="28,0 0,0 28,28" fill="#D4AF37" fillOpacity="0.45" />
                <polygon points="28,0 8,0 28,20" fill="#B89347" fillOpacity="0.55" />
              </svg>
            </div>

            <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-7 sm:h-7 pointer-events-none z-20">
              <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
                <polygon points="0,28 28,28 0,0" fill="#D4AF37" fillOpacity="0.45" />
                <polygon points="0,28 20,28 0,8" fill="#B89347" fillOpacity="0.55" />
              </svg>
            </div>

            <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-7 sm:h-7 pointer-events-none z-20">
              <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
                <polygon points="28,28 0,28 28,0" fill="#D4AF37" fillOpacity="0.45" />
                <polygon points="28,28 8,28 28,8" fill="#B89347" fillOpacity="0.55" />
              </svg>
            </div>

            {/* 1. Couple Photo at Top */}
            <div className="relative w-full aspect-[16/11] rounded-xl overflow-hidden shadow-md border border-[#D4AF37]/60 p-1 bg-gradient-to-br from-[#FFFFFF] to-[#F8F3E8] mb-4 sm:mb-5 z-10 group-hover:scale-[1.01] transition-transform duration-300">
              <div className="relative w-full h-full rounded-lg overflow-hidden bg-stone-100">
                <img
                  src={couplePortrait}
                  alt="Sharon Kinanga & Collins Omondi Portrait"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                {/* Subtle soft vignette on photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
              </div>
            </div>

            {/* 2. Champagne Gold Wax Seal Below Photo */}
            <div className="relative my-1 sm:my-2 z-25 flex items-center justify-center">
              <AnimatePresence>
                {isSealed && (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{
                      scale: 1.6,
                      opacity: 0,
                      rotate: 10,
                      filter: 'blur(4px)',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 220,
                      damping: 18,
                      exit: { duration: 0.55, ease: 'easeIn' },
                    }}
                    className="relative flex items-center justify-center"
                  >
                    {/* Subtle warm champagne glow on hover */}
                    <div className="absolute -inset-3 rounded-full bg-[#D4AF37]/25 blur-md group-hover:bg-[#D4AF37]/40 transition-all duration-300 pointer-events-none" />

                    {/* Circular Champagne Gold Wax Seal SVG */}
                    <div className="relative w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(107,78,24,0.35)] transition-transform duration-300 group-hover:scale-105 active:scale-95">
                      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                        <defs>
                          {/* Radial Gradient for 3D Champagne Gold Wax Seal Body */}
                          <radialGradient id="envelope-wax-body-grad" cx="38%" cy="35%" r="65%">
                            <stop offset="0%" stopColor="#F2DFB3" />
                            <stop offset="35%" stopColor="#D4AF37" />
                            <stop offset="75%" stopColor="#A68038" />
                            <stop offset="100%" stopColor="#6B4E18" />
                          </radialGradient>

                          {/* Outer Wax Lip Gradient */}
                          <linearGradient id="envelope-wax-rim-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F7EBD0" />
                            <stop offset="50%" stopColor="#B89347" />
                            <stop offset="100%" stopColor="#5C4212" />
                          </linearGradient>

                          {/* Inner Embossed Monogram Shadow */}
                          <filter id="envelope-seal-emboss-depth" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0.6" dy="1" stdDeviation="0.8" floodColor="#4A3510" floodOpacity="0.85" />
                          </filter>
                        </defs>

                        {/* Outer Stamped Wax Circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="46"
                          fill="url(#envelope-wax-body-grad)"
                          stroke="url(#envelope-wax-rim-grad)"
                          strokeWidth="2"
                        />

                        {/* Embossed Outer Ring */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#FBF5E6"
                          strokeWidth="1.2"
                          strokeOpacity="0.6"
                        />

                        {/* Embossed Inner Bezel Ring */}
                        <circle
                          cx="50"
                          cy="50"
                          r="36"
                          fill="none"
                          stroke="#7A5B21"
                          strokeWidth="1.2"
                          strokeOpacity="0.7"
                        />

                        {/* Monogram KO in Elegant Italic Serif */}
                        <g filter="url(#envelope-seal-emboss-depth)">
                          <text
                            x="50"
                            y="57"
                            fontFamily="'Playfair Display', 'Cormorant Garamond', 'Baskerville', 'Georgia', serif"
                            fontSize="24"
                            fontStyle="italic"
                            fontWeight="bold"
                            fill="#FFFFFF"
                            textAnchor="middle"
                            letterSpacing="0.04em"
                          >
                            KO
                          </text>
                        </g>
                      </svg>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. 'You are invited' beneath the seal */}
            <div className="relative z-20 text-center pointer-events-none mt-2 sm:mt-3">
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.8 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="flex items-center justify-center gap-2 opacity-75 mb-0.5">
                  <span className="w-8 h-px bg-[#D4AF37]" />
                  <span className="text-[#C5A059] text-[10px]">❖</span>
                  <span className="w-8 h-px bg-[#D4AF37]" />
                </div>

                <p className="font-serif text-xs uppercase tracking-[0.2em] text-[#8A6621] font-bold">
                  Kinanga &amp; Omondi
                </p>
                
                <p className="font-serif italic text-base sm:text-lg text-[#2A2218] font-medium tracking-wide">
                  You are invited
                </p>

                <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#8A6621] font-semibold opacity-80 group-hover:opacity-100 transition-opacity">
                  Tap to open invitation
                </p>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
