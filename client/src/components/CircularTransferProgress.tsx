import { useEffect, useState, useRef } from "react";

export default function CircularTransferProgress({ percent }: { percent: number }) {
  const r = 52;
  const circumference = 2 * Math.PI * r;

  const [displayedPercent, setDisplayedPercent] = useState(0);
  const currentValueRef = useRef(0);

  useEffect(() => {
    const start = currentValueRef.current;
    const end = percent;
    
    if (start === end) return;

    const step = 0.5;
    const intervalDuration = 30;
    const direction = end > start ? 1 : -1;

    const interval = setInterval(() => {
      currentValueRef.current += step * direction;

      if ((direction > 0 && currentValueRef.current >= end) || 
          (direction < 0 && currentValueRef.current <= end)) {
        currentValueRef.current = end;
        clearInterval(interval);
      }

      setDisplayedPercent(currentValueRef.current);
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [percent]);

  // Calculer le strokeDashoffset à partir du displayedPercent (pas du prop percent)
  const progress = (displayedPercent / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg width="160" height="160" className="transform -rotate-90">
          <circle cx="80" cy="80" r={r} stroke="#E5E7EB" strokeWidth="10" fill="none" />
          <circle
            cx="80"
            cy="80"
            r={r}
            stroke="url(#gradient)"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            style={{ transition: "stroke-dashoffset 120ms linear" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold">
            {Math.round(displayedPercent)}%
          </span>
        </div>
      </div>
    </div>
  );
}
