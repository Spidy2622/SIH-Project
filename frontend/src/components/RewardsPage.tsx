import React from 'react';
import { Gift } from 'lucide-react';
import { GamePage } from '../types';

interface RewardsPageProps {
  onNavigate: (page: GamePage) => void;
}

export const RewardsPage: React.FC<RewardsPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Gift className="w-8 h-8 text-green-700" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Rewards</h2>
        <p className="text-gray-600 mt-2">Earn points, unlock badges, and climb the leaderboard.</p>
        <button
          onClick={() => onNavigate('home')}
          className="mt-6 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};


