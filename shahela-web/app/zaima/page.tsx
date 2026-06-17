"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ZaimaFullFeaturedArchive() {
  const images = [
    "/images/zaima-1.jpg", 
    "/images/zaima-2.jpg", 
    "/images/zaima-3.jpg", 
    "/images/zaima-4.jpg", 
    "/images/zaima-5.jpg", 
  ];

  // Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Contact Form state
  const [msg, setMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-[#1A1A1A] font-sans antialiased selection:bg-pink-100 selection:text-pink-900 relative">
      
      {/* ── BACKGROUND GLOWS ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-pink-200/40 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-amber-100/30 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:60px_60px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* ── STICKY GLASS NAVBAR ── */}
        <div className="sticky top-0 w-full z-50 px-4 pt-4">
          <nav className="w-full max-w-7xl mx-auto px-6 py-5 flex justify-between items-center bg-white/50 backdrop-blur-md border border-white/70 rounded-2xl shadow-sm">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-pink-800">
              Zaima Apu
            </span>
            <div className="flex gap-6 text-[10px] font-mono tracking-widest uppercase opacity-60">
              <a href="#gallery" className="hover:text-pink-700 transition-colors">Gallery</a>
              <a href="#about" className="hover:text-pink-700 transition-colors">About</a>
              <a href="#contact" className="hover:text-pink-700 transition-colors">Contact</a>
            </div>
          </nav>
        </div>

        {/* ── HERO SECTION ── */}
        <main className="max-w-7xl w-full mx-auto px-6 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-[10px] font-bold tracking-[0.3em] text-pink-600 uppercase mb-4 block">
                Visual Identity Portfolio
              </span>
              <h1 className="text-5xl md:text-7xl font-light tracking-tighter leading-[1.05] text-[#111] mb-6">
                The essence of <br />
                <span className="font-serif italic text-pink-800">aesthetic</span> style.
              </h1>
              <p className="text-sm text-stone-500 max-w-sm leading-relaxed mb-8">
                A structured digital space focusing on clean layout design, premium compositions, and storytelling.
              </p>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="w-full max-w-md aspect-[3/4] p-3 bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/80 shadow-sm">
              <div className="w-full h-full rounded-[1.8rem] overflow-hidden">
                <img src={images[0]} className="w-full h-full object-cover" alt="Main Capture" />
              </div>
            </motion.div>
          </div>
        </main>

        {/* ── NEW STUFF 1: STATS / METRICS BAR ── */}
        <section className="max-w-7xl w-full mx-auto px-6 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl shadow-xs text-center">
            <div>
              <span className="block text-2xl font-light font-serif text-pink-900">05</span>
              <span className="text-[9px] font-mono uppercase tracking-wider text-stone-400">Curated Frames</span>
            </div>
            <div>
              <span className="block text-2xl font-light font-serif text-pink-900">HSC '26</span>
              <span className="text-[9px] font-mono uppercase tracking-wider text-stone-400">Timeline Milestone</span>
            </div>
            <div>
              <span className="block text-2xl font-light font-serif text-pink-900">Dhaka</span>
              <span className="text-[9px] font-mono uppercase tracking-wider text-stone-400">Operational Base</span>
            </div>
            <div>
              <span className="block text-2xl font-light font-serif text-pink-900">100%</span>
              <span className="text-[9px] font-mono uppercase tracking-wider text-stone-400">Aesthetic Precision</span>
            </div>
          </div>
        </section>

        {/* ── MAIN GALLERY GRID ── */}
        <section id="gallery" className="py-12 bg-stone-100/40 border-y border-black/[0.02]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-stone-400 mb-10 font-mono">Visual Indexes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              <div className="p-3 bg-white/50 backdrop-blur-md rounded-[2rem] border border-white/80 aspect-[4/3]">
                <div className="w-full h-full rounded-2xl overflow-hidden"><img src={images[1]} className="w-full h-full object-cover" alt="" /></div>
              </div>
              <div className="p-3 bg-white/50 backdrop-blur-md rounded-[2rem] border border-white/80 aspect-[4/3]">
                <div className="w-full h-full rounded-2xl overflow-hidden"><img src={images[2]} className="w-full h-full object-cover" alt="" /></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="md:col-span-2 p-3 bg-white/50 backdrop-blur-md rounded-[2rem] border border-white/80 aspect-[16/9]">
                <div className="w-full h-full rounded-2xl overflow-hidden"><img src={images[3]} className="w-full h-full object-cover" alt="" /></div>
              </div>
              <div className="p-3 bg-white/50 backdrop-blur-md rounded-[2rem] border border-white/80 aspect-[3/4] md:aspect-auto">
                <div className="w-full h-full rounded-2xl overflow-hidden"><img src={images[4]} className="w-full h-full object-cover" alt="" /></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── NEW STUFF 2: INTERACTIVE ABOUT & FAQ ACCORDION ── */}
        <section id="about" className="max-w-3xl w-full mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <span className="text-[9px] font-mono uppercase tracking-widest text-stone-400">Information Center</span>
            <h2 className="text-3xl font-light tracking-tight mt-2">Frequently Explored Insights</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "What is the primary theme of this space?", a: "This archive serves as a clean, structured visual layout dedicated to minimal compositions, editorial framing, and personal updates." },
              { q: "Which stack drives this interface?", a: "The site runs on Next.js 14, Tailwind CSS, and Framer Motion, fully optimized to maintain 60FPS backdrop blurs on clean ivory viewports." },
              { q: "Can these layouts be exported?", a: "Yes, the components are structural templates designed for rapid integration into clean creative design workflows." }
            ].map((faq, index) => (
              <div key={index} className="border border-black/[0.05] bg-white/30 backdrop-blur-sm rounded-xl overflow-hidden transition-all">
                <button onClick={() => toggleFaq(index)} className="w-full text-left px-6 py-4 flex justify-between items-center font-medium text-sm hover:bg-white/40 transition-colors">
                  <span>{faq.q}</span>
                  <span className="text-xs text-stone-400">{openFaq === index ? "−" : "+"}</span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 pt-1 text-xs text-stone-500 leading-relaxed border-t border-black/[0.02]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── NEW STUFF 3: INTERACTIVE CONTACT PANEL ── */}
        <section id="contact" className="max-w-xl w-full mx-auto px-6 pb-24">
          <div className="p-8 bg-white/40 backdrop-blur-md border border-white/80 rounded-3xl shadow-xs text-center">
            <span className="text-[9px] font-mono uppercase tracking-widest text-pink-700 block mb-2">Transmission</span>
            <h3 className="text-xl font-medium tracking-tight mb-6">Drop a Note to Zaima Apu</h3>
            
            {submitted ? (
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-xs text-emerald-700 bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl font-medium">
                Message successfully routed into the cloud archive!
              </motion.div>
            ) : (
              <div className="space-y-4">
                <textarea 
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Write your thoughts or feedback here..." 
                  rows={3}
                  className="w-full p-4 bg-white/50 border border-black/[0.06] rounded-xl text-xs placeholder-stone-400 focus:outline-none focus:border-pink-300 resize-none transition-colors"
                />
                <button 
                  onClick={() => { if(msg.trim()) setSubmitted(true); }}
                  className="w-full py-3 bg-stone-900 hover:bg-pink-800 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-colors shadow-xs"
                >
                  Send Message
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <div className="w-full px-4 pb-4 mt-auto">
          <footer className="w-full max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center text-[9px] font-mono tracking-widest opacity-50 uppercase bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl gap-4">
            <span>© 2026 Space Archive // Core Release</span>
            <div className="flex gap-4">
              <a href="#gallery" className="hover:underline">Top</a>
              <span>•</span>
              <span>All Systems Nominal</span>
            </div>
          </footer>
        </div>

      </div>
    </div>
  );
}
