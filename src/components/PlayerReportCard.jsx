import PropTypes from 'prop-types';

export default function PlayerReportCard({ playerReport }) {
  const {
    name,
    score,
    questionReport: { questionNumber, hitNumber },
  } = playerReport;
  return (
    <article className="playerReport-card">
      <div>
        <p>{`Nickname: ${name}`}</p>
        <p>{`Score: ${score}`}</p>
      </div>
      <div>
        <p>{`Questions answered: ${questionNumber}`}</p>
        <p>{`Hits: ${hitNumber}`}</p>
        <p>{`Mistakes: ${questionNumber - hitNumber}`}</p>
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
