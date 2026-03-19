import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Button } from "./ui/button";

export default function StaggerAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 创建交错动画
      gsap.to(".stagger-box", {
        y: -20,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1, // 每个元素之间延迟 0.1 秒
        ease: "back.out(1.7)",
        delay: 0.3,
      });
    },
    { scope: containerRef }
  );

  const handleReplay = () => {
    // 重置所有盒子
    gsap.set(".stagger-box", { y: 50, opacity: 0 });

    // 重新播放动画
    gsap.to(".stagger-box", {
      y: -20,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
    });
  };

  return (
    <div ref={containerRef} className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">交错动画示例 (Stagger)</h2>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="stagger-box h-24 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg shadow-lg flex items-center justify-center text-white font-bold opacity-0 translate-y-12"
            >
              {i + 1}
            </div>
          ))}
        </div>

        <Button onClick={handleReplay} variant="outline">
          重新播放
        </Button>

        {/* 说明文字 */}
        <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>交错动画说明：</strong> Stagger
            属性允许您为多个元素创建连续的动画效果。每个盒子都会按顺序进入，而不是同时进入。这在创建列表、网格或其他重复元素的动画时非常有用。
          </p>
        </div>
      </div>
    </div>
  );
}
