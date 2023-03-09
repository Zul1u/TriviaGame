import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import PlayerReportCard from '../components/PlayerReportCard';
import { deletePlayerInfoStorage } from '../helpers/localStorage/playerInfoStorage';
import { getScoreboardStorage } from '../helpers/localStorage/scoreboardStorage';

export default function Scoreboard() {
  const [scoreboard, setScoreboard] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const sortedScoreboard = getScoreboardStorage().sort((a, b) => b.score - a.score);
    setScoreboard(sortedScoreboard);
  }, []);

  const handleClick = () => {
    deletePlayerInfoStorage();
    navigate('/home');
  };

  return (
    <div>
      <Header title="Scoreboard" />
      <section className="playerReport-card-container">
        <ul className="playerReport-list">
          {scoreboard.length > 0 && scoreboard.map((player) => (
            <li key={player.score * scoreboard.length}>
              <PlayerReportCard playerReport={player} />
            </li>
          ))}
        </ul>
      </section>
      <button type="button" onClick={handleClick}>Go to home</button>
    </div>
  );
}
