import { PageHeading } from "@/components/dashboard/page-heading";
import { Badge } from "@/components/ui/badge";
import { REDDIT_THREADS } from "@/lib/market-data";
import { MessageSquare, ThumbsUp } from "lucide-react";

function sentimentMeta(sentiment: number) {
  if (sentiment >= 65)
    return { label: "Positive", className: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300" };
  if (sentiment >= 50)
    return { label: "Neutral", className: "border-blue-400/25 bg-blue-400/10 text-blue-300" };
  return { label: "Skeptical", className: "border-amber-400/25 bg-amber-400/10 text-amber-300" };
}

export default function Reddit() {
  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow="Reddit"
        title="Community pulse"
        description="The discussions founders, engineers, and buyers are actually having — ranked by engagement and weighted for sentiment."
      />

      <div className="space-y-4">
        {REDDIT_THREADS.map((t) => {
          const meta = sentimentMeta(t.sentiment);
          return (
            <div
              key={t.title}
              className="rounded-2xl border border-white/8 bg-[#101014] p-5 transition-all hover:-translate-y-0.5 hover:border-orange-400/20"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-orange-400/10 px-2.5 py-1 text-[11px] font-semibold text-orange-300">
                  {t.subreddit}
                </span>
                <Badge className={meta.className}>{meta.label}</Badge>
                <span className="text-[11px] text-white/35">{t.ago}</span>
              </div>
              <p className="mt-3 text-[15px] font-medium leading-snug text-white/85">
                {t.title}
              </p>
              <div className="mt-4 flex items-center gap-5 border-t border-white/6 pt-3.5 text-xs text-white/50">
                <span className="flex items-center gap-1.5">
                  <ThumbsUp className="size-3.5 text-orange-300" />
                  {t.upvotes.toLocaleString()} upvotes
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="size-3.5 text-white/35" />
                  {t.comments} comments
                </span>
                <span className="ml-auto">
                  Sentiment <span className="font-semibold text-white">{t.sentiment}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
