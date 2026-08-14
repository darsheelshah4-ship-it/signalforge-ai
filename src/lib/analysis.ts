import { format, subMonths } from "date-fns";
import {
  COMPANY_PROFILES,
  FUNDING_EVENTS,
  GITHUB_REPOS,
  PRODUCT_HUNT_LAUNCHES,
  REDDIT_THREADS,
  type FactorKey,
  type IndustryData,
  type Severity,
  type SourceKind,
  daysAgo,
  findCompany,
  findIndustry,
} from "./market-data";

/* ============================================================
   SignalForge AI — research report generator
   ============================================================ */

export interface OpportunityFactor {
  key: FactorKey;
  label: string;
  score: number;
  note: string;
}

export interface CompetitorEntry {
  name: string;
  description: string;
  funding: string;
  pricing: string;
  strengths: string[];
  weaknesses: string[];
}

export interface StartupIdea {
  name: string;
  thesis: string;
  whyNow: string;
}

export interface RiskEntry {
  risk: string;
  severity: Severity;
  mitigation: string;
}

export interface SourceEntry {
  kind: SourceKind;
  title: string;
  ago: string;
  metric: string;
}

export interface MarketReport {
  query: string;
  industry: string;
  industryId: string;
  emoji: string;
  headline: string;
  executiveSummary: string;
  keyInsights: string[];
  opportunityScore: number;
  verdict: string;
  factors: OpportunityFactor[];
  growth: {
    labels: string[];
    values: number[];
    analysis: string;
  };
  sentiment: { score: number; summary: string; highlights: string[] };
  pricing: { summary: string; points: string[] };
  competitors: CompetitorEntry[];
  startupIdeas: StartupIdea[];
  risks: RiskEntry[];
  sources: SourceEntry[];
  generatedAt: string;
}

/* ---------------- Seeded randomness ---------------- */

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

function jitter(rng: () => number, base: number, spread: number, min = 0, max = 100): number {
  const v = base + Math.round((rng() * 2 - 1) * spread);
  return Math.min(max, Math.max(min, v));
}

export function scoreVerdict(score: number): string {
  if (score >= 85) return "Strong opportunity";
  if (score >= 72) return "Promising";
  if (score >= 58) return "Evaluating";
  return "Crowded — differentiate";
}

const FACTOR_LABELS: Record<FactorKey, string> = {
  growth: "Growth",
  competition: "Competition",
  funding: "Funding",
  hiring: "Hiring",
  developer: "Developer Interest",
  community: "Community Discussions",
};

const FACTOR_WEIGHTS: Record<FactorKey, number> = {
  growth: 0.24,
  competition: 0.2,
  funding: 0.15,
  hiring: 0.1,
  developer: 0.16,
  community: 0.15,
};

function growthLabels(): string[] {
  const now = new Date();
  return Array.from({ length: 8 }, (_, i) => format(subMonths(now, 7 - i), "MMM"));
}

function buildGrowthSeries(rng: () => number, momentum: number) {
  const start = Math.max(28, momentum - 40 + Math.round(rng() * 10));
  const end = Math.min(96, momentum + 8);
  const values = Array.from({ length: 8 }, (_, i) => {
    const t = i / 7;
    const smooth = start + (end - start) * Math.pow(t, 1.15);
    const noise = i === 0 || i === 7 ? 0 : Math.round((rng() * 2 - 1) * 5);
    return Math.round(Math.min(99, Math.max(5, smooth + noise)));
  });
  return values;
}

function buildSources(industry: IndustryData, rng: () => number): SourceEntry[] {
  const label = industry.label.toLowerCase();
  const ph = [...PRODUCT_HUNT_LAUNCHES].sort((a, b) => b.upvotes - a.upvotes).slice(0, 2);
  const thread = pick(rng, REDDIT_THREADS);
  const repo = pick(rng, GITHUB_REPOS);
  const funding = pick(rng, FUNDING_EVENTS);
  const company = industry.competitors[0] ?? "Notion";
  const company2 = industry.competitors[1] ?? "Linear";

  return [
    {
      kind: "Product Hunt",
      title: `"${ph[0].name}" — ${ph[0].tagline}`,
      ago: ph[0].ago,
      metric: `${ph[0].upvotes.toLocaleString()} upvotes`,
    },
    {
      kind: "Product Hunt",
      title: `"${ph[1].name}" — ${ph[1].tagline}`,
      ago: ph[1].ago,
      metric: `${ph[1].upvotes.toLocaleString()} upvotes`,
    },
    {
      kind: "Hacker News",
      title: `Show HN: We built an open-source ${label} analytics tool used by ${Math.round(200 + rng() * 400)} teams`,
      ago: daysAgo(2),
      metric: `${Math.round(300 + rng() * 300)} points`,
    },
    {
      kind: "GitHub",
      title: `${repo.name} — ${repo.description}`,
      ago: daysAgo(3),
      metric: `${repo.stars} stars (${repo.growth})`,
    },
    {
      kind: "Reddit",
      title: thread.title,
      ago: thread.ago,
      metric: `${thread.upvotes.toLocaleString()} upvotes · ${thread.comments} comments`,
    },
    {
      kind: "Y Combinator",
      title: `YC recent batch: ${industry.startupIdeas[0].name} and peers in ${label}`,
      ago: daysAgo(9),
      metric: "Featured batch",
    },
    {
      kind: "Company Blog",
      title: `${company} engineering: what we learned scaling ${pick(rng, industry.tags)}`,
      ago: daysAgo(6),
      metric: "Monthly report",
    },
    {
      kind: "Career Page",
      title: `${company2} careers: ${Math.round(20 + rng() * 80)} open roles across engineering, product, and GTM`,
      ago: daysAgo(1),
      metric: "Live",
    },
    {
      kind: "Press",
      title: `${funding.company} raises ${funding.amount} — ${funding.headline.toLowerCase()}`,
      ago: funding.ago,
      metric: funding.round,
    },
  ];
}

export function generateBaseReport(query: string): MarketReport {
  const industry = findIndustry(query);
  const rng = mulberry32(hashString(query.toLowerCase().trim()));

  const rawScores = (Object.keys(FACTOR_LABELS) as FactorKey[]).map((key) => {
    const base = industry.baseScores[key];
    const score = jitter(rng, base, 7);
    return { key, score };
  });

  const factors: OpportunityFactor[] = rawScores.map(({ key, score }) => {
    const note = factorNote(key, score);
    return { key, label: FACTOR_LABELS[key], score, note };
  });

  const weighted = rawScores.reduce((acc, { key, score }) => acc + score * FACTOR_WEIGHTS[key], 0);
  const opportunityScore = Math.round(weighted);
  const verdict = scoreVerdict(opportunityScore);

  const sentimentScore = Math.min(80, Math.max(-50, industry.sentimentBase + jitter(rng, 0, 14, -14, 14)));

  const competitors: CompetitorEntry[] = industry.competitors
    .map((name) => COMPANY_PROFILES[name])
    .filter(Boolean)
    .map((c) => ({
      name: c.name,
      description: c.description,
      funding: c.funding,
      pricing: c.pricing,
      strengths: c.strengths.slice(0, 3),
      weaknesses: c.weaknesses.slice(0, 3),
    }));

  return {
    query: query.trim(),
    industry: industry.label,
    industryId: industry.id,
    emoji: industry.emoji,
    headline: `Opportunity brief: ${industry.label}`,
    executiveSummary: `${industry.summary} For your question — "${query.trim()}" — the signals point ${verdict.toLowerCase()} territory, with the strongest momentum in ${industry.tags[0]} and ${industry.tags[1]}.`,
    keyInsights: [...industry.insights].sort(() => rng() - 0.5).slice(0, 5),
    opportunityScore,
    verdict,
    factors,
    growth: {
      labels: growthLabels(),
      values: buildGrowthSeries(rng, opportunityScore),
      analysis: industry.growthNote,
    },
    sentiment: {
      score: sentimentScore,
      summary:
        sentimentScore > 25
          ? `Community sentiment across Reddit, Hacker News, and Product Hunt is net positive, with builders and buyers talking about ${industry.tags[0]} as a real, funded category rather than a novelty.`
          : sentimentScore > -10
            ? `Community sentiment is mixed. There's genuine interest in ${industry.tags[0]}, but recurring skepticism about execution quality and pricing is visible in the discussion threads.`
            : `Community sentiment skews skeptical right now. The loudest threads in this category are about dissatisfaction with incumbents — which is an opening for a better product, but a warning about category fatigue.`,
      highlights: [
        `Top-discussed topic: ${pick(rng, industry.tags)}`,
        `${pick(rng, REDDIT_THREADS).subreddit} threads trending ${sentimentScore > 20 ? "positive" : sentimentScore > -10 ? "mixed" : "negative"}`,
        `Product Hunt launches in this space average ${Math.round(700 + rng() * 600)} upvotes`,
      ],
    },
    pricing: {
      summary: industry.pricingPoints[0],
      points: industry.pricingPoints.slice(1),
    },
    competitors,
    startupIdeas: industry.startupIdeas,
    risks: industry.risks,
    sources: buildSources(industry, rng),
    generatedAt: new Date().toISOString(),
  };
}

function factorNote(key: FactorKey, score: number): string {
  if (score >= 80) {
    switch (key) {
      case "growth":
        return "Strong sustained momentum across search, funding, and hiring signals.";
      case "competition":
        return "Fragmented market with room to differentiate.";
      case "funding":
        return "Active investor interest with healthy deal flow.";
      case "hiring":
        return "Teams are staffing up — a leading indicator of commitment.";
      case "developer":
        return "High developer engagement and open-source activity.";
      case "community":
        return "Lively, growing community discussions.";
    }
  } else if (score >= 55) {
    switch (key) {
      case "growth":
        return "Moderate momentum; category is growing but not exploding.";
      case "competition":
        return "A few established players, but niches remain open.";
      case "funding":
        return "Steady funding activity, concentrated in later stages.";
      case "hiring":
        return "Mixed hiring signals across the category.";
      case "developer":
        return "Developer interest exists but is concentrated in a few tools.";
      case "community":
        return "Active discussions, though spread across many channels.";
    }
  }
  switch (key) {
    case "growth":
      return "Slower category growth; momentum is uneven.";
    case "competition":
      return "Crowded market with strong incumbents.";
    case "funding":
      return "Scarce or concentrated funding — harder to raise.";
    case "hiring":
      return "Flat or declining hiring — weak commitment signal.";
    case "developer":
      return "Limited developer traction so far.";
    case "community":
      return "Quiet community signal — early or niche.";
  }
}

/* ---------------- Company analysis (competitor page) ---------------- */

export interface CompanyAnalysis {
  name: string;
  industry: string;
  website: string;
  tagline: string;
  description: string;
  founded: number;
  funding: string;
  totalRaised: string;
  employees: string;
  pricing: string;
  pricingPoints: string[];
  launches: { name: string; date: string; summary: string }[];
  hiring: { roles: string[]; trend: "Expanding" | "Steady" | "Reducing"; count: number };
  github: { stars: string; repos: number; activity: string; topRepo: string };
  reddit: { mentions: number; sentiment: number; topics: string[] };
  productHunt: { launches: number; avgUpvotes: number; presence: string };
  strengths: string[];
  weaknesses: string[];
  comparison: string;
  confidence: "high" | "generated";
}

const HIRING_ROLES = [
  "Software engineer",
  "Product designer",
  "Account executive",
  "Customer success",
  "Data scientist",
  "Product manager",
  "DevOps engineer",
  "Growth marketer",
];

export function generateCompanyAnalysis(name: string): CompanyAnalysis {
  const existing = findCompany(name);
  if (existing) {
    return { ...existing, confidence: "high" };
  }

  const rng = mulberry32(hashString(name.trim().toLowerCase()));
  const industry = findIndustry(name);
  const founded = 2016 + Math.floor(rng() * 7);
  const seedRound = pick(rng, ["Seed", "Series A", "Series B"]);
  const amount = ["$3M", "$8M", "$14M", "$22M", "$35M"][Math.floor(rng() * 5)];
  const trend = rng() > 0.45 ? "Expanding" : "Steady";
  const count = trend === "Expanding" ? Math.round(15 + rng() * 50) : Math.round(5 + rng() * 15);

  const description = `${name.trim()} operates in the ${industry.label.toLowerCase()} space, building software that targets the workflow pain points most discussed in public signals: ${industry.tags[0]} and ${industry.tags[1]}. Public footprint suggests a ${founded > 2021 ? "young, product-led company" : "more established player"} with growing team pages and consistent launch activity.`;

  return {
    name: name.trim(),
    industry: industry.label,
    website: `${name.trim().toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
    tagline: `${industry.label} software for modern teams`,
    description,
    founded,
    funding: `${amount} ${seedRound}`,
    totalRaised: amount,
    employees: `${count * 4}+`,
    pricing: rng() > 0.5 ? "Freemium with per-seat paid tiers" : "Per-seat subscription with an annual discount",
    pricingPoints: [
      "Free tier with usage limits to drive adoption.",
      "Per-seat or usage-based pricing with annual prepay discounts.",
      "Enterprise tier with SSO, security review, and support SLAs.",
    ],
    launches: [
      { name: `${name} AI assistant`, date: daysAgo(Math.round(20 + rng() * 40)), summary: `Native AI features for ${industry.tags[0]} workflows.` },
      { name: `${name} platform update`, date: daysAgo(Math.round(70 + rng() * 60)), summary: `Deeper integrations and an improved onboarding flow.` },
      { name: `${name} v2`, date: daysAgo(Math.round(140 + rng() * 100)), summary: `Major release with expanded ${industry.tags[1]} capabilities.` },
    ],
    hiring: {
      roles: [...HIRING_ROLES].sort(() => rng() - 0.5).slice(0, 4),
      trend,
      count,
    },
    github: {
      stars: `${Math.round(2 + rng() * 40)}k`,
      repos: Math.round(5 + rng() * 30),
      activity: pick(rng, ["Low", "Moderate", "High"]),
      topRepo: `${name.toLowerCase().replace(/[^a-z0-9]/g, "")}/${name.toLowerCase().replace(/[^a-z0-9]/g, "")}-sdk`,
    },
    reddit: {
      mentions: Math.round(40 + rng() * 400),
      sentiment: Math.round(30 + rng() * 40),
      topics: [industry.tags[0], industry.tags[1], "pricing", "support"],
    },
    productHunt: {
      launches: Math.round(2 + rng() * 8),
      avgUpvotes: Math.round(300 + rng() * 900),
      presence: pick(rng, ["Occasional launches", "Consistent launch cadence", "Limited public launch presence"]),
    },
    strengths: [
      `Clear focus on the ${industry.tags[0]} workflow gap`,
      "Product-led growth motion with a free tier",
      `Community traction in ${industry.label.toLowerCase()} circles`,
    ],
    weaknesses: [
      "Limited brand awareness outside its niche",
      "Competing against well-funded incumbents",
      "Public signal suggests thin differentiation on AI features",
    ],
    comparison:
      `Against ${name}, SignalForge's analysis indicates a young player carving out a ${industry.tags[0]} niche. The biggest risk is a thin moat: if the differentiation is a feature list rather than proprietary data, workflow depth, or distribution, better-funded competitors can absorb it. Watch their hiring velocity and launch cadence — both are leading indicators of whether the company is investing to win or defending a position.`,
    confidence: "generated",
  };
}

/* ---------------- Feed helpers ---------------- */

export function trendSeries(base: number, growth: number): number[] {
  const rng = mulberry32(hashString(`${base}-${growth}`));
  return buildGrowthSeries(rng, Math.min(96, base + growth / 3));
}

export function moneyLabel(value: number): string {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}B`;
  return `$${Math.round(value)}M`;
}
