import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import './CSS/main.css';
import Provider from './context/Provider';
import Game from './page/Game';

function App() {
  return (
    <Provider>
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/game/question/:id" element={<Game />} />
        </Routes>
      </main>
    </Provider>
  );
}

export default App;
