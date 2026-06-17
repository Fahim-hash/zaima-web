"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ZaimaPersonalSpace() {
  const images = [
    "/images/zaima-1.jpg", 
    "/images/zaima-2.jpg", 
    "/images/zaima-3.jpg", 
    "/images/zaima-4.jpg", 
    "/images/zaima-5.jpg", 
  ];

  // Music Player States
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Mood Selector State
  const [currentMood, setCurrentMood] = useState("✨");

  // Magic Note State
  const [showNote, setShowNote] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-[#1A1A1A] font-sans antialiased selection:bg-pink-200 relative overflow-x-hidden">
      
      {/* ── SOFT AMBIENT GLOWS ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-pink-200/40 blur-[100px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-amber-100/50 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen p-4 md:p-8">
        
        {/* ── TOP HEADER ── */}
        <header className="w-full max-w-5xl mx-auto flex justify-between items-center py-4 px-6 bg-white/40 backdrop-blur-md border border-white/80 rounded-2xl shadow-xs">
          <span className="text-sm font-black tracking-[0.3em] text-pink-700 font-serif italic">zaima's world.</span>
          <span className="text-[10px] font-mono opacity-50 tracking-widest">HSC '26 // MEMBER ONLY</span>
        </header>

        {/* ── MAIN CONTENT GRID ── */}
        <main className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
          
          {/* LEFT COLUMN: HERO POLAROID (7 Cols) */}
          <div className="md:col-span-7 flex flex-col gap-6">
            
            {/* Big Polaroid Frame */}
            <motion.div 
              initial={{ opacity: 0, rotate: -2 }}
              animate={{ opacity: 1, rotate: -1 }}
              className="bg-white p-4 pb-12 rounded-xl shadow-md border border-black/[0.03] rotate-[-1deg] hover:rotate-0 transition-transform duration-500"
            >
              <div className="w-full aspect-[4/5] rounded-lg overflow-hidden bg-stone-100 mb-4">
                <img src={images[0]} className="w-full h-full object-cover" alt="Zaima Pookie" />
              </div>
              <div className="text-center">
                <p className="font-serif italic text-lg text-stone-700">The favorite frame ✨</p>
                <p className="text-[10px] font-mono text-stone-400 mt-1">Captured // Dhaka, BD</p>
              </div>
            </motion.div>

            {/* Interactive Mood Block */}
            <div className="bg-white/40 backdrop-blur-md border border-white/80 p-6 rounded-2xl shadow-xs">
              <span className="block text-[10px] font-mono tracking-widest text-stone-400 uppercase mb-3">Zaima's Mood Today:</span>
              <div className="flex items-center justify-between gap-4">
                <div className="flex gap-2">
                  {[
                    { emoji: "✨", label: "Glow" },
                    { emoji: "☁️", label: "Chill" },
                    { emoji: "🧋", label: "Boba Craving" },
                    { emoji: "📚", label: "HSC Stress" }
                  ].map((m) => (
                    <button 
                      key={m.label}
                      onClick={() => setCurrentMood(m.emoji)}
                      className={`text-xl p-2.5 rounded-xl transition-all ${currentMood === m.emoji ? 'bg-white shadow-xs border border-pink-200 scale-110' : 'hover:bg-white/50'}`}
                      title={m.label}
                    >
                      {m.emoji}
                    </button>
                  ))}
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-mono block text-stone-400 uppercase">Current Vibe</span>
                  <span className="text-sm font-bold text-pink-900">{currentMood} Feeling Good</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: STUFFS & INTERACTIVES (5 Cols) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            
            {/* STUFF 1: AESTHETIC MUSIC PLAYER */}
            <div className="bg-white/50 backdrop-blur-md border border-white/80 p-6 rounded-2xl shadow-xs flex flex-col justify-between aspect-square md:aspect-auto">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[9px] font-mono text-pink-600 tracking-widest uppercase block mb-1">Now Playing Loop</span>
                    <h4 className="text-base font-bold tracking-tight text-stone-800">প্রিয় গান (Lofi Version)</h4>
                    <p className="text-xs text-stone-400">Aesthetic Soundscapes</p>
                  </div>
                  <div className={`w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-xs ${isPlaying ? 'animate-spin [animation-duration:5s]' : ''}`}>
                    🎵
                  </div>
                </div>
                {/* Visualizer bars */}
                <div className="flex items-end gap-1 h-6 my-4 px-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((bar) => (
                    <motion.div 
                      key={bar}
                      animate={isPlaying ? { height: [8, 24, 12, 20, 8] } : { height: 8 }}
                      transition={{ duration: 1, repeat: Infinity, delay: bar * 0.1 }}
                      className="flex-1 bg-pink-300 rounded-xs"
                    />
                  ))}
                </div>
              </div>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-full py-3 rounded-xl font-mono text-[10px] tracking-widest uppercase font-bold transition-all ${isPlaying ? 'bg-pink-200 text-pink-800 border border-pink-300' : 'bg-stone-900 text-white hover:bg-pink-800'}`}
              >
                {isPlaying ? "PAUSE CASSETTE" : "PLAY CASSETTE"}
              </button>
            </div>

            {/* STUFF 2: SECRET MAGIC NOTE CARD */}
            <div className="bg-gradient-to-br from-pink-50 to-amber-50 border border-white/80 p-6 rounded-2xl shadow-xs relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-pink-200/30 rounded-full blur-xl" />
              
              <span className="text-[9px] font-mono text-stone-400 uppercase block mb-1">Interactive Drop</span>
              <h4 className="text-base font-bold text-stone-800 mb-3">A Message From The System 💌</h4>
              
              {showNote ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-stone-600 leading-relaxed font-serif italic bg-white/70 p-4 rounded-xl border border-pink-100">
                  "আশা করি আজকের দিনটা তোমার অনেক সুন্দর কাটবে! পড়াশোনার চাপের মাঝেও নিজের এই ছোট্ট কিউট স্পেসটাতে এসে একটু রিল্যাক্স করে যেও। Stay awesome, Zaima Pookie! ✨"
                </motion.div>
              ) : (
                <p className="text-xs text-stone-500 mb-4 leading-relaxed">There is a hidden surprise note locked behind this interface block.</p>
              )}
              
              <button 
                onClick={() => setShowNote(!showNote)}
                className="mt-2 text-xs font-bold text-pink-700 hover:text-pink-900 underline underline-offset-4 font-mono transition-colors"
              >
                {showNote ? "Close Secret Note" : "Click to Reveal Note →"}
              </button>
            </div>

            {/* STUFF 3: MINI POLAROID MEMORY */}
            <motion.div 
              whileHover={{ rotate: 2 }}
              className="bg-white p-3 pb-8 rounded-xl shadow-xs border border-black/[0.02] rotate-[2deg] transition-transform"
            >
              <div className="w-full aspect-video rounded-lg overflow-hidden bg-stone-100 mb-2">
                <img src={images[2]} className="w-full h-full object-cover" alt="Memory" />
              </div>
              <p className="text-[11px] font-serif italic text-center text-stone-500">Good Times Grid // 02</p>
            </motion.div>

          </div>
        </main>

        {/* ── BOTTOM SCRAPBOARD SECTION ── */}
        <section className="w-full max-w-5xl mx-auto mt-12 mb-16">
          <h3 className="text-[10px] font-mono tracking-widest text-stone-400 uppercase mb-6 px-2">The Memory Scrapboard Grid</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white p-3 pb-8 rounded-xl shadow-xs border border-black/[0.02] rotate-[-1deg]">
              <div className="w-full aspect-square rounded-lg overflow-hidden mb-2"><img src={images[1]} className="w-full h-full object-cover" alt="" /></div>
              <p className="text-[10px] font-mono text-center text-stone-400">#FRAME_02</p>
            </div>
            <div className="bg-white p-3 pb-8 rounded-xl shadow-xs border border-black/[0.02] rotate-[1deg]">
              <div className="w-full aspect-square rounded-lg overflow-hidden mb-2"><img src={images[3]} className="w-full h-full object-cover" alt="" /></div>
              <p className="text-[10px] font-mono text-center text-stone-400">#SNAPSHOT_04</p>
            </div>
            <div className="bg-white p-3 pb-8 rounded-xl shadow-xs border border-black/[0.02] rotate-[-2deg] col-span-2 md:col-span-1">
              <div className="w-full aspect-square md:aspect-square rounded-lg overflow-hidden mb-2"><img src={images[4]} className="w-full h-full object-cover" alt="" /></div>
              <p className="text-[10px] font-mono text-center text-stone-400">#COLLECTION_05</p>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="w-full max-w-5xl mx-auto mt-auto pt-6 border-t border-black/[0.04] flex justify-between items-center text-[9px] font-mono opacity-40 uppercase tracking-widest">
          <span>Made for Zaima Pookie</span>
          <span>© 2026 </span>
        </footer>

      </div>
    </div>
  );
}
