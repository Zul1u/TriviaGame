import PropTypes from 'prop-types';
import { getPlayerInfoStorage } from '../helpers/localStorage/playerInfoStorage';

export default function PlayerReportCard({ playerReport }) {
  const { id: playerId } = getPlayerInfoStorage() || '';
  const {
    id,
    name,
    score,
    questionReport: { questionNumber, hitNumber },
  } = playerReport;

  const currentPlayer = playerId === id ? 'current-player' : '';

  return (
    <article className={`player-report-card ${currentPlayer}`}>
      <div className="player-score-container">
        <p>{`${name}`}</p>
        <p>{`Score: ${score}`}</p>
      </div>
      <div>
        <p className="questions-answered">{`Questions answered: ${questionNumber}`}</p>
        <p className="right-answers">{`Hits: ${hitNumber}`}</p>
        <p className="wrong-answers">{`Mistakes: ${questionNumber - hitNumber}`}</p>
      </div>
    </article>
  );
}

PlayerReportCard.propTypes = {
  playerReport: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    questionReport: PropTypes.shape({
      hitNumber: PropTypes.number.isRequired,
      questionNumber: PropTypes.number.isRequired,
    }).isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
};
