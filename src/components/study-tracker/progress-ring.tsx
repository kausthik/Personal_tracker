interface ProgressRingProps {
  value: number; // 0 - 100
  size?: number;
  stroke?: number;
  className?: string; // stroke color for the filled arc, e.g. "text-emerald-500"
  children?: React.ReactNode;
}

export default function ProgressRing({
  value,
  size = 112,
  stroke = 10,
  className = "text-emerald-500",
  children,
}: ProgressRingProps) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(Math.max(value, 0), 100);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          className="fill-none stroke-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped / 100)}
          className={`fill-none stroke-current transition-[stroke-dashoffset] duration-700 ease-out ${className}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}
