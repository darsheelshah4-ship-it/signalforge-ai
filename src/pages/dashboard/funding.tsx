import { PageHeading } from "@/components/dashboard/page-heading";
import { Badge } from "@/components/ui/badge";
import { FUNDING_EVENTS } from "@/lib/market-data";
import { Wallet } from "lucide-react";
import { useMemo, useState } from "react";

export default function Funding() {
  const [industry, setIndustry] = useState<string | null>(null);

  const industries = useMemo(
    () => Array.from(new Set(FUNDING_EVENTS.map((f) => f.industry))).sort(),
    [],
  );
  const events = industry
    ? FUNDING_EVENTS.filter((f) => f.industry === industry)
    : FUNDING_EVENTS;

  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow="Funding"
        title="Startup funding tracker"
        description="Rounds we've detected across public sources — investors, amounts, and the signal behind each raise."
        actions={
          <Badge variant="secondary" className="bg-emerald-400/10 text-emerald-300">
            <span className="mr-1.5 size-1.5 animate-sf-pulse rounded-full bg-emerald-400" />
            Live
          </Badge>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setIndustry(null)}
          className={`rounded-full border px-3.5 py-1.5 text-xs transition-all ${
            industry === null
              ? "border-blue-400/40 bg-blue-500/15 font-medium text-blue-200"
              : "border-white/8 bg-white/3 text-white/55 hover:border-white/20 hover:text-white"
          }`}
        >
          All industries
        </button>
        {industries.map((ind) => (
          <button
            key={ind}
            type="button"
            onClick={() => setIndustry(ind)}
            className={`rounded-full border px-3.5 py-1.5 text-xs transition-all ${
              industry === ind
                ? "border-blue-400/40 bg-blue-500/15 font-medium text-blue-200"
                : "border-white/8 bg-white/3 text-white/55 hover:border-white/20 hover:text-white"
            }`}
          >
            {ind}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="grid gap-4 md:grid-cols-2">
        {events.map((f) => (
          <div
            key={f.company}
            className="group rounded-2xl border border-white/8 bg-[#101014] p-5 transition-all hover:-translate-y-0.5 hover:border-emerald-400/25"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                  <Wallet className="size-5" />
                </span>
                <div>
                  <p className="font-semibold text-white">{f.company}</p>
                  <p className="text-xs text-white/40">{f.industry}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold tracking-tight text-emerald-300">{f.amount}</p>
                <p className="text-[11px] text-white/35">{f.round} · {f.ago}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/65">{f.headline}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/6 pt-3.5">
              <span className="text-[11px] uppercase tracking-widest text-white/30">
                Investors
              </span>
              {f.investors.map((inv) => (
                <span
                  key={inv}
                  className="rounded-full border border-white/10 bg-white/4 px-2.5 py-0.5 text-[11px] font-medium text-white/65"
                >
                  {inv}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
