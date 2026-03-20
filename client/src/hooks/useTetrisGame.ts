/**
 * 俄罗斯方块游戏 React Hook
 * 管理游戏状态和游戏循环
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { GameState, GameInput } from '@/lib/tetris/types';
import {
  initializeGame,
  updateGameState,
  handleMoveLeft,
  handleMoveRight,
  handleRotate,
  handleSoftDrop,
  handlePause,
  restartGame,
} from '@/lib/tetris/gameEngine';

export function useTetrisGame() {
  const [gameState, setGameState] = useState<GameState>(() => initializeGame());
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const lastInputTimeRef = useRef<Record<string, number>>({});

  // 处理游戏输入
  const handleInput = useCallback((input: GameInput) => {
    setGameState((prevState) => {
      switch (input) {
        case 'left':
          return handleMoveLeft(prevState);
        case 'right':
          return handleMoveRight(prevState);
        case 'rotate':
          return handleRotate(prevState);
        case 'softDrop':
          return handleSoftDrop(prevState);
        case 'pause':
          return handlePause(prevState);
        default:
          return prevState;
      }
    });
  }, []);

  // 游戏循环
  useEffect(() => {
    if (gameState.gameOver || gameState.isPaused) {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }

    gameLoopRef.current = setInterval(() => {
      setGameState((prevState) => updateGameState(prevState));
    }, gameState.dropSpeed);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState.dropSpeed, gameState.gameOver, gameState.isPaused]);

  // 重新开始游戏
  const restart = useCallback(() => {
    setGameState(restartGame());
  }, []);

  return {
    gameState,
    handleInput,
    restart,
  };
}
