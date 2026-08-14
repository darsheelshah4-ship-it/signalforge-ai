import { CompanyPill, CompanyView } from "@/components/dashboard/company-view";
import { PageHeading } from "@/components/dashboard/page-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import type { CompanyAnalysis } from "@/lib/analysis";
import { COMPANY_PROFILES } from "@/lib/market-data";
import { useAction } from "convex/react";
import { AlertCircle, Crosshair, Loader2, Search, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Competitors() {
  const analyzeCompany = useAction(api.research.analyzeCompany);
  const [name, setName] = useState("");
  const [analysis, setAnalysis] = useState<CompanyAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const knownCompanies = Object.keys(COMPANY_PROFILES);

  const run = async (target: string) => {
    const query = target.trim();
    if (!query) return;
    setLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const result = await analyzeCompany({ name: query });
      setAnalysis(result as CompanyAnalysis);
      setName(query);
    } catch (err) {
      console.error("Company analysis error:", err);
      setError(err instanceof Error ? err.message : "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow="Competitors"
        title="Competitor intelligence"
        description="Enter any company and get a sourced dossier: pricing, launches, hiring, GitHub, Reddit mentions, funding, and a SignalForge comparison."
      />

      {/* Lookup */}
      <Card className="border-white/8 bg-[#101014] shadow-none">
        <CardContent className="p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              run(name);
            }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/35" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Intercom, Linear, Notion…"
                className="h-12 w-full rounded-xl border border-white/10 bg-white/4 pl-11 pr-4 text-white placeholder:text-white/30 outline-none transition-all focus:border-blue-400/50 focus:ring-[3px] focus:ring-blue-500/15"
              />
            </div>
            <Button type="submit" className="h-12 gap-2 px-6" disabled={loading || !name.trim()}>
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Crosshair className="size-4" />
              )}
              Analyze
            </Button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-widest text-white/30">
              Verified profiles
            </span>
            {knownCompanies.map((c) => (
              <CompanyPill key={c} name={c} onClick={() => run(c)} />
            ))}
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-400/20 bg-red-400/4 shadow-none">
          <CardContent className="flex items-start gap-3 py-5">
            <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-400" />
            <p className="text-sm text-white/60">{error}</p>
          </CardContent>
        </Card>
      )}

      {loading && (
        <Card className="border-white/8 bg-[#101014] shadow-none">
          <CardContent className="flex flex-col items-center gap-4 py-14">
            <Loader2 className="size-7 animate-spin text-blue-300" />
            <div className="text-center">
              <p className="text-sm font-medium text-white">Building the dossier for “{name}”</p>
              <p className="mt-1 text-xs text-white/40">
                Cross-referencing pricing pages, career pages, GitHub, Reddit, and Product Hunt…
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {analysis && !loading && !error && (
        <div>
          <div className="mb-4 flex items-center gap-2 text-xs text-white/40">
            <Sparkles className="size-3.5 text-blue-300" />
            Dossier generated from public signals
          </div>
          <CompanyView company={analysis} />
        </div>
      )}

      {!analysis && !loading && (
        <p className="text-center text-xs text-white/30">
          Tip: start with one of the verified profiles above, or type any company name for an AI-generated dossier.
        </p>
      )}
    </div>
  );
}
