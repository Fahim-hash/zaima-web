"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Mail, Sparkles, Flower2 } from "lucide-react";

const memories = [
  { src: "/images/zaima-1.jpg", caption: "A little bit of sunshine ☀️", rotate: "-3deg" },
  { src: "/images/494686438_959940016217240_6648276104973416309_n.jpg", caption: "Pretty in every frame 🎀", rotate: "2deg" },
  { src: "/images/717337095_1162860456014927_7806065373298586581_n.jpg", caption: "Certified cutie alert 🍓", rotate: "-2deg" },
  { src: "/images/_MG_0269.jpg", caption: "My favourite little memory 💗", rotate: "3deg" },
];
const wishes = [
  "May your days be as soft as strawberry clouds. 🍓",
  "May every little dream find its way to you. ✨",
  "May you always have a reason to smile, pookie. 🎀",
  "May life spoil you with the sweetest surprises. 💌",
];
function getNextBirthday() {
  const now = new Date();
  const thisBirthday = new Date(now.getFullYear(), 10, 15, 0, 0, 0);
  return thisBirthday.getTime() > now.getTime() ? thisBirthday : new Date(now.getFullYear() + 1, 10, 15, 0, 0, 0);
}

export default function BirthdayPage() {
  const [target] = useState(() => getNextBirthday());
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [letterOpen, setLetterOpen] = useState(false);
  const [cakeLit, setCakeLit] = useState(true);
  const [wishIndex, setWishIndex] = useState(0);
  const [celebrating, setCelebrating] = useState(false);

  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  const isBirthday = useMemo(() => {
    const now = new Date();
    return now.getMonth() === 10 && now.getDate() === 15;
  }, []);

  const celebrate = () => {
    setCelebrating(true);
    window.setTimeout(() => setCelebrating(false), 2600);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fff7fb] text-[#713d58] selection:bg-pink-200 selection:text-[#713d58]">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-28 top-24 h-80 w-80 rounded-full bg-pink-200/40 blur-3xl" />
        <div className="absolute -right-24 top-[35%] h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl" />
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span key={i} className="absolute text-pink-300/60"
            style={{ left: ((i * 37) % 100) + "%", top: ((i * 53) % 100) + "%", fontSize: 12 + (i % 4) * 7 }}
            animate={{ y: [0, -18, 0], rotate: [0, 12, -8, 0], opacity: [0.35, 0.8, 0.35] }}
            transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.18 }}>
            {i % 3 === 0 ? "♡" : i % 3 === 1 ? "✦" : "୨୧"}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-5 sm:px-8">
        <nav className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/80 bg-white/65 px-5 py-3 shadow-[0_8px_30px_rgba(214,126,164,0.10)] backdrop-blur-xl">
          <a href="/zaima" className="text-xs font-black tracking-[0.18em] text-[#c76b98]">୨୧ ZAIMA'S WORLD</a>
          <span className="rounded-full bg-[#fff0f6] px-3 py-1.5 text-[10px] font-bold tracking-widest text-[#c76b98]">15 NOVEMBER 🎂</span>
        </nav>

        <section className="relative mx-auto flex min-h-[690px] max-w-5xl flex-col items-center justify-center py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-pink-200/80 bg-white/70 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#c76b98] shadow-sm">
              <Sparkles size={13} /> A whole day for my favourite human <Sparkles size={13} />
            </div>
            <div className="relative mx-auto mb-5 w-fit">
              <motion.span className="absolute -left-12 top-2 text-4xl" animate={{ rotate: [-12, 10, -12], y: [0, -7, 0] }} transition={{ duration: 3, repeat: Infinity }}>🎀</motion.span>
              <motion.span className="absolute -right-12 bottom-1 text-4xl" animate={{ rotate: [12, -10, 12], y: [0, -7, 0] }} transition={{ duration: 3.5, repeat: Infinity }}>🍓</motion.span>
              <p className="font-serif text-xl italic text-[#d887aa] sm:text-2xl">Happy birthday to my</p>
            </div>
            <h1 className="font-serif text-6xl font-black leading-[0.95] tracking-tight text-[#bd638e] sm:text-8xl md:text-9xl">
              Pookie<br /><span className="bg-gradient-to-r from-[#e99aba] via-[#bd6eaa] to-[#e6a0bd] bg-clip-text italic text-transparent">Zaima</span>
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#98677e] sm:text-base">
              Today the universe gets a little extra sparkle, because someone as lovely as you was born. This tiny corner of the internet is all yours, birthday girl. 💗
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a href="#birthday-countdown" className="rounded-full bg-[#c96f99] px-7 py-3.5 text-xs font-extrabold tracking-wide text-white shadow-[0_10px_25px_rgba(201,111,153,0.28)] transition hover:-translate-y-1 hover:bg-[#b95d88]">Enter your birthday world ♡</a>
              <button onClick={celebrate} className="rounded-full border border-[#edc3d5] bg-white/80 px-7 py-3.5 text-xs font-extrabold text-[#bd6e92] transition hover:-translate-y-1">Make it sparkle ✨</button>
            </div>
          </motion.div>
          <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-2xl" animate={{ y: [0, 9, 0] }} transition={{ duration: 2, repeat: Infinity }}>⌄</motion.div>
          <div className="absolute left-2 top-36 hidden -rotate-12 rounded-xl border border-white bg-white/70 p-3 shadow-lg sm:block"><span className="text-3xl">🧸</span><p className="mt-1 text-[9px] font-bold text-[#c77b9c]">cutie pie</p></div>
          <div className="absolute right-2 top-44 hidden rotate-12 rounded-xl border border-white bg-white/70 p-3 shadow-lg sm:block"><span className="text-3xl">🧁</span><p className="mt-1 text-[9px] font-bold text-[#c77b9c]">sweetest ever</p></div>
        </section>

        <section id="birthday-countdown" className="mx-auto max-w-4xl scroll-mt-10">
          <div className="rounded-[2rem] border border-white bg-white/75 p-7 text-center shadow-[0_20px_70px_rgba(205,126,162,0.13)] backdrop-blur-xl sm:p-10">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d58bab]">The sweetest day is {isBirthday ? "TODAY!" : "almost here"}</span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#a9587e] sm:text-4xl">{isBirthday ? "IT'S POOKIE DAY!! 🎂" : "Counting down to Zaima Day"}</h2>
            <div className="mx-auto mt-8 grid max-w-2xl grid-cols-4 gap-2 sm:gap-4">
              {Object.entries(timeLeft).map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-pink-100 bg-[#fff4f8] px-2 py-5 sm:py-6">
                  <div className="font-serif text-3xl font-black tabular-nums text-[#c66e97] sm:text-5xl">{String(value).padStart(2, "0")}</div>
                  <div className="mt-2 text-[8px] font-black uppercase tracking-[0.2em] text-[#bd8aa0] sm:text-[10px]">{label}</div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-[#b17a91]">15 · 11 · a date as special as you ♡</p>
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-5xl">
          <div className="mb-10 text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d58bab]">A little gallery of lovely</span>
            <h2 className="mt-3 font-serif text-4xl font-bold text-[#a9587e] sm:text-5xl">The Pookie Archives 📸</h2>
            <p className="mt-3 text-sm text-[#a9788d]">Proof that the camera roll has a favourite person.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-7 md:grid-cols-4">
            {memories.map((item, i) => (
              <motion.figure key={item.src} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -8, rotate: 0 }}
                style={{ rotate: item.rotate }} className={"rounded-2xl border-[7px] border-white bg-white p-2 pb-5 shadow-[0_12px_35px_rgba(179,105,140,0.15)] " + (i % 2 ? "mt-8" : "")}>
                <div className="aspect-[4/5] overflow-hidden rounded-lg bg-[#ffeaf2]">
                  <img src={item.src} alt={"Zaima memory " + (i + 1)} className="h-full w-full object-cover transition duration-700 hover:scale-105" loading="lazy" />
                </div>
                <figcaption className="pt-3 text-center font-serif text-xs italic text-[#b56d8c]">{item.caption}</figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-24 grid max-w-5xl items-center gap-10 md:grid-cols-2">
          <div className="text-center md:text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d58bab]">Make a little wish</span>
            <h2 className="mt-3 font-serif text-4xl font-bold text-[#a9587e] sm:text-5xl">A cake for<br />the birthday girl</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#a9788d]">Every candle is a little wish. Tap the button, make a wish, and let the birthday magic happen. 🎂</p>
            <button onClick={() => { setCakeLit(!cakeLit); celebrate(); }} className="mt-6 rounded-full bg-[#c96f99] px-7 py-3.5 text-xs font-extrabold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-1">{cakeLit ? "Blow the candles ✨" : "Light them again 🕯️"}</button>
          </div>
          <div className="relative flex min-h-[280px] items-center justify-center rounded-[2rem] border border-white bg-gradient-to-br from-[#ffe7f0] to-[#f7eaff] p-8">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-center">
              <div className="mb-1 flex justify-center gap-5 text-3xl">{[0, 1, 2].map(n => <span key={n} className="relative">{cakeLit && <motion.span animate={{ scale: [1, 1.25, 0.9, 1], opacity: [1, 0.8, 1] }} transition={{ duration: 0.7, repeat: Infinity, delay: n * 0.15 }} className="absolute -top-5 left-2 text-lg">🔥</motion.span>}🕯️</span>)}</div>
              <div className="mx-auto w-52 rounded-t-[2rem] border-b-8 border-[#e5a0b9] bg-[#ffcadc] py-5 text-5xl shadow-inner">🎂</div>
              <div className="mx-auto h-5 w-60 rounded-full bg-[#d982a8] shadow-lg" />
              <p className="mt-5 font-serif text-xl italic text-[#b8668d]">Make a wish, Zaima! ♡</p>
            </motion.div>
            <span className="absolute left-8 top-8 text-2xl">✦</span><span className="absolute bottom-8 right-8 text-2xl">♡</span>
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-4xl">
          <div className="rounded-[2rem] border border-white bg-white/75 p-8 text-center shadow-[0_20px_70px_rgba(205,126,162,0.12)] sm:p-12">
            <Flower2 className="mx-auto text-[#d98eae]" size={28} />
            <span className="mt-4 block text-[10px] font-black uppercase tracking-[0.3em] text-[#d58bab]">Little reminders for my pookie</span>
            <p className="mx-auto mt-5 min-h-20 max-w-xl font-serif text-2xl italic leading-relaxed text-[#a9587e] sm:text-3xl">“{wishes[wishIndex]}”</p>
            <button onClick={() => setWishIndex((wishIndex + 1) % wishes.length)} className="mt-5 rounded-full border border-pink-200 bg-[#fff4f8] px-6 py-3 text-xs font-bold text-[#bd6e92] transition hover:bg-pink-100">Another little wish ↻</button>
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-3xl text-center">
          <div className="mb-5 flex items-center justify-center gap-2 text-[#d58bab]"><Mail size={16} /><span className="text-[10px] font-black uppercase tracking-[0.3em]">Sealed with extra love</span></div>
          <h2 className="font-serif text-4xl font-bold text-[#a9587e] sm:text-5xl">A tiny letter for you</h2>
          <p className="mt-3 text-sm text-[#a9788d]">Psst… there's something inside the envelope.</p>
          <motion.button onClick={() => setLetterOpen(!letterOpen)} whileHover={{ y: -5, rotate: -1 }} whileTap={{ scale: 0.97 }} className="mx-auto mt-9 block w-full max-w-md rounded-3xl border border-[#f0c8d9] bg-gradient-to-br from-[#ffe8f1] to-[#fff7fb] p-8 shadow-[0_18px_50px_rgba(194,111,150,0.16)]">
            <div className="text-6xl">{letterOpen ? "💌" : "💝"}</div>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-[#bd6e92]">{letterOpen ? "Your letter is open ♡" : "Tap to open your letter"}</p>
            <AnimatePresence>
              {letterOpen && <motion.p initial={{ opacity: 0, height: 0, y: 10 }} animate={{ opacity: 1, height: "auto", y: 0 }} exit={{ opacity: 0, height: 0 }} className="mt-6 text-left font-serif text-base leading-8 text-[#8f5c74]">
                Dear Zaima,<br /><br />
                Happy birthday, my favourite pookie! 🎀 I hope this new chapter brings you endless happiness, peaceful days, exciting adventures, and all the little things your heart wishes for. Keep being your wonderfully unique self, keep smiling that lovely smile, and never forget how special you are.<br /><br />
                You deserve the softest days, the biggest dreams, and a lifetime of reasons to feel loved. Have the most magical birthday, birthday girl. 🍓<br /><br />
                With lots of love & extra sprinkles,<br />Your biggest pookie supporter ♡
              </motion.p>}
            </AnimatePresence>
          </motion.button>
        </section>

        <footer className="mx-auto mt-24 max-w-5xl border-t border-pink-200/70 pt-8 text-center">
          <div className="mb-3 flex justify-center gap-3 text-xl"><span>🎀</span><Heart className="mt-1 text-[#d987a9]" size={18} fill="currentColor" /><span>🍓</span></div>
          <p className="font-serif text-2xl italic text-[#b96d8e]">Made for Zaima, with a little extra pookie energy.</p>
          <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.25em] text-[#c99aad]">15 November · The world got luckier that day</p>
          <a href="/zaima" className="mt-6 inline-block text-[10px] font-bold text-[#c17c99] underline decoration-pink-200 underline-offset-4">Back to Zaima's cozy corner</a>
        </footer>
      </div>

      <AnimatePresence>
        {celebrating && <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
          {Array.from({ length: 65 }).map((_, i) => <motion.span key={i}
            initial={{ y: -30, x: ((i * 31) % 100) + "vw", rotate: 0, opacity: 1 }}
            animate={{ y: "110vh", rotate: 720, opacity: 0 }}
            transition={{ duration: 1.8 + (i % 8) * 0.13, delay: (i % 13) * 0.035, ease: "easeIn" }}
            className="absolute top-0 text-xl">{["💗", "🎀", "✨", "🍓", "💕", "🌸"][i % 6]}</motion.span>)}
        </div>}
      </AnimatePresence>
    </main>
  );
}
