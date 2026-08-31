'use client';
import React from 'react';
import { THEMES, type Theme } from '@/lib/themes';

interface ThemePickerProps {
  currentTheme: string;
  setTheme: (id: string) => void;
}

export const ThemePicker: React.FC<ThemePickerProps> = ({ currentTheme, setTheme }) => {
  return (
    <div className="flex flex-wrap gap-3 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl">
      {Object.entries(THEMES).map(([id, theme]) => (
        <button
          key={id}
          onClick={() => setTheme(id)}
          className={`group relative w-12 h-12 rounded-full transition-all duration-300 transform hover:scale-125 ${
            currentTheme === id ? 'ring-4 ring-yellow-400 ring-offset-4 ring-offset-black scale-110' : 'opacity-70 hover:opacity-100'
          }`}
          title={theme.name}
          style={{ backgroundColor: theme.boardColor }}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-bold text-black uppercase pointer-events-none">
            {theme.name.slice(0, 3)}
          </div>
        </button>
      ))}
    </div>
  );
};
