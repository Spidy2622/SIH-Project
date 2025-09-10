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
}

export type GamePage = 'home' | 'instructions' | 'game' | 'results' | 'leaderboard';