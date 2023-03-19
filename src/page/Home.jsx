import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import StartGameModal from '../components/StartGameModal';
import { createScoreboardStorage } from '../helpers/localStorage/scoreboardStorage';

function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleClickScoreboardButton = () => {
    createScoreboardStorage();
    navigate('/scoreboard');
  };

  return (
    <div>
      <Header title="Welcome to Trivia Game!!" />
      <article className="game-description-container">
        <p className="game-description">
          Test your general knowledge, challenge your friends and have fun!
        </p>
      </article>
      <section className="home-bnt-container">
        <Button handleClick={() => setOpenModal(true)}>Start New Game</Button>
        <Button handleClick={handleClickScoreboardButton}>Scoreboard</Button>
        <Button handleClick={() => navigate('/instructions')}>How To Play</Button>
      </section>
      <StartGameModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setInputValue={setInputValue}
        inputValue={inputValue}
      />
    </div>
  );
}

export default Home;
