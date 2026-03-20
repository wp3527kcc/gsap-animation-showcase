import BasicAnimations from "@/components/BasicAnimations";
import StaggerAnimations from "@/components/StaggerAnimations";
import TimelineAnimations from "@/components/TimelineAnimations";
import ScrollTriggerAnimations from "@/components/ScrollTriggerAnimations";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "basic" | "timeline" | "stagger" | "scroll"
  >("basic");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="container py-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">GSAP React Demo</h1>
            <p className="text-gray-600 mt-2">
              使用 Vite + React + GSAP 构建的动画演示项目
            </p>
          </div>
          <a
            href="/tetris"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            俄罗斯方块
          </a>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="container">
          <div className="flex gap-0 overflow-x-auto">
            {[
              { id: "basic", label: "基础动画" },
              { id: "timeline", label: "时间轴" },
              { id: "stagger", label: "交错动画" },
              { id: "scroll", label: "滚动触发" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container py-12">
        {activeTab === "basic" && <BasicAnimations />}
        {activeTab === "timeline" && <TimelineAnimations />}
        {activeTab === "stagger" && <StaggerAnimations />}
        {activeTab === "scroll" && <ScrollTriggerAnimations />}
      </main>
    </div>
  );
}
