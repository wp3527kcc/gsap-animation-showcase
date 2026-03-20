/**
 * 俄罗斯方块碰撞检测模块
 */

import { CellType, Position, Tetromino } from './types';
import { GAME_CONFIG } from './constants';
import { getPieceShape, getRotatedShape } from './pieces';

/**
 * 检查方块是否与游戏网格边界或已固定方块碰撞
 */
export function checkCollision(
  piece: Tetromino,
  board: CellType[][],
  shape?: Position[]
): boolean {
  const shapeToCheck = shape || getPieceShape(piece);

  for (const pos of shapeToCheck) {
    // 检查左右边界
    if (pos.x < 0 || pos.x >= GAME_CONFIG.boardWidth) {
      return true;
    }

    // 检查底部边界
    if (pos.y >= GAME_CONFIG.boardHeight) {
      return true;
    }

    // 检查与已固定方块的碰撞（不检查上边界，允许方块从顶部进入）
    if (pos.y >= 0 && board[pos.y][pos.x] !== CellType.Empty) {
      return true;
    }
  }

  return false;
}

/**
 * 检查旋转是否会导致碰撞
 */
export function checkRotationCollision(
  piece: Tetromino,
  board: CellType[][]
): boolean {
  const rotatedShape = getRotatedShape(piece);
  return checkCollision(piece, board, rotatedShape);
}

/**
 * 检查方块是否可以向左移动
 */
export function canMoveLeft(
  piece: Tetromino,
  board: CellType[][]
): boolean {
  const shape = getPieceShape(piece);
  const movedShape = shape.map((pos) => ({
    x: pos.x - 1,
    y: pos.y,
  }));
  return !checkCollision(piece, board, movedShape);
}

/**
 * 检查方块是否可以向右移动
 */
export function canMoveRight(
  piece: Tetromino,
  board: CellType[][]
): boolean {
  const shape = getPieceShape(piece);
  const movedShape = shape.map((pos) => ({
    x: pos.x + 1,
    y: pos.y,
  }));
  return !checkCollision(piece, board, movedShape);
}

/**
 * 检查方块是否可以向下移动
 */
export function canMoveDown(
  piece: Tetromino,
  board: CellType[][]
): boolean {
  const shape = getPieceShape(piece);
  const movedShape = shape.map((pos) => ({
    x: pos.x,
    y: pos.y + 1,
  }));
  return !checkCollision(piece, board, movedShape);
}

/**
 * 检查方块是否可以旋转
 */
export function canRotate(
  piece: Tetromino,
  board: CellType[][]
): boolean {
  return !checkRotationCollision(piece, board);
}

/**
 * 检查游戏是否结束（新方块无法放置）
 */
export function isGameOver(
  piece: Tetromino,
  board: CellType[][]
): boolean {
  return checkCollision(piece, board);
}
