import React, { useState, useEffect } from 'react';
import { ArrowLeft, Shield, Award, CheckCircle, Users, TrendingUp, Calendar, Star, MapPin } from 'lucide-react';
import { GreenChampion, GamePage } from '../types';

interface ChampionsPageProps {
  onNavigate: (page: GamePage) => void;
}

export const ChampionsPage: React.FC<ChampionsPageProps> = ({ onNavigate }) => {
  const [champions, setChampions] = useState<GreenChampion[]>([]);
  const [selectedWard, setSelectedWard] = useState<string>('all');

  useEffect(() => {
    // Load champions from localStorage or use mock data
    const savedChampions = localStorage.getItem('greenChampions');
    if (savedChampions) {
      setChampions(JSON.parse(savedChampions));
    } else {
      // Mock data for demonstration
      const mockChampions: GreenChampion[] = [
        {
          id: '1',
          name: 'Priya Sharma',
          locality: 'Koramangala',
          ward: '12',
          role: 'volunteer',
          verifiedCampaigns: 15,
          joinedDate: '2024-01-15'
        },
        {
          id: '2',
          name: 'Rajesh Kumar',
          locality: 'Indiranagar',
          ward: '8',
          role: 'official',
          verifiedCampaigns: 28,
          joinedDate: '2023-11-20'
        },
        {
          id: '3',
          name: 'Anita Patel',
          locality: 'Whitefield',
          ward: '5',
          role: 'volunteer',
          verifiedCampaigns: 12,
          joinedDate: '2024-02-01'
        },
        {
          id: '4',
          name: 'Mohammed Ali',
          locality: 'BTM Layout',
          ward: '12',
          role: 'volunteer',
          verifiedCampaigns: 20,
          joinedDate: '2023-12-10'
        }
      ];
      setChampions(mockChampions);
      localStorage.setItem('greenChampions', JSON.stringify(mockChampions));
    }
  }, []);

  const filteredChampions = selectedWard === 'all' 
    ? champions 
    : champions.filter(c => c.ward === selectedWard);

  const uniqueWards = Array.from(new Set(champions.map(c => c.ward))).sort();

  const getRoleBadge = (role: 'volunteer' | 'official') => {
    if (role === 'official') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
          <Shield className="w-3 h-3" />
          Official
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
        <Star className="w-3 h-3" />
        Volunteer
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => onNavigate('home')}
          className="mb-6 bg-white/80 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-xl hover:bg-white transition-all flex items-center gap-2 shadow-md"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <Shield className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Green Champions</h1>
            <p className="text-gray-600">Community volunteers and officials monitoring cleanliness initiatives</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-800 text-sm font-medium">Total Champions</p>
                  <p className="text-2xl font-bold text-green-900">{champions.length}</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-800 text-sm font-medium">Campaigns Verified</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {champions.reduce((sum, c) => sum + c.verifiedCampaigns, 0)}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-800 text-sm font-medium">Active Wards</p>
                  <p className="text-2xl font-bold text-purple-900">{uniqueWards.length}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-800 text-sm font-medium">Avg. Campaigns</p>
                  <p className="text-2xl font-bold text-orange-900">
                    {Math.round(champions.reduce((sum, c) => sum + c.verifiedCampaigns, 0) / champions.length) || 0}
                  </p>
                </div>
                <Award className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Ward Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Ward:</label>
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Wards</option>
              {uniqueWards.map(ward => (
                <option key={ward} value={ward}>Ward {ward}</option>
              ))}
            </select>
          </div>

          {/* Champions List */}
          <div className="space-y-4">
            {filteredChampions.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🌿</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No champions in this ward</h3>
                <p className="text-gray-500">Select a different ward or check back later</p>
              </div>
            ) : (
              filteredChampions.map(champion => (
                <div
                  key={champion.id}
                  className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-800">{champion.name}</h3>
                        {getRoleBadge(champion.role)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{champion.locality}, Ward {champion.ward}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>{champion.verifiedCampaigns} campaigns verified</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Joined {new Date(champion.joinedDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Performance Badge */}
                      {champion.verifiedCampaigns > 25 && (
                        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                          <Award className="w-3 h-3" />
                          Super Champion
                        </div>
                      )}
                    </div>

                    <div className="text-center ml-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-green-600">
                          {champion.verifiedCampaigns}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Verified</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Call to Action */}
          <div className="mt-8 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6 text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Become a Green Champion!</h3>
            <p className="text-sm text-gray-700 mb-4">
              Join our network of volunteers and help monitor cleanliness initiatives in your locality
            </p>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              onClick={() => alert('Contact your ward office to become a Green Champion!')}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
