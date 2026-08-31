'use client';
import React from 'react';
import { GameApp } from '@/components/GameApp';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-400/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10">
        <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center pointer-events-none">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white drop-shadow-lg pointer-events-auto cursor-default">
            Meme <span className="text-yellow-400">Chess</span>
          </h1>
          <div className="flex gap-4 pointer-events-auto">
             <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest">
               Local Rank: #1
             </div>
          </div>
        </header>

        <GameApp />
      </div>
    </div>
  );
}
