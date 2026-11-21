import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  CheckCircle2,
  AlertCircle,
  User,
  Phone,
  Check,
  Heart,
  MessageSquare,
  ArrowLeft,
} from 'lucide-react';
import { RsvpGuest } from '../types';
import { saveRsvp } from '../lib/firebase';
import { WEDDING_DETAILS } from '../data';
import Crest from './Crest';

export default function RsvpForm() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [willAttend, setWillAttend] = useState<'yes' | 'no'>('yes');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [submittedGuest, setSubmittedGuest] = useState<RsvpGuest | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [showFloatingBtn, setShowFloatingBtn] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const rsvpSection = document.getElementById('rsvp-section');
      if (rsvpSection) {
        const rect = rsvpSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setShowFloatingBtn(false);
        } else {
          setShowFloatingBtn(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generateInvitationCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'SC-26-';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMessage('Please enter your phone number.');
      return;
    }

    setLoading(true);

    try {
      const cleanNotes = notes.trim();
      const newGuest: RsvpGuest = {
        id: 'rsvp-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        willAttend,
        adultsCount: willAttend === 'yes' ? 1 : 0,
        childrenCount: 0,
        submittedAt: new Date().toISOString(),
        eCardCode: generateInvitationCode(),
        ...(cleanNotes ? { notes: cleanNotes } : {}),
      };

      const response = await saveRsvp(newGuest);

      setSubmittedGuest(response?.rsvp || newGuest);
      setLoading(false);

      setFullName('');
      setPhoneNumber('');
      setWillAttend('yes');
      setNotes('');
    } catch (err: any) {
      console.error('RSVP submission failure:', err);
      setErrorMessage(
        err instanceof Error && err.message
          ? err.message
          : 'Unable to submit your RSVP at this time. Please check your network connection and try again.'
      );
      setLoading(false);
    }
  };

  const scrollToRsvp = () => {
    const element = document.getElementById('rsvp-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section
        className="relative py-20 bg-white text-[#2C251D] border-t border-[#E6D2A2]"
        id="rsvp-section"
      >
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-10">
            <p className="text-[#7A5A1F] text-xs font-bold tracking-widest uppercase font-sans mb-2">
              Kindly Reply
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-[#2C251D] font-semibold mb-3 text-balance">
              Confirm Attendance
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#B58E43] to-transparent mx-auto" />
            <p className="text-[#574D41] text-base mt-3 max-w-lg mx-auto italic font-serif">
              Please confirm your attendance for {WEDDING_DETAILS.dateDisplay} at Monarch Gardens, Mosocho.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {submittedGuest ? (
              <motion.div
                key="rsvp-submitted-success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="bg-[#FDFBF7] border border-[#D4B475] p-8 md:p-12 rounded-3xl shadow-sm text-center text-[#2C251D] relative overflow-hidden max-w-2xl mx-auto"
              >
                <div className="mb-4">
                  <Crest size="sm" animated={false} />
                </div>

                <div className="w-12 h-12 bg-white border border-[#D4B475] text-[#7A5A1F] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <p className="text-xs uppercase font-sans font-bold tracking-[0.22em] text-[#7A5A1F] mb-1">
                  Confirmation Received
                </p>

                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#2C251D] mb-4">
                  RSVP Submitted Successfully
                </h3>

                <div className="w-16 h-px bg-[#D4B475] mx-auto mb-6" />

                {submittedGuest.willAttend === 'yes' ? (
                  <div className="space-y-3 font-serif">
                    <p className="text-lg text-[#574D41]">
                      Thank you for confirming,{' '}
                      <span className="font-semibold text-[#2C251D]">{submittedGuest.fullName}</span>.
                    </p>
                    <p className="text-xl md:text-2xl text-[#7A5A1F] font-serif italic font-medium">
                      “We look forward to celebrating this blessed day with you!”
                    </p>
                    <p className="text-xs font-mono text-[#574D41] pt-2">
                      Reference Code: <strong className="text-[#2C251D]">{submittedGuest.eCardCode}</strong>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 font-serif">
                    <p className="text-lg text-[#574D41]">
                      Thank you for letting us know,{' '}
                      <span className="font-semibold text-[#2C251D]">{submittedGuest.fullName}</span>.
                    </p>
                    <p className="text-lg text-[#574D41] italic">
                      We appreciate your warm wishes and will miss having you with us in person.
                    </p>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-[#E6D2A2] flex flex-col items-center gap-4">
                  <p className="text-xs text-[#574D41] font-sans">
                    {WEDDING_DETAILS.couple.brideFull} &amp; {WEDDING_DETAILS.couple.groomFull} ·{' '}
                    {WEDDING_DETAILS.dateShort}
                  </p>

                  <button
                    onClick={() => setSubmittedGuest(null)}
                    className="text-[#7A5A1F] hover:text-[#2C251D] text-xs font-sans font-bold tracking-wider uppercase flex items-center gap-1.5 cursor-pointer hover:underline transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Submit another response</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="rsvp-input-form"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-[#FDFBF7] border border-[#D4B475] p-6 md:p-10 rounded-3xl shadow-sm relative text-[#2C251D] max-w-2xl mx-auto"
              >
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E6D2A2]">
                  <h3 className="font-serif text-2xl text-[#2C251D] flex items-center gap-2 font-semibold">
                    <Heart className="w-5 h-5 text-[#B58E43] fill-[#E6D2A2]" />
                    <span>RSVP Response Form</span>
                  </h3>
                  <span className="text-xs font-sans font-medium text-[#7A5A1F] tabular-nums">
                    {WEDDING_DETAILS.dateShort}
                  </span>
                </div>

                {/* Guest Note */}
                <div className="bg-white border border-[#E6D2A2] rounded-2xl p-4 mb-6 text-[#2C251D]">
                  <p className="font-sans font-bold uppercase text-[11px] tracking-widest text-[#7A5A1F] mb-1">
                    A Note To Our Guests
                  </p>
                  <p className="text-sm text-[#574D41] italic font-serif leading-relaxed">
                    “Both the 9:00 AM wedding ceremony and the 2:00 PM reception will take place at Monarch Gardens, Mosocho, Kisii County.”
                  </p>
                </div>

                <form onSubmit={handleRsvpSubmit} className="space-y-5" id="rsvp-wedding-form">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="rsvp-full-name"
                      className="text-xs uppercase tracking-widest text-[#574D41] font-sans font-bold flex items-center gap-1.5"
                    >
                      <User className="w-3.5 h-3.5 text-[#9A742E]" />
                      <span>Full Name</span>
                    </label>
                    <input
                      id="rsvp-full-name"
                      type="text"
                      required
                      placeholder="e.g. Jane Moraa"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white border border-[#D4B475] focus:border-[#9A742E] focus:ring-2 focus:ring-[#D4B475]/30 rounded-xl px-4 py-3 text-sm text-[#2C251D] outline-none transition-all font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="rsvp-phone"
                      className="text-xs uppercase tracking-widest text-[#574D41] font-sans font-bold flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#9A742E]" />
                      <span>Phone Number</span>
                    </label>
                    <input
                      id="rsvp-phone"
                      type="tel"
                      required
                      placeholder="e.g. +254 700 000 000"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-white border border-[#D4B475] focus:border-[#9A742E] focus:ring-2 focus:ring-[#D4B475]/30 rounded-xl px-4 py-3 text-sm text-[#2C251D] outline-none transition-all font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs uppercase tracking-widest text-[#574D41] font-sans font-bold block">
                      Will you be joining us?
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setWillAttend('yes')}
                        className={`py-3.5 text-xs uppercase tracking-wider font-sans font-bold border rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                          willAttend === 'yes'
                            ? 'bg-[#B58E43] border-[#9A742E] text-white shadow-xs'
                            : 'bg-white border-[#D4B475] text-[#574D41] hover:text-[#2C251D]'
                        }`}
                      >
                        <Check className="w-4 h-4 shrink-0" />
                        <span>Joyfully Accepts</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setWillAttend('no')}
                        className={`py-3.5 text-xs uppercase tracking-wider font-sans font-bold border rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                          willAttend === 'no'
                            ? 'bg-[#2C251D] border-[#2C251D] text-white shadow-xs'
                            : 'bg-white border-[#D4B475] text-[#574D41] hover:text-[#2C251D]'
                        }`}
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>Regretfully Declines</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="rsvp-notes"
                      className="text-xs uppercase tracking-widest text-[#574D41] font-sans font-bold flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#9A742E]" />
                      <span>
                        Wishes for the Couple{' '}
                        <span className="text-[11px] text-[#85796B] font-normal">(Optional)</span>
                      </span>
                    </label>
                    <textarea
                      id="rsvp-notes"
                      placeholder="Leave a message or blessing for Sharon & Collins..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="w-full bg-white border border-[#D4B475] focus:border-[#9A742E] focus:ring-2 focus:ring-[#D4B475]/30 rounded-xl px-4 py-3 text-sm text-[#2C251D] outline-none transition-all resize-none font-sans"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-xs text-rose-800">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#B58E43] hover:bg-[#9A742E] active:scale-[0.99] disabled:opacity-50 text-white font-sans font-bold text-xs uppercase tracking-widest rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm mt-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        <span>Submit RSVP</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Floating RSVP Button */}
      <AnimatePresence>
        {showFloatingBtn && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-40 pointer-events-auto"
            id="floating-rsvp-button-wrapper"
          >
            <button
              onClick={scrollToRsvp}
              className="flex items-center gap-2 px-5 py-3 bg-[#B58E43] hover:bg-[#9A742E] text-white font-sans font-bold text-xs uppercase tracking-wider rounded-full shadow-lg active:scale-95 transition-all cursor-pointer border border-[#E6D2A2]"
            >
              <Mail className="w-4 h-4" />
              <span>RSVP Now</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
