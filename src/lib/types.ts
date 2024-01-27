export type NoWinner = -1;
export type Player = 0 | 1;
export type Draw = 2;
export type CellState = Player | NoWinner;
export type GameState = Player | NoWinner | Draw;
export type Board = CellState[];
