import Button from '../components/Button';

function Home() {
  return (
    <>
      <h1>Welcome to Trivia Game!!</h1>
      <Button handleClick={() => console.log('Clicou')}>Play New Game</Button>
      <Button handleClick={() => console.log('Clicou')}>Scoreboard</Button>
    </>
  );
}

export default Home;
