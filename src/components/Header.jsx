import PropTypes from 'prop-types';
import { getPlayerInfoStorage } from '../helpers/localStorage/playerInfoStorage';

export default function Header({ title, headerNav }) {
  const playerInfo = !title && getPlayerInfoStorage();

  const { name, score, questionReport } = playerInfo;

  return (
    <header className="header-container">
      {title ? (
        <div className="simple-header-infos">
          <h1 className="title">{title}</h1>
        </div>
      ) : (
        <div className="header-infos">
          <span>{name}</span>
          <span>{`Score: ${score}`}</span>
          <span>{`Question: ${questionReport.questionNumber}/10`}</span>
        </div>
      )}
      {headerNav.nav && (
        <nav className="header-nav">
          <button type="button" onClick={headerNav.handleNavClick} className="to-go-home-screen">
            Back To Home Page
          </button>
        </nav>
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  headerNav: PropTypes.shape({
    nav: PropTypes.bool,
    handleNavClick: PropTypes.func,
  }),
};

Header.defaultProps = {
  title: null,
  headerNav: {
    nav: false,
    handleNavClick: () => console.log('function'),
  },
};
