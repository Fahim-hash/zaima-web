"use client";

import { useState } from "react";

export default function PookiePetniWebsite() {
  // States
  const [isPetni, setIsPetni] = useState(false);
  const [meterValue, setMeterValue] = useState(20);
  const [compliment, setCompliment] = useState("Click the button below to reveal the truth! ✨");

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
      <header className="p-6 flex justify-between items-center max-w-5xl mx-auto">
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

      {/* 2. Hero Section */}
      <main className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="mb-8 inline-block animate-bounce text-7xl">
          {isPetni ? "🧛‍♀️" : "🧸"}
        </div>
        
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          {isPetni ? (
            <span>The Traditional Bengali <br/><span className="text-purple-500">Shakchunni</span> of My Life</span>
          ) : (
            <span>The Softest, Smartest <br/><span className="text-pink-500">Pookie Bandhubi</span> Ever</span>
          )}
        </h2>
        
        <p className="text-lg opacity-80 max-w-xl mx-auto mb-12">
          {isPetni 
            ? "Ulta paa, elomelo chul, ar machher prothi obhinob attraction. Meet the real her when she hangs out with her favorite human."
            : "A bundle of joy, aesthetic feeds, soft soft kotha, ar ekta pure innocent atma. Treat with care and chocolates."}
        </p>

        <hr className={`my-12 border-t-2 ${isPetni ? "border-slate-800" : "border-pink-200"}`} />

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
          
          <div className="text-xl font-extrabold mt-2">
            Level: <span className={isPetni ? "text-purple-400" : "text-pink-600"}>{meterValue}%</span>
          </div>
          <div className={`mt-2 font-bold text-lg ${getMeterStatus(meterValue).color}`}>
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
        <section className="mt-16">
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
      <footer className="py-8 text-center text-xs opacity-50 max-w-5xl mx-auto border-t border-current/10 mt-12">
        Made for my favorite Pookie + Petni Bandhubi © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
