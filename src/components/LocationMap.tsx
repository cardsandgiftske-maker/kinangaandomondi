import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Compass, ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

import ceremonyVenueImg from '../assets/images/monarch_gardens_ceremony_1795259251766.jpg';
import receptionVenueImg from '../assets/images/monarch_gardens_reception_1795259251084.jpg';

export default function LocationMap() {
  const [activeVenue, setActiveVenue] = useState<'ceremony' | 'reception'>('ceremony');

  const venueInfo = activeVenue === 'ceremony' ? WEDDING_DETAILS.ceremony : WEDDING_DETAILS.reception;

  const getNavigationUrl = () => {
    const query = encodeURIComponent('Monarch Gardens Mosocho Kisii County');
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  return (
    <section
      className="relative py-20 md:py-28 bg-[#FAF5EB] text-[#2C251D] border-t border-[#E6D2A2]"
      id="maps-section"
    >
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[#7A5A1F] text-xs font-bold tracking-widest uppercase font-sans mb-2">
            Ceremony &amp; Reception
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-[#2C251D] font-semibold mb-3 text-balance">
            When &amp; Where
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#B58E43] to-transparent mx-auto" />
          <p className="text-[#574D41] text-base mt-3 max-w-xl mx-auto italic font-serif">
            Both our wedding ceremony and reception will be held at Monarch Gardens, Mosocho in Kisii County.
          </p>
        </div>

        {/* Date, Times, Venue Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto bg-white border border-[#D4B475] p-6 rounded-3xl shadow-sm mb-12 text-[#2C251D]">
          {/* Date */}
          <div className="flex flex-col items-center text-center p-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF5EB] border border-[#E6D2A2] text-[#7A5A1F] flex items-center justify-center mb-2">
              <Calendar className="w-5 h-5" />
            </div>
            <p className="text-[11px] text-[#85796B] uppercase tracking-widest font-sans font-bold mb-1">
              The Date
            </p>
            <p className="text-base text-[#2C251D] font-serif font-bold">
              {WEDDING_DETAILS.dateDisplay}
            </p>
            <p className="text-xs text-[#7A5A1F] font-sans font-semibold mt-0.5 tabular-nums">
              {WEDDING_DETAILS.dateShort}
            </p>
          </div>

          {/* Times */}
          <div className="flex flex-col items-center text-center p-3 border-y sm:border-y-0 sm:border-x border-[#E6D2A2]">
            <div className="w-10 h-10 rounded-full bg-[#FAF5EB] border border-[#E6D2A2] text-[#7A5A1F] flex items-center justify-center mb-2">
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-[11px] text-[#85796B] uppercase tracking-widest font-sans font-bold mb-1">
              The Times
            </p>
            <p className="text-sm text-[#2C251D] font-sans font-semibold tabular-nums">
              Ceremony: <span className="text-[#7A5A1F] font-bold">9:00 AM</span>
            </p>
            <p className="text-sm text-[#2C251D] font-sans font-semibold mt-1 tabular-nums">
              Reception: <span className="text-[#7A5A1F] font-bold">2:00 PM</span>
            </p>
          </div>

          {/* Venue */}
          <div className="flex flex-col items-center text-center p-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF5EB] border border-[#E6D2A2] text-[#7A5A1F] flex items-center justify-center mb-2">
              <MapPin className="w-5 h-5" />
            </div>
            <p className="text-[11px] text-[#85796B] uppercase tracking-widest font-sans font-bold mb-1">
              The Venue
            </p>
            <p className="text-base text-[#2C251D] font-serif font-bold leading-tight">
              Monarch Gardens, Mosocho
            </p>
            <p className="text-xs text-[#574D41] font-sans mt-1">
              Kisii County · Same venue for both
            </p>
          </div>
        </div>

        {/* Interactive Ceremony / Reception View Selector */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white border border-[#D4B475] p-1.5 rounded-full shadow-xs">
            <button
              onClick={() => setActiveVenue('ceremony')}
              className={`px-5 py-2.5 text-xs md:text-sm font-sans font-bold uppercase tracking-wider rounded-full transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 ${
                activeVenue === 'ceremony'
                  ? 'bg-[#B58E43] text-white shadow-xs'
                  : 'text-[#574D41] hover:text-[#2C251D]'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>1. Ceremony · 9:00 AM</span>
            </button>
            <button
              onClick={() => setActiveVenue('reception')}
              className={`px-5 py-2.5 text-xs md:text-sm font-sans font-bold uppercase tracking-wider rounded-full transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 ${
                activeVenue === 'reception'
                  ? 'bg-[#B58E43] text-white shadow-xs'
                  : 'text-[#574D41] hover:text-[#2C251D]'
              }`}
            >
              <Navigation className="w-4 h-4" />
              <span>2. Reception · 2:00 PM</span>
            </button>
          </div>
        </div>

        {/* Info + Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Venue Card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-[#D4B475] rounded-3xl shadow-sm overflow-hidden text-[#2C251D]">
            <div className="relative h-56 w-full overflow-hidden border-b border-[#E6D2A2]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeVenue}
                  src={activeVenue === 'ceremony' ? ceremonyVenueImg : receptionVenueImg}
                  alt={`${venueInfo.venue} — ${activeVenue}`}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
              <div className="space-y-5">
                <p className="text-xs tracking-widest uppercase font-sans font-bold text-[#7A5A1F]">
                  {activeVenue === 'ceremony'
                    ? 'Part I · Morning Ceremony (9:00 AM)'
                    : 'Part II · Afternoon Reception (2:00 PM)'}
                </p>

                <div className="space-y-1.5">
                  <h3 className="font-serif text-2xl lg:text-3xl text-[#2C251D] leading-tight font-bold">
                    {venueInfo.venue}
                  </h3>
                  <p className="text-[#574D41] text-sm font-sans">
                    Same venue for both ceremony and reception
                  </p>
                </div>

                <div className="space-y-3.5 pt-4 border-t border-[#E6D2A2]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#9A742E] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[11px] text-[#85796B] uppercase tracking-widest font-sans font-bold">
                        Location
                      </p>
                      <p className="text-sm text-[#2C251D] leading-normal mt-0.5 font-medium">
                        {venueInfo.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#9A742E] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[11px] text-[#85796B] uppercase tracking-widest font-sans font-bold">
                        Start Time
                      </p>
                      <p className="text-sm text-[#2C251D] mt-0.5 font-bold tabular-nums">
                        {activeVenue === 'ceremony'
                          ? '9:00 AM (Guests seated by 8:45 AM)'
                          : '2:00 PM onwards'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-[#E6D2A2]">
                <a
                  href={getNavigationUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#B58E43] hover:bg-[#9A742E] font-sans font-bold uppercase tracking-wider text-xs text-white rounded-2xl transition-colors shadow-xs group cursor-pointer"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Map */}
          <div className="lg:col-span-7 bg-white border border-[#D4B475] rounded-3xl overflow-hidden min-h-[380px] lg:min-h-auto flex shadow-sm relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVenue}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.4 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full min-h-[380px] flex"
              >
                <iframe
                  title={`Map of ${venueInfo.venue}`}
                  src={venueInfo.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  className="w-full min-h-[400px] border-0"
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
