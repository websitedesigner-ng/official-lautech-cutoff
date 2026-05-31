import { useEffect, useState } from "react";

interface ScoreRingProps {
  score: number; // 0–100
  jambPoints: number;
  olevelPoints: number;
}

export function ScoreRing({ score, jambPoints, olevelPoints }: ScoreRingProps) {
  const [animated, setAnimated] = useState(0);
  const radius = 80;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const offset = circumference - (animated / 100) * circumference;

  const color =
    score >= 70 ? "#16a34a" :
    score >= 55 ? "#C8A84B" :
    score >= 40 ? "#CC1B1B" :
    "#dc2626";

  const label =
    score >= 70 ? "Excellent" :
    score >= 55 ? "Good" :
    score >= 40 ? "Fair" :
    "Below Average";

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
          {/* background track */}
          <circle
            cx={radius} cy={radius} r={normalizedRadius}
            fill="none"
            stroke="#f1f1f1"
            strokeWidth={stroke}
          />
          {/* animated progress */}
          <circle
            cx={radius} cy={radius} r={normalizedRadius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${radius} ${radius})`}
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1), stroke 0.5s ease" }}
          />
        </svg>
        {/* centre text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold" style={{ color }}>{score.toFixed(1)}%</span>
          <span className="text-xs font-medium text-gray-400 uppercase tracking-widest mt-0.5">{label}</span>
        </div>
      </div>

      {/* breakdown bars */}
      <div className="w-full space-y-3 px-2">
        <BreakdownBar label="JAMB (75%)" value={jambPoints} max={75} color="#CC1B1B" />
        <BreakdownBar label="O'Level (25%)" value={olevelPoints} max={25} color="#C8A84B" />
      </div>
    </div>
  );
}

function BreakdownBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth((value / max) * 100), 200);
    return () => clearTimeout(t);
  }, [value, max]);

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-medium text-gray-500">
        <span>{label}</span>
        <span style={{ color }}>{value.toFixed(2)} pts</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${width}%`,
            backgroundColor: color,
            transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
    </div>
  );
}
