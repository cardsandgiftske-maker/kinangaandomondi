import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Compass, ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

import churchVenueImg from '../assets/images/client_venue.jpg';
import receptionVenueImg from '../assets/images/client_venue.jpg';

export default function LocationMap() {
  const [activeVenue, setActiveVenue] = useState<'ceremony' | 'reception'>('ceremony');

  const venueInfo = activeVenue === 'ceremony' ? WEDDING_DETAILS.ceremony : WEDDING_DETAILS.reception;

  const getNavigationUrl = () => {
    const destination = encodeURIComponent('Monarch Gardens, Mosocho, Kisii County, Kenya');
    return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#FAF5EB] via-[#FDFBF7] to-[#FAF5EB] text-[#2A2218]" id="maps-section">
      <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-[#8A6621] text-xs font-bold tracking-widest uppercase font-sans mb-2">
            The Venue &amp; Schedule
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2A2218] mt-1 mb-4">When &amp; Where</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto rounded-full" />
          <p className="text-[#574C3F] text-sm md:text-base mt-4 max-w-xl mx-auto italic font-serif leading-relaxed">
            Both the wedding ceremony and afternoon reception will be held at Monarch Gardens, Mosocho in Kisii County.
          </p>
        </div>

        {/* Date, Location, Time Info Panel (When & Where) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto bg-white/95 border border-[#D8C39A] p-6 sm:p-8 rounded-3xl shadow-[0_16px_40px_rgba(138,102,33,0.08)] mb-12 relative z-10 backdrop-blur-md">
          {/* 1. Date Card */}
          <div className="flex flex-col items-center text-center p-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF5EB] text-[#8A6621] border border-[#D4AF37]/50 flex items-center justify-center mb-3 shadow-xs">
              <Calendar className="w-6 h-6 text-[#8A6621]" />
            </div>
            <p className="text-xs text-[#8A6621] uppercase tracking-widest font-sans font-bold mb-1">The Date</p>
            <p className="text-sm text-[#574C3F] font-serif font-medium">Friday · 04.12.2026</p>
            <p className="text-base text-[#2A2218] font-serif font-bold">December 4, 2026</p>
          </div>

          {/* 2. Schedule Card */}
          <div className="flex flex-col items-center text-center p-3 border-t sm:border-t-0 sm:border-l border-[#E5D7BC]">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF5EB] text-[#8A6621] border border-[#D4AF37]/50 flex items-center justify-center mb-3 shadow-xs">
              <Clock className="w-6 h-6 text-[#8A6621]" />
            </div>
            <p className="text-xs text-[#8A6621] uppercase tracking-widest font-sans font-bold mb-1">Timeline</p>
            <p className="text-xs text-[#2A2218] font-sans font-bold">9:00 AM — Ceremony</p>
            <p className="text-xs text-[#7A5B21] font-sans font-bold mt-1">2:00 PM — Reception</p>
          </div>

          {/* 3. Ceremony Venue Card */}
          <div className="flex flex-col items-center text-center p-3 border-t lg:border-t-0 lg:border-l border-[#E5D7BC]">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF5EB] text-[#8A6621] border border-[#D4AF37]/50 flex items-center justify-center mb-3 shadow-xs">
              <MapPin className="w-6 h-6 text-[#8A6621]" />
            </div>
            <p className="text-xs text-[#8A6621] uppercase tracking-widest font-sans font-bold mb-1">Ceremony Venue</p>
            <p className="text-sm text-[#2A2218] font-serif font-bold leading-snug">Monarch Gardens</p>
            <p className="text-[11px] text-[#574C3F] font-sans mt-0.5">Mosocho, Kisii County</p>
          </div>

          {/* 4. Reception Venue Card */}
          <div className="flex flex-col items-center text-center p-3 border-t sm:border-t-0 sm:border-l border-[#E5D7BC]">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF5EB] text-[#8A6621] border border-[#D4AF37]/50 flex items-center justify-center mb-3 shadow-xs">
              <Compass className="w-6 h-6 text-[#8A6621]" />
            </div>
            <p className="text-xs text-[#8A6621] uppercase tracking-widest font-sans font-bold mb-1">Reception Venue</p>
            <p className="text-sm text-[#2A2218] font-serif font-bold leading-snug">Monarch Gardens</p>
            <p className="text-[11px] text-[#7A5B21] font-sans font-semibold mt-0.5">Same Venue as Ceremony</p>
          </div>
        </div>

        {/* Location Toggle Selector */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap justify-center bg-white border border-[#D8C39A] p-1.5 rounded-full shadow-sm">
            <button
              onClick={() => setActiveVenue('ceremony')}
              className={`px-5 sm:px-7 py-2.5 text-xs sm:text-sm font-sans font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeVenue === 'ceremony' ? 'bg-[#8A6621] text-white shadow-sm' : 'text-[#574C3F] hover:text-[#2A2218]'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>1. Ceremony (9:00 AM)</span>
            </button>
            <button
              onClick={() => setActiveVenue('reception')}
              className={`px-5 sm:px-7 py-2.5 text-xs sm:text-sm font-sans font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeVenue === 'reception' ? 'bg-[#8A6621] text-white shadow-sm' : 'text-[#574C3F] hover:text-[#2A2218]'
              }`}
            >
              <Navigation className="w-4 h-4" />
              <span>2. Reception (2:00 PM)</span>
            </button>
          </div>
        </div>

        {/* Info + Map Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Venue Details Card */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-white border border-[#D8C39A] rounded-3xl shadow-lg relative overflow-hidden text-[#2A2218]">
            {/* Venue Photo header */}
            <div className="relative h-52 w-full overflow-hidden border-b border-[#E5D7BC]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeVenue}
                  src={activeVenue === 'ceremony' ? churchVenueImg : receptionVenueImg}
                  alt={venueInfo.venue}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-3 left-4 text-xs text-white font-sans font-bold px-3 py-1 bg-black/55 backdrop-blur-sm rounded-full border border-[#D4AF37]/40">
                {activeVenue === 'ceremony' ? 'Morning Ceremony · 9:00 AM' : 'Garden Reception · 2:00 PM'}
              </span>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
              <div className="space-y-6 z-10">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-2xl lg:text-3xl text-[#2A2218] leading-tight font-bold">
                    {venueInfo.venue}
                  </h3>
                  <p className="text-[#8A6621] text-xs tracking-wider uppercase font-sans font-bold">
                    {activeVenue === 'ceremony' ? 'Holy Matrimony Service' : 'Reception & Wedding Banquet (Same Venue)'}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#E5D7BC]">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF5EB] border border-[#D4AF37]/50 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-[#8A6621]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#6B5E4E] uppercase tracking-widest font-sans font-bold">Location</p>
                      <p className="text-sm text-[#2A2218] leading-normal mt-0.5 font-medium">{venueInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF5EB] border border-[#D4AF37]/50 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-[#8A6621]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#6B5E4E] uppercase tracking-widest font-sans font-bold">Time</p>
                      <p className="text-sm text-[#2A2218] mt-0.5 font-medium">
                        {activeVenue === 'ceremony'
                          ? '9:00 AM (Same venue as reception)'
                          : '2:00 PM onwards (Monarch Gardens, Mosocho)'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Driving navigation CTA button */}
              <div className="mt-8 pt-6 border-t border-[#E5D7BC] z-10">
                <a
                  href={getNavigationUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#8A6621] to-[#6B4E18] hover:from-[#6B4E18] hover:to-[#8A6621] font-sans font-bold uppercase tracking-wider text-xs text-white rounded-2xl transition-all shadow-md hover:shadow-lg group active:scale-[0.98]"
                >
                  <span>Navigate on Google Maps</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Map Iframe */}
          <div className="lg:col-span-8 bg-white border border-[#D8C39A] rounded-3xl overflow-hidden min-h-[380px] lg:min-h-auto flex shadow-lg relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVenue}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full min-h-[380px] flex"
              >
                <iframe
                  title={`Map of ${venueInfo.venue}`}
                  src={venueInfo.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  className="w-full min-h-[420px] border-0"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
