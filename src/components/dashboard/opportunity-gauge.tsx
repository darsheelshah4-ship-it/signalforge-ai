import { motion } from "framer-motion";

function scoreColor(score: number): string {
  if (score >= 80) return "#34d399";
  if (score >= 60) return "#3b82f6";
  if (score >= 40) return "#f59e0b";
  return "#ef4444";
}

export function OpportunityGauge({
  score,
  size = 132,
  label,
  showValue = true,
}: {
  score: number;
  size?: number;
  label?: string;
  showValue?: boolean;
}) {
  const r = 42;
  const circumference = 2 * Math.PI * r;
  const clamped = Math.min(100, Math.max(0, score));
  const color = scoreColor(clamped);
  const id = `gauge-${Math.round(clamped)}-${size}`;

  return (
    <div className="relative inline-flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="size-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
        <motion.circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference * (1 - clamped / 100) }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor={color} />
            <stop offset="1" stopColor={color} stopOpacity={0.6} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showValue ? (
          <>
            <span className="text-2xl font-bold tabular-nums text-white">{clamped}</span>
            <span className="text-[10px] uppercase tracking-widest text-white/35">/ 100</span>
          </>
        ) : (
          <span className="text-[11px] font-semibold uppercase tracking-widest text-white/40">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

export function scoreVerdictBadge(score: number): { text: string; className: string } {
  if (score >= 80) {
    return { text: "Strong opportunity", className: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300" };
  }
  if (score >= 60) {
    return { text: "Promising", className: "border-blue-400/25 bg-blue-400/10 text-blue-300" };
  }
  if (score >= 40) {
    return { text: "Evaluating", className: "border-amber-400/25 bg-amber-400/10 text-amber-300" };
  }
  return { text: "Crowded — differentiate", className: "border-red-400/25 bg-red-400/10 text-red-300" };
}
