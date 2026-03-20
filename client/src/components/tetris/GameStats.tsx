/**
 * 游戏统计信息显示组件
 */

import React from 'react';

interface GameStatsProps {
  score: number;
  level: number;
  lines: number;
}

export default function GameStats({ score, level, lines }: GameStatsProps) {
  const stats = [
    { label: '分数', value: score },
    { label: '等级', value: level },
    { label: '消除行数', value: lines },
  ];

  return (
    <div className="bg-white rounded-lg p-4 shadow-md space-y-3">
      {stats.map((stat) => (
        <div key={stat.label} className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">
            {stat.label}
          </span>
          <span className="text-lg font-bold text-gray-900">
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
}
