import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Medal, Award, Users, MapPin, TrendingUp, Star, Building } from 'lucide-react';
import { LeaderboardEntry, LocalityStats } from '../types';
import { apiService } from '../services/api';

interface LeaderboardPageProps {
  onNavigate: (page: string) => void;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ onNavigate }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [localityStats, setLocalityStats] = useState<LocalityStats[]>([]);
  const [activeTab, setActiveTab] = useState<'individual' | 'locality'>('individual');
  const [selectedLocality, setSelectedLocality] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const apiEntries = await apiService.getLeaderboard();
        // Map API scores to LeaderboardEntry shape (locality/ward not tracked server-side now)
        const formatted = apiEntries.map((e: any) => ({
          name: e.name,
          score: e.score,
          level: e.level,
          date: e.date,
          userId: e.userId
        }));
        setEntries(formatted);
        calculateLocalityStats(formatted);
        return;
      } catch (_) {
        // Fallback to localStorage if API fails
      }
      const savedEntries = JSON.parse(localStorage.getItem('ecoSortLeaderboard') || '[]');
      setEntries(savedEntries);
      calculateLocalityStats(savedEntries);
    };
    load();
  }, []);

  const calculateLocalityStats = (allEntries: LeaderboardEntry[]) => {
    const localityMap = new Map<string, LocalityStats>();
    
    allEntries.forEach(entry => {
      const locality = entry.locality || 'Unknown';
      
      if (!localityMap.has(locality)) {
        localityMap.set(locality, {
          locality,
          ward: entry.ward,
          totalScore: 0,
          totalPlayers: 0,
          averageScore: 0,
          weeklyProgress: 0,
          rank: 0,
          topPlayers: []
        });
      }
      
      const stats = localityMap.get(locality)!;
      stats.totalScore += entry.score;
      stats.totalPlayers += 1;
      stats.topPlayers.push(entry);
    });
    
    // Calculate averages and sort top players
    const statsArray = Array.from(localityMap.values()).map(stats => {
      stats.averageScore = Math.round(stats.totalScore / stats.totalPlayers);
      stats.topPlayers.sort((a, b) => b.score - a.score);
      stats.topPlayers = stats.topPlayers.slice(0, 5); // Keep top 5 players
      stats.weeklyProgress = Math.floor(Math.random() * 30) - 10; // Mock weekly progress
      return stats;
    });
    
    // Sort by total score and assign ranks
    statsArray.sort((a, b) => b.totalScore - a.totalScore);
    statsArray.forEach((stats, index) => {
      stats.rank = index + 1;
    });
    
    setLocalityStats(statsArray);
  };

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
      <div className="max-w-6xl mx-auto">
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">SwachhGuru Leaderboard</h1>
            <p className="text-gray-600">Compete individually and as a community!</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-xl p-1 flex gap-2">
              <button
                onClick={() => setActiveTab('individual')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'individual'
                    ? 'bg-white text-green-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Trophy className="inline w-5 h-5 mr-2" />
                Individual Champions
              </button>
              <button
                onClick={() => setActiveTab('locality')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'locality'
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Users className="inline w-5 h-5 mr-2" />
                Locality Rankings
              </button>
            </div>
          </div>

          {/* Individual Leaderboard */}
          {activeTab === 'individual' && (
            <>
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
                  {entries.slice(0, 10).map((entry, index) => (
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
                          <p className="text-gray-600 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {entry.locality || 'Unknown'} 
                            {entry.ward && ` • Ward ${entry.ward}`}
                          </p>
                          <p className="text-sm text-gray-500">
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
            </>
          )}

          {/* Locality Leaderboard */}
          {activeTab === 'locality' && (
            <>
              {localityStats.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🏘️</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No locality data yet!</h3>
                  <p className="text-gray-500 mb-6">Register with your locality to compete as a community!</p>
                  <button
                    onClick={() => onNavigate('registration')}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-2xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    Register Now
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {localityStats.map((locality, index) => (
                    <div
                      key={locality.locality}
                      className={`${getRankBgColor(index)} border-2 rounded-2xl p-6 transition-all hover:shadow-lg`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-12 h-12">
                            {getRankIcon(index)}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                              <Building className="w-5 h-5" />
                              {locality.locality}
                            </h3>
                            {locality.ward && (
                              <p className="text-gray-600">Ward {locality.ward}</p>
                            )}
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {locality.totalPlayers} players
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="w-4 h-4" />
                                Avg: {locality.averageScore}
                              </span>
                              <span className="flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                {locality.weeklyProgress > 0 ? '+' : ''}{locality.weeklyProgress}%
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-3xl font-bold text-gray-800">{locality.totalScore}</div>
                          <div className="text-sm text-gray-600">total points</div>
                        </div>
                      </div>

                      {/* Top Players in Locality */}
                      {selectedLocality === locality.locality && locality.topPlayers.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Top Contributors:</h4>
                          <div className="space-y-2">
                            {locality.topPlayers.slice(0, 3).map((player, pIndex) => (
                              <div key={pIndex} className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">
                                  {pIndex + 1}. {player.name}
                                </span>
                                <span className="font-semibold text-gray-700">{player.score} pts</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => setSelectedLocality(
                          selectedLocality === locality.locality ? null : locality.locality
                        )}
                        className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {selectedLocality === locality.locality ? 'Hide' : 'Show'} top players
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Government Recognition Banner */}
          <div className="mt-8 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-6 border-2 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">🏅 Government Recognition Program</h3>
                <p className="text-sm text-gray-700">
                  Top performers and localities receive official certificates and prizes from the government!
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  Monthly awards ceremony • Public recognition • Community development grants
                </p>
              </div>
              <Trophy className="w-16 h-16 text-orange-500" />
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('game')}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-2xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Play & Contribute to Your Locality!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};