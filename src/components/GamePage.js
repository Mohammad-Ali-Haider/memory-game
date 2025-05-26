import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import LayoutWithAds from './LayoutWithAds';

const GamePage = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showingInitial, setShowingInitial] = useState(false);
  const [wrongPair, setWrongPair] = useState([]);
  const [correctPair, setCorrectPair] = useState([]);
  const [countdown, setCountdown] = useState(0);
  const [animationTimeouts, setAnimationTimeouts] = useState([]);
  const [difficulty, setDifficulty] = useState('medium');

  // Card symbols for the memory game
  const allSymbols = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎸', '🎵', '🎬', '🎺', '🎻', '🎤', '🎧', '🎼', '🎹', '🥁', '🎷', '🎊'];

  // Get difficulty settings
  const getDifficultyConfig = (level) => {
    switch (level) {
      case 'easy':
        return { pairs: 6, cols: 3, symbols: allSymbols.slice(0, 6) }; // 3x4 grid
      case 'hard':
        return { pairs: 18, cols: 6, symbols: allSymbols.slice(0, 18) }; // 6x6 grid
      default: // medium
        return { pairs: 8, cols: 4, symbols: allSymbols.slice(0, 8) }; // 4x4 grid
    }
  };

  // Load difficulty setting from localStorage
  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('memoryGameSettings') || '{}');
    setDifficulty(savedSettings.difficulty || 'medium');
  }, []);

  // Reinitialize game when difficulty changes (if game is already started)
  useEffect(() => {
    if (gameStarted && cards.length > 0) {
      initializeGame();
    }
  }, [difficulty]);

  // Initialize game
  const initializeGame = () => {
    // Clear any existing timeouts
    clearAnimationTimeouts();

    const config = getDifficultyConfig(difficulty);
    const gameCards = [...config.symbols, ...config.symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false
      }));

    setCards(gameCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameWon(false);
    setGameStarted(true);
    setShowingInitial(true);
    setWrongPair([]);
    setCorrectPair([]);
    setCountdown(5);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setShowingInitial(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Clear all animation timeouts
  const clearAnimationTimeouts = () => {
    animationTimeouts.forEach(timeout => clearTimeout(timeout));
    setAnimationTimeouts([]);
  };

  // Handle card click
  const handleCardClick = (cardId) => {
    if (showingInitial) return; // Don't allow clicks during initial reveal
    if (flippedCards.includes(cardId)) return; // Don't allow clicking same card twice
    if (matchedCards.includes(cardId)) return; // Don't allow clicking already matched cards

    // Clear any ongoing animations when starting new interaction
    clearAnimationTimeouts();

    // If there are already 2 cards flipped, start fresh with new card
    if (flippedCards.length === 2) {
      setWrongPair([]);
      setCorrectPair([]);
      setFlippedCards([cardId]);
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstCard, secondCard] = newFlippedCards;
      const firstCardData = cards.find(card => card.id === firstCard);
      const secondCardData = cards.find(card => card.id === secondCard);

      // Clear any previous states immediately to prevent interference
      setWrongPair([]);
      setCorrectPair([]);

      if (firstCardData.symbol === secondCardData.symbol) {
        // Correct match - immediately add to matched cards and show green animation
        setCorrectPair([firstCard, secondCard]);

        // Add to matched cards immediately to prevent flip-back on fast clicks
        setMatchedCards(prev => [...prev, firstCard, secondCard]);

        // Clear the temporary states after animation
        const timeout = setTimeout(() => {
          setCorrectPair([]);
          setFlippedCards([]);
        }, 600);

        setAnimationTimeouts([timeout]);
      } else {
        // Wrong match - show red animation briefly
        setWrongPair([firstCard, secondCard]);
        const timeout = setTimeout(() => {
          // Only clear if these are still the wrong pair (prevent interference)
          setWrongPair(current => {
            if (current.includes(firstCard) && current.includes(secondCard)) {
              setFlippedCards([]);
              setWrongPair([]);
            }
            return current;
          });
        }, 600);
        setAnimationTimeouts([timeout]);
      }
    }
  };

  // Check for game win
  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameWon(true);
      // Save score to localStorage with difficulty information
      const config = getDifficultyConfig(difficulty);
      const gridSize = `${config.cols}x${Math.ceil(config.pairs * 2 / config.cols)}`;

      const existingScores = JSON.parse(localStorage.getItem('memoryGameScores') || '[]');
      const newScore = {
        moves,
        date: new Date().toISOString(),
        difficulty,
        gridSize,
        pairs: config.pairs
      };
      existingScores.push(newScore);

      // Sort by moves (ascending - fewer moves is better)
      existingScores.sort((a, b) => a.moves - b.moves);

      // Keep top 50 scores (we'll filter by category in the UI)
      localStorage.setItem('memoryGameScores', JSON.stringify(existingScores.slice(0, 50)));
    }
  }, [matchedCards, cards.length, moves, difficulty]);

  const handleBackHome = () => {
    navigate('/');
  };

  if (!gameStarted) {
    return (
      <LayoutWithAds>
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white min-h-screen flex flex-col items-center justify-center p-6">
          <div className="text-center space-y-8">
            <h1 className="text-4xl font-bold mb-8">Memory Game</h1>
            <p className="text-lg text-slate-300 mb-8">Match all the pairs to win!</p>
            <div className="space-y-4">
              <Button variant="primary" onClick={initializeGame}>
                Start Game
              </Button>
              <Button variant="secondary" icon="home" onClick={handleBackHome}>
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </LayoutWithAds>
    );
  }

  return (
    <LayoutWithAds>
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white min-h-screen p-6">
        <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="secondary"
            icon="home"
            onClick={handleBackHome}
            className="w-auto px-4"
          >
            Home
          </Button>
          <div className="text-center">
            <h2 className="text-2xl font-bold">Memory Game</h2>
            <p className="text-slate-300">Moves: {moves}</p>
            <p className="text-slate-400 text-sm capitalize">
              {difficulty} ({getDifficultyConfig(difficulty).cols}x{Math.ceil(getDifficultyConfig(difficulty).pairs * 2 / getDifficultyConfig(difficulty).cols)})
            </p>
          </div>
          <Button
            variant="secondary"
            icon="refresh"
            onClick={initializeGame}
            className="w-auto px-4"
          >
            Reset
          </Button>
        </div>

        {/* Countdown Display */}
        {showingInitial && (
          <div className="text-center mb-6">
            <div className="bg-blue-600 text-white px-6 py-3 rounded-full inline-block text-xl font-bold animate-pulse">
              Memorize the cards! {countdown}s
            </div>
          </div>
        )}

        {/* Game Board */}
        <div className={`grid gap-4 mb-8 ${
          getDifficultyConfig(difficulty).cols === 3 ? 'grid-cols-3' :
          getDifficultyConfig(difficulty).cols === 6 ? 'grid-cols-6' :
          'grid-cols-4'
        }`}>
          {cards.map((card) => {
            const isWrong = wrongPair.includes(card.id);
            const isCorrect = correctPair.includes(card.id);
            const isMatched = matchedCards.includes(card.id);
            const isCurrentlyFlipped = flippedCards.includes(card.id);

            // Card should show as flipped (rotateY(0deg)) in these cases:
            // 1. During initial reveal
            // 2. When actively flipped by user
            // 3. When permanently matched
            // 4. During correct match feedback (stay flipped)
            const shouldBeFlipped = showingInitial || isCurrentlyFlipped || isMatched || isCorrect;

            // Card should show symbol when flipped OR during feedback states
            const shouldShowSymbol = shouldBeFlipped || isWrong || isCorrect;

            return (
              <div
                key={card.id}
                className={`aspect-square rounded-xl cursor-pointer transform transition-all duration-500 flex items-center justify-center text-4xl font-bold relative overflow-hidden ${
                  isWrong
                    ? 'bg-red-600 border-2 border-red-400 text-white animate-pulse scale-105 shadow-lg shadow-red-500/50'
                    : isCorrect
                    ? 'bg-green-600 border-2 border-green-400 text-white scale-105 shadow-lg shadow-green-500/50'
                    : isMatched
                    ? 'bg-green-700 border-2 border-green-500 text-white scale-105 shadow-lg shadow-green-600/50'
                    : shouldBeFlipped
                    ? 'memory-card-flipped border-2 border-slate-600 text-white scale-105'
                    : 'memory-card border-2 border-slate-700 text-slate-400'
                } ${isWrong ? 'animate-bounce' : ''}`}
                onClick={() => handleCardClick(card.id)}
                style={{
                  transform: shouldBeFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
                  transformStyle: 'preserve-3d',
                  animation: isWrong ? 'shake 0.5s ease-in-out infinite' : undefined
                }}
              >
                {/* Card Front (Symbol) */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    shouldShowSymbol ? 'opacity-100' : 'opacity-0'
                  } ${
                    isWrong
                      ? 'text-white'
                      : isCorrect || isMatched
                      ? 'text-white'
                      : 'text-yellow-300'
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)'
                  }}
                >
                  {card.symbol}
                </div>

                {/* Card Back (Question Mark) */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 text-slate-400 ${
                    shouldShowSymbol ? 'opacity-0' : 'opacity-100'
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <span className="text-6xl">?</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Win Message */}
        {gameWon && (
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold text-green-400">🎉 Congratulations! 🎉</h3>
            <p className="text-xl">You won in {moves} moves!</p>
            <div className="space-y-4">
              <Button variant="primary" onClick={initializeGame}>
                Play Again
              </Button>
              <Button variant="secondary" onClick={() => navigate('/high-scores')}>
                View High Scores
              </Button>
            </div>
          </div>
        )}
        </div>
      </div>
    </LayoutWithAds>
  );
};

export default GamePage;
