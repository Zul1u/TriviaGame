import PropTypes from 'prop-types';
import { getPlayerInfoStorage } from '../helpers/playerInfoStorage';

export default function Header({ homePage }) {
  const playerInfo = !homePage
    ? getPlayerInfoStorage()
    : { name: '', score: 0, question: '1/10' };

  const { name, score, question } = playerInfo;

  return (
    <header className="header-container">
      {homePage ? (
        <div className="header-infos">
          <h1 className="title">Welcome to Trivia Game!!</h1>
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
  homePage: PropTypes.bool,
};

Header.defaultProps = {
  homePage: false,
};
