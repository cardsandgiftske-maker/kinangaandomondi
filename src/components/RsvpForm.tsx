import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle2, AlertCircle, Sparkles, User, Check, Heart, Utensils, Calendar, MapPin, Lock } from 'lucide-react';
import { RsvpGuest } from '../types';
import { saveRsvp, isFirebaseConfigured } from '../lib/firebase';

const LOCAL_USER_RSVP_KEY = 'kinanga_omondi_user_rsvp';

export default function RsvpForm() {
  const [fullName, setFullName] = useState('');
  const [dietaryRequirements, setDietaryRequirements] = useState('');
  const [willAttend, setWillAttend] = useState<'yes' | 'no'>('yes');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [submittedGuest, setSubmittedGuest] = useState<RsvpGuest | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [showFloatingBtn, setShowFloatingBtn] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_USER_RSVP_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.fullName) {
          setSubmittedGuest(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

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

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedName = fullName.trim();

    if (!trimmedName) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    setLoading(true);

    try {
      const newGuest: RsvpGuest = {
        id: 'rsvp-' + Date.now(),
        fullName: trimmedName,
        phoneNumber: '',
        willAttend,
        adultsCount: willAttend === 'yes' ? 1 : 0,
        dietaryRequirements: dietaryRequirements.trim() || 'None',
        notes: notes.trim() || '',
        submittedAt: new Date().toISOString(),
      };

      await saveRsvp(newGuest);

      try {
        localStorage.setItem(LOCAL_USER_RSVP_KEY, JSON.stringify(newGuest));
      } catch {
        // ignore
      }

      setSubmittedGuest(newGuest);
      setLoading(false);

      setFullName('');
      setDietaryRequirements('');
      setWillAttend('yes');
      setNotes('');

      window.dispatchEvent(new Event('rsvp_database_updated'));
    } catch (err) {
      console.error('Error in RSVP submission:', err);
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong saving your RSVP. Please try again.');
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
      <section className="relative py-24 bg-[#FFFFFF] text-[#2A2218]" id="rsvp-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-[#8A6621] text-xs font-bold tracking-widest uppercase font-sans mb-2">
              Celebration Attendance
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2A2218] mt-1 mb-4">Confirm Attendance</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto rounded-full" />
            <p className="text-[#574C3F] text-sm md:text-base mt-4 max-w-xl mx-auto italic font-serif leading-relaxed">
              Kindly RSVP by <span className="font-bold text-[#7A5B21] not-italic font-sans">30th November 2026</span> to help us prepare for your presence. Thank you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            {/* Form Column */}
            <div className="md:col-span-6 bg-[#FDFBF7] border border-[#D8C39A] p-6 sm:p-8 rounded-3xl shadow-lg">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#E5D7BC]">
                <h3 className="font-serif text-xl text-[#2A2218] flex items-center gap-2 font-bold">
                  <Mail className="w-5 h-5 text-[#8A6621]" />
                  <span>RSVP Form</span>
                </h3>
                {isFirebaseConfigured ? (
                  <span className="text-[10px] text-[#7A5B21] font-sans font-bold uppercase tracking-wider">
                    Cloud Synced
                  </span>
                ) : (
                  <span className="text-[10px] text-[#6B5E4E] font-sans font-bold uppercase tracking-wider">
                    Setup Required
                  </span>
                )}
              </div>

              {submittedGuest ? (
                <div className="py-6 px-4 bg-white border border-[#D8C39A] rounded-2xl text-center space-y-4">
                  <div className="w-12 h-12 bg-[#FAF5EB] border border-[#D4AF37]/60 rounded-full flex items-center justify-center mx-auto text-[#8A6621] shadow-xs">
                    <Lock className="w-5 h-5 text-[#8A6621]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#2A2218]">
                      Attendance Already Confirmed
                    </h4>
                    <p className="text-xs text-[#574C3F] font-sans mt-1.5 leading-relaxed max-w-sm mx-auto">
                      An RSVP has already been submitted for <span className="font-bold text-[#2A2218]">{submittedGuest.fullName}</span>.
                    </p>
                  </div>
                  <div className="p-3 bg-[#FAF5EB] border border-[#E5D7BC] rounded-xl text-[11px] text-[#574C3F] font-sans">
                    Your response has been recorded through this invitation. Please review your details carefully before submitting.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-4" id="rsvp-wedding-form">
                  {/* 1. Full Names input */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest text-[#6B4E18] font-sans font-bold flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#8A6621]" />
                      <span>Full Names <span className="text-[#8A6621]">*</span></span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Grace Moraa & Brian Otieno"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white border border-[#D8C39A] focus:border-[#8A6621] focus:ring-2 focus:ring-[#D4AF37]/20 rounded-xl px-4 py-3 text-sm text-[#2A2218] outline-none transition-all font-medium"
                    />
                    <p className="text-[11px] text-[#6B5E4E] font-sans">
                      Please enter the full name(s) of guest(s) attending.
                    </p>
                  </div>

                  {/* Attendance toggle */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs uppercase tracking-widest text-[#6B4E18] font-sans font-bold block">
                      Will you attend?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setWillAttend('yes')}
                        className={`py-2.5 px-3 text-xs uppercase tracking-wider font-sans font-bold border rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          willAttend === 'yes'
                            ? 'bg-[#8A6621] border-[#8A6621] text-white shadow-sm'
                            : 'bg-white border-[#D8C39A] text-[#574C3F] hover:border-[#8A6621]'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 shrink-0" />
                        <span>Yes, attending</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setWillAttend('no')}
                        className={`py-2.5 px-3 text-xs uppercase tracking-wider font-sans font-bold border rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          willAttend === 'no'
                            ? 'bg-rose-50 border-rose-400 text-rose-800 shadow-xs'
                            : 'bg-white border-[#D8C39A] text-[#6B5E4E] hover:text-[#2A2218]'
                        }`}
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Decline</span>
                      </button>
                    </div>
                  </div>

                  {/* 3. Dietary requirements */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs uppercase tracking-widest text-[#6B4E18] font-sans font-bold flex items-center gap-1">
                      <Utensils className="w-3.5 h-3.5 text-[#8A6621]" />
                      <span>Any dietary requirements or allergies</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Vegetarian, Gluten-free, Nut allergy, None"
                      value={dietaryRequirements}
                      onChange={(e) => setDietaryRequirements(e.target.value)}
                      className="w-full bg-white border border-[#D8C39A] focus:border-[#8A6621] focus:ring-2 focus:ring-[#D4AF37]/20 rounded-xl px-4 py-3 text-sm text-[#2A2218] outline-none transition-all font-medium"
                    />
                  </div>

                  {/* Optional Message / Wishes */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs uppercase tracking-widest text-[#574C3F] font-sans font-bold block">
                      Warm Wishes for the Couple (Optional)
                    </label>
                    <textarea
                      placeholder="Leave a sweet congratulatory message for Kinanga & Omondi..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      className="w-full bg-white border border-[#D8C39A] focus:border-[#8A6621] focus:ring-2 focus:ring-[#D4AF37]/20 rounded-xl px-4 py-2.5 text-sm text-[#2A2218] outline-none transition-all resize-none font-medium"
                    />
                  </div>

                  {/* Errors display */}
                  {errorMessage && (
                    <div className="p-3.5 bg-rose-50 border border-rose-300 rounded-xl flex items-start gap-2.5 text-xs text-rose-800 font-semibold leading-relaxed">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 mt-2 bg-gradient-to-r from-[#8A6621] via-[#7A5B21] to-[#8A6621] hover:from-[#6B4E18] hover:to-[#6B4E18] active:scale-98 disabled:opacity-50 text-white font-sans font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#F5E6C4]" />
                        <span className="tracking-widest">Submit RSVP</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Confirmation / Info Column */}
            <div className="md:col-span-6 flex flex-col items-center">
              <AnimatePresence mode="wait">
                {submittedGuest ? (
                  <motion.div
                    key="success-card-state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-[400px] bg-white border border-[#D8C39A] rounded-3xl p-6 sm:p-8 shadow-lg relative flex flex-col overflow-hidden text-center"
                  >
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#C5A059] via-[#8A6621] to-[#C5A059]" />

                    <div className="flex flex-col items-center mb-4 pb-4 border-b border-[#E5D7BC]">
                      <div className="w-12 h-12 bg-[#FAF5EB] border border-[#D4AF37]/60 text-[#8A6621] rounded-full flex items-center justify-center mb-3 shadow-xs">
                        <CheckCircle2 className="w-6 h-6 text-[#8A6621]" />
                      </div>
                      <h4 className="font-sans font-bold uppercase text-xs tracking-widest text-[#8A6621]">RSVP Received!</h4>
                      <p className="text-sm text-[#2A2218] font-serif mt-1">
                        Thank you, <span className="font-bold text-[#7A5B21]">{submittedGuest.fullName}</span>!
                      </p>
                    </div>

                    <div className="space-y-3 text-left">
                      <div className="bg-[#FAF5EB] border border-[#E5D7BC] rounded-2xl p-4 space-y-2 text-xs">
                        <div className="flex items-center justify-between pb-2 border-b border-[#E5D7BC]">
                          <span className="text-[#6B4E18] font-sans uppercase text-[10px] font-bold">Full Name(s)</span>
                          <span className="font-bold text-[#2A2218]">{submittedGuest.fullName}</span>
                        </div>

                        <div className="flex items-center justify-between pb-2 border-b border-[#E5D7BC]">
                          <span className="text-[#6B4E18] font-sans uppercase text-[10px] font-bold">Attendance</span>
                          <span className="font-bold text-[#7A5B21]">
                            {submittedGuest.willAttend === 'yes' ? 'Attending with pleasure' : 'Regretfully decline'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[#6B4E18] font-sans uppercase text-[10px] font-bold">Dietary / Allergies</span>
                          <span className="font-medium text-[#4A3F32] italic">
                            {submittedGuest.dietaryRequirements || 'None'}
                          </span>
                        </div>
                      </div>

                      {submittedGuest.notes && (
                        <div className="bg-[#FDFBF7] border border-[#E5D7BC] rounded-2xl p-3.5 text-center italic font-serif text-xs text-[#4A3F32]">
                          “{submittedGuest.notes}”
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#E5D7BC] text-center text-xs text-[#574C3F] space-y-2">
                      <p className="font-serif">We look forward to celebrating with you on 4th December 2026!</p>
                      <div className="text-[11px] text-[#6B4E18] font-sans font-medium bg-[#FAF5EB] py-2 px-3 rounded-lg border border-[#E5D7BC]">
                        Your response has been securely recorded through this invitation.
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="standard-info-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full max-w-[400px] bg-white border border-[#D8C39A] shadow-lg rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#FAF5EB] border border-[#D4AF37]/60 flex items-center justify-center text-[#8A6621] shadow-xs">
                      <Heart className="w-7 h-7 text-[#8A6621] fill-[#D4AF37]/25" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-serif text-2xl text-[#2A2218] font-bold">Join Our Celebration</h4>
                      <p className="text-sm text-[#574C3F] font-serif leading-relaxed max-w-[280px] mx-auto">
                        Please confirm your presence with your full names so we can reserve your seat and cater to your preferences.
                      </p>
                    </div>

                    <div className="w-full bg-[#FAF5EB] border border-[#E5D7BC] rounded-2xl p-4 text-left space-y-2.5 text-xs text-[#4A3F32] font-sans">
                      <div className="flex items-center gap-2 text-[#2A2218] font-bold">
                        <Calendar className="w-4 h-4 text-[#8A6621]" />
                        <span>Friday, 4th December 2026</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#2A2218] font-bold">
                        <MapPin className="w-4 h-4 text-[#8A6621]" />
                        <span>Monarch Gardens, Mosocho · Kisii County</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-[#574C3F] pt-1 border-t border-[#E5D7BC]">
                        Ceremony at 9:00 AM · Reception at 2:00 PM (Same venue).
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E5D7BC] w-full text-[11px] text-[#7A5B21] uppercase tracking-widest font-sans font-extrabold">
                      Kindly RSVP by 30th November 2026
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <AnimatePresence>
        {showFloatingBtn && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 pointer-events-auto"
            id="floating-rsvp-button-wrapper"
          >
            <button
              onClick={scrollToRsvp}
              className="flex items-center gap-2.5 px-6 py-3.5 bg-[#8A6621] hover:bg-[#6B4E18] border border-[#D4AF37] text-white font-sans font-bold text-xs uppercase tracking-wider rounded-full shadow-2xl active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#F5E6C4]" />
              <span>Confirm Attendance</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
