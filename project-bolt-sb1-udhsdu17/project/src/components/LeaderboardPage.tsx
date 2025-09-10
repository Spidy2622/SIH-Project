import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Medal, Award } from 'lucide-react';
import { LeaderboardEntry } from '../types';

interface LeaderboardPageProps {
  onNavigate: (page: string) => void;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ onNavigate }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('ecoSortLeaderboard') || '[]');
    setEntries(savedEntries);
  }, []);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Trophy className="text-yellow-500" size={24} />;
      case 1: return <Medal className="text-gray-400" size={24} />;
      case 2: return <Award className="text-amber-600" size={24} />;
      default: return <span className="text-gray-600 font-bold">{index + 1}</span>;
    }
  };

  const getRankBgColor = (index: number) => {
    switch (index) {
      case 0: return 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300';
      case 1: return 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300';
      case 2: return 'bg-gradient-to-r from-amber-100 to-amber-200 border-amber-300';
      default: return 'bg-white border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 p-4">
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
            <div className="text-6xl mb-4">🏆</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Leaderboard</h1>
            <p className="text-gray-600">Top eco-champions who mastered waste sorting!</p>
          </div>

          {entries.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No scores yet!</h3>
              <p className="text-gray-500 mb-6">Be the first to make it to the leaderboard!</p>
              <button
                onClick={() => onNavigate('game')}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-2xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Start Playing
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry, index) => (
                <div
                  key={index}
                  className={`${getRankBgColor(index)} border-2 rounded-2xl p-6 flex items-center justify-between transition-all hover:scale-105 hover:shadow-lg`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12">
                      {getRankIcon(index)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{entry.name}</h3>
                      <p className="text-gray-600">
                        Level {entry.level} • {new Date(entry.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">{entry.score}</div>
                    <div className="text-sm text-gray-600">points</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('game')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-2xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Challenge the Leaderboard!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};