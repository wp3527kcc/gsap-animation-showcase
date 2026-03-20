/**
 * 带有 GSAP 动画的游戏网格显示组件
 */

import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { CellType, Tetromino } from '@/lib/tetris/types';
import { getPieceShape } from '@/lib/tetris/pieces';
import { PIECE_COLORS, GAME_CONFIG } from '@/lib/tetris/constants';

interface GameBoardAnimatedProps {
  board: CellType[][];
  currentPiece: Tetromino;
  clearedLines?: number[];
}

export default function GameBoardAnimated({
  board,
  currentPiece,
  clearedLines = [],
}: GameBoardAnimatedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cellSize = 24;

  // 获取当前方块的形状
  const currentPieceShape = getPieceShape(currentPiece);
  const currentPieceSet = new Set(
    currentPieceShape.map((pos) => `${pos.x},${pos.y}`)
  );

  // 行消除动画
  useGSAP(
    () => {
      if (clearedLines.length > 0) {
        clearedLines.forEach((lineIndex) => {
          const cells = containerRef.current?.querySelectorAll(
            `[data-line="${lineIndex}"]`
          );
          if (cells) {
            gsap.to(cells, {
              opacity: 0,
              scale: 0.8,
              duration: 0.3,
              ease: 'back.in',
            });
          }
        });
      }
    },
    { scope: containerRef, dependencies: [clearedLines] }
  );

  return (
    <div ref={containerRef} className="flex justify-center">
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
            const isClearedLine = clearedLines.includes(y);

            return (
              <div
                key={`${x}-${y}`}
                data-line={y}
                className={`absolute border border-gray-800 transition-colors ${
                  cellType !== CellType.Empty ? 'shadow-lg' : ''
                } ${isClearedLine ? 'animate-pulse' : ''}`}
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
