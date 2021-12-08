export interface ISettings {
  playerName: string;
  level: string;
  gameTurns: number;
}

export interface ILevel {
  name: string;
  gameTurns: number;
  isEditable: boolean;
}
