export interface Country {
  picture: string;
  code: string;
}

export interface PlayerData {
  rank: number;
  points: number;
  weight: number; // in grams
  height: number; // in cm
  age: number;
  last: number[]; // 1 = win, 0 = loss
}

export interface Player {
  id: number;
  firstname: string;
  lastname: string;
  shortname: string;
  sex: 'M' | 'F';
  country: Country;
  picture: string;
  data: PlayerData;
}

export interface PlayersData {
  players: Player[];
}

// CreatePlayerDTO is now exported from player.schema.ts (Zod-generated type)

export interface Statistics {
  countryWithHighestWinRatio: {
    country: string;
    winRatio: number;
  };
  averageBMI: number;
  medianHeight: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
}

export interface ApiError {
  success: false;
  error: string;
  message: string;
  status: number;
}
