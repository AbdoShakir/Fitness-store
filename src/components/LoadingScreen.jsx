import { useEffect, useState } from "react";

export default function GymLoader({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onFinish();
          }, 2000);
          return 100;
        }

        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-zinc-950/95 p-8 text-center shadow-2xl shadow-black/40">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 shadow-inner shadow-cyan-500/10">
          <span className="text-5xl animate-bounce">🏃</span>
        </div>

        <div className="relative mb-5 h-4 w-full overflow-hidden rounded-full bg-zinc-800 shadow-[inset_0_0_12px_rgba(255,255,255,0.06)]">
          <div
            className="absolute -top-8 text-3xl transition-all duration-300 ease-out"
            style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
          >
            <span className="animate-[bounce_1.2s_ease-in-out_infinite]">🏃‍♂️</span>
          </div>
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-zinc-300">
          Loading Gains
        </p>
        <p className="mt-3 text-xs text-zinc-500">{progress}% complete</p>
      </div>
    </div>
  );
}