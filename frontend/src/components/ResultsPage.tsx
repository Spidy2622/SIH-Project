import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, RotateCcw, Star } from 'lucide-react';
import { GameState, LeaderboardEntry, User } from '../types';
import { apiService } from '../services/api';

interface ResultsPageProps {
  gameState: GameState;
  onNavigate: (page: string) => void;
  currentUser?: User | null;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ gameState, onNavigate, currentUser }) => {
  const [playerName, setPlayerName] = useState('');
  const [savedToLeaderboard, setSavedToLeaderboard] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setPlayerName(currentUser.name);
    }
  }, [currentUser]);

  const saveToLeaderboard = async () => {
    if (!playerName.trim() || savedToLeaderboard) return;

    try {
      if (currentUser) {
        await apiService.submitScore({
          userId: currentUser.id,
          score: gameState.score,
          gameType: 'waste-sorting'
        });
      }
      setSavedToLeaderboard(true);
    } catch (e) {
      // fallback to local if API fails
      const entry: LeaderboardEntry = {
        name: playerName.trim(),
        score: gameState.score,
        level: gameState.level,
        date: new Date().toISOString(),
        userId: currentUser?.id
      };
      const existingEntries = JSON.parse(localStorage.getItem('ecoSortLeaderboard') || '[]');
      const updatedEntries = [...existingEntries, entry].sort((a, b) => b.score - a.score).slice(0, 50);
      localStorage.setItem('ecoSortLeaderboard', JSON.stringify(updatedEntries));
      setSavedToLeaderboard(true);
    }
  };

  const getPerformanceMessage = () => {
    const accuracy = gameState.itemsFallen > 0 ? ((gameState.itemsFallen - gameState.mistakes.length) / gameState.itemsFallen) * 100 : 100;
    
    if (accuracy >= 90) return { message: 'Excellent! You\'re an eco-champion! 🏆', color: 'text-green-600' };
    if (accuracy >= 75) return { message: 'Great job! Keep learning! 🌟', color: 'text-blue-600' };
    if (accuracy >= 60) return { message: 'Good effort! Practice makes perfect! 👍', color: 'text-yellow-600' };
    return { message: 'Keep practicing! You\'ll get better! 💪', color: 'text-orange-600' };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => onNavigate('home')}
          className="mb-6 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl hover:bg-white/30 transition-all flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎯</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Game Results</h1>
            <p className={`text-xl ${performance.color} font-semibold`}>{performance.message}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-2xl text-center">
              <Star className="text-blue-500 mx-auto mb-2" size={32} />
              <h3 className="text-2xl font-bold text-blue-700">{gameState.score}</h3>
              <p className="text-blue-600">Final Score</p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-2xl text-center">
              <Trophy className="text-purple-500 mx-auto mb-2" size={32} />
              <h3 className="text-2xl font-bold text-purple-700">{gameState.level}</h3>
              <p className="text-purple-600">Level Reached</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-2xl text-center">
              <div className="text-green-500 text-2xl mb-2">✅</div>
              <h3 className="text-2xl font-bold text-green-700">
                {gameState.itemsFallen - gameState.mistakes.length}/{gameState.itemsFallen}
              </h3>
              <p className="text-green-600">Correct Sorts</p>
            </div>
          </div>

          {gameState.mistakes.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Learning from Mistakes</h2>
              <div className="space-y-4 max-h-60 overflow-y-auto">
                {gameState.mistakes.map((mistake, index) => (
                  <div key={index} className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{mistake.item.icon}</span>
                      <div>
                        <h3 className="font-semibold text-red-700">
                          {mistake.item.name}
                        </h3>
                        <p className="text-sm text-red-600 mb-1">
                          You put it in <span className="capitalize font-semibold">{mistake.selectedBin}</span> bin, 
                          but it belongs in <span className="capitalize font-semibold">{mistake.correctBin}</span> bin.
                        </p>
                        <p className="text-sm text-red-500">
                          {mistake.item.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!savedToLeaderboard && (
            <div className="mb-6 bg-yellow-50 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Save to Leaderboard</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  maxLength={20}
                />
                <button
                  onClick={saveToLeaderboard}
                  disabled={!playerName.trim()}
                  className="bg-yellow-500 text-white px-6 py-2 rounded-xl hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {savedToLeaderboard && (
            <div className="mb-6 bg-green-50 p-4 rounded-2xl text-center">
              <p className="text-green-700 font-semibold">🎉 Saved to leaderboard! Great job!</p>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => onNavigate('game')}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-2xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-3"
            >
              <RotateCcw size={20} />
              Play Again
            </button>
            
            <button
              onClick={() => onNavigate('leaderboard')}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-2xl hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-3"
            >
              <Trophy size={20} />
              Leaderboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};