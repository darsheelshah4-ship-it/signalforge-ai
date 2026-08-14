import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  Bookmark,
  CheckCircle2,
  ExternalLink,
  Lightbulb,
  Quote,
  ShieldAlert,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MarketReport } from "@/lib/analysis";
import { OpportunityGauge, scoreVerdictBadge } from "./opportunity-gauge";

const SOURCE_STYLES: Record<string, { glyph: string; className: string }> = {
  "Product Hunt": { glyph: "▲", className: "bg-orange-400/15 text-orange-300" },
  "Hacker News": { glyph: "Y", className: "bg-orange-400/15 text-orange-300" },
  GitHub: { glyph: "⌥", className: "bg-white/10 text-white/70" },
  Reddit: { glyph: "◎", className: "bg-orange-400/15 text-orange-300" },
  "Y Combinator": { glyph: "YC", className: "bg-blue-400/15 text-blue-300" },
  "Company Blog": { glyph: "✎", className: "bg-violet-400/15 text-violet-300" },
  "Career Page": { glyph: "⌂", className: "bg-emerald-400/15 text-emerald-300" },
  Press: { glyph: "✉", className: "bg-cyan-400/15 text-cyan-300" },
};

function Section({
  icon: Icon,
  title,
  children,
  action,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <Card className="border-white/8 bg-[#101014] shadow-none">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-white">
          <span className="flex size-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-300">
            <Icon className="size-4" />
          </span>
          {title}
        </CardTitle>
        {action}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function ReportView({
  report,
  onSave,
  saved,
}: {
  report: MarketReport;
  onSave?: () => void;
  saved?: boolean;
}) {
  const verdict = scoreVerdictBadge(report.opportunityScore);
  const growthData = report.growth.labels.map((label, i) => ({
    label,
    value: report.growth.values[i],
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-white/8 bg-gradient-to-br from-blue-500/8 to-[#101014] shadow-none">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-2xl">{report.emoji}</span>
                <Badge variant="secondary" className="bg-white/6 text-white/60">
                  {report.industry}
                </Badge>
                <Badge className={verdict.className}>{verdict.text}</Badge>
                <span className="text-xs text-white/35">
                  Generated {new Date(report.generatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              <h1 className="mt-3 text-xl font-bold tracking-tight text-white sm:text-2xl">
                {report.headline}
              </h1>
              <p className="mt-1 truncate text-sm text-white/45">“{report.query}”</p>
            </div>
            <div className="flex items-center gap-5">
              <OpportunityGauge score={report.opportunityScore} />
              {onSave && (
                <Button
                  variant="outline"
                  className="gap-2 border-white/12 bg-white/4 text-white/80 hover:bg-white/8"
                  onClick={onSave}
                  disabled={saved}
                >
                  <Bookmark className="size-4" />
                  {saved ? "Saved" : "Save report"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Executive summary */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-400/15 bg-blue-500/5 p-6">
        <Quote className="absolute right-5 top-5 size-8 text-blue-400/15" />
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-300">
          Executive summary
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-white/85">
          {report.executiveSummary}
        </p>
      </div>

      {/* Key insights */}
      <Section icon={CheckCircle2} title="Key insights">
        <ul className="space-y-3">
          {report.keyInsights.map((insight, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-[11px] font-semibold text-blue-300">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-white/70">{insight}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Growth + factors */}
      <div className="grid gap-5 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Section icon={TrendingUp} title="Growth trajectory">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData} margin={{ top: 6, right: 6, bottom: 0, left: -18 }}>
                  <defs>
                    <linearGradient id="report-growth" x1="0" y1="0" x2="0" y2="1">
                      <stop stopColor="#3b82f6" stopOpacity={0.35} />
                      <stop offset="1" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis
                    dataKey="label"
                    tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#131318",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 12,
                      fontSize: 12,
                      color: "#f4f6f8",
                    }}
                    labelStyle={{ color: "rgba(255,255,255,0.5)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    fill="url(#report-growth)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-white/45">{report.growth.analysis}</p>
          </Section>
        </div>
        <div className="lg:col-span-2">
          <Section icon={Sparkles} title="Opportunity factors">
            <div className="space-y-4">
              {report.factors.map((f) => (
                <div key={f.key}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-white/70">{f.label}</span>
                    <span className="font-semibold tabular-nums text-white">{f.score}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/6">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                      style={{ width: `${f.score}%` }}
                    />
                  </div>
                  <p className="mt-1 text-[11px] leading-snug text-white/35">{f.note}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>

      {/* Sentiment + pricing */}
      <div className="grid gap-5 md:grid-cols-2">
        <Section icon={CheckCircle2} title="Customer sentiment">
          <div className="flex items-center gap-4">
            <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-2xl border border-white/8 bg-white/4">
              <span className="text-lg font-bold text-white">
                {report.sentiment.score > 0 ? "+" : ""}
                {report.sentiment.score}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/65">{report.sentiment.summary}</p>
          </div>
          <ul className="mt-4 space-y-2 border-t border-white/6 pt-4">
            {report.sentiment.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-white/50">
                <span className="mt-1 size-1 shrink-0 rounded-full bg-blue-400" />
                {h}
              </li>
            ))}
          </ul>
        </Section>
        <Section icon={TrendingUp} title="Pricing landscape">
          <p className="text-sm leading-relaxed text-white/65">{report.pricing.summary}</p>
          <ul className="mt-4 space-y-2 border-t border-white/6 pt-4">
            {report.pricing.points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-white/50">
                <span className="mt-1 size-1 shrink-0 rounded-full bg-cyan-400" />
                {p}
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* Competitors */}
      <Section icon={ExternalLink} title="Competitor landscape">
        {report.competitors.length === 0 ? (
          <p className="text-sm text-white/45">
            No mapped competitors in the knowledge base for this category yet.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {report.competitors.map((c) => (
              <div key={c.name} className="rounded-xl border border-white/8 bg-white/3 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white">{c.name}</p>
                  <span className="text-xs text-white/40">{c.funding}</span>
                </div>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/50">
                  {c.description}
                </p>
                <p className="mt-2 text-[11px] text-white/40">{c.pricing}</p>
                <div className="mt-3 space-y-1 border-t border-white/6 pt-3">
                  {c.strengths.slice(0, 2).map((s) => (
                    <p key={s} className="flex items-start gap-1.5 text-[11px] text-emerald-300/80">
                      <span className="mt-0.5 size-1 shrink-0 rounded-full bg-emerald-400" />
                      {s}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Startup ideas */}
      <Section icon={Lightbulb} title="Suggested startup ideas">
        <div className="grid gap-4 md:grid-cols-3">
          {report.startupIdeas.map((idea, i) => (
            <div key={idea.name} className="rounded-xl border border-blue-400/15 bg-blue-500/5 p-4">
              <p className="text-sm font-semibold text-white">
                {i + 1}. {idea.name}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-white/60">{idea.thesis}</p>
              <p className="mt-2 text-[11px] text-white/40">
                <span className="font-medium text-cyan-300">Why now:</span> {idea.whyNow}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Risks */}
      <Section icon={ShieldAlert} title="Potential risks">
        <div className="grid gap-3 md:grid-cols-3">
          {report.risks.map((risk) => (
            <div key={risk.risk} className="rounded-xl border border-white/8 bg-white/3 p-4">
              <div className="flex items-center justify-between gap-2">
                <AlertTriangle className="size-4 shrink-0 text-amber-400" />
                <Badge
                  className={
                    risk.severity === "High"
                      ? "border-red-400/25 bg-red-400/10 text-red-300"
                      : risk.severity === "Medium"
                        ? "border-amber-400/25 bg-amber-400/10 text-amber-300"
                        : "border-white/15 bg-white/5 text-white/50"
                  }
                >
                  {risk.severity}
                </Badge>
              </div>
              <p className="mt-3 text-sm font-medium text-white/85">{risk.risk}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-white/45">{risk.mitigation}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Sources */}
      <Section icon={ExternalLink} title="Sources">
        <ul className="divide-y divide-white/6">
          {report.sources.map((s, i) => {
            const style = SOURCE_STYLES[s.kind] ?? SOURCE_STYLES.Press;
            return (
              <li key={i} className="flex items-center gap-3 py-2.5">
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${style.className}`}
                >
                  {style.glyph}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-white/75">{s.title}</p>
                  <p className="text-[11px] text-white/35">{s.kind}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs font-medium text-blue-300">{s.metric}</p>
                  <p className="text-[10px] text-white/35">{s.ago}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>
    </div>
  );
}
