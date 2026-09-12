import { createContext, useState, useMemo } from 'react';

export const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [playerName, setPlayerName] = useState('');
  const [finalScore, setFinalScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const value = useMemo(() => ({
    playerName,
    finalScore,
    highScore,
    setPlayerName,
    setFinalScore,
    setHighScore,
  }), [playerName, finalScore, highScore]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}
