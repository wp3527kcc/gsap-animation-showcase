/**
 * 游戏结束界面组件
 */

import React from 'react';
import { Button } from '@/components/ui/button';

interface GameOverModalProps {
  score: number;
  level: number;
  lines: number;
  onRestart: () => void;
}

export default function GameOverModal({
  score,
  level,
  lines,
  onRestart,
}: GameOverModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-2xl max-w-sm w-full mx-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          游戏结束
        </h2>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 font-medium">最终分数</span>
            <span className="text-2xl font-bold text-gray-900">{score}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 font-medium">达到等级</span>
            <span className="text-2xl font-bold text-gray-900">{level}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 font-medium">消除行数</span>
            <span className="text-2xl font-bold text-gray-900">{lines}</span>
          </div>
        </div>

        <Button
          onClick={onRestart}
          className="w-full py-3 text-lg"
        >
          重新开始游戏
        </Button>
      </div>
    </div>
  );
}
