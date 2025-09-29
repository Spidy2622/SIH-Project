import React from 'react';
import { ArrowLeft, Trash2, Recycle, AlertTriangle } from 'lucide-react';

interface InstructionsPageProps {
  onNavigate: (page: string) => void;
}

export const InstructionsPage: React.FC<InstructionsPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => onNavigate('home')}
          className="mb-6 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl hover:bg-white/30 transition-all flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>
        
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">How to Play EcoSort</h1>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-2xl text-center">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">Wet Waste</h3>
              <p className="text-green-600 text-sm">
                Biodegradable organic waste like fruit peels, vegetable scraps, food leftovers
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-2xl text-center">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Dry Waste</h3>
              <p className="text-blue-600 text-sm">
                Recyclable items like plastic bottles, paper, cardboard, glass, metals
              </p>
            </div>
            
            <div className="bg-red-50 p-6 rounded-2xl text-center">
              <div className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-red-700 mb-2">Toxic Waste</h3>
              <p className="text-red-600 text-sm">
                Hazardous materials like batteries, electronics, medicines, chemicals
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Game Rules</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="bg-green-500 text-white text-sm font-bold px-2 py-1 rounded-full">1</span>
                <span>Drag waste items falling from the top into the correct colored bins</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-green-500 text-white text-sm font-bold px-2 py-1 rounded-full">2</span>
                <span>Earn +5 points for correct placements, lose -5 points for mistakes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-green-500 text-white text-sm font-bold px-2 py-1 rounded-full">3</span>
                <span>Learn from mistakes with instant feedback and explanations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-green-500 text-white text-sm font-bold px-2 py-1 rounded-full">4</span>
                <span>Progress through levels with increasing difficulty and speed</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-green-500 text-white text-sm font-bold px-2 py-1 rounded-full">5</span>
                <span>Compete with others on the leaderboard!</span>
              </li>
            </ul>
          </div>
          
          <div className="text-center">
            <button
              onClick={() => onNavigate('game')}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-8 rounded-2xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Start Playing Now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};