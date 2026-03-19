import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { Button } from "./ui/button";

export default function TimelineAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);
  const box3Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 创建时间轴
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { duration: 0.8, ease: "power2.inOut" },
      });

      // 添加动画序列
      tl.to(box1Ref.current, { backgroundColor: "#FF6B6B", scale: 1.1 })
        .to(
          box2Ref.current,
          { backgroundColor: "#4ECDC4", rotation: 180 },
          "<" // 与上一个动画同时开始
        )
        .to(
          box3Ref.current,
          { backgroundColor: "#FFE66D", y: 50 },
          "+=0.5" // 在上一个动画结束后 0.5 秒开始
        )
        .to(
          [box1Ref.current, box2Ref.current, box3Ref.current],
          { scale: 0.8, opacity: 0.6 },
          "-=0.3" // 与上一个动画重叠 0.3 秒
        );

      timelineRef.current = tl;
    },
    { scope: containerRef }
  );

  const handlePlayPause = () => {
    if (timelineRef.current) {
      if (isPlaying) {
        timelineRef.current.pause();
      } else {
        timelineRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleReverse = () => {
    if (timelineRef.current) {
      timelineRef.current.reverse();
    }
  };

  const handleRestart = () => {
    if (timelineRef.current) {
      timelineRef.current.restart();
      setIsPlaying(true);
    }
  };

  return (
    <div ref={containerRef} className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">时间轴动画示例</h2>

        <div className="flex gap-8 mb-8 flex-wrap items-end">
          {/* 动画盒子 */}
          <div className="flex flex-col items-center gap-4">
            <div
              ref={box1Ref}
              className="w-20 h-20 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold text-sm"
            >
              Box 1
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div
              ref={box2Ref}
              className="w-20 h-20 bg-green-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold text-sm"
            >
              Box 2
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div
              ref={box3Ref}
              className="w-20 h-20 bg-orange-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold text-sm"
            >
              Box 3
            </div>
          </div>
        </div>

        {/* 控制按钮 */}
        <div className="flex gap-3 flex-wrap">
          <Button onClick={handlePlayPause} variant="outline">
            {isPlaying ? "暂停" : "播放"}
          </Button>
          <Button onClick={handleReverse} variant="outline">
            反向
          </Button>
          <Button onClick={handleRestart} variant="outline">
            重新开始
          </Button>
        </div>

        {/* 说明文字 */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>时间轴说明：</strong> 这个示例展示了如何使用 Timeline
            来编排多个动画的播放顺序。Box 1 和 Box 2
            同时开始，然后在 0.5 秒后 Box 3 开始动画。所有动画无限循环并来回播放。
          </p>
        </div>
      </div>
    </div>
  );
}
