import React, { useState } from 'react';
import { HomePage } from './components/HomePage';
import { InstructionsPage } from './components/InstructionsPage';
import { GamePage } from './components/GamePage';
import { ResultsPage } from './components/ResultsPage';
import { LeaderboardPage } from './components/LeaderboardPage';
import { GamePage as GamePageType, GameState } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<GamePageType>('home');
  const [gameState, setGameState] = useState<GameState | null>(null);

  const handleNavigation = (page: GamePageType, state?: GameState) => {
    setCurrentPage(page);
    if (state) {
      setGameState(state);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'instructions':
        return <InstructionsPage onNavigate={handleNavigation} />;
      case 'game':
        return <GamePage onNavigate={handleNavigation} />;
      case 'results':
        return gameState ? <ResultsPage gameState={gameState} onNavigate={handleNavigation} /> : <HomePage onNavigate={handleNavigation} />;
      case 'leaderboard':
        return <LeaderboardPage onNavigate={handleNavigation} />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="App">
      {renderCurrentPage()}
    </div>
  );
}

export default App;