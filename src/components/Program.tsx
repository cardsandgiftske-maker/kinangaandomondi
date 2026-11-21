import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, CheckCircle, Award, Music, MessageCircle, Gift, Cake, Camera, Users, Sparkles } from 'lucide-react';
import { PROGRAM_ITEMS } from '../data';

export default function Program() {
  const [activeTab, setActiveTab] = useState<'all' | 'church' | 'reception'>('all');

  const filteredItems = PROGRAM_ITEMS.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'church') return item.isChurch;
    return !item.isChurch;
  });

  const getIconForTitle = (title: string, isChurch?: boolean) => {
    const t = title.toLowerCase();
    const colorClass = isChurch ? 'text-[#7A5B21]' : 'text-[#A68038]';
    if (t.includes('arrival') || t.includes('ushering')) return <Clock className={`w-5 h-5 ${colorClass}`} />;
    if (t.includes('ceremony') || t.includes('vows') || t.includes('matrimony')) return <Award className={`w-5 h-5 ${colorClass}`} />;
    if (t.includes('photo') || t.includes('photography')) return <Camera className={`w-5 h-5 ${colorClass}`} />;
    if (t.includes('feast') || t.includes('dining') || t.includes('refreshments')) return <CheckCircle className={`w-5 h-5 ${colorClass}`} />;
    if (t.includes('entertainment') || t.includes('music')) return <Music className={`w-5 h-5 ${colorClass}`} />;
    if (t.includes('speech') || t.includes('tribute')) return <MessageCircle className={`w-5 h-5 ${colorClass}`} />;
    if (t.includes('cake')) return <Cake className={`w-5 h-5 ${colorClass}`} />;
    if (t.includes('gift') || t.includes('thanks') || t.includes('envelope')) return <Gift className={`w-5 h-5 ${colorClass}`} />;
    if (t.includes('closing') || t.includes('prayer')) return <Sparkles className={`w-5 h-5 ${colorClass}`} />;
    return <Users className={`w-5 h-5 ${colorClass}`} />;
  };

  return (
    <section className="relative py-24 bg-[#FFFFFF] text-[#2A2218]" id="program-section">
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-[#8A6621] text-xs font-bold tracking-widest uppercase font-sans">
            The Order of Events · Monarch Gardens, Mosocho
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2A2218] mt-3 mb-4">Wedding Programme</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto rounded-full" />
          <p className="text-[#574C3F] text-sm md:text-base mt-4 max-w-xl mx-auto italic font-serif leading-relaxed">
            “Love is patient, love is kind. It always protects, always trusts, always hopes, always perseveres.” <br />
            <span className="text-[#8A6621] uppercase font-sans text-xs tracking-wider font-bold not-italic block mt-1">— 1 Corinthians 13:4,7</span>
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center bg-[#FAF5EB] border border-[#D8C39A] p-1.5 rounded-full shadow-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2 text-xs md:text-sm font-sans font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'all' ? 'bg-[#8A6621] text-white shadow-sm' : 'text-[#574C3F] hover:text-[#2A2218]'
              }`}
            >
              Full Programme
            </button>
            <button
              onClick={() => setActiveTab('church')}
              className={`px-5 py-2 text-xs md:text-sm font-sans font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'church' ? 'bg-[#8A6621] text-white shadow-sm' : 'text-[#574C3F] hover:text-[#2A2218]'
              }`}
            >
              Ceremony (9 AM)
            </button>
            <button
              onClick={() => setActiveTab('reception')}
              className={`px-5 py-2 text-xs md:text-sm font-sans font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'reception' ? 'bg-[#8A6621] text-white shadow-sm' : 'text-[#574C3F] hover:text-[#2A2218]'
              }`}
            >
              Reception (2 PM)
            </button>
          </div>
        </div>

        {/* Program Timeline */}
        <div className="relative border-l-2 border-[#D4AF37]/50 ml-6 md:ml-40 pl-8 md:pl-12 pb-4 space-y-10">
          {filteredItems.map((item, index) => (
            <motion.div
              key={`program-item-${index}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative"
            >
              {/* Date/Time Left Sidebar Anchor (Desktop only) */}
              <div className="hidden md:flex absolute right-full mr-32 top-1 items-center justify-end text-right w-28 pointer-events-none">
                <div className="flex flex-col items-end">
                  <span className={`${item.isChurch ? 'text-[#7A5B21]' : 'text-[#8A6621]'} font-serif font-bold text-sm tracking-tight tabular-nums`}>
                    {item.time.split(' - ')[0]}
                  </span>
                  <span className="text-[#6B5E4E] font-sans text-[10px] uppercase tracking-wider font-bold">
                    {item.duration}
                  </span>
                </div>
              </div>

              {/* Timeline Icon Node */}
              <div
                className={`absolute -left-[32px] md:-left-[48px] -translate-x-1/2 top-1 w-10 h-10 rounded-full bg-white border-2 flex items-center justify-center shadow-xs z-10 ${
                  item.isChurch ? 'border-[#8A6621] text-[#8A6621]' : 'border-[#D4AF37] text-[#A68038]'
                }`}
              >
                {getIconForTitle(item.title, item.isChurch)}
              </div>

              {/* Program Detail Card */}
              <div className="bg-[#FDFBF7] border border-[#E5D7BC] rounded-2xl p-6 hover:border-[#C5A059] transition-all shadow-xs hover:shadow-md group">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h4 className="text-lg md:text-xl font-serif font-bold text-[#2A2218] group-hover:text-[#7A5B21] transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-[10px] uppercase tracking-wider font-sans font-bold text-[#8A6621]">
                    {item.isChurch ? 'Morning Ceremony' : 'Afternoon Reception'}
                  </span>
                </div>

                {/* Time & Duration Line */}
                <div className="inline-flex items-center gap-2 text-[#574C3F] text-xs font-sans font-semibold mt-0.5 tabular-nums">
                  <Clock className="w-3.5 h-3.5 text-[#B89347]" />
                  <span>{item.time}</span>
                  <span className="text-[#C5A059]" aria-hidden="true">·</span>
                  <span className="text-[#6B5E4E] font-normal text-[11px]">{item.duration}</span>
                </div>

                {item.description && (
                  <p className="text-[#4A3F32] font-serif text-sm md:text-base mt-3 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing card */}
        <div className="mt-16 text-center bg-[#FAF5EB] border border-[#D8C39A] p-6 rounded-2xl max-w-xl mx-auto shadow-xs">
          <p className="font-serif text-[#7A5B21] italic text-base font-semibold">
            “We look forward to celebrating this joyous occasion with you as we say ‘I Do’”
          </p>
        </div>
      </div>
    </section>
  );
}
