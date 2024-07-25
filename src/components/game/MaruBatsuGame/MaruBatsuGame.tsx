import { useCallback, useState } from 'react';

import styles from './style.module.scss';

import { Grid3x3 } from '@/components/common/Grid3x3/Grid3x3';
import { PieceView } from '@/components/common/PieceView/PieceView';
import { Piece, initialPieces } from '@/types/piece';

export const MaruBatsuGame = () => {
  const [pieces, setPieces] = useState<Piece[]>(initialPieces);
  const [currentPlayer, setCurrentPlayer] = useState<'first' | 'second'>('first');
  const [currentTurn, setCurrentTurn] = useState(1);
  const [winner, setWinner] = useState<'first' | 'second' | 'none'>('none');

  const checkWinner = useCallback(
    (board: Piece[]) => {
      // 0 1 2
      // 3 4 5
      // 6 7 8
      const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (const pattern of winPatterns) {
        if (
          board[pattern[0]].player === currentPlayer &&
          board[pattern[1]].player === currentPlayer &&
          board[pattern[2]].player === currentPlayer
        ) {
          setWinner(currentPlayer);
          return true;
        }
      }
      return false;
    },
    [currentPlayer]
  );

  const onClick = useCallback(
    (n: number) => {
      if (winner !== 'none') {
        return;
      }
      if (pieces[n].player !== 'none') {
        // すでに置かれている場所には置けない
        return;
      }

      // 消えるコマがあれば消す
      const newPieces = pieces.map((p, i) => {
        if (i === n) {
          return { player: currentPlayer, turn: currentTurn } as Piece;
        }
        if (p.player === currentPlayer && p.older) {
          return { player: 'none', turn: 0 } as Piece;
        }
        return p;
      });

      const myPieces = newPieces.filter((p) => p.player === currentPlayer);
      // 自分のコマが3つ以上ある場合は最もターンが古いコマにマークをつける
      if (myPieces.length >= 3) {
        // 勝利判定
        if (checkWinner(newPieces)) {
          setPieces(newPieces);
          return;
        }
        const oldestPiece = myPieces.reduce((a, b) => (a.turn < b.turn ? a : b));
        for (let i = 0; i < newPieces.length; i++) {
          if (
            newPieces[i].player === oldestPiece.player &&
            newPieces[i].turn === oldestPiece.turn
          ) {
            newPieces[i] = { ...oldestPiece, older: true };
            break;
          }
        }
      }

      setPieces(newPieces);
      setCurrentPlayer((prev) => (prev === 'first' ? 'second' : 'first'));
      setCurrentTurn((prev) => prev + 1);
    },
    [pieces, currentPlayer, currentTurn, winner, checkWinner]
  );

  return (
    <div className={styles.maru_batsu_game}>
      {winner === 'none' && (
        <div>
          <span className={currentPlayer === 'first' ? styles.red : styles.blue}>
            {currentPlayer === 'first' ? '先手' : '後手'}
          </span>
          の番です
        </div>
      )}
      {winner !== 'none' && (
        <div>
          <span className={currentPlayer === 'first' ? styles.red : styles.blue}>
            {currentPlayer === 'first' ? '先手' : '後手'}
          </span>
          の勝ちです
        </div>
      )}
      <Grid3x3
        items={pieces.map((p, i) => (
          <PieceView
            key={i}
            piece={p}
          />
        ))}
        onClick={onClick}
      />
      <button
        type="button"
        onClick={() => {
          setPieces(initialPieces);
          setCurrentPlayer('first');
          setCurrentTurn(0);
          setWinner('none');
        }}
      >
        リセット
      </button>
    </div>
  );
};
