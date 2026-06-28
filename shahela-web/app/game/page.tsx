'use client';

import React, { useState, useEffect } from 'react';

export default function GuessingGame() {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('Start guessing...');
  const [score, setScore] = useState<number>(20);
  const [highscore, setHighscore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isWon, setIsWon] = useState<boolean>(false);

  // Initialize game on mount
  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    setTargetNumber(Math.floor(Math.random() * 20) + 1);
    setGuess('');
    setMessage('Start guessing...');
    setScore(20);
    setGameOver(false);
    setIsWon(false);
  };

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameOver) return;

    const guessNum = parseInt(guess);

    // Validation
    if (!guessNum || guessNum < 1 || guessNum > 20) {
      setMessage('⛔ Please enter a number between 1 and 20!');
      return;
    }

    // Match conditions
    if (guessNum === targetNumber) {
      setMessage('🎉 Correct Number! You Win!');
      setIsWon(true);
      setGameOver(true);
      if (score > highscore) {
        setHighscore(score);
      }
    } else {
      if (score > 1) {
        setMessage(guessNum > targetNumber ? '📈 Too high!' : '📉 Too low!');
        setScore(prev => prev - 1);
      } else {
        setMessage('💥 Game Over! You lost the game.');
        setScore(0);
        setGameOver(true);
      }
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 flex flex-col justify-between p-6 md:p-12 font-sans select-none text-white ${
      isWon ? 'bg-emerald-600' : gameOver ? 'bg-rose-950' : 'bg-zinc-900'
    }`}>
      
      {/* Header Controls */}
      <header className="flex justify-between items-center max-w-4xl w-full mx-auto">
        <button 
          onClick={initGame}
          className="px-6 py-2.5 bg-white text-zinc-900 hover:bg-zinc-100 font-bold rounded-xl shadow-lg transform active:scale-95 transition"
        >
          Again!
        </button>
        <p className="text-sm font-mono tracking-wider opacity-70">(Between 1 and 20)</p>
      </header>

      {/* Main Visual Arena */}
      <main className="max-w-4xl w-full mx-auto text-center my-12 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            Guess My Number!
          </h1>
          <p className="text-lg md:text-xl font-medium text-zinc-300 min-h-[2rem]">
            {message}
          </p>
        </div>

        {/* Hidden / Revealed Target Shield */}
        <div className="relative flex justify-center items-center py-6">
          <div className="absolute inset-x-0 h-[2px] bg-zinc-700/50 z-0" />
          <div className="w-32 h-32 bg-white text-zinc-900 rounded-2xl flex items-center justify-center text-4xl md:text-5xl font-black shadow-2xl border-4 border-zinc-900 z-10 font-mono animate-bounce">
            {gameOver ? targetNumber : '?'}
          </div>
        </div>

        {/* Action Panel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-2xl mx-auto pt-6 items-center">
          
          {/* Left Side: Inputs */}
          <form onSubmit={handleCheck} className="space-y-4">
            <input 
              type="number" 
              disabled={gameOver}
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="0"
              className="w-full text-center bg-transparent border-4 border-white rounded-2xl py-4 text-4xl font-black font-mono focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed placeholder-zinc-600"
            />
            <button 
              type="submit"
              disabled={gameOver}
              className="w-full py-4 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed font-extrabold text-lg uppercase tracking-wider rounded-2xl shadow-xl transition-all active:scale-[0.98]"
            >
              Check Score
            </button>
          </form>

          {/* Right Side: Score Analytics */}
          <div className="space-y-4 text-left font-mono text-lg bg-zinc-950/30 p-6 rounded-2xl border border-white/5">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span>💯 Current Score:</span>
              <span className="font-black text-2xl text-purple-400">{score}</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span>🥇 High Score:</span>
              <span className="font-black text-2xl text-emerald-400">{highscore}</span>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Branding */}
      <footer className="text-center font-mono text-xs text-white/40 max-w-4xl w-full mx-auto">
        BUILT WITH NEXT.JS APP ROUTER // 2026
      </footer>

    </div>
  );
}
