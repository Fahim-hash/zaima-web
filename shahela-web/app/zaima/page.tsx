"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function ZaimaLuxuryEdition() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const images = [
    "/images/zaima-1.jpg", 
    "/images/zaima-2.jpg", 
    "/images/zaima-3.jpg", 
    "/images/zaima-4.jpg", 
    "/images/zaima-5.jpg", 
  ];

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-[#0a0a0a] text-[#FAF9F6] font-sans antialiased selection:bg-pink-500 selection:text-white relative overflow-hidden">
      
      {/* ── LUXURY DYNAMIC BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Animated Gradient Orbs */}
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-pink-900/20 via-purple-900/10 to-transparent blur-[120px] opacity-60"
        />
        <motion.div 
          animate={{ x: [0, -80, 0], y: [0, 100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-rose-900/20 via-amber-900/5 to-transparent blur-[140px] opacity-40"
        />
        
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* ── FLOATING NAVIGATION ── */}
      <nav className="fixed top-0 w-full z-50 mix-blend-difference px-8 py-10 flex justify-between items-center">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm font-black uppercase tracking-[0.5em]"
        >
          Zaima Apu
        </motion.span>
        <div className="flex gap-10 text-[10px] font-bold uppercase tracking-widest opacity-60">
          <span>Portfolio '26</span>
          <span className="hidden md:block">Scroll to explore</span>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold tracking-[0.4em] text-pink-500 uppercase mb-6">
            Creative Direction // Zaima Akter
          </span>
          <h1 className="text-6xl md:text-[10rem] font-light tracking-tighter leading-[0.85] italic font-serif">
            The <span className="font-sans font-black not-italic tracking-[-0.05em] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">Aesthetic</span>
          </h1>
        </motion.div>

        {/* Main Floating Hero Image */}
        <motion.div 
          style={{ scale: scaleProgress }}
          className="relative w-full max-w-4xl aspect-video rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/10 group"
        >
          <img 
            src={images[0]} 
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
            alt="Zaima Feature" 
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
          <div className="absolute bottom-10 left-10 text-left">
            <p className="text-xs font-mono uppercase tracking-widest opacity-60 mb-2">Primary Subject</p>
            <h3 className="text-2xl font-bold">Main Archive 01</h3>
          </div>
        </motion.div>
      </section>

      {/* ── MASONRY GALLERY SECTION ── */}
      <section className="relative z-10 py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Card 02 */}
          <motion.div 
            whileInView={{ y: [100, 0], opacity: [0, 1] }}
            className="md:col-span-7 aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/5 backdrop-blur-xl group"
          >
            <img src={images[1]} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="" />
          </motion.div>

          {/* Card 03 */}
          <motion.div 
            whileInView={{ y: [150, 0], opacity: [0, 1] }}
            className="md:col-span-5 aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/5 mt-0 md:mt-40 group"
          >
            <img src={images[2]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" />
          </motion.div>

          {/* Card 04 (Full Width Luxury Break) */}
          <motion.div 
            whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
            className="md:col-span-12 aspect-[21/9] rounded-[3rem] overflow-hidden border border-white/5 group my-10"
          >
            <img src={images[3]} className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <h2 className="text-4xl md:text-6xl font-serif italic tracking-widest">Elegance Defined</h2>
            </div>
          </motion.div>

          {/* Card 05 */}
          <motion.div 
            whileInView={{ x: [-50, 0], opacity: [0, 1] }}
            className="md:col-span-5 aspect-square rounded-[2.5rem] overflow-hidden border border-white/5"
          >
            <img src={images[4]} className="w-full h-full object-cover" alt="" />
          </motion.div>

          {/* Luxury Text Block */}
          <div className="md:col-span-7 flex items-center justify-center p-12">
            <p className="text-2xl md:text-4xl font-light leading-relaxed text-stone-400">
              "<span className="text-white">Style is a way to say who you are without having to speak.</span>" 
              A curated journey through the lens of Zaima Akter.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 py-20 px-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-xs font-black uppercase tracking-[0.4em] mb-2">Zaima Apu</span>
          <span className="text-[10px] font-mono opacity-40 uppercase">Aesthetic Personal Space // 2026</span>
        </div>
        <div className="h-px flex-1 bg-white/5 mx-10 hidden md:block" />
        <div className="flex gap-6">
          <button className="px-6 py-3 rounded-full border border-white/20 text-[10px] font-bold uppercase hover:bg-white hover:text-black transition-all">Back to top</button>
        </div>
      </footer>

    </div>
  );
}
