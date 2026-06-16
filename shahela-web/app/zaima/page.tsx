"use client";

import { motion } from "framer-motion";

export default function ZaimaPremiumUniverse() {
  const images = [
    "/images/zaima-1.jpg", 
    "/images/zaima-2.jpg", 
    "/images/zaima-3.jpg", 
    "/images/zaima-4.jpg", 
    "/images/zaima-5.jpg", 
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-[#1A1A1A] font-sans antialiased selection:bg-pink-100 selection:text-pink-900 relative overflow-hidden">
      
      {/* ── HIGH PERFORMANCE LIGHTWEIGHT BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* Hardware Accelerated Subtle Glows */}
        <motion.div 
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -30, 20, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-pink-200/20 blur-[90px] transform-gpu will-change-transform"
        />
        <motion.div 
          animate={{
            x: [0, -15, 25, 0],
            y: [0, 20, -25, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-10 right-[-10%] w-[400px] h-[400px] rounded-full bg-amber-100/30 blur-[80px] transform-gpu will-change-transform"
        />

        {/* Ultra-light CSS Grid Layout Lines */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:60px_60px]"></div>
        
        {/* FIXED: Removed the CPU-destroying SVG Noise filter completely */}
      </div>

      {/* ── CONTENT LAYER ── */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <nav className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center border-b border-black/[0.03]">
          <span className="text-xs font-bold uppercase tracking-[0.35em] opacity-90 text-pink-700">
            Zaima Apu
          </span>
          <span className="text-[10px] font-mono tracking-widest opacity-40 uppercase">
            Edition 2026 // Creative Archive
          </span>
        </nav>

        {/* Hero Section */}
        <main className="max-w-7xl w-full mx-auto px-6 py-12 md:py-20 flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Typography */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="text-xs font-bold tracking-[0.3em] text-pink-600/90 uppercase mb-4 block">
                Visual Exhibition
              </span>
              <h1 className="text-5xl md:text-7xl font-light tracking-tighter leading-[1.02] text-[#111] mb-8">
                Capturing the <br />
                <span className="font-serif italic font-normal text-pink-700/90">essence</span> of style.
              </h1>
              <p className="text-sm md:text-base text-stone-500 max-w-md leading-relaxed font-medium mb-12">
                A curated digital archive dedicated to elegant visuals, clean contemporary compositions, and a thoughtful perspective on daily aesthetics.
              </p>
            </motion.div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-12 pt-8 border-t border-black/[0.06] max-w-sm">
              <div>
                <span className="block text-[9px] uppercase tracking-widest text-stone-400 mb-1.5 font-mono">Creative Direction</span>
                <span className="text-xs font-bold tracking-wide uppercase opacity-80">Zaima Akter</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-widest text-stone-400 mb-1.5 font-mono">Curated Index</span>
                <span className="text-xs font-bold tracking-wide uppercase opacity-80">Studio Space</span>
              </div>
            </div>
          </div>

          {/* Right: Main Hero Card (Image 1) */}
          <div className="w-full lg:w-1/2 flex justify-center relative px-4">
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-md aspect-[3/4] bg-stone-100 rounded-[2rem] overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.06)] border border-white/60 relative group transform-gpu"
            >
              <img 
                src={images[0]} 
                alt="Zaima Akter Portrait" 
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </motion.div>
          </div>
        </main>

        {/* ── GALLERY STACK SECTION (Images 2, 3, 4, 5) ── */}
        <section className="bg-stone-50/60 border-t border-b border-black/[0.02] py-20 w-full relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] opacity-60">Visual Index Expansion</h2>
              <p className="text-xs text-stone-400 mt-2 md:mt-0 font-mono">01 — 05 // COMPREHENSIVE CURATION</p>
            </div>
            
            {/* Split Images (2 & 3) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              <div className="aspect-[4/3] bg-stone-200/40 rounded-2xl overflow-hidden shadow-sm border border-white/60">
                <img src={images[1]} alt="Collection 02" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[4/3] bg-stone-200/40 rounded-2xl overflow-hidden shadow-sm border border-white/60">
                <img src={images[2]} alt="Collection 03" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Asymmetric Grid Rows (4 & 5) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="md:col-span-2 aspect-[16/9] bg-stone-200/40 rounded-2xl overflow-hidden shadow-sm border border-white/60">
                <img src={images[3]} alt="Collection 04" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[3/4] md:aspect-auto bg-stone-200/40 rounded-2xl overflow-hidden shadow-sm border border-white/60">
                <img src={images[4]} alt="Collection 05" className="w-full h-full object-cover" />
              </div>
            </div>

          </div>
        </section>

        {/* Footer */}
        <footer className="w-full max-w-7xl mx-auto px-6 py-12 flex justify-between items-center text-[9px] font-mono tracking-[0.2em] opacity-40 uppercase">
          <span>© 2026 All Rights Reserved</span>
          <span>Personal Space</span>
        </footer>
      </div>

    </div>
  );
}
