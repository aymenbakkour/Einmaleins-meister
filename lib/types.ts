export type Operation = "multiply" | "divide" | "add" | "subtract";
export type Difficulty = "easy" | "medium" | "hard";
export type Mode = "home" | "learn" | "test" | "print" | "stats" | "certificate" | "settings";
export type Language = "de" | "ar";

export interface UserProfile {
  name: string;
  birthdate: string;
}

export interface GameResult {
  id: string;
  date: string;
  operation: Operation;
  difficulty: Difficulty;
  score: number;
  total: number;
  stars: number;
}

export interface UserStats {
  totalGames: number;
  totalStars: number;
  history: GameResult[];
}
