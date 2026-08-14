import { PageHeading } from "@/components/dashboard/page-heading";
import { Badge } from "@/components/ui/badge";
import { INDUSTRIES } from "@/lib/market-data";
import { ArrowUpRight, Lightbulb, Rocket, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";

export default function Startups() {
  const [industryId, setIndustryId] = useState<string | null>(null);

  const ideas = useMemo(() => {
    const list = INDUSTRIES.flatMap((industry) =>
      industry.startupIdeas.map((idea) => ({ idea, industry })),
    );
    return industryId
      ? list.filter((entry) => entry.industry.id === industryId)
      : list;
  }, [industryId]);

  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow="Startup Discovery"
        title="Opportunities before they're crowded"
        description="Emerging startup angles SignalForge is watching — each backed by the signal group it rides on."
      />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setIndustryId(null)}
          className={`rounded-full border px-3.5 py-1.5 text-xs transition-all ${
            industryId === null
              ? "border-blue-400/40 bg-blue-500/15 font-medium text-blue-200"
              : "border-white/8 bg-white/3 text-white/55 hover:border-white/20 hover:text-white"
          }`}
        >
          All categories
        </button>
        {INDUSTRIES.map((ind) => (
          <button
            key={ind.id}
            type="button"
            onClick={() => setIndustryId(ind.id)}
            className={`rounded-full border px-3.5 py-1.5 text-xs transition-all ${
              industryId === ind.id
                ? "border-blue-400/40 bg-blue-500/15 font-medium text-blue-200"
                : "border-white/8 bg-white/3 text-white/55 hover:border-white/20 hover:text-white"
            }`}
          >
            {ind.emoji} {ind.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {ideas.map(({ idea, industry }) => {
          const growth = industry.baseScores.growth;
          return (
            <div
              key={`${industry.id}-${idea.name}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#101014] p-5 transition-all hover:-translate-y-1 hover:border-blue-400/30"
            >
              <div
                aria-hidden
                className="absolute -right-12 -top-12 size-28 rounded-full bg-blue-500/10 blur-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              />
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-xl">
                  {industry.emoji}
                </span>
                <Badge variant="secondary" className="bg-white/5 text-white/50">
                  {industry.label}
                </Badge>
              </div>
              <h3 className="mt-4 flex items-center gap-2 text-lg font-semibold text-white">
                <Lightbulb className="size-4 text-blue-300" />
                {idea.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{idea.thesis}</p>
              <p className="mt-3 rounded-xl border border-white/6 bg-white/3 p-3 text-xs leading-relaxed text-white/45">
                <span className="font-semibold text-cyan-300">Why now — </span>
                {idea.whyNow}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-white/6 pt-3.5">
                <span className="flex items-center gap-1.5 text-xs text-white/45">
                  <TrendingUp className="size-3.5 text-emerald-400" />
                  Category growth {growth}
                </span>
                <Link
                  to={`/dashboard/search?q=${encodeURIComponent(
                    `${industry.label} startup opportunity ${idea.name}`,
                  )}`}
                  className="flex items-center gap-1 text-xs font-medium text-blue-300 transition-colors hover:text-blue-200"
                >
                  Research
                  <ArrowUpRight className="size-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <p className="flex items-center justify-center gap-2 text-xs text-white/30">
        <Rocket className="size-3.5" />
        New opportunities are detected as funding, hiring, and community signals accumulate.
      </p>
    </div>
  );
}
