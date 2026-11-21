import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { WEDDING_DATE, WEDDING_DETAILS } from '../data';
import Crest from './Crest';
import couplePortraitImg from '../assets/images/sharon_collins_couple_1795259250565.jpg';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = WEDDING_DATE.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPassed: false,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white text-[#2C251D] py-16 md:py-24 border-b border-[#E6D2A2]/60"
      id="hero-section"
    >
      {/* Subtle Champagne Gold Wash */}
      <div className="absolute inset-0 z-0 opacity-65 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FAF5EB] via-white to-[#FDFBF7]" />

      {/* Delicate Champagne Grid Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.14]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="champagne-grid-hero" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.2" fill="#C8A45D" />
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E6D2A2" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#champagne-grid-hero)" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4 max-w-4xl flex flex-col items-center text-center">
        {/* Top Announcement & Families */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center justify-center gap-2 mb-4"
        >
          <div className="flex items-center gap-3">
            <span className="w-12 h-px bg-gradient-to-r from-transparent via-[#C8A45D] to-transparent" />
            <span className="text-[#7A5A1F] text-xs tracking-[0.22em] font-sans font-semibold uppercase">
              Together With Our Families
            </span>
            <span className="w-12 h-px bg-gradient-to-r from-transparent via-[#C8A45D] to-transparent" />
          </div>

          <div className="text-[#2C251D] font-serif text-xl md:text-2xl font-semibold tracking-wide mt-1 space-x-2">
            <span>{WEDDING_DETAILS.parents.brideParents}</span>
            <span className="text-[#B58E43] font-sans text-sm font-bold">&amp;</span>
            <span>{WEDDING_DETAILS.parents.groomParents}</span>
          </div>

          <p className="text-[#574D41] text-sm font-serif italic mt-1 max-w-lg">
            joyfully invite you to witness and celebrate the wedding of their children
          </p>
        </motion.div>

        {/* Monogram Crest */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="my-3 md:my-4 flex items-center justify-center"
        >
          <Crest size="lg" animated={true} />
        </motion.div>

        {/* Couple Portrait in Champagne Gold & White Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="relative w-full max-w-md md:max-w-xl mx-auto my-6 group"
        >
          <div className="relative rounded-[28px] p-3 bg-white border border-[#D4B475] shadow-[0_24px_55px_-16px_rgba(122,90,31,0.18)] overflow-hidden">
            {/* Inner Gold Hairline Frame */}
            <div className="absolute inset-2 border border-[#E6D2A2] rounded-[22px] pointer-events-none z-10" />

            {/* Corner Filigree Accents */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#B58E43] z-20" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#B58E43] z-20" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#B58E43] z-20" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#B58E43] z-20" />

            <div className="relative rounded-[18px] overflow-hidden bg-[#FAF5EB] aspect-[4/3] md:aspect-[16/10] flex items-center justify-center">
              <img
                src={couplePortraitImg}
                alt="Sharon Kinanga Ogari and Collins Omondi Obat"
                className="w-full h-full object-cover object-top transform group-hover:scale-[1.02] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 via-black/20 to-transparent pointer-events-none" />
              <p className="absolute bottom-3 inset-x-4 text-center text-white text-xs font-sans font-medium tracking-widest uppercase">
                Sharon &amp; Collins · 04.12.2026
              </p>
            </div>
          </div>
        </motion.div>

        {/* Couple Full Names */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.4 }}
          className="text-center my-4"
        >
          <h1
            className="font-serif tracking-tight text-[#2C251D] flex flex-col items-center justify-center gap-1 font-normal text-balance"
            style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)', lineHeight: 1.12 }}
          >
            <span className="font-serif italic text-[#2C251D]">
              {WEDDING_DETAILS.couple.brideFull}
            </span>
            <span className="text-[#B58E43] font-serif italic text-2xl md:text-4xl font-light my-0.5">
              &amp;
            </span>
            <span className="font-serif italic text-[#2C251D]">
              {WEDDING_DETAILS.couple.groomFull}
            </span>
          </h1>
        </motion.div>

        {/* Date, Time & Venue Summary Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.55 }}
          className="w-full max-w-3xl bg-[#FDFBF7] border border-[#D4B475] rounded-2xl p-6 my-6 shadow-md relative overflow-hidden text-[#2C251D]"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            {/* Date */}
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white border border-[#D4B475] flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-[#9A742E]" />
              </div>
              <div>
                <p className="text-[11px] text-[#7A5A1F] uppercase font-sans font-bold tracking-widest">
                  Wedding Date
                </p>
                <p className="font-serif text-[#2C251D] text-lg font-bold tabular-nums">
                  {WEDDING_DETAILS.dateDisplay}
                </p>
                <p className="text-xs text-[#574D41] font-sans tabular-nums">
                  {WEDDING_DETAILS.dateShort}
                </p>
              </div>
            </div>

            {/* Times */}
            <div className="flex flex-col md:flex-row items-center gap-3 md:border-x md:border-[#E6D2A2] md:px-5">
              <div className="w-10 h-10 rounded-full bg-white border border-[#D4B475] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-[#9A742E]" />
              </div>
              <div>
                <p className="text-[11px] text-[#7A5A1F] uppercase font-sans font-bold tracking-widest">
                  Schedule
                </p>
                <p className="font-serif text-[#2C251D] text-base font-bold tabular-nums">
                  Ceremony: {WEDDING_DETAILS.ceremony.time}
                </p>
                <p className="font-serif text-[#574D41] text-base font-semibold tabular-nums">
                  Reception: {WEDDING_DETAILS.reception.time}
                </p>
              </div>
            </div>

            {/* Venue */}
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white border border-[#D4B475] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-[#9A742E]" />
              </div>
              <div>
                <p className="text-[11px] text-[#7A5A1F] uppercase font-sans font-bold tracking-widest">
                  Ceremony &amp; Reception
                </p>
                <p className="font-serif text-[#2C251D] text-lg font-bold leading-snug">
                  {WEDDING_DETAILS.ceremony.venue}
                </p>
                <p className="text-xs text-[#574D41] font-sans">
                  Kisii County, Kenya
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bible Verse */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="max-w-md mx-auto my-4 text-[#574D41] italic font-serif text-base border-y border-[#E6D2A2] py-3"
        >
          <p className="mb-1">“{WEDDING_DETAILS.bibleVerses[0].text}”</p>
          <p className="text-[#7A5A1F] text-xs tracking-widest font-sans font-bold uppercase not-italic">
            {WEDDING_DETAILS.bibleVerses[0].reference}
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.75 }}
          className="flex flex-col items-center mt-4"
        >
          <span className="text-xs text-[#7A5A1F] uppercase tracking-widest font-sans font-bold mb-3">
            {timeLeft.isPassed ? 'Our Wedding Day Has Arrived' : 'Countdown To 04.12.2026'}
          </span>

          <div className="flex gap-3 md:gap-4 text-center">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Mins', value: timeLeft.minutes },
              { label: 'Secs', value: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col bg-white border border-[#D4B475] rounded-2xl px-4 py-3 min-w-[72px] md:min-w-[92px] shadow-sm"
              >
                <span className="text-2xl md:text-4xl font-serif font-bold text-[#7A5A1F] tabular-nums">
                  {item.value}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#574D41] font-sans font-bold mt-0.5">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
