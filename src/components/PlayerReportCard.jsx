import PropTypes from 'prop-types';

export default function PlayerReportCard({ playerReport }) {
  const {
    name,
    score,
    questionReport: { questionNumber, hitNumber },
  } = playerReport;
  return (
    <article className="player-report-card">
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
    name: PropTypes.string.isRequired,
    questionReport: PropTypes.shape({
      hitNumber: PropTypes.number.isRequired,
      questionNumber: PropTypes.number.isRequired,
    }).isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
};
