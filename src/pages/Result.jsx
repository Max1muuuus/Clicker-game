import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../context/GameContext.jsx';

export default function Result() {
  const navigate = useNavigate();
  const { playerName, finalScore, highScore, setPlayerName, setFinalScore, setHighScore } = useContext(GameContext);
  const [feedback, setFeedback] = useState('');
  const [thanksShown, setThanksShown] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (finalScore > highScore) {
      setHighScore(finalScore);
    }
  }, [finalScore, highScore, setHighScore]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleFeedbackSubmit = (event) => {
    event.preventDefault();
    const text = feedback.trim();

    if (!text) {
      return;
    }

    setThanksShown(true);
    setFeedback('');
  };

  const handlePlayAgain = () => {
    setFinalScore(0);
    setPlayerName('');
    navigate('/');
  };

  return (
    <main className="app-shell result-page">
      <section className="panel result-panel">
        <h1>🎉 Гра завершена!</h1>
        <div className="result-summary">
          <p className="player-result">
            {playerName || 'Гравець'}, твій результат:
          </p>
          <p className="score-display">{finalScore} кліків</p>
          <p className="record-display">
            Твій рекорд: <span>{highScore}</span> кліків
          </p>
        </div>

        <form className="feedback-form" onSubmit={handleFeedbackSubmit}>
          <label className="label-text" htmlFor="feedbackInput">Залиште свій відгук</label>
          <textarea
            id="feedbackInput"
            ref={inputRef}
            className="feedback-input"
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
            placeholder="Напишіть, що ви думаєте про гру..."
          />

          <div className="feedback-actions">
            <button className="primary-button" type="submit">
              Відправити
            </button>
            <button className="secondary-button" type="button" onClick={handlePlayAgain}>
              Грати знову
            </button>
          </div>

          {thanksShown && <p className="thanks-message">Дякуємо за ваш відгук!</p>}
        </form>
      </section>
    </main>
  );
}
