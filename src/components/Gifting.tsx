import React, { useState } from 'react';
import { Gift, Copy, Check, Heart, Smartphone, Mail, Package } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

export default function Gifting() {
  const [copiedTill, setCopiedTill] = useState(false);

  const handleCopyTill = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTill(true);
    setTimeout(() => setCopiedTill(false), 2000);
  };

  return (
    <section className="relative py-24 bg-[#FFFFFF] text-[#2A2218]" id="gifting-section">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/[0.08] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#8A6621] text-xs font-semibold tracking-widest uppercase font-sans">
            Love &amp; Support
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-[#2A2218] mt-2 mb-4">Gifting Options</h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto" />
        </div>

        {/* Registry Message Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Narrative card */}
          <div className="md:col-span-7 flex flex-col justify-between bg-[#FDFBF7] border border-[#D8C39A] p-8 rounded-3xl shadow-md">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FAF5EB] to-[#F3E7CE] flex items-center justify-center text-[#8A6621] mb-4 border border-[#D4AF37]/50">
                <Gift className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-2xl text-[#2A2218] font-medium">Love &amp; Blessings</h3>

              <div className="text-[#4A3F32] text-sm md:text-base leading-relaxed space-y-4 font-serif">
                <p className="italic text-lg text-[#2A2218]">
                  “{WEDDING_DETAILS.registry.message}”
                </p>

                <div className="pt-3 space-y-3 text-[#574C3F] text-sm">
                  <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-[#E5D7BC]">
                    <Package className="w-5 h-5 text-[#8A6621] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-[#7A5B21]">
                        1. Physical Gifts
                      </h5>
                      <p className="font-serif text-xs text-[#574C3F] mt-0.5">
                        {WEDDING_DETAILS.registry.physicalGiftNote}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-[#E5D7BC]">
                    <Mail className="w-5 h-5 text-[#8A6621] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-[#7A5B21]">
                        2. Envelope Blessing
                      </h5>
                      <p className="font-serif text-xs text-[#574C3F] mt-0.5">
                        {WEDDING_DETAILS.registry.envelopeNote}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-[#E5D7BC]">
                    <Smartphone className="w-5 h-5 text-[#8A6621] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-[#7A5B21]">
                        3. M-Pesa Buy Goods (Till Number)
                      </h5>
                      <p className="font-serif text-xs text-[#574C3F] mt-0.5">
                        For friends and family wishing to send digital gifts directly via M-Pesa Till Number.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E5D7BC] flex items-center gap-3">
              <Heart className="w-4 h-4 text-[#8A6621] fill-[#D4AF37]/50" />
              <span className="text-xs text-[#574C3F] font-sans tracking-wider uppercase font-semibold">
                Thank you for your love, generosity, and prayers!
              </span>
            </div>
          </div>

          {/* M-PESA Till Number Card */}
          <div className="md:col-span-5 bg-gradient-to-br from-white via-[#FDFBF7] to-[#FAF5EB] border border-[#D4AF37]/70 p-6 sm:p-8 rounded-3xl shadow-md flex flex-col justify-between items-center text-center relative overflow-hidden">
            <div className="w-full flex flex-col items-center">
              <span className="inline-flex items-center gap-2 text-green-800 text-[10px] uppercase font-sans font-bold tracking-widest mb-4">
                <Smartphone className="w-3.5 h-3.5" />
                <span>LIPA NA M-PESA · BUY GOODS</span>
              </span>

              <h4 className="font-serif text-xl text-[#2A2218] mb-1 font-medium">DIGITAL GIFT</h4>
              <p className="text-[#6B5E4E] text-xs font-sans mb-6 font-medium">
                Buy Goods &amp; Services
              </p>

              {/* Key-Value Display Blocks */}
              <div className="w-full space-y-3 mb-5">
                {/* M-Pesa Till Number Block with Copy Button */}
                <div className="bg-white border border-[#D8C39A] rounded-2xl p-3.5 flex items-center justify-between shadow-xs">
                  <div className="text-left">
                    <p className="text-[10px] text-[#6B5E4E] uppercase font-sans font-bold tracking-wider">Till Number</p>
                    <p className="text-2xl font-mono font-bold text-[#7A5B21] tracking-wide tabular-nums">
                      {WEDDING_DETAILS.registry.tillNumber}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyTill(WEDDING_DETAILS.registry.tillNumber)}
                    className={`p-2 sm:p-2.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
                      copiedTill
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-bold'
                        : 'bg-[#FAF5EB] border-[#D8C39A] text-[#7A5B21] hover:bg-[#8A6621] hover:text-white'
                    }`}
                    title="Copy Till Number"
                  >
                    {copiedTill ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span className="text-xs">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-xs">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Account Name Block */}
                <div className="bg-white border border-[#D8C39A] rounded-2xl p-3.5 text-left shadow-xs">
                  <p className="text-[10px] text-[#6B5E4E] uppercase font-sans font-bold tracking-wider">Till Name</p>
                  <p className="text-lg sm:text-xl font-serif font-bold text-[#2A2218] mt-0.5">
                    {WEDDING_DETAILS.registry.accountName}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Steps Guide */}
            <div className="w-full bg-white border border-[#E5D7BC] rounded-xl p-3.5 text-left">
              <p className="text-[10px] uppercase font-sans font-bold text-[#7A5B21] tracking-wider mb-1.5">
                Quick Payment Steps
              </p>
              <ol className="text-[11px] text-[#4A3F32] font-sans space-y-1 list-decimal list-inside">
                <li>M-Pesa &gt; Lipa na M-Pesa &gt; Buy Goods</li>
                <li>
                  Enter Till No: <strong className="text-[#2A2218] font-mono tabular-nums">{WEDDING_DETAILS.registry.tillNumber}</strong>
                </li>
                <li>Enter Amount &amp; PIN</li>
                <li>
                  Confirm name: <strong className="text-[#2A2218]">{WEDDING_DETAILS.registry.accountName}</strong>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
