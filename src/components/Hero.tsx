import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Sparkles, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

import coverPhoto from '../assets/images/client_couple_cover.jpg';
import traditionalWeddingPhoto from '../assets/images/client_traditional_wedding.jpg';
import loveAndLaughterPhoto from '../assets/images/client_love_and_laughter.jpg';
import friendsOfLovePhoto from '../assets/images/client_friends_of_love.jpg';
import mambruiVacationPhoto from '../assets/images/client_mambrui_vacation.jpg';
import cakeCuttingPhoto from '../assets/images/client_cake_cutting.jpg';

const COUPLE_PHOTOS = [
  {
    src: coverPhoto,
    title: 'Kinanga & Omondi',
    subtitle: 'Celebrating Holy Matrimony',
  },
  {
    src: traditionalWeddingPhoto,
    title: 'A Beautiful Beginning',
    subtitle: 'Surrounded by Family & Love',
  },
  {
    src: loveAndLaughterPhoto,
    title: 'Love & Laughter',
    subtitle: 'A Journey Worth Celebrating',
  },
  {
    src: friendsOfLovePhoto,
    title: 'Friends of Love',
    subtitle: 'Memories Made Together',
  },
  {
    src: mambruiVacationPhoto,
    title: 'Adventures Together',
    subtitle: 'Making Memories Along the Way',
  },
  {
    src: cakeCuttingPhoto,
    title: 'A Sweet Celebration',
    subtitle: 'The Joy of Their Journey',
  },
];

export default function Hero() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentPhotoIndex((prev) => (prev + 1) % COUPLE_PHOTOS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentPhotoIndex((prev) => (prev - 1 + COUPLE_PHOTOS.length) % COUPLE_PHOTOS.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentPhotoIndex ? 1 : -1);
    setCurrentPhotoIndex(index);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-[#FFFFFF] text-[#2A2218] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8"
      id="hero-section"
    >
      {/* Clean champagne & white luminous backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#FFFFFF] via-[#FDFBF7] to-[#FAF5EB]" />

      {/* Main Wedding Invitation Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 border border-[#E5D7BC] shadow-[0_20px_50px_rgba(138,102,33,0.08)] flex flex-col items-center text-center w-full"
        >
          {/* Couple Photo Carousel Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mb-7 relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative w-full aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-stone-900 border border-[#D4AF37]/60 p-0.5">
              <div className="relative w-full h-full rounded-[10px] sm:rounded-[14px] overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentPhotoIndex}
                    custom={direction}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={COUPLE_PHOTOS[currentPhotoIndex].src}
                      alt={COUPLE_PHOTOS[currentPhotoIndex].title}
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15 pointer-events-none" />
                    <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-left pointer-events-none flex items-end justify-between">
                      <div>
                        <p className="text-white font-serif text-xs sm:text-sm md:text-base font-bold drop-shadow-sm">
                          {COUPLE_PHOTOS[currentPhotoIndex].title}
                        </p>
                        <p className="text-[#F5E6C4] text-[10px] sm:text-xs font-sans tracking-wide">
                          {COUPLE_PHOTOS[currentPhotoIndex].subtitle}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="absolute top-2.5 right-2.5 z-20 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-xs border border-[#D4AF37]/40 text-white font-sans text-[10px] sm:text-xs font-medium tracking-wider tabular-nums">
                  {currentPhotoIndex + 1} / {COUPLE_PHOTOS.length}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/65 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm opacity-85 hover:opacity-100"
                  aria-label="Previous photo"
                  title="Previous Photo"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/65 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm opacity-85 hover:opacity-100"
                  aria-label="Next photo"
                  title="Next Photo"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>

                <div className="absolute bottom-2.5 right-3 z-20 flex items-center gap-1.5 pointer-events-auto">
                  {COUPLE_PHOTOS.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        goToSlide(idx);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentPhotoIndex
                          ? 'w-5 sm:w-6 bg-[#D4AF37]'
                          : 'w-1.5 bg-white/60 hover:bg-white'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Editorial Kicker */}
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="inline-flex items-center gap-2 text-[#8A6621] text-xs font-serif italic mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="font-semibold tracking-wider uppercase font-sans text-[11px]">
              {WEDDING_DETAILS.couple.featureHeadline}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          </motion.div>

          {/* Invitation introductory line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-[#574C3F] font-serif leading-relaxed text-sm sm:text-base max-w-2xl mx-auto mb-4 px-2"
          >
            <p className="italic">
              With the blessings of the Ogari and Obat families, joyfully invite you to celebrate the holy matrimony of
            </p>
          </motion.div>

          {/* Main Couple Names */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mb-3 max-w-2xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display tracking-tight text-[#2A2218] text-balance">
              <span className="text-[#7A5B21] font-bold">Kinanga</span>
              <span className="font-serif text-[#C5A059] mx-2.5 sm:mx-3 text-3xl sm:text-4xl md:text-5xl italic font-normal">&amp;</span>
              <span className="text-[#7A5B21] font-bold">Omondi</span>
            </h1>
            <p className="mt-2 font-sans text-xs sm:text-sm uppercase tracking-[0.22em] text-[#8A6621] font-semibold">
              {WEDDING_DETAILS.couple.brideFull} &amp; {WEDDING_DETAILS.couple.groomFull}
            </p>
          </motion.div>

          {/* Families Banner */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 max-w-xl mx-auto w-full my-4 px-2"
          >
            <div className="text-center sm:text-right">
              <span className="block text-[11px] font-serif italic text-[#8A6621]">
                Daughter of
              </span>
              <span className="font-serif text-sm sm:text-base font-semibold text-[#2A2218] tracking-wide">
                {WEDDING_DETAILS.families.brideFamily}
              </span>
            </div>

            <div className="hidden sm:block w-px h-7 bg-[#E5D7BC]" />
            <div className="sm:hidden w-12 h-px bg-[#E5D7BC] my-0.5" />

            <div className="text-center sm:text-left">
              <span className="block text-[11px] font-serif italic text-[#8A6621]">
                Son of
              </span>
              <span className="font-serif text-sm sm:text-base font-semibold text-[#2A2218] tracking-wide">
                {WEDDING_DETAILS.families.groomFamily}
              </span>
            </div>
          </motion.div>

          {/* Request presence string */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[#574C3F] font-serif tracking-wide text-sm md:text-base mb-6 max-w-xl mx-auto leading-relaxed italic"
          >
            as they exchange sacred vows and unite their lives in love, faith, and joy.
          </motion.p>

          {/* Wedding Date & Venue Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[#7A5B21] font-sans text-xs sm:text-sm font-semibold mb-7 bg-[#FAF5EB] border border-[#D4AF37]/60 px-6 py-3 rounded-full"
          >
            <span className="inline-flex items-center gap-2 tracking-wider font-bold">
              <Calendar className="w-4 h-4 text-[#B89347]" />
              <span>Friday, 4th December 2026</span>
            </span>
            <span className="text-[#C5A059] hidden sm:inline" aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5 tracking-wide font-semibold text-[#2A2218]">
              <MapPin className="w-4 h-4 text-[#B89347]" />
              <span>Monarch Gardens, Mosocho · Kisii County</span>
            </span>
          </motion.div>

          {/* Biblical Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="max-w-lg mx-auto text-[#4A3F32] italic font-serif text-sm md:text-base border-t border-b border-[#E5D7BC] py-3.5 px-4"
          >
            <div className="text-center mb-1">
              <span>“{WEDDING_DETAILS.bibleVerses[0].text}”</span>
            </div>
            <p className="text-[#8A6621] text-xs tracking-widest uppercase font-sans font-semibold not-italic mt-1">
              {WEDDING_DETAILS.bibleVerses[0].reference}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
