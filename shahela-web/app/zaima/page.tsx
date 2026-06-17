"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ZaimaSpace() {
  const images = [
    "/images/zaima-1.jpg", 
    "/images/zaima-2.jpg", 
    "/images/zaima-3.jpg", 
    "/images/zaima-4.jpg", 
    "/images/zaima-5.jpg", 
  ];

  // Minimal and clean interactive elements
  const [isPlaying, setIsPlaying] = useState(false);
  const [vibe, setVibe] = useState("Sunday morning");
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-[#1A1A1A] font-sans antialiased selection:bg-pink-100 selection:text-pink-900 relative overflow-x-hidden">
      
      {/* ── BALANCED BACKGROUND TONES ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[550px] h-[550px] rounded-full bg-pink-200/25 blur-[100px]" />
        <div className="absolute bottom-[15%] right-[-5%] w-[450px] h-[450px] rounded-full bg-amber-100/30 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen p-4 md:p-8">
        
        {/* ── TOP HEADER ── */}
        <header className="w-full max-w-5xl mx-auto flex justify-between items-center py-5 px-7 bg-white/40 backdrop-blur-md border border-white/80 rounded-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-800">
            Zaima Pookie
          </span>
          <span className="text-[9px] font-mono opacity-40 tracking-widest uppercase">
            // Chapter 2026
          </span>
        </header>

        {/* ── EDITORIAL TEXT INTRO (Before the main imagery hits) ── */}
        <div className="w-full max-w-5xl mx-auto mt-14 mb-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <span className="text-[9px] font-bold tracking-[0.2em] text-pink-700 uppercase mb-3 block font-mono">
              Welcome Note
            </span>
            <h1 className="text-4xl md:text-5xl font-light tracking-tighter leading-[1.1] text-stone-950 mb-5">
              A little corner kept for <br />
              <span className="font-serif italic text-pink-800/80">quiet days and polaroids</span>.
            </h1>
            <p className="text-xs md:text-sm text-stone-500 leading-relaxed">
              Just a soft, private page to display favorite snaps, track daily notes, and loop good tunes. No fuzz, no cluttered layouts—just a simple aesthetic retreat to look back at moments exactly the way they were caught.
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
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white p-3 pb-10 rounded-[2rem] border border-black/[0.01] shadow-xs"
            >
              <div className="w-full aspect-[4/5] rounded-[1.4rem] overflow-hidden bg-stone-50 mb-4">
                <img src={images[0]} className="w-full h-full object-cover" alt="Main Capture" />
              </div>
              <div className="flex justify-between items-center px-3 pt-1">
                <div>
                  <h3 className="text-xs font-bold text-stone-800 tracking-tight">The ultimate favorite</h3>
                  <p className="text-[9px] font-mono text-stone-400 mt-0.5">Staged // June Update</p>
                </div>
                <span className="text-[10px] font-mono px-3 py-1 bg-stone-50 border border-stone-100 rounded-full text-stone-500">Dhaka, BD</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: STUFFS & INTERACTIVES (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* STUFF 1: MINIMAL CASSETTE PLAYER */}
            <div className="bg-white/40 backdrop-blur-md border border-white/90 p-5 rounded-2xl shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3.5">
                  <div className={`w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-xs border border-pink-100/60 ${isPlaying ? 'animate-spin [animation-duration:6s]' : ''}`}>
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
                      transition={{ duration: 0.8, repeat: Infinity, delay: b * 0.1 }}
                      className="w-[2.5px] bg-pink-300 rounded-xs"
                    />
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-full py-2.5 rounded-xl font-mono text-[9px] tracking-widest uppercase font-bold transition-all ${isPlaying ? 'bg-pink-100 text-pink-800 border border-pink-200' : 'bg-stone-900 text-white hover:bg-stone-800'}`}
              >
                {isPlaying ? "Pause Cassette" : "Play Cassette"}
              </button>
            </div>

            {/* STUFF 2: INTERACTIVE ENVIRONMENT MOODS */}
            <div className="bg-white/40 backdrop-blur-md border border-white/90 p-5 rounded-2xl shadow-xs">
              <span className="block text-[8px] font-mono tracking-wider text-stone-400 uppercase mb-3">Vibe Checklist</span>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {["Sunday morning", "Rainy day", "Caffeine high"].map((v) => (
                    <button 
                      key={v}
                      onClick={() => setVibe(v)}
                      className={`text-[9px] font-bold px-3 py-1.5 rounded-lg border transition-all ${vibe === v ? 'bg-white border-white shadow-xs font-black scale-102 text-stone-900' : 'bg-transparent border-transparent text-stone-400 hover:text-stone-700'}`}
                    >
                      {v.split(" ")[0]}
                    </button>
                  ))}
                </div>
                <div className="text-right pl-2">
                  <span className="text-[8px] font-mono opacity-40 uppercase block">Current</span>
                  <span className="text-xs font-bold text-pink-900 capitalize">{vibe.split(" ")[0]}</span>
                </div>
              </div>
            </div>

            {/* STUFF 3: SECRET DROP NOTE */}
            <div className="bg-gradient-to-br from-pink-50/30 to-amber-50/20 border border-white/90 p-5 rounded-2xl relative overflow-hidden">
              <span className="text-[8px] font-mono text-stone-400 uppercase block mb-1">Envelope</span>
              <h4 className="text-xs font-bold text-stone-800 mb-2">A small letter for Zaima Pookie 💌</h4>
              
              {unlocked ? (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="text-xs text-stone-600 leading-relaxed font-serif italic bg-white/80 p-4 rounded-xl border border-pink-100/50"
                >
                  "Hope today brings nothing but lovely moments. In the middle of crazy study routines and all the HSC pressure, take a tiny break to just breathe and reset inside this little frame. Stay your wonderful, effortlessly cool self! ✨"
                </motion.div>
              ) : (
                <p className="text-xs text-stone-400 leading-relaxed mb-3">There is a private, sweet message kept inside this note interface block.</p>
              )}
              
              <button 
                onClick={() => setUnlocked(!unlocked)}
                className="text-[9px] font-black uppercase tracking-widest text-pink-800 hover:text-pink-900 font-mono transition-colors block mt-2"
              >
                {unlocked ? "[ Hide Letter ]" : "[ Open Letter → ]"}
              </button>
            </div>

          </div>
        </main>

        {/* ── SCRAPBOARD GRID SEPARATED BY THIN RULE ── */}
        <section className="w-full max-w-5xl mx-auto mt-14 mb-10">
          <div className="w-full border-t border-black/[0.03] pt-7 mb-6 flex justify-between items-center px-1">
            <h3 className="text-[9px] font-mono tracking-widest text-stone-400 uppercase">The Snapshot Grid</h3>
            <span className="text-[8px] font-mono opacity-30">SERIES 02-04</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            <div className="bg-white p-2.5 pb-7 rounded-2xl border border-black/[0.01]">
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-2.5">
                <img src={images[1]} className="w-full h-full object-cover" alt="" />
              </div>
              <p className="text-[8px] font-mono text-center tracking-wider text-stone-400 uppercase">Frame // 02</p>
            </div>
            
            <div className="bg-white p-2.5 pb-7 rounded-2xl border border-black/[0.01]">
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-2.5">
                <img src={images[3]} className="w-full h-full object-cover" alt="" />
              </div>
              <p className="text-[8px] font-mono text-center tracking-wider text-stone-400 uppercase">Frame // 03</p>
            </div>
            
            <div className="bg-white p-2.5 pb-7 rounded-2xl border border-black/[0.01] col-span-2 md:col-span-1">
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-2.5">
                <img src={images[4]} className="w-full h-full object-cover" alt="" />
              </div>
              <p className="text-[8px] font-mono text-center tracking-wider text-stone-400 uppercase">Frame // 04</p>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="w-full max-w-5xl mx-auto mt-auto pt-5 border-t border-black/[0.03] flex flex-col sm:flex-row justify-between items-center text-[8px] font-mono opacity-40 uppercase tracking-widest gap-3">
          <span>Only for Zaima Pookie🎀</span>
          <span>Made with love 2026</span>
        </footer>

      </div>
    </div>
  );
}
