import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Quote } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

export default function LoveStory() {
  return (
    <section
      className="relative py-20 bg-gradient-to-b from-[#FFFFFF] via-[#FAF5EB] to-[#FFFFFF] text-[#2A2218] overflow-hidden"
      id="love-story-section"
    >
      {/* Soft champagne gold ambient lights */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[#8A6621] text-xs font-semibold tracking-widest uppercase font-sans flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>How Our Journey Began</span>
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-[#2A2218] mt-2 mb-4">
            Our Love Story
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto" />
        </div>

        {/* Narrative Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-white/95 backdrop-blur-md border border-[#D8C39A] rounded-3xl p-8 sm:p-12 shadow-[0_18px_45px_rgba(138,102,33,0.08)] overflow-hidden"
        >
          <div className="flex flex-col items-center text-center space-y-6 relative z-10">
            {/* Romantic Icon Badge */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FAF5EB] to-[#F3E7CE] border border-[#D4AF37]/60 flex items-center justify-center text-[#8A6621] shadow-sm">
              <Heart className="w-7 h-7 fill-[#D4AF37]/30 text-[#8A6621]" />
            </div>

            {/* Love Story Text */}
            <div className="max-w-2xl mx-auto">
              <Quote className="w-8 h-8 text-[#C5A059]/40 mx-auto mb-3 rotate-180" />

              <p className="font-serif text-lg sm:text-xl md:text-2xl text-[#2A2218] leading-relaxed italic">
                “Some of life’s most beautiful moments are the ones we never planned. What began as a journey of two people has grown into a love filled with friendship, laughter, memories and countless reasons to be grateful.”
              </p>

              <div className="my-5 w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />

              <p className="font-serif text-base sm:text-lg md:text-xl text-[#4A3F32] leading-relaxed italic">
                “Through every season, we have found our way to each other, and now we are excited to take the next step together. From this day forward, we choose each other — every day, for the rest of our lives. And we would love for you to be there as we say: <span className="font-bold text-[#7A5B21] not-italic">‘I do.’</span>”
              </p>
            </div>

            {/* Couple Signature Line */}
            <div className="pt-4 border-t border-[#E5D7BC] flex flex-col items-center">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#7A5B21]">
                {WEDDING_DETAILS.couple.brideShort} &amp; {WEDDING_DETAILS.couple.groomShort}
              </span>
              <span className="text-[11px] font-sans uppercase tracking-widest text-[#8A6621] font-semibold mt-1">
                December 4, 2026 · Mosocho, Kisii County
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
