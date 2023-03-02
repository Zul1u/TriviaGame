import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import './CSS/main.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
