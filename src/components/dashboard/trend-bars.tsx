import { motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { TrendRow } from "@/lib/market-data";

export function TrendBars({
  rows,
  limit,
  color = "#3b82f6",
}: {
  rows: TrendRow[];
  limit?: number;
  color?: string;
}) {
  const items = limit ? rows.slice(0, limit) : rows;
  const max = Math.max(...items.map((r) => r.value), 1);

  return (
    <div className="space-y-3.5">
      {items.map((row, i) => (
        <div key={row.name} className="group">
          <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 font-medium text-white/80">
              <span className="text-base leading-none">{row.emoji}</span>
              {row.name}
            </span>
            <span className="flex items-center gap-2">
              {row.growth > 0 && (
                <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-400">
                  <TrendingUp className="size-3" />
                  +{row.growth}%
                </span>
              )}
              {row.growth < 0 && (
                <span className="flex items-center gap-0.5 text-xs font-medium text-red-400">
                  <TrendingDown className="size-3" />
                  {row.growth}%
                </span>
              )}
              <span className="w-7 text-right text-sm font-semibold tabular-nums text-white">
                {row.value}
              </span>
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/6">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${color}, ${color}cc)` }}
              initial={{ width: 0 }}
              whileInView={{ width: `${(row.value / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
