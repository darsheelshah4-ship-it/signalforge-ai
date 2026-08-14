import { PageHeading } from "@/components/dashboard/page-heading";
import { ReportView } from "@/components/dashboard/report-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import type { MarketReport } from "@/lib/analysis";
import { useMutation, useQuery } from "convex/react";
import type { Doc } from "@/convex/_generated/dataModel";
import { BookOpen, ChevronLeft, FileText, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function Reports() {
  const savedReports = useQuery(api.reports.listByUser);
  const removeReport = useMutation(api.reports.remove);
  const [openId, setOpenId] = useState<Doc<"reports">["_id"] | null>(null);

  const open = savedReports?.find((r) => r._id === openId) ?? null;
  let parsed: MarketReport | null = null;
  if (open) {
    try {
      parsed = JSON.parse(open.report) as MarketReport;
    } catch {
      parsed = null;
    }
  }

  const handleDelete = async (id: Doc<"reports">["_id"]) => {
    try {
      await removeReport({ id });
      if (openId === id) setOpenId(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (open && parsed) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            className="gap-2 text-white/60 hover:text-white"
            onClick={() => setOpenId(null)}
          >
            <ChevronLeft className="size-4" />
            Back to saved reports
          </Button>
          <Button
            variant="outline"
            className="gap-2 border-red-400/25 bg-red-400/5 text-red-300 hover:bg-red-400/10"
            onClick={() => handleDelete(open._id)}
          >
            <Trash2 className="size-4" />
            Delete
          </Button>
        </div>
        <ReportView report={parsed} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow="Saved Reports"
        title="Your research library"
        description="Every brief you've saved, ready to reopen, share, or delete."
      />

      {!savedReports ? (
        <Card className="border-white/8 bg-[#101014] shadow-none">
          <CardContent className="py-10 text-center text-sm text-white/40">
            Loading your reports…
          </CardContent>
        </Card>
      ) : savedReports.length === 0 ? (
        <Card className="border-white/8 bg-[#101014] shadow-none">
          <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
              <BookOpen className="size-6" />
            </span>
            <div>
              <p className="font-medium text-white">No saved reports yet</p>
              <p className="mt-1 text-sm text-white/40">
                Run a research query, then hit “Save report” to keep it here.
              </p>
            </div>
            <Button asChild className="gap-2">
              <Link to="/dashboard/search">
                <FileText className="size-4" />
                Start researching
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {savedReports.map((r) => (
            <div
              key={r._id}
              className="group relative flex flex-col rounded-2xl border border-white/8 bg-[#101014] p-5 transition-all hover:-translate-y-0.5 hover:border-blue-400/30"
            >
              <button
                type="button"
                className="text-left"
                onClick={() => setOpenId(r._id)}
              >
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-white/5 text-white/50">
                    {r.industry}
                  </Badge>
                  <Badge className="border-blue-400/25 bg-blue-400/10 text-blue-300">
                    {r.score}/100
                  </Badge>
                  <span className="ml-auto text-[11px] text-white/30">
                    {new Date(r._creationTime).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-semibold text-white">{r.title}</h3>
                <p className="mt-1 text-xs text-white/35">“{r.query}”</p>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/55">
                  {r.summary}
                </p>
              </button>
              <div className="mt-4 flex items-center justify-between border-t border-white/6 pt-3">
                <button
                  type="button"
                  onClick={() => setOpenId(r._id)}
                  className="text-xs font-medium text-blue-300 transition-colors hover:text-blue-200"
                >
                  Open report
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-white/30 hover:text-red-300"
                  onClick={() => handleDelete(r._id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
