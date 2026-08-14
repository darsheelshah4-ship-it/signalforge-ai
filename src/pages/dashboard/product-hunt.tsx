import { PageHeading } from "@/components/dashboard/page-heading";
import { Badge } from "@/components/ui/badge";
import { PRODUCT_HUNT_LAUNCHES } from "@/lib/market-data";
import { MessageSquare, Rocket, ThumbsUp } from "lucide-react";

export default function ProductHunt() {
  const launches = [...PRODUCT_HUNT_LAUNCHES].sort((a, b) => b.upvotes - a.upvotes);

  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow="Product Hunt"
        title="Launches making noise"
        description="The most-upvoted product launches this week, with the community conversation behind each one."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {launches.map((p, i) => (
          <div
            key={p.name}
            className="group relative rounded-2xl border border-white/8 bg-[#101014] p-5 transition-all hover:-translate-y-0.5 hover:border-orange-400/25"
          >
            <span className="absolute left-5 top-5 text-4xl font-black text-white/5">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="relative flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-orange-400/10 text-orange-300">
                    <Rocket className="size-4" />
                  </span>
                  <p className="truncate font-semibold text-white">{p.name}</p>
                  {p.featured && (
                    <Badge className="border-orange-400/25 bg-orange-400/10 text-orange-300">
                      Featured
                    </Badge>
                  )}
                </div>
                <p className="mt-1.5 text-sm text-white/50">{p.tagline}</p>
              </div>
              <div className="shrink-0 rounded-xl border border-white/8 bg-white/4 px-3.5 py-2 text-center">
                <p className="flex items-center gap-1 text-lg font-bold text-orange-300">
                  <ThumbsUp className="size-3.5" />
                  {p.upvotes.toLocaleString()}
                </p>
                <p className="flex items-center gap-1 text-[11px] text-white/40">
                  <MessageSquare className="size-3" />
                  {p.comments}
                </p>
              </div>
            </div>
            <div className="relative mt-4 flex items-center justify-between border-t border-white/6 pt-3">
              <span className="rounded-full border border-white/10 bg-white/4 px-2.5 py-0.5 text-[11px] font-medium text-white/60">
                {p.category}
              </span>
              <span className="text-[11px] text-white/35">{p.ago}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
