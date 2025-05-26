import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import LayoutWithAds from './LayoutWithAds';

const HomePage = () => {
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate('/game');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  const handleHighScores = () => {
    navigate('/high-scores');
  };

  return (
    <LayoutWithAds>
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
        <div className="w-full max-w-md mx-auto">
          <div className="flex flex-col items-center justify-center space-y-10">
            {/* Game Logo */}
            <div className="w-64 h-64 rounded-3xl shadow-2xl overflow-hidden">
              <img
                alt="Memory Game Logo"
                className="object-cover w-full h-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlpyrcnmRA2XYC-hSNtf-AzoFRgbOwxt9hjmdyO8vjc0kf-SmD2s0LQriOwFeSTGPa6_4aTrGJbBiwCRItHAzXrdjjEFnXqB9SfNX__JE5VdI8ZnRTI0eubUvQFCzI2fMov_iOIY9jfAASAW5GznWUh90iTKfLZ9xKR4daUVbe432CA5UzgMCwuzdvAw88LoBSFakGaAI_k18i8Tv6TcRSR9qTs39p99tmh1isvYvOfFOigUBjom8l5rW6ffHHqbAP6uwtJHCXy2M"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="w-full space-y-6">
              <Button
                variant="primary"
                icon="play_arrow"
                onClick={handlePlay}
              >
                Play
              </Button>

              <Button
                variant="secondary"
                icon="settings"
                onClick={handleSettings}
              >
                Settings
              </Button>

              <Button
                variant="secondary"
                icon="leaderboard"
                onClick={handleHighScores}
              >
                High Scores
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LayoutWithAds>
  );
};

export default HomePage;
