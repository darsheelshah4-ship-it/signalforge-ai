import { PageHeading } from "@/components/dashboard/page-heading";
import { Badge } from "@/components/ui/badge";
import { GITHUB_REPOS } from "@/lib/market-data";
import { GitFork, Star, TrendingUp } from "lucide-react";

export default function GitHubPage() {
  const repos = [...GITHUB_REPOS].sort(
    (a, b) => parseFloat(b.growth) - parseFloat(a.growth),
  );

  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow="GitHub"
        title="Developer momentum"
        description="Repos gaining the fastest traction — stars, forks, and growth rate are leading indicators of developer demand."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {repos.map((repo, i) => (
          <div
            key={repo.name}
            className="group rounded-2xl border border-white/8 bg-[#101014] p-5 transition-all hover:-translate-y-0.5 hover:border-blue-400/25"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-white/6 font-mono text-lg font-bold text-white/80">
                    ⌥
                  </span>
                  <p className="truncate font-mono text-sm font-semibold text-white">
                    {repo.name}
                  </p>
                </div>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/55">
                  {repo.description}
                </p>
              </div>
              <Badge
                className="shrink-0 border-emerald-400/25 bg-emerald-400/10 text-emerald-300"
              >
                <TrendingUp className="mr-1 size-3" />
                {repo.growth}
              </Badge>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-white/6 pt-3.5">
              <div className="flex items-center gap-4 text-xs text-white/50">
                <span className="flex items-center gap-1.5">
                  <Star className="size-3.5 text-amber-300" />
                  {repo.stars}
                </span>
                <span className="flex items-center gap-1.5">
                  <GitFork className="size-3.5 text-white/35" />
                  {repo.forks}
                </span>
                <span className="rounded-full border border-white/10 bg-white/4 px-2 py-0.5 text-[11px]">
                  {repo.language}
                </span>
              </div>
              <span className="text-[11px] text-white/35">#{repo.topic}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
