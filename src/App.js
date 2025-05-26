import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';
import SettingsPage from './components/SettingsPage';
import HighScoresPage from './components/HighScoresPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/high-scores" element={<HighScoresPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
