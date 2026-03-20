/**
 * 带有 GSAP 动画的游戏统计信息组件
 */

import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface GameStatsAnimatedProps {
  score: number;
  level: number;
  lines: number;
  lastScoreGain?: number;
  lastLevelUp?: boolean;
}

export default function GameStatsAnimated({
  score,
  level,
  lines,
  lastScoreGain = 0,
  lastLevelUp = false,
}: GameStatsAnimatedProps) {
  const scoreRef = useRef<HTMLDivElement>(null);
  const levelRef = useRef<HTMLDivElement>(null);
  const [displayScore, setDisplayScore] = useState(score);

  // 分数增长动画
  useGSAP(
    () => {
      if (lastScoreGain > 0) {
        gsap.to(scoreRef.current, {
          textContent: score,
          duration: 0.5,
          snap: { textContent: 1 },
          ease: 'power2.out',
          onUpdate: function () {
            const current = Math.floor(
              parseFloat(this.targets()[0].textContent)
            );
            setDisplayScore(current);
          },
        });
      }
    },
    { scope: scoreRef, dependencies: [score, lastScoreGain] }
  );

  // 等级提升动画
  useGSAP(
    () => {
      if (lastLevelUp) {
        gsap.timeline()
          .to(levelRef.current, {
            scale: 1.3,
            duration: 0.2,
            ease: 'back.out',
          })
          .to(levelRef.current, {
            scale: 1,
            duration: 0.2,
            ease: 'back.in',
          });
      }
    },
    { scope: levelRef, dependencies: [level, lastLevelUp] }
  );

  const stats = [
    { label: '分数', value: displayScore, ref: scoreRef },
    { label: '等级', value: level, ref: levelRef },
    { label: '消除行数', value: lines },
  ];

  return (
    <div className="bg-white rounded-lg p-4 shadow-md space-y-3">
      {stats.map((stat) => (
        <div key={stat.label} className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">
            {stat.label}
          </span>
          <span
            ref={stat.ref}
            className="text-lg font-bold text-gray-900"
          >
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
}
