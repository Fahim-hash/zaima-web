"use client";

import { useState } from "react";

export default function PookiePetniWebsite() {
  // States
  const [isPetni, setIsPetni] = useState(false);
  const [meterValue, setMeterValue] = useState(20);
  const [compliment, setCompliment] = useState("Reveal the truth below! ✨");

  // Bandhubi r real image URL placeholder
  // NOTE: REPLACE THESE URLs WITH ACTUAL IMAGE URLs OF YOUR FRIEND.
  const bandhubiImages = {
    pookie: "https://via.placeholder.com/600x800.png?text=Cute+Bandhubi+Pic", // Upload her cute pic and put link here
    petni: "https://via.placeholder.com/600x800/2a1040/cc99ff.png?text=Petni+Mode+Activated"  // Maybe a funny, scarier filter/expression pic here
  };

  // Compliments Pool based on Mood
  const compliments = {
    pookie: [
      "Tumi prithibir shobcheye cute pookie! 🌸",
      "Tomar smile ta ekdom taja golap er moto! ✨",
      "Kotha dilem, tomake r konodin petni bolbo na (ajker jonno)! 🎀",
      "Tumi jokhon bhalo thako, mone hoy dhoritri shanto! 🧸"
    ],
    petni: [
      "Tumi dekhte ekdom pori, tobe rasta cross korar shomoy puratono gachher shakchunni! 👹",
      "Exam er age 'kisu pori nai' bole top kora ultra-pro-max petni ekta! 📝👻",
      "Tomar moddhe ekta mecho petni lukiye achhe, jeta makhon-mach dekhle jagroto hoy! 🐟",
      "Ragle tomake eto baje lage jekhane bhoot-raও tomake dekhe 'Bismillah' pore! ☠️"
    ]
  };

  const generateCompliment = () => {
    const currentPool = isPetni ? compliments.petni : compliments.pookie;
    const randomIndex = Math.floor(Math.random() * currentPool.length);
    setCompliment(currentPool[randomIndex]);
  };

  // Dynamic Text/Emoji based on Meter
  const getMeterStatus = (val: number) => {
    if (val <= 30) return { text: "Normal Pookie (Safe Zone 🧸)", color: "text-green-500" };
    if (val <= 70) return { text: "Khaatash Mode (Needs Fuchka/Chocolate 🍫)", color: "text-yellow-500" };
    return { text: "Full-blown Petni (RUN FOR YOUR LIFE! 👹)", color: "text-red-500" };
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-700 ease-in-out ${
      isPetni ? "bg-slate-950 text-purple-200" : "bg-pink-50 text-pink-900"
    }`}>
      
      {/* 1. Header & Theme Switcher */}
      <header className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-2xl font-black tracking-wider uppercase">
          {isPetni ? "👹 Petni.exe" : "🎀 Pookie.Hub"}
        </h1>
        <button
          onClick={() => {
            setIsPetni(!isPetni);
            setCompliment("Mood changed! Click again to reveal new traits. 👀");
          }}
          className={`px-6 py-3 rounded-full font-bold shadow-lg transform active:scale-95 transition-all duration-300 ${
            isPetni 
              ? "bg-pink-500 text-white hover:bg-pink-400 shadow-pink-900/50" 
              : "bg-purple-600 text-white hover:bg-purple-500 shadow-pink-200"
          }`}
        >
          {isPetni ? "🌸 Switch to Pookie Mode" : "👹 Trigger Petni Mode"}
        </button>
      </header>

      {/* 2. Hero Section - Updated with dynamic image */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center text-center md:text-left">
          
          {/* Text Content */}
          <div>
            <div className="mb-6 inline-block animate-bounce text-7xl">
              {isPetni ? "🧛‍♀️" : "🧸"}
            </div>
            
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
              {isPetni ? (
                <span>Meet My Favourite <br/><span className="text-purple-500">Shakchunni</span> Bandhubi</span>
              ) : (
                <span>Meet My Favourite <br/><span className="text-pink-500">Pookie</span> Bandhubi</span>
              )}
            </h2>
            
            <p className="text-lg opacity-80 max-w-xl mb-12 mx-auto md:mx-0">
              {isPetni 
                ? "Ulta paa, elomelo chul, ar machher prothi obhinob attraction. Real monster traits, guaranteed."
                : "A bundle of joy, pure aesthetic feeds, soft soft kotha, ar ekta pure innocent atma. Treat with care."}
            </p>
          </div>

          {/* DYNAMIC IMAGE DISPLAY */}
          <div className="flex justify-center md:justify-end">
            <div className={`p-3 rounded-3xl shadow-xl transition-all duration-500 transform ${
              isPetni ? "bg-slate-900 border-purple-900 border-2 shadow-purple-900/40" : "bg-white border-pink-100 border-2 shadow-pink-200"
            }`}>
              {/* Replace placeholders with bandhubiImages.pookie/petni in real image sources */}
              <div className="w-[300px] h-[400px] md:w-[400px] md:h-[530px] rounded-2xl overflow-hidden relative group">
                <img 
                  src={isPetni ? bandhubiImages.petni : bandhubiImages.pookie} 
                  alt={isPetni ? "Petni Mode Bandhubi" : "Pookie Mode Bandhubi"} 
                  className="w-full h-full object-cover transition-all duration-500" 
                />
                
                {/* Mood Overlay */}
                <div className={`absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-500 ${isPetni ? "opacity-100" : "opacity-0"}`}>
                    <span className="text-2xl font-bold text-white bg-red-600 px-4 py-2 rounded-lg">PETNI MODE ACTIVE! 👹</span>
                </div>
                 <div className={`absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-500 ${!isPetni ? "opacity-100" : "opacity-0"}`}>
                    <span className="text-2xl font-bold text-white bg-pink-500 px-4 py-2 rounded-lg">POOKIE VIBES 🎀</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className={`my-20 border-t-2 ${isPetni ? "border-slate-800" : "border-pink-200"}`} />

        {/* 3. Interactive Petni Meter */}
        <section className={`p-8 rounded-3xl mb-12 shadow-xl border backdrop-blur-md transition-all duration-500 ${
          isPetni ? "bg-slate-900/60 border-purple-900/50" : "bg-white/80 border-pink-100"
        }`}>
          <h3 className="text-2xl font-bold mb-2">📊 Current Anger Meter</h3>
          <p className="text-sm opacity-70 mb-6">Adjust the slider to check her current monster state</p>
          
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={meterValue} 
            onChange={(e) => setMeterValue(Number(e.target.value))}
            className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-current mb-4"
          />
          
          <div className="text-xl font-extrabold mt-2 text-center">
            Level: <span className={isPetni ? "text-purple-400" : "text-pink-600"}>{meterValue}%</span>
          </div>
          <div className={`mt-2 font-bold text-lg text-center ${getMeterStatus(meterValue).color}`}>
            {getMeterStatus(meterValue).text}
          </div>
        </section>

        {/* 4. Dynamic Compliment Generator */}
        <section className={`p-8 rounded-3xl mb-12 text-center transition-all duration-500 ${
          isPetni ? "bg-purple-950/40 border border-purple-800" : "bg-pink-100/50 border border-pink-200"
        }`}>
          <h3 className="text-2xl font-bold mb-4">🔮 The Ultimate Truth Generator</h3>
          <div className="min-h-[80px] flex items-center justify-center px-4 py-3 bg-black/5 rounded-xl mb-6">
            <p className="text-xl font-medium italic">{compliment}</p>
          </div>
          <button
            onClick={generateCompliment}
            className={`px-8 py-3 rounded-xl font-bold tracking-wide transition-all ${
              isPetni 
                ? "bg-purple-600 text-white hover:bg-purple-700" 
                : "bg-pink-600 text-white hover:bg-pink-700"
            }`}
          >
            {isPetni ? "Get Roasted 💀" : "Get a Compliment 🌸"}
          </button>
        </section>

        {/* 5. Mecho Petni Treat Box */}
        <section className="mt-24">
          <h3 className="text-3xl font-bold mb-8">🍲 Food Treat Box (Bribery Options)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Food 1 */}
            <div className={`p-6 rounded-2xl border transition-all ${
              isPetni ? "bg-slate-900 border-purple-900" : "bg-white border-pink-200"
            }`}>
              <div className="text-4xl mb-3">🌶️</div>
              <h4 className="font-bold text-lg mb-1">Rakter Bodle Fuchka</h4>
              <p className="text-sm opacity-75">Spicy hot fuchka extra tok shoho. Eita dile mood instant 20% drop kore.</p>
            </div>

            {/* Food 2 */}
            <div className={`p-6 rounded-2xl border transition-all ${
              isPetni ? "bg-slate-900 border-purple-900" : "bg-white border-pink-200"
            }`}>
              <div className="text-4xl mb-3">🐟</div>
              <h4 className="font-bold text-lg mb-1">Mecho Target (Illish/Rui)</h4>
              <p className="text-sm opacity-75">Petni style deep-fried fish. Smell pailei gachh theke niche neme ashbe.</p>
            </div>

            {/* Food 3 */}
            <div className={`p-6 rounded-2xl border transition-all ${
              isPetni ? "bg-slate-900 border-purple-900" : "bg-white border-pink-200"
            }`}>
              <div className="text-4xl mb-3">☕</div>
              <h4 className="font-bold text-lg mb-1">Rong Cha (Anti-Bhoot Remedy)</h4>
              <p className="text-sm opacity-75">Shondha belar kacher cup-er rong cha. Brain refresh korar shera upay.</p>
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-xs opacity-50 max-w-7xl mx-auto border-t border-current/10 mt-12">
        Made for my favorite Pookie + Petni Bandhubi © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
