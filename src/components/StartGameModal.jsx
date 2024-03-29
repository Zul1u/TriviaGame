import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TimerContext from '../context/timer/TimerContext';
import { createPlayerInfoStorage, deletePlayerInfoStorage } from '../helpers/localStorage/playerInfoStorage';
import Button from './Button';
import Input from './Input';
import Modal from './Modal';

export default function StartGameModal({
  openModal,
  setOpenModal,
  inputValue,
  setInputValue,
}) {
  const {
    setStopTimer,
    setStartTimer,
  } = useContext(TimerContext);

  const navigate = useNavigate();
  const SUBMIT = true;

  const handleClickPlayButton = (e) => {
    e.preventDefault();
    setStartTimer(true);
    setStopTimer(false);
    deletePlayerInfoStorage();
    createPlayerInfoStorage(inputValue);
    navigate('/game/question/1');
  };

  return (
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
  );
}

StartGameModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
};
