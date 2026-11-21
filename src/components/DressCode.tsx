import React from 'react';
import { Shirt, Heart } from 'lucide-react';

export default function DressCode() {
  return (
    <section
      className="relative py-20 md:py-28 bg-white text-[#2C251D] border-t border-[#E6D2A2]"
      id="dress-code-section"
    >
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-[#7A5A1F] text-xs font-bold tracking-widest uppercase font-sans mb-2">
            Guest Attire
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-semibold text-[#2C251D] mb-3 text-balance">
            Dress Code
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#B58E43] to-transparent mx-auto" />
        </div>

        {/* Dress Code Card */}
        <div className="bg-[#FDFBF7] border border-[#D4B475] p-8 md:p-12 rounded-3xl shadow-sm text-center space-y-6 relative overflow-hidden">
          <div className="w-14 h-14 rounded-full bg-white border border-[#D4B475] text-[#9A742E] flex items-center justify-center mx-auto">
            <Shirt className="w-7 h-7" />
          </div>

          <div className="space-y-3">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#2C251D]">
              Elegant &amp; Befitting the Occasion
            </h3>
            <p className="text-[#574D41] text-base md:text-lg font-serif italic leading-relaxed max-w-xl mx-auto">
              We kindly ask our cherished guests to dress elegantly in formal, refined attire befitting the joy and sacredness of the occasion as we celebrate together at Monarch Gardens, Mosocho.
            </p>
          </div>

          <div className="pt-6 border-t border-[#E6D2A2] flex items-center justify-center gap-2 text-[#574D41] text-sm font-serif italic">
            <Heart className="w-4 h-4 text-[#B58E43] fill-[#E6D2A2]" />
            <span>Your warm presence in grace and style is the finest touch to our day.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
