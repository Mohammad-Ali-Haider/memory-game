import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import LayoutWithAds from './LayoutWithAds';

const HighScoresPage = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('3x4');

  // Load scores from localStorage on component mount
  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('memoryGameScores') || '[]');
    setScores(savedScores);
  }, []);

  // Group scores by grid size
  const getScoresByCategory = () => {
    const categories = {
      '3x4': [],
      '4x4': [],
      '6x6': []
    };

    scores.forEach(score => {
      // Handle both old scores (without gridSize) and new scores (with gridSize)
      let gridSize = score.gridSize;
      if (!gridSize) {
        // For old scores, assume they were medium difficulty (4x4)
        gridSize = '4x4';
      }

      if (categories[gridSize]) {
        categories[gridSize].push(score);
      }
    });

    // Sort each category by moves (ascending - fewer moves is better)
    Object.keys(categories).forEach(key => {
      categories[key].sort((a, b) => a.moves - b.moves);
      categories[key] = categories[key].slice(0, 10); // Keep top 10 per category
    });

    return categories;
  };

  const categorizedScores = getScoresByCategory();

  const clearScores = () => {
    if (window.confirm('Are you sure you want to clear all high scores?')) {
      localStorage.removeItem('memoryGameScores');
      setScores([]);
    }
  };

  const handleBackHome = () => {
    navigate('/');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `${index + 1}.`;
    }
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
          <h1 className="text-3xl font-bold">High Scores</h1>
        </div>

        {/* Category Tabs */}
        <div className="mb-6">
          <div className="flex space-x-2 bg-slate-800 rounded-xl p-2">
            {Object.keys(categorizedScores).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {category}
                <div className="text-xs opacity-75">
                  {category === '3x4' ? 'Easy' : category === '4x4' ? 'Medium' : 'Hard'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Scores List */}
        <div className="space-y-6">
          {scores.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-2xl font-semibold mb-4">No Scores Yet</h3>
              <p className="text-slate-300 mb-8">Play some games to see your high scores here!</p>
              <Button
                variant="primary"
                icon="play_arrow"
                onClick={() => navigate('/game')}
              >
                Play Now
              </Button>
            </div>
          ) : categorizedScores[selectedCategory].length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-semibold mb-4">No {selectedCategory} Scores Yet</h3>
              <p className="text-slate-300 mb-8">Play some {selectedCategory === '3x4' ? 'Easy' : selectedCategory === '4x4' ? 'Medium' : 'Hard'} games to see scores here!</p>
              <Button
                variant="primary"
                icon="play_arrow"
                onClick={() => navigate('/game')}
              >
                Play Now
              </Button>
            </div>
          ) : (
            <>
              <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="material-icons mr-3">leaderboard</span>
                  Best {selectedCategory} Scores (Fewest Moves)
                </h3>
                <div className="space-y-3">
                  {categorizedScores[selectedCategory].map((score, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        index < 3 ? 'bg-gradient-to-r from-yellow-600 to-yellow-700' : 'bg-slate-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{getRankIcon(index)}</span>
                        <div>
                          <div className="font-semibold">
                            {score.moves} moves
                          </div>
                          <div className="text-sm text-slate-300">
                            {formatDate(score.date)}
                          </div>
                        </div>
                      </div>
                      {index < 3 && (
                        <span className="material-icons text-yellow-300">
                          star
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="material-icons mr-3">analytics</span>
                  {selectedCategory} Statistics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{categorizedScores[selectedCategory].length}</div>
                    <div className="text-sm text-slate-300">Games Played</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {categorizedScores[selectedCategory].length > 0 ? Math.min(...categorizedScores[selectedCategory].map(s => s.moves)) : 0}
                    </div>
                    <div className="text-sm text-slate-300">Best Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {categorizedScores[selectedCategory].length > 0 ? Math.round(categorizedScores[selectedCategory].reduce((sum, s) => sum + s.moves, 0) / categorizedScores[selectedCategory].length) : 0}
                    </div>
                    <div className="text-sm text-slate-300">Average</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400">
                      {categorizedScores[selectedCategory].length > 0 ? Math.max(...categorizedScores[selectedCategory].map(s => s.moves)) : 0}
                    </div>
                    <div className="text-sm text-slate-300">Worst Score</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button
                  variant="primary"
                  icon="play_arrow"
                  onClick={() => navigate('/game')}
                >
                  Play Again
                </Button>

                <Button
                  variant="secondary"
                  icon="delete"
                  onClick={clearScores}
                >
                  Clear All Scores
                </Button>
              </div>
            </>
          )}
        </div>
        </div>
      </div>
    </LayoutWithAds>
  );
};

export default HighScoresPage;
