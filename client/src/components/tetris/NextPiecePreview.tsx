/**
 * 下一个方块预览组件
 */

import React from 'react';
import { Tetromino } from '@/lib/tetris/types';
import { PIECE_COLORS } from '@/lib/tetris/constants';

interface NextPiecePreviewProps {
  nextPiece: Tetromino;
}

export default function NextPiecePreview({ nextPiece }: NextPiecePreviewProps) {
  const cellSize = 20;
  const previewSize = 4;

  // 获取方块的相对坐标
  const shape = nextPiece.rotationStates[0];

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        下一个方块
      </h3>
      <div
        className="bg-gray-900 border border-gray-700 relative"
        style={{
          width: previewSize * cellSize,
          height: previewSize * cellSize,
        }}
      >
        {shape.map((pos, idx) => (
          <div
            key={idx}
            className="absolute border border-gray-800"
            style={{
              left: pos.x * cellSize,
              top: pos.y * cellSize,
              width: cellSize,
              height: cellSize,
              backgroundColor: PIECE_COLORS[nextPiece.type],
              opacity: 0.9,
            }}
          />
        ))}
      </div>
    </div>
  );
}
