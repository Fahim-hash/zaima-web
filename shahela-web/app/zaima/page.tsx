"use client";

import { motion } from "framer-motion";

export default function ZaimaGlassArchive() {
  const images = [
    "/images/zaima-1.jpg", 
    "/images/zaima-2.jpg", 
    "/images/zaima-3.jpg", 
    "/images/zaima-4.jpg", 
    "/images/zaima-5.jpg", 
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-[#1A1A1A] font-sans antialiased selection:bg-pink-100 selection:text-pink-900 relative">
      
      {/* ── PERFORMANCE BACKGROUND GLOWS ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Slightly stronger colors so the glass frosting is highly visible */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-pink-200/50 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-amber-200/40 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:80px_80px]"></div>
      </div>

      {/* ── CONTENT LAYER ── */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Glassmorphism Navigation Bar */}
        <div className="sticky top-0 w-full z-50 px-4 pt-4">
          <nav className="w-full max-w-7xl mx-auto px-6 py-5 flex justify-between items-center bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.04)]">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-pink-700">
              Zaima Apu
            </span>
            <span className="text-[10px] font-mono tracking-widest opacity-40 uppercase">
              2026 // Glass Archive
            </span>
          </nav>
        </div>

        {/* Hero Section */}
        <main className="max-w-7xl w-full mx-auto px-6 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-20">
          
          {/* Left Text Column */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] font-bold tracking-[0.3em] text-pink-500 uppercase mb-4 block">
                Visual Curation
              </span>
              <h1 className="text-5xl md:text-7xl font-light tracking-tighter leading-[1.05] text-[#111] mb-8">
                The essence of <br />
                <span className="font-serif italic text-pink-800/80">aesthetic</span> style.
              </h1>
              <p className="text-sm text-stone-500 max-w-sm leading-relaxed mb-10">
                A curated digital space focusing on clean compositions and personal visual storytelling for Zaima Akter.
              </p>
            </motion.div>

            {/* Details Glass Panel */}
            <div className="grid grid-cols-2 gap-10 p-6 bg-white/30 backdrop-blur-sm border border-white/50 rounded-2xl max-w-xs shadow-sm">
              <div>
                <span className="block text-[9px] uppercase tracking-widest text-stone-400 mb-1 font-mono">Subject</span>
                <span className="text-xs font-bold uppercase opacity-80">Zaima Akter</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-widest text-stone-400 mb-1 font-mono">Location</span>
                <span className="text-xs font-bold uppercase opacity-80">Dhaka, BD</span>
              </div>
            </div>
          </div>

          {/* Main Hero Card (Glass Framed Image 1) */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="w-full max-w-md aspect-[3/4] p-3 bg-white/40 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white/70 group"
            >
              <div className="w-full h-full rounded-[1.8rem] overflow-hidden relative">
                <img 
                  src={images[0]} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" 
                  alt="Zaima Portrait" 
                />
              </div>
            </motion.div>
          </div>
        </main>

        {/* Gallery Grid Section */}
        <section className="py-20 w-full">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Top Row: Images 2 & 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              <div className="p-3 bg-white/40 backdrop-blur-md rounded-[2rem] shadow-sm border border-white/70 aspect-[4/3]">
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <img src={images[1]} className="w-full h-full object-cover" alt="" />
                </div>
              </div>
              <div className="p-3 bg-white/40 backdrop-blur-md rounded-[2rem] shadow-sm border border-white/70 aspect-[4/3]">
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <img src={images[2]} className="w-full h-full object-cover" alt="" />
                </div>
              </div>
            </div>

            {/* Bottom Row: Images 4 & 5 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="md:col-span-2 p-3 bg-white/40 backdrop-blur-md rounded-[2rem] shadow-sm border border-white/70 aspect-[16/9]">
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <img src={images[3]} className="w-full h-full object-cover" alt="" />
                </div>
              </div>
              <div className="p-3 bg-white/40 backdrop-blur-md rounded-[2rem] shadow-sm border border-white/70 aspect-[3/4] md:aspect-auto">
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <img src={images[4]} className="w-full h-full object-cover" alt="" />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Glass Footer Panel */}
        <div className="w-full px-4 pb-4 mt-auto">
          <footer className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center text-[9px] font-mono tracking-widest opacity-50 uppercase bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl">
            <span>© 2026 All Rights Reserved</span>
            <span>Personal Space</span>
          </footer>
        </div>

      </div>
    </div>
  );
}
