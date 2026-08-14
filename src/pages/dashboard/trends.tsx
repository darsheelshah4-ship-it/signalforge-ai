import { PageHeading } from "@/components/dashboard/page-heading";
import { TrendBars } from "@/components/dashboard/trend-bars";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FASTEST_GROWING_MARKETS,
  MOST_ACTIVE_DEVELOPERS,
  MOST_DISCUSSED_CATEGORIES,
  MOST_FUNDED_INDUSTRIES,
  MOST_LAUNCHED_PRODUCTS,
  TRENDING_TECHNOLOGIES,
} from "@/lib/market-data";
import { BarChart3, Globe, MessageSquare, Rocket, TrendingUp, Wallet } from "lucide-react";

const CHARTS = [
  {
    icon: TrendingUp,
    title: "Trending technologies",
    note: "Ranked by combined GitHub, Hacker News, and Product Hunt momentum",
    rows: TRENDING_TECHNOLOGIES,
    color: "#3b82f6",
  },
  {
    icon: Rocket,
    title: "Fastest growing markets",
    note: "Category growth weighted across funding, hiring, and community signals",
    rows: FASTEST_GROWING_MARKETS,
    color: "#22d3ee",
  },
  {
    icon: MessageSquare,
    title: "Most discussed categories",
    note: "Share of voice across Reddit, Hacker News, and Product Hunt comments",
    rows: MOST_DISCUSSED_CATEGORIES,
    color: "#8b5cf6",
  },
  {
    icon: Wallet,
    title: "Most funded industries",
    note: "Deal flow and round sizes tracked over the last 90 days",
    rows: MOST_FUNDED_INDUSTRIES,
    color: "#34d399",
  },
  {
    icon: BarChart3,
    title: "Most active developers",
    note: "Open-source activity across repos, stars, and contributors",
    rows: MOST_ACTIVE_DEVELOPERS,
    color: "#f59e0b",
  },
  {
    icon: Globe,
    title: "Most launched products",
    note: "Product Hunt launch volume and velocity by category",
    rows: MOST_LAUNCHED_PRODUCTS,
    color: "#f472b6",
  },
];

export default function Trends() {
  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow="Market Trends"
        title="What's moving in the ecosystem"
        description="Six signal groups, continuously refreshed from public web data. Use these to spot categories before they're crowded."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {CHARTS.map((chart, i) => (
          <Card
            key={chart.title}
            className="border-white/8 bg-[#101014] shadow-none"
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold text-white">
                <span className="flex size-7 items-center justify-center rounded-lg bg-white/5 text-white/70">
                  <chart.icon className="size-4" style={{ color: chart.color }} />
                </span>
                {chart.title}
              </CardTitle>
              <p className="text-xs text-white/35">{chart.note}</p>
            </CardHeader>
            <CardContent>
              <TrendBars rows={chart.rows} color={chart.color} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
