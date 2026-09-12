import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext.jsx';
import Home from './pages/Home.jsx';
import Game from './pages/Game.jsx';
import Result from './pages/Result.jsx';

export default function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}
