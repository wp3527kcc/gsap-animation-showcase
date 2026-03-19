import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Button } from "./ui/button";

export default function BasicAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);
  const box3Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. gsap.to() - 从当前状态动画到目标状态
      gsap.to(box1Ref.current, {
        x: 150,
        rotation: 360,
        duration: 2,
        ease: "power1.out",
        delay: 0.5,
      });

      // 2. gsap.from() - 从目标状态动画回当前状态
      gsap.from(box2Ref.current, {
        y: -100,
        opacity: 0,
        duration: 1.5,
        ease: "back.out(1.7)",
        delay: 1,
      });

      // 3. gsap.fromTo() - 定义起始和结束状态
      gsap.fromTo(
        box3Ref.current,
        { scale: 0.5, rotation: -90 },
        {
          scale: 1,
          rotation: 0,
          duration: 1.8,
          ease: "elastic.out(1, 0.3)",
          delay: 1.5,
        }
      );
    },
    { scope: containerRef }
  );

  const handleReplay = () => {
    gsap.fromTo(
      [box1Ref.current, box2Ref.current, box3Ref.current],
      { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, duration: 0.3 }
    );

    // 重新触发动画
    gsap.to(box1Ref.current, {
      x: 150,
      rotation: 360,
      duration: 2,
      ease: "power1.out",
    });

    gsap.from(box2Ref.current, {
      y: -100,
      opacity: 0,
      duration: 1.5,
      ease: "back.out(1.7)",
      delay: 0.5,
    });

    gsap.fromTo(
      box3Ref.current,
      { scale: 0.5, rotation: -90 },
      {
        scale: 1,
        rotation: 0,
        duration: 1.8,
        ease: "elastic.out(1, 0.3)",
        delay: 1,
      }
    );
  };

  return (
    <div ref={containerRef} className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">基础动画示例</h2>

        <div className="flex gap-8 mb-8 flex-wrap">
          {/* gsap.to() 示例 */}
          <div className="flex flex-col items-center gap-4">
            <div
              ref={box1Ref}
              className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg flex items-center justify-center text-white font-bold"
            >
              gsap.to()
            </div>
            <p className="text-sm text-gray-600">向右移动 + 旋转</p>
          </div>

          {/* gsap.from() 示例 */}
          <div className="flex flex-col items-center gap-4">
            <div
              ref={box2Ref}
              className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-lg flex items-center justify-center text-white font-bold"
            >
              gsap.from()
            </div>
            <p className="text-sm text-gray-600">从上方进入</p>
          </div>

          {/* gsap.fromTo() 示例 */}
          <div className="flex flex-col items-center gap-4">
            <div
              ref={box3Ref}
              className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg shadow-lg flex items-center justify-center text-white font-bold"
            >
              gsap.fromTo()
            </div>
            <p className="text-sm text-gray-600">缩放 + 旋转</p>
          </div>
        </div>

        <Button onClick={handleReplay} variant="outline">
          重新播放
        </Button>
      </div>
    </div>
  );
}
