"use client";

import { motion } from "framer-motion";

export default function ZaimaCleanArchive() {
  // 📷 5 images from public/images/
  const images = [
    "/images/zaima-1.jpg", 
    "/images/zaima-2.jpg", 
    "/images/zaima-3.jpg", 
    "/images/zaima-4.jpg", 
    "/images/zaima-5.jpg", 
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-[#1A1A1A] font-sans antialiased selection:bg-pink-100 selection:text-pink-900 relative">
      
      {/* ── LIGHTWEIGHT BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Very soft, static ambient glows (no heavy math) */}
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-pink-100/40 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-amber-50/50 blur-[100px]" />
        {/* Simple thin grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:80px_80px]"></div>
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Header */}
        <nav className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center border-b border-black/[0.04]">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-pink-700">
            Zaima Apu
          </span>
          <span className="text-[10px] font-mono tracking-widest opacity-40 uppercase">
            2026 // Personal Archive
          </span>
        </nav>

        {/* Hero Section */}
        <main className="max-w-7xl w-full mx-auto px-6 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-20">
          
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

            <div className="grid grid-cols-2 gap-10 pt-8 border-t border-black/[0.06] max-w-xs">
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

          {/* Main Hero Image (Image 1) */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="w-full max-w-md aspect-[3/4] bg-stone-100 rounded-[2.5rem] overflow-hidden shadow-xl border border-white relative group"
            >
              <img src={images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Zaima" />
            </motion.div>
          </div>
        </main>

        {/* Gallery Section (Images 2-5) */}
        <section className="bg-white/40 border-t border-black/[0.02] py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              {/* Image 2 */}
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-md border border-white">
                <img src={images[1]} className="w-full h-full object-cover" alt="" />
              </div>
              {/* Image 3 */}
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-md border border-white">
                <img src={images[2]} className="w-full h-full object-cover" alt="" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Image 4 */}
              <div className="md:col-span-2 aspect-[16/9] rounded-3xl overflow-hidden shadow-md border border-white">
                <img src={images[3]} className="w-full h-full object-cover" alt="" />
              </div>
              {/* Image 5 */}
              <div className="aspect-[3/4] md:aspect-auto rounded-3xl overflow-hidden shadow-md border border-white">
                <img src={images[4]} className="w-full h-full object-cover" alt="" />
              </div>
            </div>
          </div>
        </section>

        <footer className="w-full max-w-7xl mx-auto px-6 py-12 flex justify-between items-center text-[9px] font-mono tracking-widest opacity-40 uppercase">
          <span>© 2026 All Rights Reserved</span>
          <span>Personal Space</span>
        </footer>
      </div>
    </div>
  );
}
