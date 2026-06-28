import React from 'react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

interface GameNode {
  slug: string;
  title: string;
  description: string;
  difficulty: string;
}

// Function to auto-scan folders and read meta.json dynamically
function getDynamicGames(): GameNode[] {
  const gamesDirectory = path.join(process.cwd(), 'app/game');
  
  try {
    const folders = fs.readdirSync(gamesDirectory);
    
    const games = folders.map((folder) => {
      const folderPath = path.join(gamesDirectory, folder);
      const metaPath = path.join(folderPath, 'meta.json');
      
      // Target only directories that contain a meta.json file
      if (fs.statSync(folderPath).isDirectory() && fs.existsSync(metaPath)) {
        const metaContent = fs.readFileSync(metaPath, 'utf8');
        const metaData = JSON.parse(metaContent);
        
        return {
          slug: folder,
          title: metaData.title || folder,
          description: metaData.description || 'No description provided.',
          difficulty: metaData.difficulty || 'Unknown'
        };
      }
      return null;
    });

    // Filter out null values
    return games.filter((game): game is GameNode => game !== null);
  } catch (error) {
    console.error("Error reading games directory:", error);
    return [];
  }
}

export const revalidate = 0; // Dynamic rendering ensures it checks folders on every load

export default function AutoGameDashboard() {
  const dynamicGames = getDynamicGames();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between p-6 md:p-12 font-sans antialiased">
      
      {/* Header Notification Status */}
      <header className="max-w-4xl w-full mx-auto border border-zinc-900 bg-zinc-900/20 backdrop-blur rounded-2xl p-6 shadow-xl mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-emerald-500 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h1 className="text-base font-black tracking-widest text-white uppercase">FS_SCANNER // DASHBOARD</h1>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">
                Status: <span className="text-emerald-400">{dynamicGames.length} Sub-systems Loaded</span>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Grid Ecosystem */}
      <main className="max-w-4xl w-full mx-auto my-auto py-12">
        {dynamicGames.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl">
            <p className="text-sm text-zinc-500 font-mono">No active game subfolders found with meta.json</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dynamicGames.map((game) => (
              <Link 
                key={game.slug} 
                href={`/game/${game.slug}`}
                className="group relative rounded-2xl border border-zinc-900 bg-zinc-900/40 p-6 block transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/60 hover:-translate-y-0.5"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {game.title}
                  </h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-800 bg-zinc-950 text-zinc-400">
                    {game.difficulty}
                  </span>
                </div>
                
                <p className="text-sm text-zinc-400 leading-relaxed font-normal pr-4">
                  {game.description}
                </p>

                <div className="mt-6 flex justify-end">
                  <div className="text-xs font-mono text-zinc-500 group-hover:text-white transition-colors flex items-center gap-1.5">
                    Execute Subpage 
                    <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer className="max-w-4xl w-full mx-auto flex justify-between items-center border-t border-zinc-900 pt-4 mb-4 text-[10px] font-mono text-zinc-600">
        <span>AUTO_CONFIG MATRIX SYSTEM</span>
        <span>2026</span>
      </footer>

    </div>
  );
}
