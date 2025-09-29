import { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { InstructionsPage } from './components/InstructionsPage';
import { GamePage } from './components/GamePage';
import { ResultsPage } from './components/ResultsPage';
import { LeaderboardPage } from './components/LeaderboardPage';
import { RegistrationPage } from './components/RegistrationPage';
import { ChampionsPage } from './components/ChampionsPage';
import { GamePage as GamePageType, GameState, User } from './types';
import { Navbar } from './components/Navbar';
import { LoginPage } from './components/LoginPage';
import { ProfilePage } from './components/ProfilePage';
import { RewardsPage } from './components/RewardsPage';

function App() {
  const [currentPage, setCurrentPage] = useState<GamePageType>('home');
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Load current user from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Unified navigation handler that accepts string and converts to GamePageType
  const handleNavigation = (page: string | GamePageType, state?: GameState) => {
    setCurrentPage(page as GamePageType);
    if (state) {
      setGameState(state);
    }
  };

  const handleUserRegistration = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCurrentPage('home');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} currentUser={currentUser} />;
      case 'registration':
        return <RegistrationPage onNavigate={handleNavigation} onRegister={handleUserRegistration} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigation} onLogin={handleUserRegistration} />;
      case 'instructions':
        return <InstructionsPage onNavigate={handleNavigation} />;
      case 'game':
        return <GamePage onNavigate={handleNavigation} currentUser={currentUser} />;
      case 'results':
        return gameState ? <ResultsPage gameState={gameState} onNavigate={handleNavigation} currentUser={currentUser} /> : <HomePage onNavigate={handleNavigation} currentUser={currentUser} />;
      case 'leaderboard':
        return <LeaderboardPage onNavigate={handleNavigation} />;
      case 'profile':
        return <ProfilePage onNavigate={handleNavigation} currentUser={currentUser} />;
      case 'rewards':
        return <RewardsPage onNavigate={handleNavigation} />;
      case 'champions':
        return <ChampionsPage onNavigate={handleNavigation} />;
      default:
        return <HomePage onNavigate={handleNavigation} currentUser={currentUser} />;
    }
  };

  return (
    <div className="App">
      <Navbar onNavigate={handleNavigation} currentUser={currentUser} onLogout={handleLogout} />
      <div className="pt-14">
        {renderCurrentPage()}
      </div>
    </div>
  );
}

export default App;