/**
 * 游戏控制按钮组件
 */

import React from 'react';
import { Button } from '@/components/ui/button';

interface GameControlsProps {
  isPaused: boolean;
  gameOver: boolean;
  onPause: () => void;
  onRestart: () => void;
}

export default function GameControls({
  isPaused,
  gameOver,
  onPause,
  onRestart,
}: GameControlsProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md space-y-3">
      <div className="space-y-2">
        {!gameOver && (
          <Button
            onClick={onPause}
            variant="outline"
            className="w-full"
          >
            {isPaused ? '继续' : '暂停'}
          </Button>
        )}
        <Button
          onClick={onRestart}
          variant={gameOver ? 'default' : 'outline'}
          className="w-full"
        >
          {gameOver ? '重新开始' : '新游戏'}
        </Button>
      </div>

      <div className="pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-600 font-medium mb-2">键盘控制</p>
        <div className="text-xs text-gray-500 space-y-1">
          <div>← → : 左右移动</div>
          <div>↑ : 旋转</div>
          <div>↓ : 快速下落</div>
          <div>空格 : 暂停</div>
        </div>
      </div>
    </div>
  );
}
