"use client";

import { useState } from "react";

export default function ZaimaTrollHub() {
  const [isWitch, setIsWitch] = useState(false);

  // 📷 Place your photos in public/images/ as pookie.jpg and petni.jpg
  const photos = {
    pookie: "/images/pookie.jpg",
    witch: "/images/petni.jpg"
  };

  return (
    <div className={`min-h-screen w-full font-mono flex flex-col items-center justify-between p-4 selection:bg-black selection:text-yellow-300 ${
      isWitch 
        ? "bg-red-700 text-black [background-image:radial-gradient(black_20%,transparent_20%)] [background-size:12px_12px]" 
        : "bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-300 text-pink-950"
    }`}>
      
      {/* Top Warning Banner */}
      <div className="w-full bg-black text-red-500 p-2 text-center text-xs font-black border-b-4 border-black uppercase tracking-widest z-50">
        ⚠️ ALERT: MANUALLY CODED TO EXPOSE THE REAL ZAIMA AKTER ⚠️
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col items-center justify-center my-6 max-w-sm w-full relative">
        
        {/* Dynamic Loud Headline */}
        <div className={`mb-6 text-center p-4 border-4 border-black rotate-[-1deg] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${
          isWitch ? "bg-black text-red-500" : "bg-white text-black"
        }`}>
          <h1 className="text-2xl font-black tracking-tight uppercase">
            {isWitch ? "🚨 RAGE MODE DETECTED!" : "✨ POOKIE VERIFIED ZONE"}
          </h1>
        </div>

        {/* Old School Windows Frame */}
        <div className="w-full bg-gray-200 border-4 border-black p-3 rounded-none shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col">
          
          {/* Windows Title Bar */}
          <div className="bg-blue-800 text-white px-2 py-1 flex justify-between text-xs font-bold mb-3 select-none">
            <span>zaima_identity_scan.exe</span>
            <span className="cursor-pointer">[X]</span>
          </div>

          {/* Image Canvas */}
          <div className="w-full aspect-[3/4] border-4 border-black bg-white overflow-hidden relative">
            <img 
              src={isWitch ? photos.witch : photos.pookie} 
              alt="Zaima Akter" 
              className={`w-full h-full object-cover transition-all ${
                isWitch ? "invert brightness-110 contrast-125 animate-pulse" : ""
              }`}
            />
            
            {/* Status Stamp */}
            <div className={`absolute top-4 left-4 border-2 border-black font-black text-xs px-2 py-1 uppercase rotate-[-15deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
              isWitch ? "bg-red-600 text-white" : "bg-green-400 text-black"
            }`}>
              {isWitch ? "👹 WITCH" : "🧁 ANGEL"}
            </div>
          </div>

          {/* Quick Caption */}
          <div className="mt-3 text-center bg-white p-2 border-2 border-black text-xs font-black uppercase tracking-wider">
            {isWitch ? "🔥 Threat Level: Run away fast" : "🎀 Threat Level: Looks safe"}
          </div>
        </div>

        {/* 💥 THE BIG RED BAIT TRIGGER BUTTON */}
        <button
          onClick={() => setIsWitch(!isWitch)}
          className={`mt-8 w-full py-4 text-xl font-black uppercase tracking-wider border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${
            isWitch 
              ? "bg-yellow-400 text-black hover:bg-yellow-300" 
              : "bg-red-600 text-white hover:bg-red-500 animate-bounce"
          }`}
        >
          {isWitch ? "⬅️ ESCAPE TO POOKIE" : "🚨 RUN SYSTEM DIAGNOSTIC"}
        </button>

      </div>

      {/* Retro Footer */}
      <div className="w-full text-center text-[10px] font-black border-t-2 border-black pt-4 pb-2">
        RELAXSTUDIO SYSTEM CHAOS LABS // NO AI TEMPLATES ALLOWED
      </div>

    </div>
  );
}
