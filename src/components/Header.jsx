import PropTypes from 'prop-types';
import { getPlayerInfoStorage } from '../helpers/localStorage/playerInfoStorage';

export default function Header({ title }) {
  const playerInfo = !title
    ? getPlayerInfoStorage()
    : { name: '', score: 0, questionReport: { questionNumber: 1 } };

  const { name, score, questionReport } = playerInfo;

  return (
    <header className="header-container">
      {title ? (
        <div className="header-infos">
          <h1 className="title">{title}</h1>
        </div>
      ) : (
        <div className="header-infos">
          <span>{name}</span>
          <span>{`Score: ${score}`}</span>
          <span>{`Question: ${questionReport.questionNumber}/10`}</span>
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
};

Header.defaultProps = {
  title: null,
};
