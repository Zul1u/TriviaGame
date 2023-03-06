import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import Input from '../components/Input';
import Modal from '../components/Modal';
import {
  createPlayerInfoStorage,
  deletePlayerInfoStorage,
} from '../helpers/playerInfoStorage';

function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const SUBMIT = true;
  const HOMEPAGE = true;

  const HandleClickPlayButton = (e) => {
    e.preventDefault();
    deletePlayerInfoStorage();
    createPlayerInfoStorage(inputValue);
    navigate('/game');
  };

  return (
    <div>
      <Header homePage={HOMEPAGE} />
      <article className="game-description-container">
        <p className="game-description">
          Test your general knowledge, challenge your friends and have fun!
        </p>
      </article>
      <section className="home-bnt-container">
        <Button handleClick={() => setOpenModal(true)}>Start New Game</Button>
        <Button handleClick={() => navigate('/scoreboard')}>Scoreboard</Button>
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
            <Button submitButton={SUBMIT} handleClick={HandleClickPlayButton}>
              Play
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Home;
