import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';
import Hero from './components/Hero';
import LocationMap from './components/LocationMap';
import Program from './components/Program';
import Gallery from './components/Gallery';
import DressCode from './components/DressCode';
import Gifting from './components/Gifting';
import RsvpForm from './components/RsvpForm';
import AdminPanel from './components/AdminPanel';
import Envelope from './components/Envelope';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero-section');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);

  useEffect(() => {
    if (!isEnvelopeOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isEnvelopeOpened]);

  const handleEnvelopeOpen = () => {
    setIsEnvelopeOpened(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      const sections = [
        'hero-section',
        'maps-section',
        'program-section',
        'gallery-section',
        'dress-code-section',
        'gifting-section',
        'rsvp-section',
      ];
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'maps-section', label: 'When & Where' },
    { id: 'program-section', label: 'Program' },
    { id: 'gallery-section', label: 'Gallery' },
    { id: 'dress-code-section', label: 'Dress Code' },
    { id: 'gifting-section', label: 'Gifts' },
  ];

  return (
    <>
      <MusicPlayer shouldPlay={shouldPlayMusic} />

      <AnimatePresence mode="wait">
        {!isEnvelopeOpened && (
          <Envelope
            onOpen={handleEnvelopeOpen}
            onSealBreak={() => setShouldPlayMusic(true)}
          />
        )}
      </AnimatePresence>

      {isEnvelopeOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative min-h-screen bg-[#FDFBF7] text-[#2C251D] font-sans selection:bg-[#E6D2A2]/40 selection:text-[#2C251D] overflow-x-hidden antialiased"
        >
          {/* Top Navigation Bar */}
          <header className="fixed top-0 inset-x-0 z-40 bg-white/92 backdrop-blur-md border-b border-[#E6D2A2]">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-8">
              {/* Brand Wordmark */}
              <button
                onClick={() => scrollToSection('hero-section')}
                className="font-serif text-lg md:text-xl tracking-widest font-semibold cursor-pointer whitespace-nowrap shrink-0 text-[#2C251D] hover:text-[#7A5A1F] transition-colors"
              >
                SHARON <span className="text-[#B58E43] italic font-normal">&amp;</span> COLLINS
              </button>

              {/* Desktop Navigation Links */}
              <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold text-[#574D41]">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`py-1.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'text-[#7A5A1F] border-[#B58E43]'
                          : 'border-transparent hover:text-[#2C251D] hover:border-[#E6D2A2]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              {/* Primary Action CTA */}
              <button
                onClick={() => scrollToSection('rsvp-section')}
                className="px-5 py-2 bg-[#B58E43] hover:bg-[#9A742E] text-white font-sans font-bold text-xs uppercase tracking-widest rounded-full transition-colors cursor-pointer shadow-xs whitespace-nowrap shrink-0"
              >
                RSVP
              </button>
            </div>
          </header>

          {/* Main Content Sections */}
          <main className="relative z-10 pt-16">
            <Hero />
            <LocationMap />
            <Program />
            <Gallery />
            <DressCode />
            <Gifting />
            <RsvpForm />
          </main>

          {/* Couple Administrative Portal & Footer */}
          <AdminPanel />

          {/* Desktop Vertical Section Dots */}
          <div className="hidden lg:flex fixed right-7 top-1/2 -translate-y-1/2 z-30 flex-col gap-4 items-center">
            {[{ id: 'hero-section', label: 'Welcome' }, ...navItems, { id: 'rsvp-section', label: 'RSVP' }].map(
              (item) => (
                <button
                  key={`dot-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  className="group relative flex items-center justify-end cursor-pointer"
                  title={item.label}
                  aria-label={`Jump to ${item.label}`}
                >
                  <span className="absolute right-full mr-3 bg-white border border-[#D4B475] px-2.5 py-1 rounded text-[10px] font-sans font-bold uppercase tracking-wider shadow-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 text-[#7A5A1F] whitespace-nowrap">
                    {item.label}
                  </span>
                  <span
                    className={`w-2.5 h-2.5 rounded-full border transition-all ${
                      activeSection === item.id
                        ? 'bg-[#B58E43] border-[#7A5A1F] scale-125'
                        : 'bg-white border-[#D4B475] group-hover:border-[#9A742E]'
                    }`}
                  />
                </button>
              )
            )}
          </div>

          {/* Scroll to top */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="fixed bottom-6 left-6 z-40"
                id="scroll-to-top-button-container"
              >
                <button
                  onClick={() => scrollToSection('hero-section')}
                  className="p-3 bg-white hover:bg-[#FAF5EB] border border-[#D4B475] text-[#7A5A1F] rounded-full shadow-md active:scale-95 transition-all cursor-pointer"
                  title="Scroll to Top"
                  aria-label="Scroll to Top"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}
