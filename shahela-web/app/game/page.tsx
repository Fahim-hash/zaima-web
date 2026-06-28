'use client';

import React, { useState, useEffect } from 'react';

export default function MemoryMatrix() {
  const [gridSize] = useState<number>(16); // 4x4 Grid
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [level, setLevel] = useState<number>(1);
  const [gameState, setGameState] = useState<'idle' | 'watching' | 'playing' | 'failed'>('idle');

  // Generate random pattern based on current level
  const generatePattern = (currentLevel: number) => {
    setGameState('watching');
    setIsShowing(true);
    setPlayerSequence([]);
    
    // Level 1 = 3 blocks, Level 2 = 4 blocks, etc.
    const count = currentLevel + 2; 
    const newSequence: number[] = [];
    
    while (newSequence.length < count) {
      const randomTile = Math.floor(Math.random() * gridSize);
      if (!newSequence.includes(randomTile)) {
        newSequence.push(randomTile);
      }
    }
    
    setSequence(newSequence);

    // Hide pattern after 1.2 seconds
    setTimeout(() => {
      setIsShowing(false);
      setGameState('playing');
    }, 1200);
  };

  const handleTileClick = (index: number) => {
    if (gameState !== 'playing') return;

    // If clicked a wrong tile
    if (!sequence.includes(index)) {
      setGameState('failed');
      return;
    }

    // If already clicked, ignore
    if (playerSequence.includes(index)) return;

    const newPlayerSeq = [...playerSequence, index];
    setPlayerSequence(newPlayerSeq);

    // Check if level cleared
    if (newPlayerSeq.length === sequence.length) {
      setGameState('idle');
      setLevel((prev) => prev + 1);
    }
  };

  const startNextLevel = () => {
    generatePattern(level);
  };

  const resetGame = () => {
    setLevel(1);
    setSequence([]);
    setPlayerSequence([]);
    setGameState('idle');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between p-6 font-sans antialiased">
      
      {/* Header Panel */}
      <header className="max-w-md w-full mx-auto border border-zinc-900 bg-zinc-900/20 backdrop-blur rounded-2xl p-5 flex justify-between items-center shadow-xl mt-4">
        <div className="space-y-1">
          <h1 className="text-sm font-black tracking-widest text-zinc-400 uppercase">Memory Matrix</h1>
          <div className="text-xs font-mono">
            {gameState === 'idle' && <span className="text-zinc-500">Ready to test?</span>}
            {gameState === 'watching' && <span className="text-amber-400 animate-pulse">Memorize the pattern...</span>}
            {gameState === 'playing' && <span className="text-blue-400">Recreate the grid!</span>}
            {gameState === 'failed' && <span className="text-rose-500 font-bold">Sequence Broken</span>}
          </div>
        </div>

        <div className="bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800 text-center font-mono">
          <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">Level</span>
          <span className="text-xl font-black text-white">{level}</span>
        </div>
      </header>

      {/* Main Grid Arena */}
      <main className="max-w-md w-full mx-auto my-auto py-6">
        <div className="grid grid-cols-4 gap-3 bg-zinc-900/50 p-4 rounded-3xl border border-zinc-900 shadow-2xl aspect-square">
          {Array.from({ length: gridSize }).map((_, idx) => {
            const isTarget = sequence.includes(idx);
            const isClicked = playerSequence.includes(idx);
            
            let tileStyle = "bg-zinc-950 border-zinc-850 hover:border-zinc-800";
            
            if (isShowing && isTarget) {
              tileStyle = "bg-amber-500/20 border-amber-500 shadow-lg shadow-amber-500/10";
            } else if (gameState === 'playing' && isClicked) {
              tileStyle = "bg-blue-600 border-blue-400 shadow-lg shadow-blue-500/20";
            } else if (gameState === 'failed' && isTarget) {
              tileStyle = "bg-rose-950/40 border-rose-600";
            }

            return (
              <button
                key={idx}
                onClick={() => handleTileClick(idx)}
                disabled={gameState !== 'playing'}
                className={`w-full h-full rounded-xl border transition-all duration-200 focus:outline-none disabled:cursor-default ${tileStyle}`}
              />
            );
          })}
        </div>

        {/* Dynamic Controls Layout */}
        <div className="mt-8 text-center min-h-[48px]">
          {gameState === 'idle' && (
            <button
              onClick={startNextLevel}
              className="inline-flex items-center gap-2 bg-white text-zinc-950 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-zinc-200 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
              {level === 1 ? 'Start Test' : 'Next Level'}
            </button>
          )}

          {gameState === 'failed' && (
            <button
              onClick={resetGame}
              className="inline-flex items-center gap-2 bg-rose-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-rose-500 transition shadow-lg shadow-rose-600/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Try Again
            </button>
          )}
        </div>
      </main>

      {/* Footer Details */}
      <footer className="max-w-md w-full mx-auto flex justify-between items-center border-t border-zinc-900/60 pt-4 mb-4 text-[10px] font-mono text-zinc-600">
        <span>MATRIX RESOLUTION v4.0</span>
        <span>2026 // SYSTEM</span>
      </footer>

    </div>
  );
}
