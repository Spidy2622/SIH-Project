export interface WasteItem {
  id: string;
  name: string;
  type: 'wet' | 'dry' | 'toxic';
  icon: string;
  explanation: string;
}

export interface GameState {
  score: number;
  level: number;
  lives: number;
  mistakes: Mistake[];
  isGameOver: boolean;
  itemsFallen: number;
  isPaused?: boolean;
}

export interface Mistake {
  item: WasteItem;
  selectedBin: string;
  correctBin: string;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  level: number;
  date: string;
  locality?: string;
  ward?: string;
  society?: string;
  userId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  locality?: string;
  ward?: string;
  society?: string;
  registrationDate: string;
  totalScore: number;
  gamesPlayed: number;
  achievements: Achievement[];
}

export interface LocalityStats {
  locality: string;
  ward?: string;
  totalScore: number;
  totalPlayers: number;
  averageScore: number;
  weeklyProgress: number;
  rank: number;
  topPlayers: LeaderboardEntry[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedDate?: string;
  category: 'individual' | 'community' | 'special';
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  type: 'certificate' | 'prize' | 'recognition';
  awardedTo: string; // userId or locality
  awardedDate: string;
  issuedBy: string;
}

export interface GreenChampion {
  id: string;
  name: string;
  locality: string;
  ward: string;
  role: 'volunteer' | 'official';
  verifiedCampaigns: number;
  joinedDate: string;
}

export type GamePage =
  | 'home'
  | 'registration'
  | 'instructions'
  | 'game'
  | 'results'
  | 'leaderboard'
  | 'profile'
  | 'champions'
  | 'login'
  | 'rewards';