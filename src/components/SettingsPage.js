import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import LayoutWithAds from './LayoutWithAds';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState('medium');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('memoryGameSettings') || '{}');
    setDifficulty(savedSettings.difficulty || 'medium');
    setSoundEnabled(savedSettings.soundEnabled !== false);
    setAnimationsEnabled(savedSettings.animationsEnabled !== false);
  }, []);

  // Save settings to localStorage
  const saveSettings = () => {
    const settings = {
      difficulty,
      soundEnabled,
      animationsEnabled
    };
    localStorage.setItem('memoryGameSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  const resetSettings = () => {
    setDifficulty('medium');
    setSoundEnabled(true);
    setAnimationsEnabled(true);
    localStorage.removeItem('memoryGameSettings');
    alert('Settings reset to default!');
  };

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <LayoutWithAds>
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white min-h-screen p-6">
        <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="secondary"
            icon="arrow_back"
            onClick={handleBackHome}
            className="w-auto px-4 mr-4"
          >
            Back
          </Button>
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        {/* Settings Form */}
        <div className="space-y-8">
          {/* Difficulty Setting */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="material-icons mr-3">tune</span>
              Difficulty
            </h3>
            <div className="space-y-3">
              {['easy', 'medium', 'hard'].map((level) => (
                <label key={level} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="difficulty"
                    value={level}
                    checked={difficulty === level}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="mr-3 text-blue-500 focus:ring-blue-400"
                  />
                  <span className="capitalize text-lg">
                    {level}
                    {level === 'easy' && ' (3x4 grid)'}
                    {level === 'medium' && ' (4x4 grid)'}
                    {level === 'hard' && ' (6x6 grid)'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Sound Setting */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="material-icons mr-3">volume_up</span>
              Audio
            </h3>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-lg">Sound Effects</span>
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="w-6 h-6 text-blue-500 focus:ring-blue-400 rounded"
              />
            </label>
          </div>

          {/* Animations Setting */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="material-icons mr-3">animation</span>
              Visual Effects
            </h3>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-lg">Animations</span>
              <input
                type="checkbox"
                checked={animationsEnabled}
                onChange={(e) => setAnimationsEnabled(e.target.checked)}
                className="w-6 h-6 text-blue-500 focus:ring-blue-400 rounded"
              />
            </label>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              variant="primary"
              icon="save"
              onClick={saveSettings}
            >
              Save Settings
            </Button>

            <Button
              variant="secondary"
              icon="restore"
              onClick={resetSettings}
            >
              Reset to Default
            </Button>
          </div>
        </div>
        </div>
      </div>
    </LayoutWithAds>
  );
};

export default SettingsPage;
