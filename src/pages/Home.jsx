import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../context/GameContext.jsx';

export default function Home() {
  const navigate = useNavigate();
  const { setPlayerName, setFinalScore, highScore } = useContext(GameContext);
  const [nameInput, setNameInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanName = nameInput.trim();

    if (!cleanName) {
      alert('Будь ласка, введіть ім\'я.');
      return;
    }

    setPlayerName(cleanName);
    setFinalScore(0);
    navigate('/game');
  };

  return (
    <main className="app-shell home-page">
      <section className="panel home-panel">
        <div className="logo-block">
          <span className="game-kicker">Clicker Game</span>
          <h1>Clicker Challenge</h1>
        </div>

        <form className="home-form" onSubmit={handleSubmit}>
          <label className="label-text" htmlFor="nameInput">Ваше ім'я</label>
          <div className="input-row">
            <input
              id="nameInput"
              name="nameInput"
              className="name-input"
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
              placeholder="Введіть своє ім'я"
              autoComplete="off"
              required
            />
          </div>

          <button className="primary-button start-button" type="submit">
            Почати гру
          </button>
        </form>

        <div className="best-score">
          <span>Твій найкращий рекорд: <b>{highScore}</b> кліків</span>
        </div>
      </section>
    </main>
  );
}
