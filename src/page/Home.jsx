import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import Input from '../components/Input';
import Modal from '../components/Modal';
import {
  createPlayerInfoStorage,
  deletePlayerInfoStorage,
} from '../helpers/localStorage/playerInfoStorage';
import { createScoreboardStorage } from '../helpers/localStorage/scoreboardStorage';

function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const SUBMIT = true;

  const handleClickPlayButton = (e) => {
    e.preventDefault();
    deletePlayerInfoStorage();
    createPlayerInfoStorage(inputValue);
    navigate('/game/question/1');
  };

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
      </section>
      <Modal isOpen={openModal} isClosed={() => setOpenModal(false)}>
        <form>
          <div className="home-form-container">
            <Input
              inputValue={inputValue}
              handleChange={(e) => setInputValue(e.target.value)}
              labelValue="Nick Name:"
              placeholderValue="Enter your nickname"
            />
            <Button submitButton={SUBMIT} handleClick={handleClickPlayButton}>
              Play
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Home;
