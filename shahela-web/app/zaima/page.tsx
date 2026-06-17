"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ZaimaExtendedArchive() {
  const images = [
    "/images/zaima-1.jpg", 
    "/images/zaima-2.jpg", 
    "/images/zaima-3.jpg", 
    "/images/zaima-4.jpg", 
    "/images/zaima-5.jpg", 
  ];

  // Interactive Theme Context Mixer
  const [accentTone, setAccentTone] = useState("text-pink-700");
  const [bgGlow, setBgGlow] = useState("bg-pink-200/50");

  const themes = [
    { name: "Blossom Pink", accent: "text-pink-700", glow: "bg-pink-200/50" },
    { name: "Serene Amber", accent: "text-amber-700", glow: "bg-amber-200/50" },
    { name: "Minimal Stone", accent: "text-stone-700", glow: "bg-stone-300/40" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-[#1A1A1A] font-sans antialiased selection:bg-pink-100 selection:text-pink-900 relative">
      
      {/* ── DYNAMIC RENDERING GLOWS ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={`absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full ${bgGlow} blur-[120px] transition-all duration-1000`} />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-amber-100/30 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:80px_80px]"></div>
      </div>

      {/* ── CONTENT STREAM ── */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Sticky Glass Navbar */}
        <div className="sticky top-0 w-full z-50 px-4 pt-4">
          <nav className="w-full max-w-7xl mx-auto px-6 py-5 flex justify-between items-center bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.02)]">
            <span className={`text-xs font-bold uppercase tracking-[0.4em] transition-colors duration-500 ${accentTone}`}>
              Zaima Apu
            </span>
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-mono tracking-widest opacity-40 uppercase hidden sm:inline">
                HSC '26 // Visual Space
              </span>
            </div>
          </nav>
        </div>

        {/* Hero Section */}
        <main className="max-w-7xl w-full mx-auto px-6 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-20">
          <div className="w-full lg:w-1/2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-[10px] font-bold tracking-[0.3em] text-stone-400 uppercase mb-4 block">
                Visual Curation & Direction
              </span>
              <h1 className="text-5xl md:text-7xl font-light tracking-tighter leading-[1.05] text-[#111] mb-8">
                The essence of <br />
                <span className={`font-serif italic transition-colors duration-500 ${accentTone}`}>aesthetic</span> style.
              </h1>
            </motion.div>

            {/* Interactive Customizer Block */}
            <div className="p-5 bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl max-w-sm shadow-sm mb-8">
              <span className="block text-[9px] uppercase tracking-widest text-stone-400 mb-3 font-mono">Archive Atmosphere Mood</span>
              <div className="flex gap-2">
                {themes.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => { setAccentTone(t.accent); setBgGlow(t.glow); }}
                    className={`text-[10px] px-3 py-1.5 rounded-lg border font-medium transition-all ${accentTone === t.accent ? 'bg-white border-white shadow-sm font-bold' : 'bg-transparent border-black/5 hover:bg-white/30'}`}
                  >
                    {t.name.split(" ")[1]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Main Feature Frame */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="w-full max-w-md aspect-[3/4] p-3 bg-white/40 backdrop-blur-md rounded-[2.5rem] shadow-sm border border-white/70 group">
              <div className="w-full h-full rounded-[1.8rem] overflow-hidden relative">
                <img src={images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" alt="Primary Archive Element" />
              </div>
            </motion.div>
          </div>
        </main>

        {/* ── EXPANDED SEGMENT 1: VISUAL JOURNAL SLIDER ── */}
        <section className="py-12 bg-black/[0.01] border-y border-black/[0.02]">
          <div className="max-w-7xl mx-auto px-6 mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 font-mono">Structured Index Entries // 01-04</h3>
          </div>
          <div className="w-full overflow-x-auto flex gap-6 px-6 pb-6 scrollbar-hide snap-x max-w-7xl mx-auto">
            {[
              { id: "01", label: "Compositional Geometry" },
              { id: "02", label: "Natural Lighting Framing" },
              { id: "03", label: "Tone Balancing & Identity" },
              { id: "04", label: "Editorial Layout Design" }
            ].map((item, idx) => (
              <div key={item.id} className="min-w-[280px] md:min-w-[340px] snap-start p-4 bg-white/50 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm">
                <div className="aspect-[4/5] rounded-xl overflow-hidden mb-3 bg-stone-100">
                  <img src={images[(idx + 1) % images.length]} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex justify-between items-center px-1">
                  <span className="text-xs font-bold uppercase tracking-tight">{item.label}</span>
                  <span className="text-[10px] font-mono opacity-30">#{item.id}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── EXPANDED SEGMENT 2: CORE GALLERY GRID ── */}
        <section className="py-20 w-full">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              <div className="p-3 bg-white/40 backdrop-blur-md rounded-[2rem] shadow-sm border border-white/70 aspect-[4/3]">
                <div className="w-full h-full rounded-2xl overflow-hidden"><img src={images[1]} className="w-full h-full object-cover" alt="" /></div>
              </div>
              <div className="p-3 bg-white/40 backdrop-blur-md rounded-[2rem] shadow-sm border border-white/70 aspect-[4/3]">
                <div className="w-full h-full rounded-2xl overflow-hidden"><img src={images[2]} className="w-full h-full object-cover" alt="" /></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="md:col-span-2 p-3 bg-white/40 backdrop-blur-md rounded-[2rem] shadow-sm border border-white/70 aspect-[16/9]">
                <div className="w-full h-full rounded-2xl overflow-hidden"><img src={images[3]} className="w-full h-full object-cover" alt="" /></div>
              </div>
              <div className="p-3 bg-white/40 backdrop-blur-md rounded-[2rem] shadow-sm border border-white/70 aspect-[3/4] md:aspect-auto">
                <div className="w-full h-full rounded-2xl overflow-hidden"><img src={images[4]} className="w-full h-full object-cover" alt="" /></div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Area */}
        <div className="w-full px-4 pb-4 mt-auto">
          <footer className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center text-[9px] font-mono tracking-widest opacity-50 uppercase bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl">
            <span>© 2026 Space Archive</span>
            <span>All System Assets Operational</span>
          </footer>
        </div>

      </div>
    </div>
  );
}
