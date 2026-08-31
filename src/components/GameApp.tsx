'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { THEMES, getTheme } from '@/lib/themes';
import { MODELS, DEFAULT_MODEL, validModel } from '@/lib/models';
import { SettingsPanel } from './SettingsPanel';
import { ThemePicker } from './ThemePicker';
import { MoveHistory } from './MoveHistory';

interface Move {
  move: string;
  model: string;
  quip?: string;
  timestamp: number;
}

export const GameApp: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [themeId, setThemeId] = useState('official');
  const [apiKey, setApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState('https://api.anthropic.com');
  const [model, setModel] = useState(DEFAULT_MODEL);
  const [history, setHistory] = useState<Move[]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [whiteTime, setWhiteTime] = useState(600); // 10 mins
  const [blackTime, setBlackTime] = useState(600);
  const [lastQuip, setLastQuip] = useState('');

  const theme = getTheme(themeId);

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      if (game.turn() === 'w') setWhiteTime(t => Math.max(0, t - 1));
      else setBlackTime(t => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [game]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const makeAiMove = useCallback(async (currentFen: string) => {
    setIsAiThinking(true);
    setLastQuip('Thinking of a galaxy-brain move...');
    try {
      const res = await fetch('/api/ai-move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fen: currentFen, model, apiKey, baseUrl }),
      });
      const data = await res.json();

      let moveStr = data.move;
      let usedModel = data.model;

      if (moveStr === 'random') {
        const moves = game.moves();
        moveStr = moves[Math.floor(Math.random() * moves.length)];
        usedModel = 'Random Generator';
      }

      const gameCopy = new Chess(game.fen());
      const moveResult = gameCopy.move(moveStr);

      if (moveResult) {
        setGame(gameCopy);
        setHistory(prev => [...prev, {
          move: moveStr,
          model: usedModel,
          quip: theme.memeQuote || 'Absolute precision.',
          timestamp: Date.now(),
        }]);
        setLastQuip(theme.memeQuote || 'Checkmate in my mind already.');
      }
    } catch (e) {
      console.error(e);
      setLastQuip('My neurons fried. Random move it is!');
    } finally {
      setIsAiThinking(false);
    }
  }, [game, model, apiKey, baseUrl, theme]);

  function onDrop(sourceSquare: string, targetSquare: string) {
    try {
      const gameCopy = new Chess(game.fen());
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (move === null) return false;

      setGame(gameCopy);

      // Record user move
      setHistory(prev => [...prev, {
        move: move.san,
        model: 'Human',
        timestamp: Date.now(),
      }]);

      // Trigger AI
      setTimeout(() => makeAiMove(gameCopy.fen()), 500);
      return true;
    } catch (e) {
      return false;
    }
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center p-4 lg:p-8 transition-colors duration-1000"
      style={{ backgroundColor: theme.backgroundColor }}
    >
      {/* Left: Stats & Settings */}
      <div className="flex flex-col gap-6 w-full max-w-sm mb-8 lg:mb-0 lg:mr-12">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl text-white">
          <div className="flex justify-between items-center mb-6">
            <div className="text-center">
              <p className="text-xs uppercase opacity-60 font-bold">White</p>
              <p className="text-3xl font-mono font-black">{formatTime(whiteTime)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase opacity-60 font-bold">Black (AI)</p>
              <p className="text-3xl font-mono font-black">{formatTime(blackTime)}</p>
            </div>
          </div>
        </div>

        <SettingsPanel
          apiKey={apiKey} setApiKey={setApiKey}
          baseUrl={baseUrl} setBaseUrl={setBaseUrl}
          model={model} setModel={setModel}
        />

        <ThemePicker currentTheme={themeId} setThemeId={setThemeId} />
      </div>

      {/* Center: Board */}
      <div className="relative p-4 bg-white/5 rounded-[2rem] shadow-inner border border-white/10 backdrop-blur-sm">
        <div className="w-[320px] h-[320px] sm:w-[500px] sm:h-[500px]">
          <Chessboard
            position={game.fen()}
            onPieceDrop={onDrop}
            boardOrientation="white"
            customDarkSquareStyle={{ backgroundColor: theme.boardColor }}
            customLightSquareStyle={{ backgroundColor: theme.boardColor === '#ebecd0' ? '#f0f0f0' : theme.boardColor }}
            // Note: react-chessboard doesn't easily support custom piece colors via prop,
            // usually handled via custom pieces or CSS overrides.
          />
        </div>

        {/* Meme Quip Overlay */}
        <div className="absolute -bottom-12 left-0 right-0 text-center">
          <div className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full font-black italic rotate-[-2deg] shadow-lg animate-bounce">
            {lastQuip}
          </div>
        </div>
      </div>

      {/* Right: History */}
      <div className="mt-24 lg:mt-0 lg:ml-12 w-full max-w-sm">
        <MoveHistory history={history} />
      </div>
    </div>
  );
};
