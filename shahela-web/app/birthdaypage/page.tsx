"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Camera, Gift, Heart, Sparkles, Star } from "lucide-react";

const photos = [
  "/images/shahela1.jpg", "/images/a1.jpg", "/images/shahela2.jpg", "/images/a2.jpg",
  "/images/shahela3.jpg", "/images/a3.jpg", "/images/shahela4.jpg", "/images/a4.jpg",
  "/images/shahela5.jpg", "/images/a5.png", "/images/a6.jpg", "/images/a7.jpg",
  "/images/a8.jpg", "/images/a9.jpg", "/images/a10.jpg", "/images/a11.jpg", "/images/a12.jpg",
];

function birthdayDate() {
  const now = new Date();
  const date = new Date(now.getFullYear(), 10, 25);
  if (date.getTime() <= now.getTime()) date.setFullYear(date.getFullYear() + 1);
  return date;
}

export default function ShahelaBirthdayPage() {
  const target = useMemo(() => birthdayDate(), []);
  const [countdown, setCountdown] = useState([0, 0, 0, 0]);
  const [surprise, setSurprise] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setCountdown([
        Math.floor(diff / 86400000),
        Math.floor((diff / 3600000) % 24),
        Math.floor((diff / 60000) % 60),
        Math.floor((diff / 1000) % 60),
      ]);
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  const units = ["Days", "Hours", "Minutes", "Seconds"];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white selection:bg-orange-600 selection:text-white">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%270 0 180 180%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%271%27/%3E%3C/svg%3E')" }} />
      <div className="pointer-events-none fixed -left-40 top-20 h-[32rem] w-[32rem] rounded-full bg-orange-700/10 blur-[130px]" />
      <div className="pointer-events-none fixed -right-40 top-[40%] h-[34rem] w-[34rem] rounded-full bg-amber-600/[0.07] blur-[140px]" />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-7">
        <a href="/" className="text-xl font-black tracking-tighter">tometu<span className="text-orange-600">.</span></a>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400"><span className="h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_12px_#f97316]" /> A special edition</div>
      </header>

      <section className="relative z-10 mx-auto grid min-h-[82vh] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-12 md:grid-cols-2 md:gap-20 md:py-20">
        <motion.div initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }} className="order-2 flex flex-col items-center text-center md:order-1 md:items-start md:text-left">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/[0.08] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.35em] text-orange-400"><Sparkles size={13} /> November 25 · Her day</div>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.55em] text-gray-500">A little celebration for</p>
          <h1 className="text-6xl font-black leading-[0.88] tracking-[-0.075em] sm:text-7xl lg:text-[100px]">Happy<br /><span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-300 bg-clip-text pr-2 text-transparent">Birthday.</span></h1>
          <h2 className="mt-7 text-2xl font-bold tracking-tight text-white/90 sm:text-3xl">Shahela Akter<span className="text-orange-500">.</span></h2>
          <p className="mt-5 max-w-lg text-sm leading-8 text-gray-500 sm:text-base">Today is all about celebrating you. May your next chapter be filled with beautiful surprises, fearless dreams, genuine smiles, and moments worth remembering.</p>

          <div className="mt-9 grid w-full max-w-md grid-cols-4 gap-2 sm:gap-3">
            {countdown.map((value, i) => (
              <div key={units[i]} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] px-2 py-4 text-center backdrop-blur">
                <div className="text-2xl font-black tabular-nums text-orange-400 sm:text-3xl">{String(value).padStart(2, "0")}</div>
                <div className="mt-1 text-[8px] font-bold uppercase tracking-[0.18em] text-gray-600">{units[i]}</div>
              </div>
            ))}
          </div>

          <a href="#memories" className="mt-9 inline-flex items-center gap-3 rounded-full bg-orange-600 px-6 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-[0_10px_40px_rgba(234,88,12,0.2)] transition hover:-translate-y-1 hover:bg-orange-500">Explore the memories <ArrowDown size={14} /></a>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9, rotate: 3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.1, delay: 0.15 }} className="order-1 mx-auto w-full max-w-[430px] md:order-2">
          <div className="relative rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.015] p-3 shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
            <div className="absolute -inset-5 -z-10 rounded-[3rem] bg-orange-600/10 blur-3xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#111]">
              <img src="/images/shahela1.jpg" alt="Shahela Akter" className="h-full w-full object-cover opacity-90 transition duration-700 hover:scale-105 hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10" />
              <div className="absolute bottom-7 left-7 right-7">
                <div className="mb-2 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.35em] text-orange-400"><Star size={12} fill="currentColor" /> The birthday girl</div>
                <p className="text-3xl font-black tracking-tight">One of a kind<span className="text-orange-500">.</span></p>
              </div>
            </div>
            <div className="absolute -right-4 top-10 grid h-14 w-14 place-items-center rounded-2xl border border-orange-400/20 bg-[#17100c] text-orange-400 shadow-xl"><Sparkles size={23} /></div>
            <div className="absolute -bottom-4 -left-4 rounded-2xl border border-white/10 bg-[#111] px-5 py-3 shadow-xl"><p className="text-[8px] font-bold uppercase tracking-[0.3em] text-gray-600">Date to remember</p><p className="mt-1 text-sm font-black tracking-widest">25 <span className="text-orange-500">/</span> NOV</p></div>
          </div>
        </motion.div>
      </section>

      <section id="memories" className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-12">
        <div className="mb-10 flex flex-col justify-between gap-5 border-b border-white/[0.08] pb-7 sm:flex-row sm:items-end">
          <div><p className="mb-3 text-[9px] font-bold uppercase tracking-[0.45em] text-orange-500">The photo archive · 001—017</p><h2 className="text-4xl font-black tracking-[-0.05em] sm:text-5xl">Frames of <span className="text-gray-600">happiness.</span></h2></div>
          <p className="max-w-xs text-xs leading-6 text-gray-600">Every picture holds a little story. Tap a frame to bring the memory closer.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((src, index) => (
            <motion.button key={src} type="button" onClick={() => setSelected(src)} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (index % 4) * 0.05 }} className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] text-left ${index % 7 === 0 ? "row-span-2" : ""}`}>
              <img src={src} alt={`Shahela Akter memory ${index + 1}`} loading={index < 4 ? "eager" : "lazy"} className={`w-full object-cover grayscale-[15%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0 ${index % 7 === 0 ? "h-full min-h-[310px]" : "aspect-[4/5]"}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 transition group-hover:opacity-100" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/80"><span className="text-orange-500">{String(index + 1).padStart(2, "0")}</span><span className="h-px w-5 bg-orange-500/70" /><Camera size={12} /></div>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-gradient-to-br from-[#17110d] to-[#0b0b0b] p-8 sm:p-14">
          <div className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full bg-orange-600/10 blur-[90px]" />
          <div className="relative mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-400"><Gift size={24} /></div>
            <p className="text-[9px] font-bold uppercase tracking-[0.45em] text-orange-500">A little note for you</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">Make a wish. <span className="text-gray-600">The sky is yours.</span></h2>
            <p className="mt-5 text-sm leading-8 text-gray-500">May life surprise you in the loveliest ways. Keep your heart kind, your standards high, and your dreams even higher. You deserve a year that feels like magic.</p>
            <button onClick={() => setSurprise(true)} className="mt-8 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-600 px-7 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-white transition hover:-translate-y-1 hover:bg-orange-500"><Heart size={14} fill="currentColor" /> Reveal your birthday wish</button>
            <AnimatePresence>{surprise && <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-7 rounded-2xl border border-orange-500/20 bg-black/40 p-6"><div className="mb-3 text-2xl">🧡✨</div><p className="font-serif text-base leading-8 text-gray-300">Dear Shahela, may this new chapter bring you peace in your heart, courage in your steps, and countless reasons to smile. Happy birthday!</p><p className="mt-4 text-[9px] font-bold uppercase tracking-[0.3em] text-orange-500">With warmest wishes</p></motion.div>}</AnimatePresence>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/[0.07] px-6 py-9 text-center">
        <a href="/" className="text-lg font-black tracking-tighter">tometu<span className="text-orange-600">.</span></a>
        <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.35em] text-gray-700">A little birthday universe for Shahela Akter</p>
        <p className="mt-2 text-[9px] tracking-[0.2em] text-gray-800">Crafted with care · 25 November</p>
      </footer>

      <AnimatePresence>{selected && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/95 p-5 backdrop-blur-xl"><motion.img initial={{ scale: 0.92, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }} src={selected} alt="Shahela memory" className="max-h-[88vh] max-w-full rounded-xl border border-white/10 object-contain shadow-2xl" /><button onClick={() => setSelected(null)} aria-label="Close image" className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-2xl text-white">×</button></motion.div>}</AnimatePresence>
    </main>
  );
}
