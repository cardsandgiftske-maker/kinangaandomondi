import React from 'react';
import { Sparkles, Shirt, Heart } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

export default function DressCode() {
  return (
    <section
      className="relative py-24 bg-gradient-to-b from-[#FAF5EB] via-[#FFFFFF] to-[#FAF5EB] text-[#2A2218] overflow-hidden"
      id="dress-code-section"
    >
      {/* Champagne Gold & White Ambient Wash */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 -left-10 w-[450px] h-[450px] bg-[#D4AF37]/10 rounded-full blur-[110px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#E8D8B5]/30 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#C5A059_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-15" />
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-[#8A6621] text-xs font-bold tracking-widest uppercase font-sans">
              Attire &amp; Etiquette
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-light text-[#2A2218] mt-1 mb-3">Dress Code</h2>
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-[#C5A059] text-xs">❖</span>
            <span className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          <p className="text-[#574C3F] text-base md:text-lg max-w-2xl mx-auto italic font-serif leading-relaxed">
            We kindly invite our cherished guests to celebrate with us in formal elegance, complemented by our champagne gold and white theme.
          </p>
        </div>

        {/* Featured Tagline Banner */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 mb-10 shadow-[0_20px_50px_rgba(138,102,33,0.08)] relative overflow-hidden text-center border border-[#D8C39A] hover:border-[#C5A059] transition-colors duration-500">
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FAF5EB] to-[#F3E7CE] border border-[#D4AF37]/60 flex items-center justify-center shadow-inner mb-3">
              <Sparkles className="w-7 h-7 text-[#8A6621]" />
            </div>

            <span className="text-[#8A6621] text-[10px] uppercase font-bold tracking-widest font-sans mb-1">
              Wedding Theme
            </span>

            <h3 className="font-serif text-3xl md:text-4xl text-[#2A2218] font-bold my-2 tracking-wide">
              {WEDDING_DETAILS.dressCode.formalTheme}
            </h3>

            <p className="text-[#574C3F] text-xs sm:text-sm font-sans mt-2 max-w-xl leading-relaxed">
              We look forward to seeing everyone dressed in their finest formal attire to celebrate our special day with timeless grace.
            </p>
          </div>
        </div>

        {/* Ladies and Gentlemen Attire Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ladies Card */}
          <div className="bg-gradient-to-br from-white via-[#FDFBF7] to-[#FAF5EB] border border-[#D8C39A] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-[#B89347] transition-all">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#FAF5EB] text-[#8A6621] flex items-center justify-center border border-[#D4AF37]/60 shadow-xs">
                    <Heart className="w-5 h-5 text-[#8A6621]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#8A6621] font-sans block">For Her</span>
                    <h4 className="font-serif text-xl text-[#2A2218] font-bold">Ladies Attire</h4>
                  </div>
                </div>
                <span className="text-xs text-[#7A5B21] font-bold font-sans uppercase tracking-wider">
                  Formal
                </span>
              </div>

              <p className="text-[#2A2218] text-sm font-serif leading-relaxed mt-3 font-medium">
                {WEDDING_DETAILS.dressCode.ladies}
              </p>

              <div className="mt-4 pt-3 border-t border-[#E5D7BC] flex items-center justify-between text-xs text-[#574C3F] font-sans">
                <span className="italic">Evening gowns, midi formal dresses, chic formal wear</span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#D4AF37] border border-[#8A6621]/40 shrink-0 ml-2" title="Champagne Gold Palette" />
              </div>
            </div>
          </div>

          {/* Gentlemen Card */}
          <div className="bg-gradient-to-br from-white via-[#FDFBF7] to-[#FAF5EB] border border-[#D8C39A] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-[#B89347] transition-all">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#FAF5EB] text-[#8A6621] flex items-center justify-center border border-[#D4AF37]/60 shadow-xs">
                    <Shirt className="w-5 h-5 text-[#8A6621]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#8A6621] font-sans block">For Him</span>
                    <h4 className="font-serif text-xl text-[#2A2218] font-bold">Gentlemen Attire</h4>
                  </div>
                </div>
                <span className="text-xs text-[#7A5B21] font-bold font-sans uppercase tracking-wider">
                  Formal
                </span>
              </div>

              <p className="text-[#2A2218] text-sm font-serif leading-relaxed mt-3 font-medium">
                {WEDDING_DETAILS.dressCode.gentlemen}
              </p>

              <div className="mt-4 pt-3 border-t border-[#E5D7BC] flex items-center justify-between text-xs text-[#574C3F] font-sans">
                <span className="italic">Tailored suits, blazers with trousers, or formal traditional wear</span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#FFFFFF] border border-[#C5A059] shrink-0 ml-2" title="White & Champagne Palette" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
