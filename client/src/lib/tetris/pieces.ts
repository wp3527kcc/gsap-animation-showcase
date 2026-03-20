/**
 * 俄罗斯方块方块定义
 * 定义 7 种标准俄罗斯方块及其旋转状态
 */

import { CellType, Position, RotationStates, Tetromino } from './types';
import { PIECE_COLORS } from './constants';

/**
 * 方块旋转状态定义
 * 使用相对坐标表示方块的形状
 */

// I 型方块（直线）
export const I_ROTATIONS: RotationStates = {
  0: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}],
  1: [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}],
  2: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}],
  3: [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}],
};

// O 型方块（正方形）
export const O_ROTATIONS: RotationStates = {
  0: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}],
  1: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}],
  2: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}],
  3: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}],
};

// T 型方块
export const T_ROTATIONS: RotationStates = {
  0: [{x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}],
  1: [{x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2}],
  2: [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2}],
  3: [{x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: 2}],
};

// S 型方块
export const S_ROTATIONS: RotationStates = {
  0: [{x: 1, y: 0}, {x: 2, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}],
  1: [{x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 2, y: 2}],
  2: [{x: 1, y: 0}, {x: 2, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}],
  3: [{x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 2, y: 2}],
};

// Z 型方块
export const Z_ROTATIONS: RotationStates = {
  0: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}],
  1: [{x: 2, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2}],
  2: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}],
  3: [{x: 2, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2}],
};

// J 型方块
export const J_ROTATIONS: RotationStates = {
  0: [{x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}],
  1: [{x: 1, y: 0}, {x: 2, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}],
  2: [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 2, y: 0}],
  3: [{x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 2}, {x: 1, y: 2}],
};

// L 型方块
export const L_ROTATIONS: RotationStates = {
  0: [{x: 2, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}],
  1: [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}],
  2: [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 0, y: 0}],
  3: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}],
};

/**
 * 所有方块类型的旋转状态映射
 */
const ROTATION_STATES_MAP: Record<CellType, RotationStates> = {
  [CellType.Empty]: {},
  [CellType.I]: I_ROTATIONS,
  [CellType.O]: O_ROTATIONS,
  [CellType.T]: T_ROTATIONS,
  [CellType.S]: S_ROTATIONS,
  [CellType.Z]: Z_ROTATIONS,
  [CellType.J]: J_ROTATIONS,
  [CellType.L]: L_ROTATIONS,
  [CellType.Fixed]: {},
};

/**
 * 创建一个新的方块
 */
export function createTetromino(type: CellType, position: Position = { x: 3, y: 0 }): Tetromino {
  return {
    type,
    position,
    rotationIndex: 0,
    rotationStates: ROTATION_STATES_MAP[type],
    color: PIECE_COLORS[type],
  };
}

/**
 * 生成随机方块
 */
export function generateRandomPiece(): Tetromino {
  const types = [CellType.I, CellType.O, CellType.T, CellType.S, CellType.Z, CellType.J, CellType.L];
  const randomType = types[Math.floor(Math.random() * types.length)];
  return createTetromino(randomType);
}

/**
 * 获取方块的当前形状（绝对坐标）
 */
export function getPieceShape(piece: Tetromino): Position[] {
  const shape = piece.rotationStates[piece.rotationIndex];
  return shape.map((pos) => ({
    x: piece.position.x + pos.x,
    y: piece.position.y + pos.y,
  }));
}

/**
 * 获取方块旋转后的形状（相对坐标）
 */
export function getRotatedShape(piece: Tetromino): Position[] {
  const nextRotationIndex = (piece.rotationIndex + 1) % 4;
  const shape = piece.rotationStates[nextRotationIndex];
  return shape.map((pos) => ({
    x: piece.position.x + pos.x,
    y: piece.position.y + pos.y,
  }));
}

/**
 * 旋转方块
 */
export function rotatePiece(piece: Tetromino): Tetromino {
  return {
    ...piece,
    rotationIndex: (piece.rotationIndex + 1) % 4,
  };
}

/**
 * 移动方块
 */
export function movePiece(piece: Tetromino, dx: number, dy: number): Tetromino {
  return {
    ...piece,
    position: {
      x: piece.position.x + dx,
      y: piece.position.y + dy,
    },
  };
}

/**
 * 克隆方块
 */
export function clonePiece(piece: Tetromino): Tetromino {
  return {
    ...piece,
    position: { ...piece.position },
  };
}
