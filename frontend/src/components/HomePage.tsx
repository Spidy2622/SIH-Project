import React from 'react';
import { Play, BookOpen, Trophy, Shield, MapPin, Leaf } from 'lucide-react';
import { User } from '../types';

interface HomePageProps {
  onNavigate: (page: string) => void;
  currentUser?: User | null;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, currentUser }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        {/* User Info Banner */}
        {currentUser && (
          <div className="mb-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-4 text-left">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Welcome back,</p>
                <h3 className="font-bold text-gray-800">{currentUser.name}</h3>
                {currentUser.locality && (
                  <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {currentUser.locality}
                    {currentUser.ward && ` • Ward ${currentUser.ward}`}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">{currentUser.totalScore}</p>
                <p className="text-xs text-gray-600">Total Points</p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-teal-500 text-white shadow mx-auto mb-4">
            <Leaf className="w-9 h-9" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">SwachhGuru</h1>
          <p className="text-gray-600">Play • Learn • Segregate</p>
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

          <button
            onClick={() => onNavigate('champions')}
            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-teal-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-3"
          >
            <Shield size={24} />
            Green Champions
          </button>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          Save the planet, one bin at a time! 🌍
        </div>
      </div>
    </div>
  );
};