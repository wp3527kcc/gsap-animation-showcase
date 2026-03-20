/**
 * 俄罗斯方块游戏主页面
 */

import React from 'react';
import { useTetrisGame } from '@/hooks/useTetrisGame';
import { useGameControls } from '@/hooks/useGameControls';
import GameBoardAnimated from '@/components/tetris/GameBoardAnimated';
import NextPiecePreview from '@/components/tetris/NextPiecePreview';
import GameStatsAnimated from '@/components/tetris/GameStatsAnimated';
import GameControls from '@/components/tetris/GameControls';
import GameOverModalAnimated from '@/components/tetris/GameOverModalAnimated';

export default function Tetris() {
  const { gameState, handleInput, restart } = useTetrisGame();
  useGameControls(handleInput);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container py-6">
          <h1 className="text-3xl font-bold text-gray-900">俄罗斯方块</h1>
          <p className="text-gray-600 mt-2">经典单机游戏</p>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                游戏区域
              </h2>
              <GameBoardAnimated
                board={gameState.board}
                currentPiece={gameState.currentPiece}
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-2 space-y-4">
            {/* Stats */}
            <GameStatsAnimated
              score={gameState.score}
              level={gameState.level}
              lines={gameState.lines}
            />

            {/* Next Piece Preview */}
            <NextPiecePreview nextPiece={gameState.nextPiece} />

            {/* Controls */}
            <GameControls
              isPaused={gameState.isPaused}
              gameOver={gameState.gameOver}
              onPause={() => handleInput('pause')}
              onRestart={restart}
            />
          </div>
        </div>

        {/* Game Over Modal */}
        {gameState.gameOver && (
          <GameOverModalAnimated
            score={gameState.score}
            level={gameState.level}
            lines={gameState.lines}
            onRestart={restart}
          />
        )}
      </main>
    </div>
  );
}
