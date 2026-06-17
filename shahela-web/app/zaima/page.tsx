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

  // Micro-interactive states for the interface
  const [isPlaying, setIsPlaying] = useState(false);
  const [vibeSet, setVibeSet] = useState("Serene");
  const [revealSecret, setRevealSecret] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-[#1A1A1A] font-sans antialiased selection:bg-pink-100 selection:text-pink-900 relative overflow-x-hidden">
      
      {/* ── ULTRA-SOFT COMPOSITIONAL BACKGROUND GLOWS ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-pink-200/30 blur-[120px]" />
        <div className="absolute bottom-[15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-amber-100/40 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:50px_50px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen p-4 md:p-8">
        
        {/* ── REFINED NAVIGATION LATCH ── */}
        <header className="w-full max-w-6xl mx-auto flex justify-between items-center py-5 px-8 bg-white/40 backdrop-blur-md border border-white/80 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.01)]">
          <span className="text-xs font-black tracking-[0.4em] uppercase text-stone-800">
            Zaima Pookie
          </span>
          <span className="text-[9px] font-mono opacity-50 tracking-widest uppercase">
            Aesthetic Safehouse // June 2026
          </span>
        </header>

        {/* ── TEXT INTRO & MAIN COLUMN LAYOUT ── */}
        <main className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-start">
          
          {/* LEFT SIDEBAR: TEXT INTRO & INTERACTIVE CONTEXTS (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* EDITORIAL TEXT LEAD-IN (Frames the imagery beforehand) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="p-2"
            >
              <span className="text-[10px] font-bold tracking-[0.3em] text-pink-600 uppercase mb-4 block font-mono">
                Perspective Index
              </span>
              <h1 className="text-4xl md:text-5xl font-light tracking-tighter leading-[1.1] text-stone-900 mb-6">
                A quiet archive of <br />
                <span className="font-serif italic text-pink-800/90">grace & warmth</span>.
              </h1>
              <p className="text-xs md:text-sm text-stone-500 leading-relaxed max-w-md">
                Welcome to a tailored digital preserve designed strictly to safeguard moments, catalog lighthearted updates, and showcase visual snapshots in their purest, most unhurried form. No rigid metrics—just a dedicated private frequency.
              </p>
            </motion.div>

            {/* INTERACTIVE COMPONENT 1: PREMIUM COMPOSITION CONTROLLER */}
            <div className="bg-white/40 backdrop-blur-md border border-white/90 p-6 rounded-2xl shadow-xs">
              <span className="block text-[9px] font-mono tracking-widest text-stone-400 uppercase mb-3">Atmospheric Resonance</span>
              <div className="flex items-center justify-between gap-4">
                <div className="flex gap-1.5">
                  {["Serene", "Ethereal", "Mellow"].map((v) => (
                    <button 
                      key={v}
                      onClick={() => setVibeSet(v)}
                      className={`text-[10px] uppercase font-bold tracking-wider px-3 py-2 rounded-xl transition-all ${vibeSet === v ? 'bg-stone-900 text-white shadow-xs scale-102' : 'bg-white/50 hover:bg-white/80 border border-black/[0.03]'}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                <div className="text-right">
                  <span className="text-[8px] font-mono block opacity-40 uppercase">State</span>
                  <span className="text-xs font-bold text-stone-700">{vibeSet}</span>
                </div>
              </div>
            </div>

            {/* INTERACTIVE COMPONENT 2: THE ENCRYPTED SURPRISE NOTE */}
            <div className="bg-gradient-to-br from-pink-50/40 to-amber-50/30 border border-white/90 p-6 rounded-2xl shadow-xs relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-20 h-24 bg-pink-200/20 rounded-full blur-xl pointer-events-none" />
              <span className="text-[9px] font-mono text-pink-700/80 uppercase tracking-wider block mb-1">Vault Transmission</span>
              <h4 className="text-sm font-bold text-stone-800 mb-2">A Message For Zaima Pookie 💌</h4>
              
              {revealSecret ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.99 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="text-xs text-stone-600 leading-relaxed font-serif italic bg-white/80 p-4 rounded-xl border border-pink-100/50 shadow-xs"
                >
                  "Wishing you a completely brilliant day ahead! Midst all the heavy academic tempos and HSC preparations, consider this tiny sanctuary your personal pause button. Keep radiating that effortless aesthetic spirit. Stay wonderful! ✨"
                </motion.div>
              ) : (
                <p className="text-xs text-stone-400 mb-3 leading-relaxed">A dedicated personal verification string is securely staged inside this interface card.</p>
              )}
              
              <button 
                onClick={() => setRevealSecret(!revealSecret)}
                className="text-[10px] font-bold uppercase tracking-widest text-pink-800 hover:text-pink-900 font-mono transition-colors mt-2 block"
              >
                {revealSecret ? "[ Conceal Transmission ]" : "[ Decrypt Message → ]"}
              </button>
            </div>

          </div>

          {/* RIGHT SIDEBAR: PHOTOGRAPHIC CANVAS & AUDIO COMPONENT (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* HERO MATTE FRAME (Primary Subject Showcase) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="bg-white p-3 pb-12 rounded-[2rem] shadow-sm border border-black/[0.01]"
            >
              <div className="w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-stone-100 mb-4">
                <img src={images[0]} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-102" alt="Zaima Main Portrait" />
              </div>
              <div className="flex justify-between items-center px-4 pt-1">
                <div>
                  <h3 className="text-sm font-bold text-stone-800 tracking-tight">Primary Visual Anchor</h3>
                  <p className="text-[9px] font-mono text-stone-400 uppercase tracking-widest mt-0.5">Index Source: Archive_01</p>
                </div>
                <span className="text-[10px] font-mono px-3 py-1 bg-stone-50 rounded-full border border-stone-100 text-stone-500">Dhaka, BD</span>
              </div>
            </motion.div>

            {/* INTERACTIVE COMPONENT 3: MINIMAL MUSIC DECK */}
            <div className="bg-white/40 backdrop-blur-md border border-white/90 p-5 rounded-2xl shadow-xs flex flex-col justify-between">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-9 h-9 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-xs transition-transform duration-[4s] ${isPlaying ? 'rotate-[360deg] repeat-infinite linear' : ''}`}>
                    💿
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-pink-700 tracking-widest uppercase block">Streaming Sub-System</span>
                    <h4 className="text-xs font-bold text-stone-800 tracking-tight">Ambient Texture (Lofi Treatment)</h4>
                  </div>
                </div>
                
                {/* Micro Visualizer Array */}
                <div className="flex items-end gap-[3px] h-4 px-2">
                  {[1, 2, 3, 4, 5, 6].map((bar) => (
                    <motion.div 
                      key={bar}
                      animate={isPlaying ? { height: [4, 16, 6, 12, 4] } : { height: 4 }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: bar * 0.12 }}
                      className="w-[3px] bg-pink-400 rounded-xs"
                    />
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-full py-2.5 rounded-xl font-mono text-[9px] tracking-widest uppercase font-black transition-all ${isPlaying ? 'bg-pink-100/80 text-pink-800 border border-pink-200' : 'bg-stone-900 text-white hover:bg-stone-800'}`}
              >
                {isPlaying ? "Suspend Acoustic Feed" : "Initialize Acoustic Feed"}
              </button>
            </div>

          </div>
        </main>

        {/* ── SECONDARY EDITORIAL POLAROID GRID ── */}
        <section className="w-full max-w-6xl mx-auto mt-16 mb-12">
          <div className="w-full border-t border-black/[0.04] pt-8 mb-6 flex justify-between items-center px-2">
            <h3 className="text-[10px] font-mono tracking-[0.2em] text-stone-400 uppercase">Auxiliary Asset Collection</h3>
            <span className="text-[9px] font-mono opacity-30">BATCH // 02-04</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white p-3 pb-8 rounded-2xl shadow-xs border border-black/[0.01]">
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-3">
                <img src={images[1]} className="w-full h-full object-cover" alt="" />
              </div>
              <p className="text-[9px] font-mono text-center tracking-wider text-stone-400 uppercase">Asset // Frame_02</p>
            </div>
            
            <div className="bg-white p-3 pb-8 rounded-2xl shadow-xs border border-black/[0.01]">
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-3">
                <img src={images[3]} className="w-full h-full object-cover" alt="" />
              </div>
              <p className="text-[9px] font-mono text-center tracking-wider text-stone-400 uppercase">Asset // Frame_03</p>
            </div>
            
            <div className="bg-white p-3 pb-8 rounded-2xl shadow-xs border border-black/[0.01] col-span-2 md:col-span-1">
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-3">
                <img src={images[4]} className="w-full h-full object-cover" alt="" />
              </div>
              <p className="text-[9px] font-mono text-center tracking-wider text-stone-400 uppercase">Asset // Frame_04</p>
            </div>
          </div>
        </section>

        {/* ── FOOTER FRAME ── */}
        <footer className="w-full max-w-6xl mx-auto mt-auto pt-6 border-t border-black/[0.03] flex flex-col sm:flex-row justify-between items-center text-[9px] font-mono opacity-40 uppercase tracking-[0.2em] gap-4">
          <span>Curated for Zaima Pookie</span>
          <span>All Elements Calibrated // 2026</span>
        </footer>

      </div>
    </div>
  );
}
