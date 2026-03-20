/**
 * 俄罗斯方块游戏类型定义
 * 定义了游戏中使用的所有 TypeScript 类型和接口
 */

/**
 * 方块类型枚举
 * 0: 空单元格
 * 1-7: 7 种不同的方块类型
 * 8: 已固定的方块
 */
export enum CellType {
  Empty = 0,
  I = 1,
  O = 2,
  T = 3,
  S = 4,
  Z = 5,
  J = 6,
  L = 7,
  Fixed = 8,
}

/**
 * 方块坐标
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * 方块形状（相对坐标）
 * 例如 I 型方块的形状为 [[0,0], [1,0], [2,0], [3,0]]
 */
export type Shape = Position[];

/**
 * 方块旋转状态
 * 包含 4 种旋转状态（O 型方块只有 1 种）
 */
export interface RotationStates {
  [key: number]: Shape;
}

/**
 * 俄罗斯方块定义
 */
export interface Tetromino {
  type: CellType;
  position: Position;
  rotationIndex: number;
  rotationStates: RotationStates;
  color: string;
}

/**
 * 游戏状态
 */
export interface GameState {
  board: CellType[][];
  currentPiece: Tetromino;
  nextPiece: Tetromino;
  score: number;
  level: number;
  lines: number;
  gameOver: boolean;
  isPaused: boolean;
  dropSpeed: number;
  isInitialized: boolean;
}

/**
 * 游戏统计信息
 */
export interface GameStats {
  score: number;
  level: number;
  lines: number;
  gameOver: boolean;
  isPaused: boolean;
}

/**
 * 行消除信息
 */
export interface ClearLinesResult {
  clearedLines: number[];
  newBoard: CellType[][];
  linesCleared: number;
  scoreGained: number;
}

/**
 * 游戏配置
 */
export interface GameConfig {
  boardWidth: number;
  boardHeight: number;
  initialDropSpeed: number;
  speedIncrement: number;
  linesPerLevel: number;
}

/**
 * 键盘输入事件
 */
export type GameInput = 'left' | 'right' | 'rotate' | 'softDrop' | 'hardDrop' | 'pause';

/**
 * 游戏事件回调
 */
export interface GameCallbacks {
  onGameOver?: () => void;
  onLinesCleared?: (lines: number) => void;
  onLevelUp?: (level: number) => void;
  onPieceFixed?: () => void;
  onStateChange?: (state: GameState) => void;
}
