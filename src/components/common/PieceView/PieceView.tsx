import styles from './style.module.scss';

import { Piece } from '@/types/piece';

type Props = {
  piece: Piece;
};

export const PieceView = ({ piece }: Props) => {
  if (piece.player === 'none') {
    return null;
  }

  return (
    <div
      className={`${styles.piece_view} ${piece.player === 'first' ? styles.red : styles.blue} ${
        piece.older ? styles.older : ''
      }`}
    >
      {piece.player === 'first' ? '○' : '×'}
    </div>
  );
};
