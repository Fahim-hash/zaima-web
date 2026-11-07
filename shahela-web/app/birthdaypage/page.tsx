"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Cake, Camera, Gift, Heart, Sparkles, Star } from "lucide-react";

const photos = [
  { src: "/images/shahela1.jpg", alt: "Shahela Akter", size: "tall" },
  { src: "/images/a1.jpg", alt: "A lovely memory", size: "wide" },
  { src: "/images/shahela2.jpg", alt: "Shahela Akter", size: "normal" },
  { src: "/images/a2.jpg", alt: "A lovely memory", size: "normal" },
  { src: "/images/shahela3.jpg", alt: "Shahela Akter", size: "tall" },
  { src: "/images/a3.jpg", alt: "A lovely memory", size: "normal" },
  { src: "/images/shahela4.jpg", alt: "Shahela Akter", size: "normal" },
  { src: "/images/a4.jpg", alt: "A lovely memory", size: "wide" },
  { src: "/images/shahela5.jpg", alt: "Shahela Akter", size: "tall" },
  { src: "/images/a5.png", alt: "A lovely memory", size: "normal" },
  { src: "/images/a6.jpg", alt: "A lovely memory", size: "normal" },
  { src: "/images/a7.jpg", alt: "A lovely memory", size: "wide" },
  { src: "/images/a8.jpg", alt: "A lovely memory", size: "normal" },
  { src: "/images/a9.jpg", alt: "A lovely memory", size: "normal" },
  { src: "/images/a10.jpg", alt: "A lovely memory", size: "tall" },
  { src: "/images/a11.jpg", alt: "A lovely memory", size: "normal" },
  { src: "/images/a12.jpg", alt: "A lovely memory", size: "normal" },
];

function getBirthdayTarget() {
  const now = new Date();
  const target = new Date(now.getFullYear(), 10, 25, 0, 0, 0);
  if (target.getTime() <= now.getTime()) target.setFullYear(target.getFullYear() + 1);
  return target;
}

export default function ShahelaBirthdayPage() {
  const target = useMemo(() => getBirthdayTarget(), []);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [letterOpen, setLetterOpen] = useState(false);
  const [surprise, setSurprise] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff8f7] text-[#503b4b] selection:bg-[#f5bfd2]">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#f8dce8]/70 blur-3xl" />
        <div className="absolute -right-40 top-[38%] h-[30rem] w-[30rem] rounded-full bg-[#e7defb]/70 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#ffe9c9]/60 blur-3xl" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col items-center justify-center px-5 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#efcbd8] bg-white/70 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#b46e8c] shadow-sm backdrop-blur">
          <Sparkles size={14} /> A little page made with love <Heart size={13} fill="currentColor" />
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.88, rotate: -4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, delay: 0.1 }} className="relative mb-9">
          <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-[#f4c5d6] via-[#fff] to-[#d9cafa] blur-xl opacity-80" />
          <div className="relative h-56 w-48 rotate-[-3deg] rounded-[2rem] border-[7px] border-white bg-white p-2 shadow-[0_20px_60px_rgba(151,93,124,0.2)] sm:h-72 sm:w-60">
            <img src="/images/shahela1.jpg" alt="Shahela Akter" className="h-full w-full rounded-[1.35rem] object-cover" />
            <span className="absolute -right-5 -top-5 grid h-14 w-14 rotate-12 place-items-center rounded-full bg-[#f7d8e5] text-2xl shadow-lg">🎀</span>
            <span className="absolute -bottom-4 -left-5 grid h-12 w-12 -rotate-12 place-items-center rounded-full bg-[#fff0c9] text-xl shadow-lg">♡</span>
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mb-3 text-xs font-bold uppercase tracking-[0.45em] text-[#bd829b]">The world got a little sweeter</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="text-5xl font-black leading-[0.98] tracking-[-0.06em] text-[#68465d] sm:text-7xl md:text-8xl">
          Happy Birthday
          <span className="mt-3 block bg-gradient-to-r from-[#d982a7] via-[#b58acb] to-[#e6a66e] bg-clip-text pb-2 text-transparent">Shahela Akter</span>
        </motion.h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-[#927887] sm:text-lg">A whole day dedicated to celebrating someone wonderfully special. Keep smiling, keep shining, and never stop being your lovely self. ✨</p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label} className="min-w-[76px] rounded-2xl border border-white bg-white/75 px-4 py-3 shadow-[0_8px_30px_rgba(155,106,132,0.09)] backdrop-blur">
              <div className="text-2xl font-black tabular-nums text-[#a86688] sm:text-3xl">{String(value).padStart(2, "0")}</div>
              <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#b99aaa]">{label}</div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#b58a9e]"><Cake size={15} /> NOVEMBER 25 <span>·</span> HER DAY <Heart size={13} fill="currentColor" /></div>
        <a href="#memories" className="mt-12 inline-flex items-center gap-2 rounded-full bg-[#79556e] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-[#79556e]/20 transition hover:-translate-y-1 hover:bg-[#93647f]">Explore her little world <ArrowDown size={15} /></a>
      </section>

      <section id="memories" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
        <div className="mb-10 flex flex-col items-center text-center">
          <span className="mb-3 text-2xl">📸</span>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c08ba4]">A gallery of lovely moments</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#68465d] sm:text-5xl">Little moments, big smiles.</h2>
          <p className="mt-3 max-w-lg text-sm leading-7 text-[#a58b9a]">A few snapshots from the photo collection — tap any picture to see it a little closer.</p>
        </div>
        <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
          {photos.map((photo, index) => (
            <motion.button key={photo.src} type="button" onClick={() => setSelectedPhoto(photo.src)} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: (index % 4) * 0.06 }} className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-[1.35rem] border-[5px] border-white bg-white text-left shadow-[0_10px_35px_rgba(139,91,119,0.12)]">
              <img src={photo.src} alt={photo.alt} loading={index < 4 ? "eager" : "lazy"} className={`w-full object-cover transition duration-700 group-hover:scale-105 ${photo.size === "tall" ? "aspect-[3/4]" : photo.size === "wide" ? "aspect-[5/4]" : "aspect-square"}`} />
              <span className="absolute inset-0 bg-gradient-to-t from-[#4e3146]/45 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="absolute bottom-3 right-3 translate-y-2 rounded-full bg-white/90 p-2 text-[#b66f91] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"><Camera size={15} /></span>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-5xl px-5 pb-24">
        <div className="overflow-hidden rounded-[2.5rem] border border-white bg-white/70 p-8 text-center shadow-[0_20px_70px_rgba(155,106,132,0.12)] backdrop-blur sm:p-14">
          <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[#f9e3ec] text-[#bb7896]"><Gift size={25} /></div>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c08ba4]">A tiny birthday surprise</p>
          <h2 className="mt-3 text-3xl font-black text-[#68465d] sm:text-4xl">One little wish, just for you.</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-[#9b8291]">May your days be filled with kind people, unexpected happiness, peaceful moments, and all the beautiful things your heart quietly wishes for.</p>
          <button onClick={() => setSurprise(true)} className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d889aa] to-[#b18bc8] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#c58caf]/25 transition hover:-translate-y-1"><Sparkles size={16} /> Open your surprise</button>
          <AnimatePresence>
            {surprise && <motion.div initial={{ opacity: 0, y: 12, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8 }} className="mx-auto mt-7 max-w-lg rounded-2xl bg-[#fff0f5] p-6 text-[#94617b]"><div className="mb-2 text-3xl">💗🌷✨</div><p className="font-serif text-lg leading-8">Dear Shahela, may this new chapter be softer, brighter, and more beautiful than the last. You deserve all the happiness in the universe. Happy birthday!</p><div className="mt-3 text-xs font-bold uppercase tracking-[0.25em]">With lots of love ♡</div></motion.div>}
          </AnimatePresence>
        </div>
      </section>

      <footer className="relative z-10 px-5 pb-12 text-center">
        <div className="mb-4 flex justify-center gap-3 text-[#d69ab4]"><Heart size={15} fill="currentColor" /><Star size={14} fill="currentColor" /><Heart size={15} fill="currentColor" /></div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a98599]">Made with love for Shahela Akter</p>
        <p className="mt-2 text-[10px] tracking-[0.18em] text-[#c4aebb]">A little corner of the internet, made just for your day.</p>
      </footer>

      <AnimatePresence>
        {selectedPhoto && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedPhoto(null)} className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-[#2c1b29]/90 p-5 backdrop-blur-md"><motion.img initial={{ scale: 0.9, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94 }} src={selectedPhoto} alt="Shahela memory" className="max-h-[88vh] max-w-full rounded-2xl border-4 border-white object-contain shadow-2xl" /><button onClick={() => setSelectedPhoto(null)} aria-label="Close photo" className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-2xl text-white">×</button></motion.div>}
      </AnimatePresence>
    </main>
  );
}
