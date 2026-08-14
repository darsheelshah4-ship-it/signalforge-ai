import { PageHeading } from "@/components/dashboard/page-heading";
import { ReportView } from "@/components/dashboard/report-view";
import { SearchBar } from "@/components/dashboard/search-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import type { MarketReport } from "@/lib/analysis";
import { useAction, useMutation, useQuery } from "convex/react";
import { AlertCircle, BookOpen, History, Search, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";

const EXAMPLE_PROMPTS = [
  "Show AI startups launched this week",
  "Find SaaS opportunities in healthcare",
  "What products are trending today?",
  "Which startup raised funding yesterday?",
];

export default function SearchPage() {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const analyzeMarket = useAction(api.research.analyzeMarket);
  const saveReport = useMutation(api.reports.save);
  const recordSearch = useMutation(api.searches.record);
  const recentSearches = useQuery(api.searches.recent);

  const [report, setReport] = useState<MarketReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const ranFor = useRef<string | null>(null);

  useEffect(() => {
    if (!query) return;
    if (ranFor.current === query) return;
    ranFor.current = query;
    setLoading(true);
    setError(null);
    setSaved(false);
    setReport(null);

    // Fire and forget history recording (mutations require auth; ignore failures).
    recordSearch({ query }).catch(() => undefined);

    analyzeMarket({ query })
      .then((result) => setReport(result as MarketReport))
      .catch((err: unknown) => {
        console.error("Research error:", err);
        ranFor.current = null; // allow retrying the same query after a failure
        setError(
          err instanceof Error ? err.message : "Research failed. Please try again.",
        );
      })
      .finally(() => setLoading(false));
  }, [query, analyzeMarket, recordSearch]);

  const handleSave = async () => {
    if (!report) return;
    try {
      await saveReport({
        query: report.query,
        title: report.headline,
        summary: report.executiveSummary,
        score: report.opportunityScore,
        industry: report.industry,
        report: JSON.stringify(report),
      });
      setSaved(true);
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow="AI Research"
        title="Ask anything about startups"
        description="SignalForge cross-references live public web signals and returns a sourced, scored market brief in seconds."
      />

      <div>
        <SearchBar defaultValue={query} autoFocus showExamples />
      </div>

      {/* Loading */}
      {loading && (
        <Card className="border-white/8 bg-[#101014] shadow-none">
          <CardContent className="flex flex-col items-center gap-5 py-14">
            <div className="relative">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
                <Sparkles className="size-6 animate-pulse" />
              </span>
              <span className="absolute -right-1 -top-1 size-3 animate-sf-pulse rounded-full bg-emerald-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-white">
                Analyzing “{query}”
              </p>
              <p className="mt-1.5 text-xs text-white/40">
                Consulting 200+ public sources across Product Hunt, Hacker News, GitHub,
                Reddit, YC, blogs & career pages…
              </p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-2">
              {["Funding signals", "Developer interest", "Community sentiment", "Competitor moves"].map(
                (step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <span
                      className="h-1 flex-1 overflow-hidden rounded-full bg-white/6"
                    >
                      <span
                        className="block h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                        style={{ animation: `sf-progress 1.4s ease ${i * 0.35}s forwards` }}
                      />
                    </span>
                    <span className="w-36 text-[11px] text-white/35">{step}</span>
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error */}
      {error && !loading && (
        <Card className="border-red-400/20 bg-red-400/4 shadow-none">
          <CardContent className="flex items-start gap-3 py-6">
            <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-400" />
            <div>
              <p className="text-sm font-medium text-white">Research failed</p>
              <p className="mt-1 text-xs text-white/50">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Report */}
      {report && !loading && !error && (
        <ReportView report={report} onSave={handleSave} saved={saved} />
      )}

      {/* Empty state */}
      {!query && !loading && (
        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="border-white/8 bg-[#101014] shadow-none">
            <CardContent className="p-6">
              <p className="flex items-center gap-2 text-sm font-semibold text-white">
                <Sparkles className="size-4 text-blue-300" />
                Try one of these
              </p>
              <div className="mt-4 space-y-2.5">
                {EXAMPLE_PROMPTS.map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => setSearchParams({ q: ex })}
                    className="block w-full rounded-xl border border-white/6 bg-white/3 px-4 py-3 text-left text-sm text-white/60 transition-all hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-white"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/8 bg-[#101014] shadow-none">
            <CardContent className="p-6">
              <p className="flex items-center gap-2 text-sm font-semibold text-white">
                <History className="size-4 text-blue-300" />
                Recent research
              </p>
              {recentSearches && recentSearches.length > 0 ? (
                <div className="mt-4 space-y-2.5">
                  {recentSearches.map((s) => (
                    <Link
                      key={s._id}
                      to={`/dashboard/search?q=${encodeURIComponent(s.query)}`}
                      className="flex items-center justify-between rounded-xl border border-white/6 bg-white/3 px-4 py-3 text-sm text-white/60 transition-all hover:border-blue-400/30 hover:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <Search className="size-3.5 text-white/30" />
                        {s.query}
                      </span>
                      <span className="text-[11px] text-white/30">
                        {new Date(s._creationTime).toLocaleDateString()}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="mt-4 rounded-xl border border-dashed border-white/10 p-6 text-center">
                  <BookOpen className="mx-auto size-6 text-white/25" />
                  <p className="mt-3 text-sm text-white/40">
                    {isAuthenticated
                      ? "Your search history will appear here."
                      : "Sign in to keep a research history."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
