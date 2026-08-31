export interface Theme {
  name: string;
  boardColor: string;
  pieceColorLight: string;
  pieceColorDark: string;
  accentColor: string;
  backgroundColor: string;
  memeQuote?: string;
}

export const THEMES: Record<string, Theme> = {
  official: {
    name: 'Official',
    boardColor: '#ebecd0',
    pieceColorLight: '#fff',
    pieceColorDark: '#000',
    accentColor: '#779556',
    backgroundColor: '#2c2e31',
  },
  dank: {
    name: 'Dank Meme',
    boardColor: '#ff00ff',
    pieceColorLight: '#00ffff',
    pieceColorDark: '#ffff00',
    accentColor: '#00ff00',
    backgroundColor: '#1a1a1a',
    memeQuote: 'Stonks 📈',
  },
  ferrari: {
    name: 'Ferrari Red',
    boardColor: '#d32f2f',
    pieceColorLight: '#fff',
    pieceColorDark: '#000',
    accentColor: '#ffeb3b',
    backgroundColor: '#b71c1c',
  },
  cyberpunk: {
    name: 'Cyberpunk',
    boardColor: '#000',
    pieceColorLight: '#0ff',
    pieceColorDark: '#f0f',
    accentColor: '#ff0',
    backgroundColor: '#0a0a0a',
  },
  vaporwave: {
    name: 'Vaporwave',
    boardColor: '#ff71ce',
    pieceColorLight: '#b967ff',
    pieceColorDark: '#01cdfe',
    accentColor: '#05ffa1',
    backgroundColor: '#4a00e0',
  },
  minimal: {
    name: 'Minimalist',
    boardColor: '#f5f5f5',
    pieceColorLight: '#fff',
    pieceColorDark: '#333',
    accentColor: '#000',
    backgroundColor: '#fff',
  },
  forest: {
    name: 'Deep Forest',
    boardColor: '#2d5a27',
    pieceColorLight: '#a8e6cf',
    pieceColorDark: '#1b3022',
    accentColor: '#ffd700',
    backgroundColor: '#0e1a0e',
  },
  ocean: {
    name: 'Deep Ocean',
    boardColor: '#0077be',
    pieceColorLight: '#e0ffff',
    pieceColorDark: '#000080',
    accentColor: '#fff',
    backgroundColor: '#001a33',
  },
  gold: {
    name: 'Luxury Gold',
    boardColor: '#d4af37',
    pieceColorLight: '#fff',
    pieceColorDark: '#4b3621',
    accentColor: '#fff',
    backgroundColor: '#1a1a1a',
  },
  darkmode: {
    name: 'Dark Mode',
    boardColor: '#333',
    pieceColorLight: '#eee',
    pieceColorDark: '#111',
    accentColor: '#4caf50',
    backgroundColor: '#000',
  },
};

export function getTheme(themeId: string): Theme {
  return THEMES[themeId] || THEMES.official;
}
