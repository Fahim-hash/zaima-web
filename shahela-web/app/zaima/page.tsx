"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function ZaimaSpace() {
  const images = [
    "/images/zaima-1.jpg", 
    "/images/494686438_959940016217240_6648276104973416309_n.jpg", 
    "/images/717337095_1162860456014927_7806065373298586581_n.jpg", 
    "/images/717337095_1162860456014927_7806065373298586581_n.jpg", 
    "/images/_MG_0269.jpg", 
  ];

  // Interactive states
  const [isPlaying, setIsPlaying] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [waterCount, setWaterCount] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    "Take a deep breath. You are doing completely fine.",
    "Don't stress over things you can't control right now.",
    "You are incredibly strong, even when you feel tired.",
    "A beautiful mind deserves a peaceful break."
  ];

  // ── PERFECT PLAY/PAUSE AUDIO TRACKER ──
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const songUrl = "/Dhruv - double take (Official Video).mp3"; 

  useEffect(() => {
    audioRef.current = new Audio(songUrl);
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Playback blocked:", err));
    }
  };

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-[#1A1A1A] font-sans antialiased selection:bg-pink-100 selection:text-pink-900 relative overflow-x-hidden">

      {/* ── HIGH-END GEOMETRIC PATTERN GRID BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `
              linear-gradient(to right, #000000 1px, transparent 1px),
              linear-gradient(to bottom, #000000 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_30%,#FAF9F6_90%]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen p-4 md:p-8 max-w-5xl mx-auto w-full">

        {/* ── TOP HEADER ── */}
        <header className="w-full flex justify-between items-center py-5 px-7 bg-white/30 backdrop-blur-xl border border-white/60 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.02)]">
          <span className="text-xs font-medium uppercase tracking-[0.4em] text-stone-800 flex items-center gap-2">
            Zaima <span className="text-pink-400/80 animate-pulse">🎀</span>
          </span>
          <span className="text-[9px] font-mono opacity-40 tracking-widest uppercase">
            // 2026
          </span>
        </header>

        {/* ── EDITORIAL TEXT INTRO ── */}
        <div className="w-full mt-16 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="text-[9px] font-bold tracking-[0.25em] text-pink-700/80 uppercase mb-4 block font-mono">
              Safe Haven 🤍
            </span>
            <h1 className="text-4xl md:text-5xl font-extralight tracking-tight leading-[1.15] text-stone-950 mb-6">
              A quiet, cozy corner kept <br />
              <span className="font-serif italic text-pink-900/80 font-normal">just for my favorite person.</span>
            </h1>
            <p className="text-xs md:text-sm text-stone-500/90 leading-relaxed font-light tracking-wide max-w-lg">
              Whenever the endless study routines and long days feel a bit too heavy, consider this your little retreat to unwind. No rush, no noise—just some beautiful frames, your favorite melodies playing on a loop, and a calm space to breathe and reset. Take your time here. I always have your back. ✨
            </p>
          </motion.div>
        </div>

        {/* ── MAIN CONTENT BLOCK ── */}
        <main className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-start">

          {/* LEFT COLUMN: HERO IMAGE CANVAS (7 Columns) */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white p-5 pb-14 rounded-[2.5rem] border border-stone-200/30 shadow-[0_30px_70px_rgba(244,143,177,0.08)]"
            >
              <div className="w-full aspect-[4/5] rounded-[1.8rem] overflow-hidden bg-stone-50 mb-6 relative group shadow-inner">
                <img src={images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" alt="Main Capture" />
              </div>
              <div className="flex justify-between items-center px-2 pt-1">
                <div>
                  <h3 className="text-xs font-semibold text-stone-800 tracking-tight">Absolutely Gorgeous ✨</h3>
                  <p className="text-[9px] font-mono text-stone-400 mt-1">Candid Frame // Fav</p>
                </div>
                <span className="text-[9px] font-mono px-3 py-1 bg-stone-50/80 border border-stone-100 rounded-full text-stone-500 tracking-wider">DHAKA, BD</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: STUFFS & INTERACTIVES (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:mt-2">

            {/* STUFF 1: MINIMAL CASSETTE PLAYER */}
            <div className="bg-white/50 backdrop-blur-xl border border-white/90 p-6 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.01)] transition-all duration-300 hover:border-pink-200/40">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-4">
                  <div className={`w-9 h-9 rounded-full bg-pink-50/60 flex items-center justify-center text-sm border border-pink-100/50 transition-transform ${isPlaying ? 'animate-spin [animation-duration:6s]' : ''}`}>
                    🎧
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-pink-700/80 tracking-widest uppercase block mb-0.5">On Loop</span>
                    <h4 className="text-xs font-semibold text-stone-800 tracking-tight">Favorite Tracks (Slowed)</h4>
                  </div>
                </div>

                {/* Audio Waves */}
                <div className="flex items-end gap-[3px] h-3.5 px-1">
                  {[1, 2, 3, 4, 5].map((b) => (
                    <motion.div 
                      key={b}
                      animate={isPlaying ? { height: [3, 14, 5, 10, 3] } : { height: 3 }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: b * 0.12, ease: "easeInOut" }}
                      className="w-[2px] bg-pink-400/80 rounded-xs"
                    />
                  ))}
                </div>
              </div>

              <button 
                onClick={toggleAudio}
                className={`w-full py-3 rounded-xl font-mono text-[9px] tracking-widest uppercase font-bold transition-all duration-300 active:scale-[0.99] cursor-pointer ${isPlaying ? 'bg-pink-50 text-pink-800 border border-pink-200/60 shadow-inner' : 'bg-stone-900 text-white hover:bg-stone-800 shadow-sm'}`}
              >
                {isPlaying ? "Pause Cassette" : "Play Cassette"}
              </button>
            </div>

            {/* STUFF 2: SECRET DROP NOTE */}
            <div className="bg-gradient-to-br from-pink-50/30 to-amber-50/20 backdrop-blur-md border border-white/80 p-6 rounded-2xl relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.01)] transition-all duration-300">
              <span className="text-[8px] font-mono text-stone-400 uppercase tracking-widest block mb-1">Envelope</span>
              <h4 className="text-xs font-semibold text-stone-800 mb-3">A little letter 💌</h4>

              {unlocked ? (
                <motion.div 
                  initial={{ opacity: 0, y: 8 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ type: "spring", stiffness: 120 }}
                  className="text-xs text-stone-700/90 leading-relaxed font-serif italic bg-white/95 p-4 rounded-xl border border-pink-100/40 shadow-xs"
                >
                  "I hope every alternate timeline out there is lucky enough to have a best friend like you. These hectic study days will pass smoothly before you know it. Take sweet care of yourself, and whenever you need a quick break from reality, this tiny frame is always right here waiting for you. You are perfect exactly the way you are! ✨"
                </motion.div>
              ) : (
                <p className="text-xs text-stone-400 leading-relaxed mb-3 font-light">There is a private, quiet note kept inside this card for you...</p>
              )}

              <button 
                onClick={() => setUnlocked(!unlocked)}
                className="text-[9px] font-bold uppercase tracking-widest text-pink-800 hover:text-pink-900 font-mono transition-colors block mt-4 cursor-pointer select-none"
              >
                {unlocked ? "[ Hide Letter ]" : "[ Open Letter → ]"}
              </button>
            </div>

            {/* STUFF 3: MINI POLAROID CAROUSEL */}
            <div className="bg-white/50 backdrop-blur-xl border border-white/90 p-5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.01)] flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-[8px] font-mono text-stone-400 uppercase tracking-widest">Memory Deck</span>
                <span className="text-[8px] font-mono text-stone-500">{carouselIndex + 1} / {images.length}</span>
              </div>
              
              <div className="w-full aspect-[4/3] rounded-xl bg-stone-100 overflow-hidden relative shadow-inner group">
                <img 
                  src={images[carouselIndex]} 
                  className="w-full h-full object-cover transition-all duration-500" 
                  alt="Carousel Capture" 
                />
                <button 
                  onClick={nextSlide}
                  className="absolute right-3 bottom-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-xs flex items-center justify-center text-xs font-bold hover:bg-white active:scale-95 cursor-pointer transition-all"
                >
                  →
                </button>
              </div>
            </div>

            {/* STUFF 4: SELF-CARE COUNTERS */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/50 backdrop-blur-xl border border-white/90 p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.01)] flex flex-col justify-between h-24">
                <span className="text-[8px] font-mono text-stone-400 uppercase tracking-widest block">Hydration</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-light text-stone-800">{waterCount}</span>
                  <span className="text-[9px] text-stone-400 font-mono">glasses</span>
                </div>
                <button 
                  onClick={() => setWaterCount(waterCount + 1)}
                  className="text-left text-[8px] font-bold uppercase tracking-widest text-pink-700/80 hover:text-pink-800 font-mono cursor-pointer"
                >
                  + Drink Water
                </button>
              </div>

              <div className="bg-white/50 backdrop-blur-xl border border-white/90 p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.01)] flex flex-col justify-between h-24">
                <span className="text-[8px] font-mono text-stone-400 uppercase tracking-widest block">Current Mood</span>
                <span className="text-sm font-light text-stone-700 tracking-tight">Cozy & Calm ☁️</span>
                <span className="text-[8px] font-mono text-stone-300 uppercase">Protected</span>
              </div>
            </div>

            {/* STUFF 5: DAILY AFFIRMATION CANVAS */}
            <div className="bg-stone-900 text-stone-100 p-5 rounded-2xl shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full blur-xl pointer-events-none" />
              <span className="text-[8px] font-mono text-stone-500 uppercase tracking-widest block mb-2">Reminder // For You</span>
              
              <div className="h-12 flex items-center">
                <p className="text-xs font-light tracking-wide text-stone-300 leading-relaxed font-serif italic">
                  "{quotes[currentQuote]}"
                </p>
              </div>

              <button 
                onClick={() => setCurrentQuote((prev) => (prev + 1) % quotes.length)}
                className="mt-4 text-[8px] font-mono uppercase tracking-widest text-pink-300/80 hover:text-pink-300 transition-colors cursor-pointer"
              >
                [ Shuffle Thoughts ]
              </button>
            </div>

          </div>
        </main>

        {/* ── SNAPSHOT GRID ── */}
        <section className="w-full mt-20 mb-10">
          <div className="w-full border-t border-black/[0.03] pt-8 mb-6 flex justify-between items-center px-1">
            <h3 className="text-[9px] font-mono tracking-widest text-stone-400 uppercase">The Snapshot Grid</h3>
            <span className="text-[8px] font-mono opacity-30">// SERIES 02-04</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white p-3.5 pb-9 rounded-2xl border border-stone-100/70 shadow-[0_10px_30px_rgba(0,0,0,0.01)] transition-transform duration-300 hover:scale-[1.01]">
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-3.5 bg-stone-50">
                <img src={images[1]} className="w-full h-full object-cover" alt="Frame 02" />
              </div>
              <p className="text-[8px] font-mono text-center tracking-wider text-stone-400 uppercase">Frame // 02</p>
            </div>

            <div className="bg-white p-3.5 pb-9 rounded-2xl border border-stone-100/70 shadow-[0_10px_30px_rgba(0,0,0,0.01)] transition-transform duration-300 hover:scale-[1.01]">
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-3.5 bg-stone-50">
                <img src={images[3]} className="w-full h-full object-cover" alt="Frame 03" />
              </div>
              <p className="text-[8px] font-mono text-center tracking-wider text-stone-400 uppercase">Frame // 03</p>
            </div>

            <div className="bg-white p-3.5 pb-9 rounded-2xl border border-stone-100/70 shadow-[0_10px_30px_rgba(0,0,0,0.01)] transition-transform duration-300 hover:scale-[1.01] col-span-2 md:col-span-1">
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-3.5 bg-stone-50">
                <img src={images[4]} className="w-full h-full object-cover" alt="Frame 04" />
              </div>
              <p className="text-[8px] font-mono text-center tracking-wider text-stone-400 uppercase">Frame // 04</p>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="w-full mt-auto pt-6 border-t border-black/[0.03] flex flex-col sm:flex-row justify-between items-center text-[8px] font-mono opacity-40 uppercase tracking-widest gap-3">
          <span className="flex items-center gap-1">Only for Zaima <span className="text-[10px]">🎀</span></span>
          <span>Made with love</span>
        </footer>

      </div>
    </div>
  );
}
