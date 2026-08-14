import { PageHeading } from "@/components/dashboard/page-heading";
import { SearchBar } from "@/components/dashboard/search-bar";
import { TrendBars } from "@/components/dashboard/trend-bars";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import {
  FUNDING_EVENTS,
  PRODUCT_HUNT_LAUNCHES,
  REDDIT_THREADS,
  TRENDING_TECHNOLOGIES,
} from "@/lib/market-data";
import { useQuery } from "convex/react";
import { ArrowUpRight, BookOpen, Radar, TrendingUp, Wallet } from "lucide-react";
import { Link } from "react-router";

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  to,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-white/8 bg-[#101014] p-5 transition-all hover:-translate-y-0.5 hover:border-blue-400/30"
    >
      <div className="flex items-center justify-between">
        <span className="flex size-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-300">
          <Icon className="size-4.5" />
        </span>
        <ArrowUpRight className="size-4 text-white/25 transition-colors group-hover:text-blue-300" />
      </div>
      <p className="mt-4 text-2xl font-bold tracking-tight text-white">{value}</p>
      <p className="mt-0.5 text-sm font-medium text-white/70">{label}</p>
      <p className="mt-0.5 text-xs text-white/35">{sub}</p>
    </Link>
  );
}

export default function Overview() {
  const { user } = useAuth();
  const savedReports = useQuery(api.reports.listByUser);
  const recentSearches = useQuery(api.searches.recent);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const firstName = user?.name?.split(" ")[0];

  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow="Command center"
        title={`${greeting}${firstName ? `, ${firstName}` : ""} 👋`}
        description="Your live view of the startup ecosystem — ask a question, track a market, or catch up on what changed overnight."
      />

      <div>
        <SearchBar showExamples />
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Radar}
          label="Live sources"
          value="7"
          sub="PH · HN · GitHub · Reddit · YC · Blogs · Careers"
          to="/dashboard/trends"
        />
        <StatCard
          icon={TrendingUp}
          label="Trending topics"
          value={String(TRENDING_TECHNOLOGIES.length)}
          sub="Tracked across 6 signal groups"
          to="/dashboard/trends"
        />
        <StatCard
          icon={Wallet}
          label="Funding rounds"
          value={String(FUNDING_EVENTS.length)}
          sub="Tracked in the last 2 weeks"
          to="/dashboard/funding"
        />
        <StatCard
          icon={BookOpen}
          label="Saved reports"
          value={String(savedReports?.length ?? "—")}
          sub={savedReports && savedReports.length > 0 ? "Click to reopen" : "Save your first brief"}
          to="/dashboard/reports"
        />
      </div>

      {/* Main grid */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Trending */}
        <Card className="border-white/8 bg-[#101014] shadow-none">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-white">
              <span className="flex size-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-300">
                <TrendingUp className="size-4" />
              </span>
              Trending technologies
            </CardTitle>
            <Link to="/dashboard/trends" className="text-xs text-blue-300 hover:text-blue-200">
              View all
            </Link>
          </CardHeader>
          <CardContent>
            <TrendBars rows={TRENDING_TECHNOLOGIES} limit={5} />
          </CardContent>
        </Card>

        {/* Funding preview */}
        <Card className="border-white/8 bg-[#101014] shadow-none">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-white">
              <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-300">
                <Wallet className="size-4" />
              </span>
              Latest funding
            </CardTitle>
            <Link to="/dashboard/funding" className="text-xs text-blue-300 hover:text-blue-200">
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {FUNDING_EVENTS.slice(0, 4).map((f) => (
              <div key={f.company} className="rounded-xl border border-white/6 bg-white/3 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium text-white">{f.company}</p>
                  <span className="shrink-0 text-sm font-bold text-emerald-300">{f.amount}</span>
                </div>
                <p className="mt-1 line-clamp-1 text-xs text-white/45">{f.headline}</p>
                <p className="mt-1.5 flex items-center gap-2 text-[11px] text-white/35">
                  <span className="rounded-full border border-white/10 bg-white/4 px-2 py-0.5">
                    {f.round}
                  </span>
                  {f.ago}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Community pulse */}
        <Card className="border-white/8 bg-[#101014] shadow-none">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-white">
              <span className="flex size-7 items-center justify-center rounded-lg bg-orange-500/10 text-orange-300">
                <Radar className="size-4" />
              </span>
              Community pulse
            </CardTitle>
            <Link to="/dashboard/reddit" className="text-xs text-blue-300 hover:text-blue-200">
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {REDDIT_THREADS.slice(0, 3).map((t) => (
              <div key={t.title} className="rounded-xl border border-white/6 bg-white/3 p-3">
                <p className="text-xs font-medium text-orange-300/90">{t.subreddit}</p>
                <p className="mt-1 line-clamp-2 text-sm leading-snug text-white/80">{t.title}</p>
                <p className="mt-1.5 text-[11px] text-white/35">
                  {t.upvotes.toLocaleString()} upvotes · {t.comments} comments · {t.ago}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent searches */}
      {recentSearches && recentSearches.length > 0 && (
        <Card className="border-white/8 bg-[#101014] shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-white">Recent research</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {recentSearches.map((s) => (
              <Link
                key={s._id}
                to={`/dashboard/search?q=${encodeURIComponent(s.query)}`}
                className="rounded-full border border-white/8 bg-white/3 px-3.5 py-1.5 text-xs text-white/60 transition-all hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-white"
              >
                {s.query}
              </Link>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Featured launches */}
      <div className="grid gap-5 lg:grid-cols-2">
        {PRODUCT_HUNT_LAUNCHES.slice(0, 2).map((p) => (
          <Link
            key={p.name}
            to="/dashboard/product-hunt"
            className="group rounded-2xl border border-white/8 bg-gradient-to-br from-orange-500/6 to-[#101014] p-5 transition-all hover:-translate-y-0.5 hover:border-orange-400/30"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-orange-400/25 bg-orange-400/10 px-2.5 py-1 text-[11px] font-semibold text-orange-300">
                {p.category}
              </span>
              <span className="text-xs text-white/35">{p.ago}</span>
            </div>
            <p className="mt-3 text-lg font-semibold text-white">“{p.name}”</p>
            <p className="mt-1 text-sm text-white/55">{p.tagline}</p>
            <p className="mt-3 flex items-center gap-2 text-xs font-medium text-orange-300">
              <span className="size-1.5 rounded-full bg-orange-400" />
              {p.upvotes.toLocaleString()} upvotes · trending on Product Hunt
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
