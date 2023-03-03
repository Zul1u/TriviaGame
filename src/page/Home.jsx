import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';

function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const SUBMIT = true;

  const HandleClickPlayButton = (e) => {
    e.preventDefault();
    navigate('/game');
  };

  return (
    <div className="home-container">
      <header className="home-header-container">
        <h1 className="title">Welcome to Trivia Game!!</h1>
      </header>
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
