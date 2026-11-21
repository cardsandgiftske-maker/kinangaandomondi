import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Play } from 'lucide-react';

interface MusicPlayerProps {
  shouldPlay: boolean;
}

export default function MusicPlayer({ shouldPlay }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const sendPlayerCommand = (func: string, args: any[] = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: func,
            args: args,
          }),
          '*'
        );
      } catch (e) {
        console.error('Error sending player command:', e);
      }
    }
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    if (isPlaying) {
      sendPlayerCommand('pauseVideo');
      setIsPlaying(false);
    } else {
      sendPlayerCommand('playVideo');
      setIsPlaying(true);
      if (isMuted) {
        sendPlayerCommand('unMute');
        setIsMuted(false);
      }
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    if (isMuted) {
      sendPlayerCommand('unMute');
      setIsMuted(false);
      if (!isPlaying) {
        sendPlayerCommand('playVideo');
        setIsPlaying(true);
      }
    } else {
      sendPlayerCommand('mute');
      setIsMuted(true);
    }
  };

  useEffect(() => {
    if (shouldPlay && iframeLoaded) {
      const timer = setTimeout(() => {
        sendPlayerCommand('setVolume', [45]);
        sendPlayerCommand('unMute');
        sendPlayerCommand('playVideo');
        setIsPlaying(true);
        setIsMuted(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [shouldPlay, iframeLoaded]);

  return (
    <>
      <iframe
        ref={iframeRef}
        id="youtube-bg-player"
        width="1"
        height="1"
        src={`https://www.youtube.com/embed/QgaTQ5-XfMM?enablejsapi=1&autoplay=0&controls=0&loop=1&playlist=QgaTQ5-XfMM&origin=${typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : ''}`}
        allow="autoplay; encrypted-media"
        className="fixed -left-10 -top-10 w-[1px] h-[1px] opacity-0 pointer-events-none z-0"
        onLoad={() => setIframeLoaded(true)}
        title="Background Music Player"
      />

      <AnimatePresence>
        {shouldPlay && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="fixed bottom-20 right-6 z-40"
            id="music-control-floating-widget"
          >
            <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md border border-[#D4B475] rounded-full p-1.5 shadow-md">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-[#FAF5EB] border border-[#D4B475] flex items-center justify-center text-[#7A5A1F] hover:bg-[#B58E43] hover:text-white transition-colors cursor-pointer"
                title={isPlaying ? 'Pause Music' : 'Play Music'}
              >
                {isPlaying ? (
                  <div className="flex items-end gap-[2px] h-3">
                    <span className="w-[2px] h-2 bg-current rounded-full animate-pulse" />
                    <span className="w-[2px] h-3 bg-current rounded-full animate-pulse" />
                    <span className="w-[2px] h-1.5 bg-current rounded-full animate-pulse" />
                  </div>
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>

              <div className="flex items-center gap-1.5 pr-3 pl-1 font-serif text-xs font-medium text-[#2C251D] select-none">
                <span className="hidden sm:inline-block max-w-[95px] truncate">Wedding Song</span>
                <div className="w-[1px] h-4 bg-[#E6D2A2] mx-1 hidden sm:block" />
                <button
                  onClick={toggleMute}
                  className="p-1 text-[#574D41] hover:text-[#7A5A1F] active:scale-90 transition-all cursor-pointer"
                  title={isMuted ? 'Unmute Music' : 'Mute Music'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
