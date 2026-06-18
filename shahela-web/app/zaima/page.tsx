"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function ZaimaSpace() {
  const images = [
    "/images/zaima-1.jpg", 
    "/images/494686438_959940016217240_6648276104973416309_n.jpg", 
    "/images/717337095_1162860456014927_7806065373298586581_n.jpg", 
    "/images/zaima-4.jpg", 
    "/images/zaima-5.jpg", 
  ];

  // Interactive states
  const [isPlaying, setIsPlaying] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  // ── PERFECT PLAY/PAUSE AUDIO TRACKER ──
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const songUrl = "/Dhruv - double take (Official Video).mp3"; // তোমার গানের পাথ বা ক্লাউড লিঙ্ক

  useEffect(() => {
    // শুধুমাত্র একবার ব্রাউজারে অডিও অবজেক্ট ক্রিয়েট হবে
    audioRef.current = new Audio(songUrl);
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // অন-অফ করার পারফেক্ট লজিক
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

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-[#1A1A1A] font-sans antialiased selection:bg-pink-100 selection:text-pink-900 relative overflow-x-hidden">

      {/* ── HIGH-END GEOMETRIC PATTERN GRID BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-[0.04]" 
          style={{
            backgroundImage: `
              linear-gradient(to right, #000000 1px, transparent 1px),
              linear-gradient(to bottom, #000000 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,#FAF9F6_95%]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen p-4 md:p-8">

        {/* ── TOP HEADER ── */}
        <header className="w-full max-w-5xl mx-auto flex justify-between items-center py-5 px-7 bg-white/40 backdrop-blur-md border border-white/80 rounded-2xl shadow-xs">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-800 flex items-center gap-2">
            Zaima Pookie <span className="text-pink-400 animate-pulse">🎀</span>
          </span>
          <span className="text-[9px] font-mono opacity-40 tracking-widest uppercase">
            // Chapter 2026
          </span>
        </header>

        {/* ── EDITORIAL TEXT INTRO ── */}
        <div className="w-full max-w-5xl mx-auto mt-14 mb-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <span className="text-[9px] font-bold tracking-[0.2em] text-pink-700 uppercase mb-3 block font-mono">
              Hey Pookie! 🧸
            </span>
            <h1 className="text-4xl md:text-5xl font-light tracking-tighter leading-[1.1] text-stone-950 mb-5">
              A cozy little corner kept <br />
              <span className="font-serif italic text-pink-800/80">just for my favorite person</span>.
            </h1>
            <p className="text-xs md:text-sm text-stone-500 leading-relaxed">
              In the middle of absolute HSC chaos and hectic routines, consider this your ultimate comfort space. No stress, no clutter—just your favorite aesthetic polaroids, loops of good tunes, and a tiny retreat to breathe and reset. Whenever the days get a bit too heavy, just come hang out here. Your number one bestie always has your back! ✨
            </p>
          </motion.div>
        </div>

        {/* ── MAIN CONTENT BLOCK ── */}
        <main className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">

         {/* LEFT COLUMN: HERO IMAGE CANVAS (7 Columns) */}
<div className="lg:col-span-7">
  <motion.div 
    initial={{ opacity: 0, scale: 0.99 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-white p-4 pb-12 rounded-[2rem] border border-stone-200/40 shadow-[0_20px_50px_rgba(244,143,177,0.12)]"
  >
    <div className="w-full aspect-[4/5] rounded-[1.4rem] overflow-hidden bg-stone-50 mb-5 relative group">
      {/* ইমেজ সোর্স আগের মতোই array থেকে ডাইনামিকালি লোড হবে */}
      <img src={images[0]} className="w-full h-full object-cover" alt="Main Capture" />
    </div>
    <div className="flex justify-between items-center px-2 pt-1">
      <div>
        <h3 className="text-xs font-bold text-stone-800 tracking-tight">Absolutely Gorgeous ✨</h3>
        <p className="text-[9px] font-mono text-stone-400 mt-0.5">Candid frame</p>
      </div>
      <span className="text-[10px] font-mono px-3 py-1 bg-stone-50 border border-stone-100 rounded-full text-stone-500">Dhaka, BD</span>
    </div>
  </motion.div>
</div>
          {/* RIGHT COLUMN: STUFFS & INTERACTIVES (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* STUFF 1: MINIMAL CASSETTE PLAYER */}
            <div className="bg-white/40 backdrop-blur-md border border-white/90 p-5 rounded-2xl shadow-xs transition-all duration-300 hover:border-pink-200/50">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3.5">
                  <div className={`w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-xs border border-pink-100/60 transition-transform ${isPlaying ? 'animate-spin [animation-duration:5s]' : ''}`}>
                    🎧
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-pink-700 tracking-wider uppercase block">On Loop Only</span>
                    <h4 className="text-xs font-bold text-stone-800 tracking-tight">Favorite Tracks (Slowed)</h4>
                  </div>
                </div>

                {/* Audio Waves */}
                <div className="flex items-end gap-[3px] h-3.5 px-1">
                  {[1, 2, 3, 4, 5].map((b) => (
                    <motion.div 
                      key={b}
                      animate={isPlaying ? { height: [3, 14, 5, 10, 3] } : { height: 3 }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: b * 0.12, ease: "easeInOut" }}
                      className="w-[2.5px] bg-pink-400 rounded-xs"
                    />
                  ))}
                </div>
              </div>

              <button 
                onClick={toggleAudio}
                className={`w-full py-2.5 rounded-xl font-mono text-[9px] tracking-widest uppercase font-bold transition-all duration-300 active:scale-[0.98] cursor-pointer ${isPlaying ? 'bg-pink-100 text-pink-800 border border-pink-200 shadow-inner' : 'bg-stone-900 text-white hover:bg-stone-800 shadow-xs'}`}
              >
                {isPlaying ? "Pause Cassette" : "Play Cassette"}
              </button>
            </div>

            {/* STUFF 2: SECRET DROP NOTE */}
            <div className="bg-gradient-to-br from-pink-50/40 to-amber-50/30 border border-white/90 p-5 rounded-2xl relative overflow-hidden shadow-xs transition-all duration-300">
              <span className="text-[8px] font-mono text-stone-400 uppercase block mb-1">Envelope</span>
              <h4 className="text-xs font-bold text-stone-800 mb-2">A small letter for Zaima Pookie 💌</h4>

              {unlocked ? (
                <motion.div 
                  initial={{ opacity: 0, y: 8 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ type: "spring", stiffness: 100 }}
                  className="text-xs text-stone-600 leading-relaxed font-serif italic bg-white/95 p-4 rounded-xl border border-pink-100/60 shadow-xs"
                >
                  "Hope today brings nothing but lovely moments. In the middle of crazy study routines and all the HSC pressure, take a tiny break to just breathe and reset inside this little frame. Stay your wonderful, effortlessly cool self! ✨"
                </motion.div>
              ) : (
                <p className="text-xs text-stone-400 leading-relaxed mb-3">There is a private, sweet message kept inside this note interface block.</p>
              )}

              <button 
                onClick={() => setUnlocked(!unlocked)}
                className="text-[9px] font-black uppercase tracking-widest text-pink-800 hover:text-pink-900 font-mono transition-colors block mt-3 cursor-pointer select-none"
              >
                {unlocked ? "[ Hide Letter ]" : "[ Open Letter → ]"}
              </button>
            </div>

          </div>
        </main>

        {/* ── SNAPSHOT GRID ── */}
        <section className="w-full max-w-5xl mx-auto mt-16 mb-10">
          <div className="w-full border-t border-black/[0.03] pt-7 mb-6 flex justify-between items-center px-1">
            <h3 className="text-[9px] font-mono tracking-widest text-stone-400 uppercase">The Snapshot Grid</h3>
            <span className="text-[8px] font-mono opacity-30">SERIES 02-04</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            <div className="bg-white p-3 pb-8 rounded-2xl border border-stone-100 shadow-xs transition-transform duration-300 hover:scale-[1.01]">
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 bg-stone-50">
                <img src={images[1]} className="w-full h-full object-cover" alt="Frame 02" />
              </div>
              <p className="text-[8px] font-mono text-center tracking-wider text-stone-400 uppercase">Frame // 02</p>
            </div>

            <div className="bg-white p-3 pb-8 rounded-2xl border border-stone-100 shadow-xs transition-transform duration-300 hover:scale-[1.01]">
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 bg-stone-50">
                <img src={images[3]} className="w-full h-full object-cover" alt="Frame 03" />
              </div>
              <p className="text-[8px] font-mono text-center tracking-wider text-stone-400 uppercase">Frame // 03</p>
            </div>

            <div className="bg-white p-3 pb-8 rounded-2xl border border-stone-100 shadow-xs transition-transform duration-300 hover:scale-[1.01] col-span-2 md:col-span-1">
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 bg-stone-50">
                <img src={images[4]} className="w-full h-full object-cover" alt="Frame 04" />
              </div>
              <p className="text-[8px] font-mono text-center tracking-wider text-stone-400 uppercase">Frame // 04</p>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="w-full max-w-5xl mx-auto mt-auto pt-6 border-t border-black/[0.03] flex flex-col sm:flex-row justify-between items-center text-[8px] font-mono opacity-40 uppercase tracking-widest gap-3">
          <span className="flex items-center gap-1">Only for Zaima Pookie <span className="text-[10px]">🎀</span></span>
          <span>Made with love</span>
        </footer>

      </div>
    </div>
  );
}
