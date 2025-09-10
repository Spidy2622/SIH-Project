import React from 'react';
import { Play, BookOpen, Trophy } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">♻️</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">EcoSort</h1>
          <p className="text-gray-600">Learn waste segregation through fun gameplay!</p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => onNavigate('game')}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-3"
          >
            <Play size={24} />
            Start Playing
          </button>
          
          <button
            onClick={() => onNavigate('instructions')}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-3"
          >
            <BookOpen size={24} />
            How to Play
          </button>
          
          <button
            onClick={() => onNavigate('leaderboard')}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-3"
          >
            <Trophy size={24} />
            Leaderboard
          </button>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          Save the planet, one bin at a time! 🌍
        </div>
      </div>
    </div>
  );
};