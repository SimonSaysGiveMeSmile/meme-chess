'use client';
import React from 'react';
import { MODELS, type ModelOption } from '@/lib/models';

interface SettingsPanelProps {
  apiKey: string;
  setApiKey: (val: string) => void;
  baseUrl: string;
  setBaseUrl: (val: string) => void;
  model: string;
  setModel: (val: string) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  apiKey, setApiKey, baseUrl, setBaseUrl, model, setModel
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl text-white w-full max-w-md">
      <h2 className="text-2xl font-black mb-6 uppercase tracking-tighter italic">Neural Link</h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase opacity-60 ml-1">API Key</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-ant-..."
            className="w-full bg-black/40 border border-white/10 p-3 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all placeholder:text-white/20"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase opacity-60 ml-1">Base URL</label>
          <input
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="https://api.anthropic.com"
            className="w-full bg-black/40 border border-white/10 p-3 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all placeholder:text-white/20"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase opacity-60 ml-1">Compute Model</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full bg-black/40 border border-white/10 p-3 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all appearance-none"
          >
            {MODELS.map(m => (
              <option key={m.id} value={m.id} className="bg-zinc-900">
                {m.label} {m.note ? `(${m.note})` : ''}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
