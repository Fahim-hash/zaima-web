"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ZaimaUniverse() {
  const [mood, setMood] = useState<"pookie" | "petni">("pookie");
  const [clickCount, setClickCount] = useState(0);

  // 📷 Just upload her photos to public folder as pookie.jpg and petni.jpg
  const images = {
    pookie: "/images/pookie.jpg", 
    petni: "/images/petni.jpg",   
  };

  const handlePrankTrigger = () => {
    if (mood === "pookie") {
      setMood("petni");
      setClickCount((c) => c + 1);
    } else {
      setMood("pookie");
    }
  };

  return (
    <div className={`min-h-screen w-full relative overflow-hidden font-sans select-none transition-colors duration-500 ${
      mood === "petni" ? "bg-[#0d0202] text-red-500" : "bg-[#fff5f7] text-pink-600"
    }`}>

      {/* 🎭 System Labels */}
      <div className="absolute top-10 left-10 text-[10px] font-mono opacity-40 uppercase tracking-widest hidden md:block">
        Project_ID: {mood === "pookie" ? "Zaima_Pookie_Core" : "Zaima_Petni_Mode"}
      </div>
      <div className="absolute bottom-10 right-10 text-[10px] font-mono opacity-40 uppercase tracking-widest hidden md:block">
        RelaxStudio Lab // 2026
      </div>

      {/* 💥 Main Offset Split Layout */}
      <main className="max-w-6xl mx-auto min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 p-6 md:p-12 relative z-10">
        
        {/* Left Side: Dynamic Typography */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
          <span className={`text-xs font-black tracking-[0.4em] uppercase mb-4 block transition-colors ${
            mood === "petni" ? "text-red-700" : "text-pink-400"
          }`}>
            {mood === "pookie" ? "— Documenting Her Reality" : "— Run for Your Life"}
          </span>
          
          <div className="h-40 md:h-56 relative overflow-hidden mb-6">
            <AnimatePresence mode="wait">
              <motion.h1
                key={mood}
                initial={{ y: 80, opacity: 0, rotate: mood === "petni" ? -3 : 0 }}
                animate={{ y: 0, opacity: 1, rotate: mood === "petni" ? -3 : 0 }}
                exit={{ y: -80, opacity: 0 }}
                transition={{ type: "spring", damping: 12 }}
                className={`text-5xl md:text-7xl font-black tracking-tighter leading-none ${
                  mood === "petni" ? "text-red-600" : "text-pink-600"
                }`}
              >
                {mood === "pookie" ? (
                  <>Zaima Akter.<br />The Softest.<br />Pookie.</>
                ) : (
                  <>Zaima Akter.<br />The Mecho.<br />Petni.</>
                )}
              </motion.h1>
            </AnimatePresence>
          </div>

          <p className="text-sm font-medium opacity-60 max-w-sm mx-auto md:mx-0 leading-relaxed italic">
            {mood === "pookie" 
              ? "A bundle of pure aesthetic feeds, soft soft kotha, ar tulor megher moto ekta innocent atma."
              : "Ulta paa, elomelo chul, ar akaron e khediye jaoar prothi obhinob attraction. Real monster features unlocked!"}
          </p>
        </div>

        {/* Right Side: Visual Frame Container */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative">
          
          {/* Quirky Floating Tag */}
          <motion.div 
            animate={{ rotate: mood === "petni" ? [5, -5, 5] : 5 }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className={`absolute -top-6 z-20 px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
              mood === "petni" ? "bg-red-600 text-white border-black" : "bg-yellow-300 text-black border-black"
            }`}
          >
            {mood === "pookie" ? "🍭 100% Verified Cute Zaima" : "🚨 Danger Shakchunni Zone"}
          </motion.div>

          {/* Main Picture Frame (Neo-Brutalist Layout) */}
          <div className={`w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden border-4 border-black transition-all duration-300 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] ${
            mood === "petni" ? "bg-black scale-105" : "bg-white"
          }`}>
            <img 
              src={mood === "pookie" ? images.pookie : images.petni} 
              alt="Zaima Akter" 
              className={`w-full h-full object-cover transition-transform duration-500 ${
                mood === "petni" ? "scale-110 grayscale contrast-125 brightness-90" : "scale-100"
              }`}
            />
          </div>

          {/* ⚡ The Action Bait Trigger Button */}
          <button
            onClick={handlePrankTrigger}
            className={`mt-12 px-8 py-4 rounded-xl text-md font-black uppercase tracking-wider border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${
              mood === "petni" 
                ? "bg-pink-400 text-black hover:bg-pink-300" 
                : "bg-red-600 text-white hover:bg-red-500 animate-pulse"
            }`}
          >
            {mood === "petni" ? "🌸 Pookie Mode E Ferao" : "✨ Click to Reveal Zaima's Truth"}
          </button>

          {/* Hidden Tracker Logs */}
          {clickCount > 0 && mood === "petni" && (
            <span className="text-xs font-mono opacity-50 mt-4 block">
              Zaima triggered {clickCount} times today.
            </span>
          )}

        </div>
      </main>

      {/* Background Matrix Pattern Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
    </div>
  );
}
