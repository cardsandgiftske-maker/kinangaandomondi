import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Sparkles, Clock } from 'lucide-react';
import { WEDDING_DATE } from '../data';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export default function Countdown() {
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
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPassed: false,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days, color: 'text-[#7A5B21]' },
    { label: 'Hours', value: timeLeft.hours, color: 'text-[#B89347]' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'text-[#7A5B21]' },
    { label: 'Seconds', value: timeLeft.seconds, color: 'text-[#B89347]' },
  ];

  return (
    <section
      id="countdown-section"
      className="relative py-16 sm:py-20 bg-gradient-to-b from-[#FAF5EB] via-[#FFFFFF] to-[#FAF5EB] text-[#2A2218] border-y border-[#E5D7BC] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-[#8A6621] mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Counting Down The Moments</span>
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2A2218] mb-3"
        >
          Until We Say <span className="italic font-normal text-[#A68038]">“I Do”</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#574C3F] font-serif italic text-sm sm:text-base max-w-lg mx-auto mb-10"
        >
          Join us as we count down each precious moment leading to our celebration in Kisii County.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-6 max-w-3xl mx-auto mb-10"
        >
          {timeBlocks.map((block) => (
            <div
              key={block.label}
              className="relative group bg-gradient-to-b from-white via-[#FDFBF7] to-[#FAF5EB] border border-[#D4AF37]/75 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_8px_25px_rgba(197,160,89,0.12)] hover:shadow-[0_12px_30px_rgba(197,160,89,0.2)] hover:border-[#B89347] transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#D4AF37]/20 to-transparent rounded-tr-2xl pointer-events-none" />

              <span className={`block text-3xl sm:text-4xl md:text-5xl font-serif font-bold ${block.color} tracking-tight tabular-nums`}>
                {String(block.value).padStart(2, '0')}
              </span>

              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-2 opacity-80" />

              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#6B4E18] font-sans font-extrabold">
                {block.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-6 py-2.5 rounded-full bg-white border border-[#D8C39A] shadow-xs text-xs sm:text-sm font-sans"
        >
          <div className="flex items-center gap-2 text-[#7A5B21] font-bold">
            <Calendar className="w-4 h-4 text-[#C5A059]" />
            <span>Friday, 4th December 2026</span>
          </div>
          <span className="text-[#C5A059] hidden sm:inline" aria-hidden="true">·</span>
          <div className="flex items-center gap-1.5 text-[#574C3F] font-medium">
            <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Ceremony 9:00 AM · Reception 2:00 PM EAT</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
