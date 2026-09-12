import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../context/GameContext.jsx';

export default function Game() {
  const navigate = useNavigate();
  const { playerName, setFinalScore } = useContext(GameContext);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const scoreRef = useRef(0);

  const finishGame = () => {
    const final = scoreRef.current;
    setFinalScore(final);
    navigate('/result');
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          finishGame();
          return 0;
        }
        return current - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (!playerName) {
      navigate('/');
      return undefined;
    }

    startTimer();

    return () => {
      clearInterval(timerRef.current);
    };
  }, [playerName]);

  const handlePause = () => {
    if (isPaused) {
      setIsPaused(false);
      startTimer();
      return;
    }

    setIsPaused(true);
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const handleClick = () => {
    if (isPaused || timeLeft <= 0) {
      return;
    }

    const next = scoreRef.current + 1;
    scoreRef.current = next;
    setScore(next);
  };

  if (!playerName) {
    return (
      <main className="app-shell game-page">
        <section className="panel game-panel">
          <h1>Гра недоступна.</h1>
          <p>Спочатку введіть своє ім'я.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell game-page">
      <section className="panel game-panel">
        <div className="game-head">
          <div>
            <span className="game-kicker">Гравець: {playerName}</span>
          </div>
          <div className="timer-box">
            <span className="timer-label">Час: <span className="timer-value">{timeLeft}</span></span>
          </div>
          <div className="score-box">
            <span className="score-label">Кліки: <span className="score-value">{score}</span></span>
          </div>
        </div>

        <div className="game-zone">
          <button className="click-button" onClick={handleClick}>
            КЛІКАЙ!
          </button>
        </div>

        <button className="secondary-button pause-button" onClick={handlePause}>
          {isPaused ? 'Продовжити' : 'Пауза'}
        </button>
      </section>
    </main>
  );
}
