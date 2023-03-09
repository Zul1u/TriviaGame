import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import PlayerReportCard from '../components/PlayerReportCard';
import StartGameModal from '../components/StartGameModal';
import { deletePlayerInfoStorage } from '../helpers/localStorage/playerInfoStorage';
import { getScoreboardStorage } from '../helpers/localStorage/scoreboardStorage';

export default function Scoreboard() {
  const [scoreboard, setScoreboard] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const randomNumber = () => Math.floor(Math.random() * 100);

  useEffect(() => {
    const sortedScoreboard = getScoreboardStorage().sort((a, b) => b.score - a.score);
    setScoreboard(sortedScoreboard);
  }, []);

  const handleClick = () => {
    deletePlayerInfoStorage();
    navigate('/home');
  };

  return (
    <>
      <Header title="Scoreboard" />
      <div className="scoreboard-btn-container">
        <Button handleClick={handleClick}>Go to Home</Button>
        <Button handleClick={() => setOpenModal(true)}>Play Again</Button>
        <StartGameModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          setInputValue={setInputValue}
          inputValue={inputValue}
        />
      </div>
      <section className="player-report-card-container">
        <ul className="player-report-list">
          {scoreboard.length > 0 && scoreboard.map((player) => (
            <li key={player.score * randomNumber()}>
              <PlayerReportCard playerReport={player} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
