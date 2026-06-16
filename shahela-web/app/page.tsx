"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** * SHAHELA UNIVERSE - PREMIUN NOIR EDITION
 * Built by: RelaxStudio (2026)
 * Theme: Upoonasik Dark / Cyber-Noir
 */

// --- Sub-Components ---

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-24 relative group">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-rose-500 text-[10px] font-bold tracking-[0.3em] block mb-3 font-['Hind_Siliguri'] opacity-70">
          — {subtitle} —
        </span>
        <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white/90 font-['Tiropi'] leading-tight drop-shadow-2xl">
          {title}
        </h2>
        <div className="h-[1px] w-20 bg-gradient-to-r from-rose-600 to-transparent mt-6 rounded-full opacity-40"></div>
      </motion.div>
    </div>
  );
}

function MainCard({ id, img, title, desc, reverse = false }: { id: number; img: string; title: string; desc: string; reverse?: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24 mb-48 group`}
    >
      <div className="w-full md:w-3/5 relative">
        <div className="absolute -inset-4 bg-rose-600/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition duration-1000"></div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[30px] md:rounded-[40px] border border-white/10 bg-white/5 shadow-2xl">
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.5 }}
            src={img} 
            alt={title} 
            className="w-full h-full object-cover transition-all duration-1000" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
        </div>
      </div>

      <div className="w-full md:w-2/5 text-center md:text-left p-8 bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[30px] md:rounded-[40px] shadow-inner">
        <span className="text-rose-600 font-black text-xs tracking-[0.5em] mb-4 block font-['Hind_Siliguri']">অধ্যায় ০{id}</span>
        <h3 className="text-4xl font-black mb-6 tracking-tighter italic text-white/90 font-['Tiropi']">{title}</h3>
        <p className="text-lg italic text-white/40 leading-relaxed font-light mb-8 font-['Noto_Serif_Bengali']">"{desc}"</p>
        <button className="text-[9px] font-black uppercase tracking-[0.4em] text-rose-500 border-b border-rose-500/30 pb-2 hover:text-white hover:border-white transition-all font-['Hind_Siliguri']">আর্কইভ দেখুন</button>
      </div>
    </motion.div>
  );
}

// --- Main Page Component ---

export default function ShahelaUniverse() {
  const [mounted, setMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mainImages = [
    { id: 1, img: "/images/shahela1.jpg", title: "স্নিগ্ধ হাসির মায়াজাল", desc: "এক চিমটি হাসিতেই যেন থমকে দাঁড়ায় মহাবিশ্বের সব ব্যস্ততা।" },
    { id: 2, img: "/images/shahela2.jpg", title: "শীতল চাহনি", desc: "কালো চশমার আড়ালে লুকানো রহস্যময়ী এক হাসি।" },
    { id: 3, img: "/images/shahela3.jpg", title: "শাশ্বত স্নিগ্ধতা", desc: "শান্ত চোখের মায়ায় বোনা এক টুকরো নিভৃত কাব্য।" },
    { id: 4, img: "/images/shahela4.jpg", title: "নিভৃত আনমনা", desc: "সবুজের ইশারায় দূর অজানা কোনো স্বপ্নের খোঁজে।" },
    { id: 5, img: "/images/shahela5.jpg", title: "রেশমি রিনঝিন", desc: "লাল চুড়ির আবদারে মিশে থাকা এক চিলতে দুষ্টুমি আর আভিজাত্য।" },
  ];

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white font-serif selection:bg-rose-500/30 overflow-x-hidden">
      
      {/* 🖼️ Fixed Background */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] ease-linear scale-110"
        style={{ backgroundImage: "url('/assets/background.png')" }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[5px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="relative z-10"
      >
        {/* Navbar */}
        <nav className="fixed top-8 left-0 w-full z-[100] px-10 pointer-events-none">
          <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/[0.03] border border-white/10 backdrop-blur-2xl px-8 py-4 rounded-full pointer-events-auto">
            <div className="text-xl font-black italic tracking-tighter">SHAHELA<span className="text-rose-600"> APU</span></div>
            <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest">System_Online</div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-8 pt-48 pb-32">
          <header className="mb-64 text-center">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 1 }}>
              <h1 className="text-7xl md:text-[220px] font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/5 leading-[0.8]">Shahela.</h1>
              <p className="font-['Noto_Serif_Bengali'] text-[15px] tracking-[0.3em] text-rose-500/80 font-semibold mt-10">
                — এই উপন্যাসের প্রধান চরিত্র —
              </p>
            </motion.div>
          </header>

          <SectionTitle 
            title="মূল গ্যালারি" 
            subtitle="নির্বাচিত অধ্যায়সমূহ" 
          />
          
          <div className="mb-80">
            {mainImages.map((card, idx) => (
              <MainCard key={card.id} id={card.id} img={card.img} title={card.title} desc={card.desc} reverse={idx % 2 !== 0} />
            ))}
          </div>

          {/* 🎞️ Memory Grid */}
          <section className="bg-white/[0.02] border border-white/10 backdrop-blur-3xl rounded-[60px] md:rounded-[100px] p-8 md:p-24 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/5 blur-[150px] rounded-full"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/10 pb-12 gap-8">
              <div>
                <h3 className="text-[11px] tracking-[1.2em] uppercase text-rose-600 font-black mb-4 font-['Hind_Siliguri']">
                  আড়ালে জমানো
                </h3>
                <p className="text-3xl font-light italic text-white/60 leading-tight font-['Noto_Serif_Bengali']">
                  অনন্তকাল থেকে ধার করা, <br/> কিছু থমকে যাওয়া মুহূর্ত।
                </p>
              </div>
              <div className="px-10 py-4 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono italic text-white/30 tracking-widest uppercase">
                সংগ্রহশালা: সম্পূর্ণ
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8">
              {[...Array(12)].map((_, i) => {
                const imgUrl = `/images/a${i + 1}${i === 4 ? '.png' : '.jpg'}`;
                return (
                  <motion.div 
                    key={i} 
                    layoutId={`img-${imgUrl}`}
                    onClick={() => setSelectedImage(imgUrl)}
                    whileHover={{ scale: 0.94, rotate: i % 2 === 0 ? 2 : -2 }}
                    className="aspect-square bg-white/5 rounded-[25px] md:rounded-[35px] overflow-hidden border border-white/10 group cursor-pointer shadow-lg relative"
                  >
                    <img src={imgUrl} alt={`Archive ${i+1}`} className="w-full h-full object-cover transition duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-rose-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Lightbox Modal */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
                className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-20 cursor-zoom-out"
              >
                <motion.div layoutId={`img-${selectedImage}`} className="relative max-w-5xl w-full aspect-square md:aspect-video rounded-[30px] md:rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
                  <img src={selectedImage} className="w-full h-full object-cover" alt="Zoomed Archive" />
                </motion.div>
                <button className="absolute top-10 right-10 text-white/50 hover:text-white text-[10px] tracking-widest uppercase font-black font-['Hind_Siliguri']">বন্ধ করুন [ESC]</button>
              </motion.div>
            )}
          </AnimatePresence>

          <footer className="mt-80 pt-24 border-t border-white/5 flex flex-col items-center">
            <div className="text-[11px] tracking-[2em] uppercase text-white/10 mb-16 text-center pl-[2em]">RELAXSTUDIO DIGITAL ARCHIVE</div>
            <motion.div 
               animate={{ opacity: [0.05, 0.1, 0.05] }} 
               transition={{ repeat: Infinity, duration: 4 }} 
               className="text-[100px] md:text-[150px] font-black italic tracking-tighter text-white select-none pointer-events-none pb-20 opacity-5"
            >
              SHAHELA
            </motion.div>
          </footer>
        </main>
      </motion.div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&family=Noto+Serif+Bengali:wght@300;400;700&family=Tiropi:ital,wght@1,400;1,700&display=swap');
        
        ::-webkit-scrollbar { display: none; }
        html { scroll-behavior: smooth; }
        body { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
          overflow: ${selectedImage ? 'hidden' : 'auto'}; 
          background: #050505;
        }
      `}</style>
    </div>
  );
}
