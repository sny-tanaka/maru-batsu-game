export type Piece = {
  player: 'first' | 'second' | 'none';
  turn: number;
  older?: boolean;
};

export const initialPieces: Piece[] = [
  { player: 'none', turn: 0 },
  { player: 'none', turn: 0 },
  { player: 'none', turn: 0 },
  { player: 'none', turn: 0 },
  { player: 'none', turn: 0 },
  { player: 'none', turn: 0 },
  { player: 'none', turn: 0 },
  { player: 'none', turn: 0 },
  { player: 'none', turn: 0 },
];
