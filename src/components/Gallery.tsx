import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, X, Pause, Play } from 'lucide-react';

import couplePortrait from '../assets/images/sharon_collins_couple_1795259250565.jpg';
import engagementHandsRingImg from '../assets/images/engagement_hands_ring_1786638744313.jpg';
import ceremonyVenueImg from '../assets/images/monarch_gardens_ceremony_1795259251766.jpg';
import receptionVenueImg from '../assets/images/monarch_gardens_reception_1795259251084.jpg';

interface GalleryItem {
  url: string;
  caption: string;
  category: string;
}

const GALLERY_IMAGES: GalleryItem[] = [
  {
    url: couplePortrait,
    caption: 'Sharon Kinanga Ogari & Collins Omondi Obat — Celebrating Love',
    category: 'The Couple',
  },
  {
    url: engagementHandsRingImg,
    caption: 'Forever Begins Here — Our Engagement',
    category: 'Engagement',
  },
  {
    url: ceremonyVenueImg,
    caption: 'Monarch Gardens, Mosocho — 9:00 AM Garden Ceremony',
    category: 'Ceremony Sanctuary',
  },
  {
    url: receptionVenueImg,
    caption: 'Monarch Gardens, Mosocho — 2:00 PM Reception Pavilion',
    category: 'Reception Celebration',
  },
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying || isLightboxOpen) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying, isLightboxOpen]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      className="relative py-20 md:py-28 bg-[#FAF5EB] text-[#2C251D] overflow-hidden border-t border-[#E6D2A2]"
      id="gallery-section"
    >
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[#7A5A1F] text-xs font-bold tracking-widest uppercase font-sans mb-2">
            Memories &amp; Venue Preview
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-[#2C251D] font-semibold mb-3 text-balance">
            Wedding Gallery
          </h2>
          <p className="text-[#574D41] text-base font-serif italic max-w-xl mx-auto leading-relaxed">
            Moments from our journey together and a glimpse of Monarch Gardens, Mosocho.
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#B58E43] to-transparent mx-auto mt-4" />
        </div>

        {/* Carousel Frame */}
        <div className="relative bg-white border border-[#D4B475] rounded-3xl p-3 md:p-6 shadow-sm">
          <div
            className="relative aspect-[16/10] md:aspect-[21/9] rounded-2xl overflow-hidden bg-[#2C251D] group border border-[#E6D2A2]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={GALLERY_IMAGES[currentIndex].url}
                alt={GALLERY_IMAGES[currentIndex].caption}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="w-full h-full object-cover object-center cursor-pointer"
                onClick={() => setIsLightboxOpen(true)}
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

            {/* Top Toolbar Controls */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2.5 rounded-full bg-white/95 hover:bg-white text-[#7A5A1F] border border-[#D4B475] transition-colors cursor-pointer shadow-sm"
                title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="p-2.5 rounded-full bg-white/95 hover:bg-white text-[#7A5A1F] border border-[#D4B475] transition-colors cursor-pointer shadow-sm"
                title="Expand photo"
                aria-label="Expand photo"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Caption & Counter */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 flex items-end justify-between pointer-events-none z-10 gap-3">
              <div className="bg-white/95 backdrop-blur-md border border-[#D4B475] rounded-2xl px-4 py-2.5 md:px-5 md:py-3 max-w-xl shadow-md">
                <span className="text-[11px] uppercase font-sans font-bold tracking-widest text-[#7A5A1F] block mb-0.5">
                  {GALLERY_IMAGES[currentIndex].category}
                </span>
                <p className="text-xs md:text-sm font-serif text-[#2C251D] leading-snug font-semibold">
                  {GALLERY_IMAGES[currentIndex].caption}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono tabular-nums text-[#2C251D] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#D4B475] flex-shrink-0 shadow-md">
                <span className="text-[#7A5A1F] font-bold">{currentIndex + 1}</span>
                <span className="text-[#85796B]">/</span>
                <span>{GALLERY_IMAGES.length}</span>
              </div>
            </div>

            {/* Prev & Next */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/95 hover:bg-white text-[#7A5A1F] border border-[#D4B475] flex items-center justify-center transition-transform cursor-pointer hover:scale-105 active:scale-95 shadow-md"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/95 hover:bg-white text-[#7A5A1F] border border-[#D4B475] flex items-center justify-center transition-transform cursor-pointer hover:scale-105 active:scale-95 shadow-md"
              aria-label="Next Image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots & Thumbnails */}
          <div className="flex flex-col items-center gap-4 mt-5">
            <div className="flex items-center gap-2">
              {GALLERY_IMAGES.map((_, idx) => (
                <button
                  key={`dot-${idx}`}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'w-8 bg-[#B58E43]' : 'w-2 bg-[#E6D2A2] hover:bg-[#D4B475]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 md:gap-3 overflow-x-auto max-w-full py-1 px-2">
              {GALLERY_IMAGES.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative rounded-xl overflow-hidden transition-all cursor-pointer border-2 flex-shrink-0 ${
                    currentIndex === idx
                      ? 'border-[#B58E43] scale-105 shadow-sm'
                      : 'border-[#E6D2A2] opacity-65 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-16 h-11 md:w-20 md:h-14 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2C251D]/92 backdrop-blur-lg flex items-center justify-center p-4 md:p-8"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white border border-[#D4B475] text-[#7A5A1F] hover:text-[#2C251D] transition-colors z-50 cursor-pointer shadow-lg"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <div
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY_IMAGES[currentIndex].url}
                alt={GALLERY_IMAGES[currentIndex].caption}
                className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-[#D4B475]"
                referrerPolicy="no-referrer"
              />
              <div className="mt-4 text-center">
                <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#E6D2A2]">
                  {GALLERY_IMAGES[currentIndex].category}
                </span>
                <p className="text-white font-serif text-lg mt-1">
                  {GALLERY_IMAGES[currentIndex].caption}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
