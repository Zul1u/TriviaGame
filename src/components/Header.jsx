import PropTypes from 'prop-types';
import { getPlayerInfoStorage } from '../helpers/localStorage/playerInfoStorage';

export default function Header({ title }) {
  const playerInfo = !title
    ? getPlayerInfoStorage()
    : { name: '', score: 0, question: '1/10' };

  const { name, score, question } = playerInfo;

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
          <span>{`Question: ${question}`}</span>
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
