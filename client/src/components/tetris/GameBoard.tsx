/**
 * 游戏网格显示组件
 * 渲染 10x20 的游戏网格
 */

import React from 'react';
import { CellType, Tetromino } from '@/lib/tetris/types';
import { getPieceShape } from '@/lib/tetris/pieces';
import { PIECE_COLORS, GAME_CONFIG } from '@/lib/tetris/constants';

interface GameBoardProps {
  board: CellType[][];
  currentPiece: Tetromino;
}

export default function GameBoard({ board, currentPiece }: GameBoardProps) {
  // 获取当前方块的形状
  const currentPieceShape = getPieceShape(currentPiece);
  const currentPieceSet = new Set(
    currentPieceShape.map((pos) => `${pos.x},${pos.y}`)
  );

  const cellSize = 24; // 每个单元格的大小（像素）

  return (
    <div className="flex justify-center">
      <div
        className="bg-gray-900 border-2 border-gray-700 relative"
        style={{
          width: GAME_CONFIG.boardWidth * cellSize,
          height: GAME_CONFIG.boardHeight * cellSize,
        }}
      >
        {/* 渲染网格 */}
        {board.map((row, y) =>
          row.map((cell, x) => {
            const isCurrentPiece = currentPieceSet.has(`${x},${y}`);
            const cellType = isCurrentPiece ? currentPiece.type : cell;
            const color = PIECE_COLORS[cellType];

            return (
              <div
                key={`${x}-${y}`}
                className={`absolute border border-gray-800 transition-colors ${
                  cellType !== CellType.Empty ? 'shadow-lg' : ''
                }`}
                style={{
                  left: x * cellSize,
                  top: y * cellSize,
                  width: cellSize,
                  height: cellSize,
                  backgroundColor:
                    cellType !== CellType.Empty ? color : '#1a1a1a',
                  opacity: cellType !== CellType.Empty ? 0.9 : 0.3,
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
