'use client';
import React from 'react';
import { modelLabel } from '@/lib/models';

interface Move {
  move: string;
  model: string;
  quip?: string;
  timestamp: number;
}

interface MoveHistoryProps {
  history: Move[];
}

export const MoveHistory: React.FC<MoveHistoryProps> = ({ history }) => {
  return (
    <div className="flex-1 max-w-xs h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex flex-col shadow-2xl overflow-hidden">
      <h2 className="text-xl font-black mb-4 uppercase tracking-tighter italic text-white">Timeline</h2>
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {history.length === 0 && (
          <p className="text-white/40 text-sm italic">Waiting for the first move...</p>
        )}
        {history.map((item, i) => (
          <div key={i} className="bg-black/30 p-3 rounded-xl border border-white/10 group hover:border-yellow-400/50 transition-colors">
            <div className="flex justify-between items-start mb-1">
              <span className="font-mono font-bold text-yellow-400">#{i + 1} {item.move}</span>
              <span className="text-[10px] text-white/40 font-mono">
                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
            <div className="text-[11px] text-white/60 mb-2 font-medium italic">
              Model: <span className="text-white">{modelLabel(item.model)}</span>
            </div>
            {item.quip && (
              <div className="text-xs text-yellow-200 font-bold italic leading-tight">
                "{item.quip}"
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
