import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import './CSS/main.css';
import Provider from './context/Provider';
import Game from './page/Game';
import TimerProvider from './context/timer/TimerProvider';

function App() {
  return (
    <Provider>
      <TimerProvider>
        <main className="main-container">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/game/question/:id" element={<Game />} />
          </Routes>
        </main>
      </TimerProvider>
    </Provider>
  );
}

export default App;
