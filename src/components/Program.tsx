import React, { useState } from 'react';
import { Clock, MapPin } from 'lucide-react';
import { PROGRAM_ITEMS } from '../data';

export default function Program() {
  const [filter, setFilter] = useState<'all' | 'ceremony' | 'reception'>('all');

  const filteredItems = PROGRAM_ITEMS.filter((item) => {
    if (filter === 'ceremony') return item.isChurch;
    if (filter === 'reception') return !item.isChurch;
    return true;
  });

  return (
    <section
      className="relative py-20 md:py-28 bg-white text-[#2C251D] border-t border-[#E6D2A2]"
      id="program-section"
    >
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#7A5A1F] text-xs font-bold tracking-widest uppercase font-sans mb-2">
            Order of Events · 04.12.2026
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-[#2C251D] font-semibold mb-3 text-balance">
            Wedding Program
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#B58E43] to-transparent mx-auto" />
          <p className="text-[#574D41] text-base font-serif italic max-w-xl mx-auto mt-3">
            A full day of prayer, celebration, and fellowship at Monarch Gardens, Mosocho, Kisii County.
          </p>
        </div>

        {/* Interactive Schedule Filter */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-[#FAF5EB] border border-[#D4B475] p-1 rounded-full">
            {[
              { key: 'all', label: 'Full Day' },
              { key: 'ceremony', label: 'Ceremony · 9:00 AM' },
              { key: 'reception', label: 'Reception · 2:00 PM' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as 'all' | 'ceremony' | 'reception')}
                className={`px-4 py-2 text-xs font-sans font-bold uppercase tracking-wider rounded-full transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  filter === tab.key
                    ? 'bg-[#B58E43] text-white shadow-xs'
                    : 'text-[#574D41] hover:text-[#2C251D]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Program Timeline */}
        <div className="space-y-4">
          {filteredItems.map((item, idx) => (
            <div
              key={`${item.time}-${idx}`}
              className="bg-[#FDFBF7] border border-[#E6D2A2] rounded-2xl p-6 md:p-7 flex flex-col md:flex-row gap-4 md:gap-8 transition-colors hover:border-[#B58E43]"
            >
              {/* Time Column */}
              <div className="md:w-52 shrink-0">
                <div className="flex items-center gap-2 text-[#7A5A1F] font-sans font-bold text-sm tabular-nums">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{item.time}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#574D41] font-sans mt-1.5">
                  <span>{item.isChurch ? 'Morning Ceremony' : 'Garden & Reception'}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{item.duration}</span>
                </div>
              </div>

              {/* Event Details */}
              <div className="flex-1 md:border-l md:border-[#E6D2A2] md:pl-8">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-[#2C251D]">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-[#574D41] font-sans mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                )}

                {item.bullets && item.bullets.length > 0 && (
                  <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-[#2C251D] font-sans">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B58E43] shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#7A5A1F] font-sans font-medium">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>Monarch Gardens, Mosocho</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
