/**
 * 俄罗斯方块游戏引擎
 * 实现游戏的核心逻辑
 */

import { CellType, GameState, Tetromino, ClearLinesResult } from './types';
import { GAME_CONFIG, SCORE_TABLE } from './constants';
import {
  createTetromino,
  generateRandomPiece,
  getPieceShape,
  movePiece,
  rotatePiece,
} from './pieces';
import {
  checkCollision,
  canMoveLeft,
  canMoveRight,
  canMoveDown,
  canRotate,
  isGameOver,
} from './collision';

/**
 * 初始化游戏状态
 */
export function initializeGame(): GameState {
  const board: CellType[][] = Array(GAME_CONFIG.boardHeight)
    .fill(null)
    .map(() => Array(GAME_CONFIG.boardWidth).fill(CellType.Empty));

  const currentPiece = generateRandomPiece();
  const nextPiece = generateRandomPiece();

  return {
    board,
    currentPiece,
    nextPiece,
    score: 0,
    level: 1,
    lines: 0,
    gameOver: false,
    isPaused: false,
    dropSpeed: GAME_CONFIG.initialDropSpeed,
    isInitialized: true,
  };
}

/**
 * 将方块固定到游戏网格上
 */
export function fixPieceToBoard(
  board: CellType[][],
  piece: Tetromino
): CellType[][] {
  const newBoard = board.map((row) => [...row]);
  const shape = getPieceShape(piece);

  for (const pos of shape) {
    if (pos.y >= 0 && pos.y < GAME_CONFIG.boardHeight) {
      newBoard[pos.y][pos.x] = piece.type;
    }
  }

  return newBoard;
}

/**
 * 清除满行
 */
export function clearLines(board: CellType[][]): ClearLinesResult {
  const clearedLines: number[] = [];
  let newBoard = board.map((row) => [...row]);

  // 找出所有满行
  for (let y = 0; y < GAME_CONFIG.boardHeight; y++) {
    if (newBoard[y].every((cell) => cell !== CellType.Empty)) {
      clearedLines.push(y);
    }
  }

  // 删除满行并在顶部添加空行
  for (const y of clearedLines) {
    newBoard.splice(y, 1);
    newBoard.unshift(Array(GAME_CONFIG.boardWidth).fill(CellType.Empty));
  }

  // 计算得分
  const linesCleared = clearedLines.length;
  const scoreGained = SCORE_TABLE[linesCleared] || 0;

  return {
    clearedLines,
    newBoard,
    linesCleared,
    scoreGained,
  };
}

/**
 * 更新游戏状态 - 方块下落
 */
export function updateGameState(state: GameState): GameState {
  if (state.gameOver || state.isPaused) {
    return state;
  }

  // 尝试向下移动方块
  if (canMoveDown(state.currentPiece, state.board)) {
    return {
      ...state,
      currentPiece: movePiece(state.currentPiece, 0, 1),
    };
  }

  // 方块无法继续下落，固定到网格
  let newBoard = fixPieceToBoard(state.board, state.currentPiece);

  // 清除满行
  const clearResult = clearLines(newBoard);
  newBoard = clearResult.newBoard;

  // 生成新方块
  const newCurrentPiece = state.nextPiece;
  const newNextPiece = generateRandomPiece();

  // 检查游戏是否结束
  if (isGameOver(newCurrentPiece, newBoard)) {
    return {
      ...state,
      board: newBoard,
      gameOver: true,
    };
  }

  // 更新分数和等级
  let newScore = state.score + clearResult.scoreGained;
  let newLevel = state.level;
  let newLines = state.lines + clearResult.linesCleared;
  let newDropSpeed = state.dropSpeed;

  // 检查是否升级
  if (newLines >= state.level * GAME_CONFIG.linesPerLevel) {
    newLevel = Math.floor(newLines / GAME_CONFIG.linesPerLevel) + 1;
    newDropSpeed = Math.max(
      100,
      GAME_CONFIG.initialDropSpeed - (newLevel - 1) * GAME_CONFIG.speedIncrement
    );
  }

  return {
    ...state,
    board: newBoard,
    currentPiece: newCurrentPiece,
    nextPiece: newNextPiece,
    score: newScore,
    level: newLevel,
    lines: newLines,
    dropSpeed: newDropSpeed,
  };
}

/**
 * 处理左移输入
 */
export function handleMoveLeft(state: GameState): GameState {
  if (state.gameOver || state.isPaused) {
    return state;
  }

  if (canMoveLeft(state.currentPiece, state.board)) {
    return {
      ...state,
      currentPiece: movePiece(state.currentPiece, -1, 0),
    };
  }

  return state;
}

/**
 * 处理右移输入
 */
export function handleMoveRight(state: GameState): GameState {
  if (state.gameOver || state.isPaused) {
    return state;
  }

  if (canMoveRight(state.currentPiece, state.board)) {
    return {
      ...state,
      currentPiece: movePiece(state.currentPiece, 1, 0),
    };
  }

  return state;
}

/**
 * 处理旋转输入
 */
export function handleRotate(state: GameState): GameState {
  if (state.gameOver || state.isPaused) {
    return state;
  }

  if (canRotate(state.currentPiece, state.board)) {
    return {
      ...state,
      currentPiece: rotatePiece(state.currentPiece),
    };
  }

  return state;
}

/**
 * 处理快速下落输入
 */
export function handleSoftDrop(state: GameState): GameState {
  if (state.gameOver || state.isPaused) {
    return state;
  }

  if (canMoveDown(state.currentPiece, state.board)) {
    return {
      ...state,
      currentPiece: movePiece(state.currentPiece, 0, 1),
    };
  }

  return updateGameState(state);
}

/**
 * 处理暂停输入
 */
export function handlePause(state: GameState): GameState {
  if (state.gameOver) {
    return state;
  }

  return {
    ...state,
    isPaused: !state.isPaused,
  };
}

/**
 * 重新开始游戏
 */
export function restartGame(): GameState {
  return initializeGame();
}
