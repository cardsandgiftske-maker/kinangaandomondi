import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import couplePortrait from '../assets/images/sharon_collins_couple_1795259250565.jpg';

interface EnvelopeProps {
  onOpen: () => void;
  onSealBreak?: () => void;
}

export default function Envelope({ onOpen, onSealBreak }: EnvelopeProps) {
  const [animationStep, setAnimationStep] = useState<
    'closed' | 'opening-seal' | 'opening-flap' | 'card-rising' | 'complete'
  >('closed');

  const handleOpen = () => {
    if (animationStep !== 'closed') return;

    if (onSealBreak) {
      onSealBreak();
    }

    setAnimationStep('opening-seal');

    setTimeout(() => {
      setAnimationStep('opening-flap');
    }, 400);

    setTimeout(() => {
      setAnimationStep('card-rising');
    }, 1100);

    setTimeout(() => {
      setAnimationStep('complete');
      onOpen();
    }, 2200);
  };

  const isFlapOpen =
    animationStep === 'opening-flap' ||
    animationStep === 'card-rising' ||
    animationStep === 'complete';

  const isCardRising =
    animationStep === 'card-rising' || animationStep === 'complete';

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: 'blur(8px)',
        transition: { duration: 0.85, ease: [0.4, 0.0, 0.2, 1] },
      }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#F7F3EA] p-3 sm:p-6 select-none"
    >
      {/* Soft Champagne & White Ambient Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-[#E6D2A2]/40 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-[520px] h-[520px] rounded-full bg-white/80 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.65)_0%,_rgba(243,233,210,0.45)_100%)]" />
      </div>

      {/* Main Envelope Container */}
      <div className="relative w-full max-w-[440px] sm:max-w-[500px] flex flex-col items-center justify-center z-10 my-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="relative w-full aspect-[4/3] rounded-3xl shadow-[0_30px_70px_-18px_rgba(122,90,31,0.28),0_0_0_1px_rgba(181,142,67,0.4)] bg-white overflow-hidden"
          style={{ perspective: 1200 }}
        >
          {/* Embossed Floral Texture on White Cotton Paper */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <pattern
                id="embossed-floral-champagne"
                x="0"
                y="0"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M40 0 C 45 15, 60 20, 75 20 C 60 25, 55 40, 55 55 C 40 45, 35 60, 20 60 C 25 45, 10 40, 10 25 C 25 25, 30 10, 40 0 Z"
                  fill="#9A742E"
                />
                <circle cx="40" cy="40" r="3.5" fill="#B58E43" />
                <path d="M10 70 Q 25 55 40 70 T 70 70" stroke="#B58E43" strokeWidth="1" fill="none" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#embossed-floral-champagne)" />
            </svg>
          </div>

          {/* Champagne Gold Foil Border */}
          <div className="absolute inset-3 border border-[#C8A45D]/45 rounded-2xl pointer-events-none z-10" />
          <div className="absolute inset-4 border border-[#C8A45D]/20 rounded-xl pointer-events-none z-10" />

          {/* INNER LINING (Champagne Gold Silk revealed when flap opens) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#F3E9D2] via-[#E6D2A2] to-[#D4B475] flex items-center justify-center p-6 text-center">
            <div className="border border-[#9A742E]/35 rounded-2xl p-4 w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-white/30 backdrop-blur-xs">
              <div className="w-16 h-16 rounded-full border border-[#9A742E]/50 flex items-center justify-center text-[#594116] font-serif text-xl font-semibold tracking-widest bg-white/80 shadow-inner">
                KO
              </div>
              <p className="font-serif italic text-xs text-[#594116] mt-2 tracking-widest uppercase">
                Holy Matrimony
              </p>
            </div>
          </div>

          {/* RISING INVITATION CARD */}
          <motion.div
            initial={{ y: '0%', opacity: 0 }}
            animate={
              isCardRising
                ? { y: '-60%', opacity: 1, scale: 1.04 }
                : { y: '0%', opacity: 0 }
            }
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-6 top-6 bottom-6 bg-white rounded-2xl border-2 border-[#D4B475] shadow-2xl z-20 p-4 flex flex-col items-center justify-between text-[#2C251D] overflow-hidden"
          >
            <div className="text-center space-y-1">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#9A742E] font-sans font-bold">
                Wedding Invitation
              </p>
              <h2 className="font-serif text-xl font-semibold text-[#2C251D] tracking-wide">
                Sharon &amp; Collins
              </h2>
            </div>

            <div className="w-20 h-20 rounded-full border-2 border-[#D4B475] overflow-hidden shadow-md my-1">
              <img
                src={couplePortrait}
                alt="Sharon Kinanga Ogari & Collins Omondi Obat"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="text-center space-y-0.5 font-sans">
              <p className="text-[10px] font-bold text-[#7A5A1F] uppercase tracking-wider">
                Friday, December 4, 2026
              </p>
              <p className="text-[10px] text-[#574D41] italic font-serif">
                Monarch Gardens, Mosocho · Kisii County
              </p>
            </div>

            <div className="w-full py-1.5 bg-gradient-to-r from-[#B58E43] via-[#D4B475] to-[#9A742E] text-white text-[9px] font-sans font-bold uppercase tracking-widest text-center rounded-lg shadow-xs">
              You Are Cordially Invited
            </div>
          </motion.div>

          {/* ENVELOPE BASE POCKET FLAPS (Pure White & Soft Ivory Silk) */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <svg className="w-full h-full drop-shadow-[2px_0_4px_rgba(122,90,31,0.08)]" viewBox="0 0 400 300" preserveAspectRatio="none">
              <path d="M0 0 L200 150 L0 300 Z" fill="#FFFFFF" />
              <path d="M0 0 L200 150 L0 300" stroke="#D4B475" strokeWidth="0.9" opacity="0.55" />
            </svg>
          </div>

          <div className="absolute inset-0 z-20 pointer-events-none">
            <svg className="w-full h-full drop-shadow-[-2px_0_4px_rgba(122,90,31,0.08)]" viewBox="0 0 400 300" preserveAspectRatio="none">
              <path d="M400 0 L200 150 L400 300 Z" fill="#FFFFFF" />
              <path d="M400 0 L200 150 L400 300" stroke="#D4B475" strokeWidth="0.9" opacity="0.55" />
            </svg>
          </div>

          <div className="absolute inset-0 z-20 pointer-events-none">
            <svg className="w-full h-full drop-shadow-[0_-3px_6px_rgba(122,90,31,0.1)]" viewBox="0 0 400 300" preserveAspectRatio="none">
              <path d="M0 300 L200 150 L400 300 Z" fill="#FAF6EE" />
              <path d="M0 300 L200 150 L400 300" stroke="#C8A45D" strokeWidth="1" opacity="0.6" />
            </svg>
          </div>

          {/* TOP TRIANGULAR FLAP */}
          <motion.div
            animate={
              isFlapOpen
                ? { rotateX: 180, opacity: 0.1, y: -10 }
                : { rotateX: 0, opacity: 1, y: 0 }
            }
            transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-0 z-30 origin-top pointer-events-none"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <svg className="w-full h-full drop-shadow-[0_8px_14px_rgba(122,90,31,0.14)]" viewBox="0 0 400 300" preserveAspectRatio="none">
              <path d="M0 0 L200 150 L400 0 Z" fill="#FCFBF7" />
              <path d="M0 0 L200 150 L400 0" stroke="#C8A45D" strokeWidth="1.2" opacity="0.7" />
              <g opacity="0.45" stroke="#B58E43" strokeWidth="0.8" fill="none">
                <path d="M120 20 Q 200 70 280 20" />
                <path d="M150 35 Q 200 65 250 35" />
                <circle cx="200" cy="50" r="2" fill="#B58E43" />
              </g>
            </svg>
          </motion.div>

          {/* CHAMPAGNE GOLD KO WAX SEAL */}
          <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
            <AnimatePresence>
              {animationStep === 'closed' || animationStep === 'opening-seal' ? (
                <motion.div
                  initial={{ scale: 1 }}
                  animate={
                    animationStep === 'opening-seal'
                      ? { scale: [1, 1.22, 0], opacity: [1, 0.9, 0], rotate: [0, 12, -8] }
                      : { scale: 1, opacity: 1 }
                  }
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="pointer-events-auto flex flex-col items-center justify-center"
                >
                  <button
                    type="button"
                    onClick={handleOpen}
                    aria-label="Open wedding invitation"
                    className="group cursor-pointer select-none flex flex-col items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A742E] rounded-full"
                  >
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#FBF3DF] via-[#D4B475] to-[#8A6623] p-1 shadow-[0_12px_28px_rgba(122,90,31,0.35),_inset_0_2px_4px_rgba(255,255,255,0.85),_inset_0_-4px_8px_rgba(90,65,22,0.35)] border border-[#FBF3DF] transform transition-transform duration-200 active:scale-95 group-hover:scale-105">
                      <div className="w-full h-full rounded-full bg-gradient-to-tl from-[#9A742E] via-[#D4B475] to-[#F4E9CC] flex items-center justify-center shadow-[inset_0_3px_6px_rgba(90,65,22,0.28)] border border-[#E6D2A2]/70 relative overflow-hidden">
                        <div className="flex flex-col items-center justify-center text-center">
                          <div className="absolute inset-2.5 rounded-full border border-[#FBF3DF]/60" />
                          <span className="font-serif font-bold text-2xl sm:text-3xl tracking-wider text-[#3A2A0E] drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] italic">
                            KO
                          </span>
                          <span className="text-[8px] font-sans font-bold uppercase tracking-[0.2em] text-[#3A2A0E]/85 mt-0.5">
                            04·12·26
                          </span>
                        </div>
                        <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent -rotate-12 transform origin-top-left scale-150 pointer-events-none" />
                      </div>
                    </div>

                    <span className="mt-4 px-5 py-2 bg-white/95 border border-[#C8A45D] rounded-full shadow-md text-[#7A5A1F] text-[11px] font-sans font-bold uppercase tracking-widest group-hover:bg-[#FAF5EB] transition-colors">
                      Tap Seal to Open
                    </span>
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Outer Caption Footer */}
        <div className="mt-6 text-center space-y-1">
          <p className="font-serif italic text-base text-[#2C251D] tracking-wide flex items-center justify-center gap-2">
            <Heart className="w-3.5 h-3.5 text-[#B58E43] fill-[#D4B475]" />
            <span>Sharon Kinanga Ogari &amp; Collins Omondi Obat</span>
            <Heart className="w-3.5 h-3.5 text-[#B58E43] fill-[#D4B475]" />
          </p>
          <p className="text-xs font-sans tracking-widest text-[#574D41] uppercase">
            04.12.2026 · Monarch Gardens, Mosocho · Kisii County
          </p>
        </div>
      </div>
    </motion.div>
  );
}
