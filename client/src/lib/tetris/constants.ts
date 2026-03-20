/**
 * 俄罗斯方块游戏常量定义
 */

import { GameConfig } from './types';

/**
 * 游戏配置
 */
export const GAME_CONFIG: GameConfig = {
  boardWidth: 10,
  boardHeight: 20,
  initialDropSpeed: 800, // 毫秒
  speedIncrement: 50, // 每级加快 50ms
  linesPerLevel: 10, // 每 10 行升级一次
};

/**
 * 方块颜色映射
 */
export const PIECE_COLORS: Record<number, string> = {
  0: '#ffffff', // 空
  1: '#00f0f1', // I - 青色
  2: '#f0f000', // O - 黄色
  3: '#a000f0', // T - 紫色
  4: '#00f000', // S - 绿色
  5: '#f00000', // Z - 红色
  6: '#0000f0', // J - 蓝色
  7: '#f0a000', // L - 橙色
  8: '#808080', // Fixed - 灰色
};

/**
 * 计分规则
 * 消除的行数 -> 得分
 */
export const SCORE_TABLE: Record<number, number> = {
  1: 100,
  2: 300,
  3: 500,
  4: 800,
};

/**
 * 方块名称
 */
export const PIECE_NAMES: Record<number, string> = {
  1: 'I',
  2: 'O',
  3: 'T',
  4: 'S',
  5: 'Z',
  6: 'J',
  7: 'L',
};

/**
 * 键盘按键映射
 */
export const KEY_BINDINGS: Record<string, string> = {
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'rotate',
  ArrowDown: 'softDrop',
  ' ': 'pause',
  'w': 'rotate',
  'a': 'left',
  'd': 'right',
  's': 'softDrop',
};
