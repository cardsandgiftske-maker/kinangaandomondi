import React, { useState } from 'react';
import { Gift, Copy, Check } from 'lucide-react';
import { MPESA_DETAILS } from '../data';

export default function Gifting() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section
      className="relative py-20 md:py-28 bg-[#FAF5EB] text-[#2C251D] border-t border-[#E6D2A2]"
      id="gifting-section"
    >
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-[#7A5A1F] text-xs font-bold tracking-widest uppercase font-sans mb-2">
            Love &amp; Blessings
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-[#2C251D] font-semibold mb-3 text-balance">
            Wedding Gifts &amp; Registry
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#B58E43] to-transparent mx-auto" />
          <p className="text-[#574D41] text-base font-serif italic max-w-xl mx-auto mt-3">
            Your presence and prayers on our wedding day mean the world to us. Should you wish to honor us with a gift, you may share your blessing via M-PESA:
          </p>
        </div>

        {/* M-PESA Till Card */}
        <div className="bg-white border border-[#D4B475] p-8 md:p-10 rounded-3xl shadow-sm text-[#2C251D] relative overflow-hidden">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#FAF5EB] text-[#9A742E] flex items-center justify-center border border-[#D4B475]">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#2C251D]">M-PESA Buy Goods (Till)</h3>
              <p className="text-xs font-sans text-[#7A5A1F] font-semibold uppercase tracking-wider">
                {MPESA_DETAILS.method}
              </p>
            </div>
          </div>

          <div className="space-y-4 max-w-md mx-auto">
            {/* Till Number */}
            <div className="flex items-center justify-between p-5 bg-[#FDFBF7] border border-[#D4B475] rounded-2xl">
              <div>
                <span className="text-[11px] text-[#7A5A1F] font-sans uppercase font-bold tracking-widest block">
                  Till Number
                </span>
                <span className="text-2xl md:text-3xl font-mono font-bold text-[#2C251D] tabular-nums tracking-wider">
                  {MPESA_DETAILS.tillNumber}
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(MPESA_DETAILS.tillNumber, 'till')}
                className="px-4 py-2.5 bg-[#B58E43] hover:bg-[#9A742E] text-white rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedField === 'till' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Till</span>
                  </>
                )}
              </button>
            </div>

            {/* Till Account Name */}
            <div className="flex items-center justify-between p-5 bg-[#FDFBF7] border border-[#E6D2A2] rounded-2xl">
              <div>
                <span className="text-[11px] text-[#7A5A1F] font-sans uppercase font-bold tracking-widest block">
                  Till Name
                </span>
                <span className="text-xl font-serif font-bold text-[#2C251D]">
                  {MPESA_DETAILS.tillName}
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(MPESA_DETAILS.tillName, 'name')}
                className="px-3.5 py-2 bg-white hover:bg-[#FAF5EB] border border-[#D4B475] text-[#2C251D] rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedField === 'name' ? (
                  <>
                    <Check className="w-4 h-4 text-[#7A5A1F]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#9A742E]" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E6D2A2] text-center text-sm text-[#574D41] font-serif italic">
            Go to M-PESA · Lipa na M-PESA · Buy Goods &amp; Services · Enter Till No.{' '}
            <strong className="not-italic font-semibold text-[#2C251D] tabular-nums">4663439</strong>{' '}
            ({MPESA_DETAILS.tillName}). Thank you for your love and generosity!
          </div>
        </div>
      </div>
    </section>
  );
}
