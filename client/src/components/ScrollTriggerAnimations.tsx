import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTriggerAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);
  const box3Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 动画 1: 盒子从左侧进入
      gsap.to(box1Ref.current, {
        x: 200,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section1Ref.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
          markers: false,
        },
      });

      // 动画 2: 盒子旋转和缩放
      gsap.to(box2Ref.current, {
        rotation: 360,
        scale: 1.2,
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "top 75%",
          end: "top 25%",
          scrub: 1.5,
          markers: false,
        },
      });

      // 动画 3: 盒子背景色变化和位置变化
      gsap.to(box3Ref.current, {
        backgroundColor: "#FF6B9D",
        y: -100,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section3Ref.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
          markers: false,
        },
      });

      // 背景色随滚动变化
      gsap.to("body", {
        backgroundColor: "#f0f0f0",
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
          markers: false,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="space-y-0">
      <div className="text-center py-20 bg-white">
        <h2 className="text-3xl font-bold mb-4">ScrollTrigger 动画示例</h2>
        <p className="text-gray-600">向下滚动查看动画效果</p>
      </div>

      {/* Section 1 */}
      <div
        ref={section1Ref}
        className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center relative overflow-hidden"
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8">动画 1: 从左侧进入</h3>
          <div
            ref={box1Ref}
            className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-xl mx-auto flex items-center justify-center text-white font-bold opacity-0 -translate-x-full"
          >
            Box 1
          </div>
          <p className="mt-8 text-gray-600">
            这个盒子会从左侧滑入并变得可见
          </p>
        </div>
      </div>

      {/* Section 2 */}
      <div
        ref={section2Ref}
        className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center relative overflow-hidden"
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8">动画 2: 旋转和缩放</h3>
          <div
            ref={box2Ref}
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-xl mx-auto flex items-center justify-center text-white font-bold"
          >
            Box 2
          </div>
          <p className="mt-8 text-gray-600">这个盒子会旋转 360 度并放大</p>
        </div>
      </div>

      {/* Section 3 */}
      <div
        ref={section3Ref}
        className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 flex items-center justify-center relative overflow-hidden"
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8">动画 3: 背景色变化和位置变化</h3>
          <div
            ref={box3Ref}
            className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-xl mx-auto flex items-center justify-center text-white font-bold"
          >
            Box 3
          </div>
          <p className="mt-8 text-gray-600">
            这个盒子会改变颜色并向上移动
          </p>
        </div>
      </div>

      {/* 结束部分 */}
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">滚动动画完成！</h3>
          <p className="text-gray-600">向上滚动查看动画反向效果</p>
        </div>
      </div>
    </div>
  );
}
