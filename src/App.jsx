import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import './CSS/main.css';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </main>
    </Provider>
  );
}

export default App;
