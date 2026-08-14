import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  ExternalLink,
  Globe,
  Lightbulb,
  Rocket,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";
import type { CompanyAnalysis } from "@/lib/analysis";

function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/3 p-4">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/40">
        <Icon className="size-3.5" />
        {label}
      </div>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

export function CompanyView({ company }: { company: CompanyAnalysis }) {
  const trendColor =
    company.hiring.trend === "Expanding"
      ? "text-emerald-400"
      : company.hiring.trend === "Steady"
        ? "text-amber-300"
        : "text-red-400";

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-white/8 bg-gradient-to-br from-blue-500/8 to-[#101014] shadow-none">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="bg-white/6 text-white/60">
                  {company.industry}
                </Badge>
                <Badge className="border-blue-400/25 bg-blue-400/10 text-blue-300">
                  {company.confidence === "high" ? "Verified profile" : "AI-generated profile"}
                </Badge>
              </div>
              <h1 className="mt-3 text-2xl font-bold tracking-tight text-white">{company.name}</h1>
              <p className="mt-1 text-sm text-white/50">{company.tagline}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
                {company.description}
              </p>
            </div>
            <a
              href={`https://${company.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-white/12 bg-white/4 px-3.5 py-2 text-sm text-white/80 transition-colors hover:border-blue-400/40 hover:text-white"
            >
              <Globe className="size-4" />
              {company.website}
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Founded" value={String(company.founded)} icon={Building2} />
        <Stat label="Total raised" value={company.totalRaised} icon={TrendingUp} />
        <Stat label="Employees" value={company.employees} icon={Briefcase} />
        <Stat label="Hiring" value={company.hiring.trend} icon={Rocket} />
      </div>

      {/* Pricing + launches */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="border-white/8 bg-[#101014] shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-white">Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-white/70">{company.pricing}</p>
            <ul className="mt-4 space-y-2 border-t border-white/6 pt-4">
              {company.pricingPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-white/50">
                  <span className="mt-1 size-1 shrink-0 rounded-full bg-cyan-400" />
                  {p}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="border-white/8 bg-[#101014] shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-white">
              Recent product launches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {company.launches.map((l) => (
                <li key={l.name} className="flex items-start gap-3">
                  <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-300">
                    <Rocket className="size-3.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 text-sm font-medium text-white">
                      {l.name}
                      <span className="text-[11px] text-white/35">{l.date}</span>
                    </p>
                    <p className="text-xs text-white/50">{l.summary}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Hiring + signals */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="border-white/8 bg-[#101014] shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-white">Hiring activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              <span className={`font-semibold ${trendColor}`}>{company.hiring.trend}</span>
              <span className="text-white/45"> · {company.hiring.count} open roles</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {company.hiring.roles.map((r) => (
                <span
                  key={r}
                  className="rounded-full border border-white/10 bg-white/4 px-2.5 py-1 text-[11px] text-white/60"
                >
                  {r}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="border-white/8 bg-[#101014] shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-white">GitHub</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p className="flex justify-between text-white/70">
                Stars <span className="font-semibold text-white">{company.github.stars}</span>
              </p>
              <p className="flex justify-between text-white/70">
                Repos <span className="font-semibold text-white">{company.github.repos}</span>
              </p>
              <p className="flex justify-between text-white/70">
                Activity <span className="font-semibold text-white">{company.github.activity}</span>
              </p>
              <p className="truncate pt-1 text-xs text-white/40">{company.github.topRepo}</p>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-2 gap-5">
          <Card className="border-white/8 bg-[#101014] shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-white">Reddit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="flex justify-between text-white/70">
                Mentions <span className="font-semibold text-white">{company.reddit.mentions}</span>
              </p>
              <p className="flex justify-between text-white/70">
                Sentiment{" "}
                <span
                  className={`font-semibold ${company.reddit.sentiment >= 55 ? "text-emerald-400" : "text-amber-300"}`}
                >
                  {company.reddit.sentiment}
                </span>
              </p>
            </CardContent>
          </Card>
          <Card className="border-white/8 bg-[#101014] shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-white">Product Hunt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="flex justify-between text-white/70">
                Launches{" "}
                <span className="font-semibold text-white">{company.productHunt.launches}</span>
              </p>
              <p className="flex justify-between text-white/70">
                Avg upvotes{" "}
                <span className="font-semibold text-white">{company.productHunt.avgUpvotes}</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Strengths / weaknesses / comparison */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="border-emerald-400/15 bg-emerald-400/4 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-emerald-300">Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5">
              {company.strengths.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-white/70">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {s}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="border-red-400/15 bg-red-400/4 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-red-300">
              <ShieldAlert className="size-4" />
              Weaknesses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5">
              {company.weaknesses.map((w) => (
                <li key={w} className="flex items-start gap-2 text-sm text-white/70">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-red-400" />
                  {w}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Comparison */}
      <div className="flex items-start gap-3 rounded-2xl border border-blue-400/15 bg-blue-500/5 p-5">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-300">
          <Lightbulb className="size-4" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-300">
            SignalForge take
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/75">{company.comparison}</p>
        </div>
      </div>
    </div>
  );
}

export function CompanyPill({
  name,
  onClick,
}: {
  name: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/3 px-3.5 py-1.5 text-xs text-white/60 transition-all hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-white"
    >
      <ExternalLink className="size-3" />
      {name}
    </button>
  );
}
