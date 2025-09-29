import React from 'react';
import { User as AppUser, GamePage } from '../types';
import { User, MapPin, Award } from 'lucide-react';

interface ProfilePageProps {
  onNavigate: (page: GamePage) => void;
  currentUser: AppUser | null;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate, currentUser }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-3">
            <User className="w-8 h-8 text-green-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>
        </div>

        {!currentUser ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">You are not logged in.</p>
            <button
              onClick={() => onNavigate('login')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700"
            >
              Login / Register
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white text-lg font-semibold">
                {currentUser.name.charAt(0).toUpperCase()}
              </span>
              <div>
                <div className="font-semibold text-gray-800">{currentUser.name}</div>
                {currentUser.locality && (
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {currentUser.locality}
                    {currentUser.ward && ` • Ward ${currentUser.ward}`}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-blue-50 text-center">
                <div className="text-xl font-bold text-blue-700">{currentUser.totalScore}</div>
                <div className="text-xs text-blue-700/80">Points</div>
              </div>
              <div className="p-3 rounded-xl bg-purple-50 text-center">
                <div className="text-xl font-bold text-purple-700">{currentUser.gamesPlayed}</div>
                <div className="text-xs text-purple-700/80">Games</div>
              </div>
              <div className="p-3 rounded-xl bg-teal-50 text-center">
                <div className="flex items-center justify-center gap-1 text-xl font-bold text-teal-700">
                  <Award className="w-5 h-5" />
                  {currentUser.achievements?.length || 0}
                </div>
                <div className="text-xs text-teal-700/80">Badges</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


