'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function BentoHomePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [greeting, setGreeting] = useState('...');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Generic Mouse Event Handler to support both Div and Anchor tags
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const item = e.currentTarget;
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    item.style.setProperty('--x', `${x}px`);
    item.style.setProperty('--y', `${y}px`);
  };

  // Greeting & Timezone check
  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setGreeting(tz === 'Asia/Dhaka' ? 'Bhalo achen? 👋' : "What's up? 🌍");
  }, []);

  // Audio Handler
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.log("Audio play blocked:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative selection:bg-orange-600 font-sans overflow-x-hidden">
      
      {/* SVG Noise Overlay */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Header */}
      <div className="mb-12 text-center">
        <div className="text-[10px] tracking-[0.5em] text-gray-600 uppercase mb-4 transition-all">
          {greeting}
        </div>
        <h1 className="text-5xl font-black tracking-tighter">
          tometu<span className="text-orange-600">.</span>
        </h1>
      </div>

      {/* Bento Grid Container */}
      <div className="grid grid-cols-4 grid-rows-3 gap-5 max-w-[1000px] w-full h-[580px]">
        
        {/* Box 1: Large Intro */}
        <div 
          onMouseMove={handleMouseMove}
          className="bento-item col-span-2 row-span-2 p-10 flex flex-col justify-end border border-white/5 bg-white/[0.01] rounded-[2rem] relative overflow-hidden transition-all duration-500 hover:border-orange-500/30 hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center text-xl mb-6 shadow-lg shadow-orange-600/20">
            🍅
          </div>
          <h3 className="text-3xl font-black mb-2 tracking-tight">Creative Direction</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Shaping digital experiences with precision and passion since 2024. Stay tuned for the full reveal.
          </p>
        </div>

        {/* Box 2: Atmosphere / Audio */}
        <div 
          onClick={togglePlay}
          onMouseMove={handleMouseMove}
          className="bento-item col-span-2 p-8 flex items-center justify-between cursor-pointer border border-white/5 bg-white/[0.01] rounded-[2rem] relative overflow-hidden transition-all duration-500 hover:border-orange-500/30 hover:-translate-y-1"
        >
          <div>
            <p className="text-[10px] uppercase tracking-widest text-orange-600 font-bold mb-1">Atmosphere</p>
            <p className="text-xl font-bold">The Theme Song</p>
          </div>
          <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isPlaying ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'bg-white/5 text-orange-500'}`}>
            <span className="text-sm">
              {isPlaying ? '⏸' : '▶'}
            </span>
          </div>
          <audio ref={audioRef} loop src="/assets/theme.mp3" />
        </div>

        {/* Box 3: Link Vibe */}
        <a 
          href="/fun"
          onMouseMove={handleMouseMove}
          className="bento-item col-span-1 flex flex-col items-center justify-center gap-3 border border-white/5 bg-white/[0.01] rounded-[2rem] relative overflow-hidden transition-all duration-500 hover:border-orange-500/30 hover:-translate-y-1 group"
        >
          <span className="text-2xl text-gray-600 group-hover:text-orange-500 transition-colors duration-300">✨</span>
          <span className="text-[9px] uppercase tracking-widest font-bold text-gray-500">Vibe</span>
        </a>

        {/* Box 4: Link Shell */}
        <a 
          href="/terminal"
          onMouseMove={handleMouseMove}
          className="bento-item col-span-1 flex flex-col items-center justify-center gap-3 border border-white/5 bg-white/[0.01] rounded-[2rem] relative overflow-hidden transition-all duration-500 hover:border-orange-500/30 hover:-translate-y-1 group"
        >
          <span className="text-2xl text-gray-600 group-hover:text-orange-500 transition-colors duration-300">💻</span>
          <span className="text-[9px] uppercase tracking-widest font-bold text-gray-500">Shell</span>
        </a>

        {/* Box 5: Quote Box */}
        <div 
          onMouseMove={handleMouseMove}
          className="bento-item col-span-2 p-8 flex items-center justify-center border border-white/5 bg-white/[0.01] rounded-[2rem] relative overflow-hidden transition-all duration-500 hover:border-orange-500/30 hover:-translate-y-1"
        >
          <p className="text-gray-500 italic text-sm text-center leading-relaxed font-medium">
            "Design is not just what it looks like. Design is how it works."
          </p>
        </div>

      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-gray-700 animate-pulse">
          Experience Coming Soon
        </p>
      </div>

      {/* Embedded CSS for Spotlights */}
      <style jsx global>{`
        .bento-item::before {
          content: '';
          position: absolute;
          top: var(--y, 0px);
          left: var(--x, 0px);
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 69, 0, 0.12), transparent 70%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .bento-item:hover::before {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
