'use client';

import React, { useState, useEffect } from 'react';

export default function LightsOutGame() {
  const GRID_SIZE = 4; // 4x4 Grid Matrix
  const [grid, setGrid] = useState<boolean[]>(Array(16).fill(false));
  const [moves, setMoves] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);

  // Initialize a random solvable board configuration
  const generateSolvableBoard = () => {
    let initialGrid = Array(16).fill(false);
    setMoves(0);
    setIsWon(false);

    // Apply random toggles to guarantee that the puzzle is fully solvable
    for (let i = 0; i < 8; i++) {
      const randomIdx = Math.floor(Math.random() * 16);
      initialGrid = simulateToggle(initialGrid, randomIdx);
    }
    
    // Ensure it doesn't start completely blank by default
    if (initialGrid.every(cell => !cell)) {
      initialGrid[0] = true;
      initialGrid[1] = true;
    }

    setGrid(initialGrid);
  };

  useEffect(() => {
    generateSolvableBoard();
  }, []);

  // Helper logic to switch state sets
  const simulateToggle = (boardState: boolean[], index: number): boolean[] => {
    const newBoard = [...boardState];
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;

    // Self Toggle
    newBoard[index] = !newBoard[index];

    // Top Toggle
    if (row > 0) newBoard[index - GRID_SIZE] = !newBoard[index - GRID_SIZE];
    // Bottom Toggle
    if (row < GRID_SIZE - 1) newBoard[index + GRID_SIZE] = !newBoard[index + GRID_SIZE];
    // Left Toggle
    if (col > 0) newBoard[index - 1] = !newBoard[index - 1];
    // Right Toggle
    if (col < GRID_SIZE - 1) newBoard[index + 1] = !newBoard[index + 1];

    return newBoard;
  };

  const handleTileAction = (index: number) => {
    if (isWon) return;

    const updatedGrid = simulateToggle(grid, index);
    setGrid(updatedGrid);
    setMoves((prev) => prev + 1);

    // If every item in matrix is false (all lights turned off) -> Game Won
    if (updatedGrid.every((cell) => !cell)) {
      setIsWon(true);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between p-6 font-sans antialiased">
      
      {/* Header Stat Panel */}
      <header className="max-w-md w-full mx-auto border border-zinc-900 bg-zinc-900/20 backdrop-blur rounded-2xl p-5 flex justify-between items-center shadow-xl mt-4">
        <div className="space-y-1">
          <h1 className="text-sm font-black tracking-widest text-zinc-400 uppercase">LIGHTS_OUT // MATRIX</h1>
          <p className="text-xs font-mono">
            {isWon ? (
              <span className="text-emerald-400 font-bold">System Overridden Successfully!</span>
            ) : (
              <span className="text-zinc-500">Deactivate all node blocks.</span>
            )}
          </p>
        </div>

        <div className="bg-zinc-900 px-4 py-1.5 rounded-xl border border-zinc-800 text-center font-mono">
          <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">Moves</span>
          <span className="text-base font-black text-white">{moves}</span>
        </div>
      </header>

      {/* Main Grid Field */}
      <main className="max-w-md w-full mx-auto my-auto py-6">
        <div className="grid grid-cols-4 gap-3 bg-zinc-900/40 p-4 rounded-3xl border border-zinc-900 shadow-2xl aspect-square">
          {grid.map((isActive, idx) => (
            <button
              key={idx}
              onClick={() => handleTileAction(idx)}
              disabled={isWon}
              className={`w-full h-full rounded-xl border transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-zinc-700 ${
                isActive 
                  ? 'bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/10' 
                  : 'bg-zinc-950 border-zinc-850 hover:border-zinc-800'
              }`}
            >
              {/* Central vector anchor inside tile */}
              <div className={`w-1.5 h-1.5 mx-auto rounded-full transition-all duration-300 ${
                isActive ? 'bg-blue-400 scale-125 shadow-glow' : 'bg-zinc-800'
              }`} />
            </button>
          ))}
        </div>

        {/* Dynamic Reset Vector Control */}
        <div className="mt-8 text-center min-h-[48px]">
          <button
            onClick={generateSolvableBoard}
            className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-zinc-800 hover:text-white transition shadow-md"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Reset Field Matrix
          </button>
        </div>
      </main>

      {/* System Footer Node */}
      <footer className="max-w-md w-full mx-auto flex justify-between items-center border-t border-zinc-900/60 pt-4 mb-4 text-[10px] font-mono text-zinc-600">
        <span>GRID FIELD // INVERSION</span>
        <span>2026</span>
      </footer>

    </div>
  );
}
