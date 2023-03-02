import Button from '../components/Button';

function Home() {
  return (
    <div className="home-container">
      <header className="home-header-container">
        <h1 className="title">Welcome to Trivia Game!!</h1>
      </header>
      <article className="game-description-container">
        <p className="game-description">
          Test your general knowledge, challenge your friends and have fun!
        </p>
      </article>
      <section className="home-bnt-container">
        <Button handleClick={() => console.log('Click')}>Play New Game</Button>
        <Button handleClick={() => console.log('Click')}>Scoreboard</Button>
      </section>
    </div>
  );
}

export default Home;
