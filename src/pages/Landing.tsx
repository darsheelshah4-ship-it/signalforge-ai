import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  FileSearch,
  Github,
  Globe,
  Lightbulb,
  LineChart,
  Mail,
  Newspaper,
  Play,
  Radar,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router";

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const SOURCES = [
  { label: "Product Hunt", glyph: "▲", to: "/dashboard/product-hunt" },
  { label: "Hacker News", glyph: "Y", to: "/dashboard/trends" },
  { label: "GitHub", glyph: "⌥", to: "/dashboard/github" },
  { label: "Reddit", glyph: "◎", to: "/dashboard/reddit" },
  { label: "Y Combinator", glyph: "YC", to: "/dashboard/startups" },
  { label: "Company Blogs", glyph: "✎", to: "/dashboard/competitors" },
  { label: "Career Pages", glyph: "⌂", to: "/dashboard/competitors" },
];

const FEATURES = [
  {
    icon: Radar,
    title: "Live web scraping",
    body: "Bright Data Scraper Studio continuously pulls public signals from Product Hunt, Hacker News, GitHub, Reddit, YC batches, company blogs, and career pages — no manual tab-hopping.",
    to: "/dashboard/trends",
  },
  {
    icon: Sparkles,
    title: "AI research assistant",
    body: "Ask questions in plain English and get structured answers backed by real web data — with sources, numbers, and caveats attached.",
    to: "/dashboard/search",
  },
  {
    icon: BarChart3,
    title: "Competitor intelligence",
    body: "Monitor product launches, pricing changes, funding rounds, hiring trends, and feature releases across your competitive set, automatically.",
    to: "/dashboard/competitors",
  },
  {
    icon: Rocket,
    title: "Startup discovery",
    body: "Surface emerging startups before they trend — ranked by funding momentum, developer interest, and community discussion.",
    to: "/dashboard/startups",
  },
  {
    icon: TrendingUp,
    title: "Market opportunity finder",
    body: "Every category gets an opportunity score out of 100, weighted across growth, competition, funding, hiring, developer interest, and community signal.",
    to: "/dashboard/search",
  },
  {
    icon: Newspaper,
    title: "Daily intelligence digest",
    body: "Wake up to an AI-written brief of the startup ecosystem changes that actually matter to your market.",
    to: "/dashboard/overview",
  },
];

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For founders kicking the tires on an idea.",
    cta: "Start free",
    features: [
      "10 research credits / month",
      "7-day signal history",
      "Opportunity scores",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$24.99",
    period: "per month",
    description: "For active founders and indie hackers validating and tracking markets.",
    cta: "Go Pro",
    popular: true,
    features: [
      "Unlimited research",
      "Full signal history & saved reports",
      "Competitor & pricing monitoring",
      "Daily intelligence digest",
      "Priority AI analysis",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "annual",
    description: "For funds, accelerators, and startup teams with serious monitoring needs.",
    cta: "Talk to sales",
    features: [
      "Dedicated crawls & custom sources",
      "API access & data exports",
      "SSO, audit logs & SLAs",
      "Shared team workspaces",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Full brief dialog (hero mock)                                       */
/* ------------------------------------------------------------------ */

const BRIEF_FACTORS = [
  { label: "Growth", value: 92 },
  { label: "Competition", value: 38 },
  { label: "Funding", value: 90 },
  { label: "Hiring", value: 84 },
  { label: "Developer interest", value: 78 },
  { label: "Community discussion", value: 71 },
];

function HeroBriefDialog({
  open,
  onOpenChange,
  onStartResearch,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartResearch: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] gap-0 overflow-y-auto border-white/10 bg-[#101014] p-0 text-white sm:max-w-2xl">
        <DialogHeader className="border-b border-white/8 p-6 pr-12 text-left">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-500/15 text-blue-300">
              84/100 · Strong opportunity
            </Badge>
            <span className="text-xs text-white/35">AI developer tooling</span>
          </div>
          <DialogTitle className="mt-3 text-xl leading-snug text-white">
            Full opportunity brief: AI developer tooling & infrastructure
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-white/50">
            The complete report behind the dashboard above — and how SignalForge
            builds it for every question you ask.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 p-6">
          {/* Executive summary */}
          <section>
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/40">
              <FileSearch className="size-3.5 text-blue-400" />
              Executive summary
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Developer tooling is at an inflection moment: funding velocity is
              accelerating, launches are capturing outsized attention, and open-source
              adoption is compounding. Demand is broad, but the space is crowding fast —
              the window to differentiate is short. SignalForge's read: build now, own a
              narrow workflow, and let live signals tell you the week the market moves.
            </p>
          </section>

          {/* How it works */}
          <section>
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/40">
              <Sparkles className="size-3.5 text-blue-400" />
              How SignalForge built this brief
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: Search,
                  step: "1 · Ask",
                  text: "Type a plain-English question about any market, competitor, or idea — no dashboards to configure.",
                },
                {
                  icon: Globe,
                  step: "2 · Collect",
                  text: "Bright Data Scraper Studio pulls live public signals from 7 sources around the clock.",
                },
                {
                  icon: BarChart3,
                  step: "3 · Analyze",
                  text: "AI cross-references every signal across six weighted factor groups and scores the category out of 100.",
                },
                {
                  icon: FileSearch,
                  step: "4 · Deliver",
                  text: "You get a sourced, scored brief — insights, startup angles, and risks — in seconds.",
                },
              ].map((s) => (
                <div key={s.step} className="rounded-xl border border-white/8 bg-white/3 p-4">
                  <div className="flex items-center gap-2">
                    <s.icon className="size-4 text-blue-300" />
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                      {s.step}
                    </p>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-white/50">{s.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Key insights */}
          <section>
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/40">
              <TrendingUp className="size-3.5 text-blue-400" />
              Key insights
            </h3>
            <ul className="mt-3 space-y-2.5">
              {[
                {
                  dot: "bg-blue-400",
                  text: "Funding velocity is accelerating — a $120M Series C landed in the category this week.",
                },
                {
                  dot: "bg-cyan-400",
                  text: "Launches are capturing attention — an AI coding tool hit #1 on Product Hunt today.",
                },
                {
                  dot: "bg-violet-400",
                  text: "Developer interest is compounding — an MCP project grew +98% in GitHub stars this quarter.",
                },
                {
                  dot: "bg-emerald-400",
                  text: "Buyers are vocal — a workflow pain thread reached 2.2k upvotes on Reddit.",
                },
              ].map((i) => (
                <li
                  key={i.text}
                  className="flex items-start gap-2.5 rounded-lg border border-white/6 bg-white/3 p-3"
                >
                  <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${i.dot}`} />
                  <p className="text-sm text-white/70">{i.text}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Factor scores */}
          <section>
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/40">
              <Radar className="size-3.5 text-blue-400" />
              Factor scores · weighted to 84/100
            </h3>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {BRIEF_FACTORS.map((f) => (
                <div key={f.label} className="rounded-lg border border-white/6 bg-white/3 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-white/60">{f.label}</p>
                    <p className="text-sm font-bold text-white">{f.value}</p>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${f.value}%` }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Startup angles + risks */}
          <section className="grid gap-5 sm:grid-cols-2">
            <div>
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/40">
                <Lightbulb className="size-3.5 text-blue-400" />
                Startup angles
              </h3>
              <ul className="mt-3 space-y-2.5">
                {[
                  "Governance & observability for MCP servers",
                  "Analytics for agent-heavy dev stacks",
                  "Vertical support copilot for dev platforms",
                ].map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm text-white/70">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-blue-400" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/40">
                <AlertTriangle className="size-3.5 text-amber-400" />
                Risks to de-risk first
              </h3>
              <ul className="mt-3 space-y-2.5">
                {[
                  "Category crowding — fast capital is attracting fast followers.",
                  "Platform dependency — momentum rides on a few large ecosystems.",
                ].map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-amber-400" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Sources */}
          <section>
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/40">
              <Globe className="size-3.5 text-blue-400" />
              Sources cited
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {SOURCES.map((s) => (
                <span
                  key={s.label}
                  className="rounded-full border border-white/8 bg-white/4 px-3 py-1 text-[11px] text-white/60"
                >
                  {s.label}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Footer CTA */}
        <div className="flex flex-col gap-3 border-t border-white/8 bg-white/2 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/50">
            Want this for <span className="text-white">your</span> idea? It takes one
            question.
          </p>
          <Button onClick={onStartResearch} className="gap-2">
            Start Research <ArrowRight className="size-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/* Hero mock dashboard                                                 */
/* ------------------------------------------------------------------ */

function HeroDashboard({ onStartResearch }: { onStartResearch: () => void }) {
  const [briefOpen, setBriefOpen] = useState(false);
  const trend = [34, 42, 40, 55, 58, 66, 72, 84];
  const max = 100;
  const points = trend
    .map((v, i) => `${(i / (trend.length - 1)) * 100},${100 - (v / max) * 100}`)
    .join(" ");

  return (
    <div className="relative mx-auto mt-16 w-full max-w-5xl">
      {/* Glow behind the panel */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-blue-500/25 via-transparent to-cyan-400/10 blur-3xl"
      />
      <div className="glass-strong relative overflow-hidden rounded-2xl shadow-2xl shadow-black/60">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-white/8 px-5 py-3.5">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <div className="ml-4 flex h-7 flex-1 items-center rounded-md border border-white/8 bg-white/4 px-3 text-xs text-white/50">
            <Search className="mr-2 size-3" />
            Ask anything about startups…
            <kbd className="ml-auto rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-white/40">
              ⌘K
            </kbd>
          </div>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-3">
          {/* Opportunity score */}
          <div className="glass flex flex-col items-center justify-center rounded-xl p-5">
            <p className="text-xs font-medium uppercase tracking-widest text-white/40">
              Opportunity score
            </p>
            <div className="relative mt-3 size-28">
              <svg viewBox="0 0 100 100" className="size-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="url(#hero-gauge)"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 42}
                  initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                  whileInView={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - 0.84) }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="hero-gauge" x1="0" y1="0" x2="1" y2="1">
                    <stop stopColor="#3b82f6" />
                    <stop offset="1" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-white">84</span>
                <span className="text-[10px] text-white/40">/ 100</span>
              </div>
            </div>
            <Badge variant="secondary" className="mt-3 bg-blue-500/15 text-blue-300">
              Strong opportunity
            </Badge>
          </div>

          {/* Trend chart */}
          <div className="glass rounded-xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-widest text-white/40">
                Category momentum
              </p>
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                <TrendingUp className="size-3.5" /> +42%
              </span>
            </div>
            <svg viewBox="0 0 100 100" className="mt-4 h-36 w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#3b82f6" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon
                points={`0,100 ${points} 100,100`}
                fill="url(#hero-area)"
                className="animate-sf-pulse"
              />
              <motion.polyline
                points={points}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: "easeOut" }}
              />
            </svg>
            <div className="mt-2 flex justify-between text-[10px] text-white/35">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
            </div>
          </div>

          {/* Signals feed */}
          <div className="glass rounded-xl p-5">
            <p className="text-xs font-medium uppercase tracking-widest text-white/40">
              Live signals
            </p>
            <div className="mt-3 space-y-2.5">
              {[
                { dot: "bg-blue-400", text: "Meridian Robotics raised $120M Series C", tag: "Funding" },
                { dot: "bg-cyan-400", text: "\u201cClaude Code\u201d trending #1 on Product Hunt", tag: "Launch" },
                { dot: "bg-violet-400", text: "mcp-servers +98% stars this quarter", tag: "GitHub" },
                { dot: "bg-emerald-400", text: "Prior-auth pain thread hits 2.2k upvotes", tag: "Reddit" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.12 }}
                  className="flex items-start gap-2.5 rounded-lg border border-white/6 bg-white/3 p-2.5"
                >
                  <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${s.dot} animate-sf-pulse`} />
                  <div className="min-w-0">
                    <p className="truncate text-xs text-white/80">{s.text}</p>
                    <p className="mt-0.5 text-[10px] text-white/35">{s.tag} · just now</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/8 px-5 py-3.5">
          <div className="flex items-center gap-2 text-xs text-white/50">
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-emerald-300">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-sf-pulse" />
              7 sources live
            </span>
            <span className="hidden text-white/35 sm:inline">
              Bright Data Scraper Studio · refreshed 2 min ago
            </span>
          </div>
          <button
            type="button"
            onClick={() => setBriefOpen(true)}
            className="group flex items-center gap-1 text-xs font-medium text-blue-300 transition-colors hover:text-blue-200"
          >
            Open full brief
            <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      <HeroBriefDialog
        open={briefOpen}
        onOpenChange={setBriefOpen}
        onStartResearch={onStartResearch}
      />

      {/* Floating chips */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        className="absolute -left-6 top-24 hidden animate-sf-float rounded-xl border border-white/10 bg-[#121218]/90 px-3.5 py-2.5 shadow-xl backdrop-blur lg:block"
      >
        <p className="text-[10px] uppercase tracking-widest text-white/40">Competitor</p>
        <p className="mt-0.5 text-sm font-medium text-white">
          Intercom pricing <span className="text-emerald-400">↑ 12%</span>
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.7 }}
        className="absolute -right-4 bottom-20 hidden animate-sf-float rounded-xl border border-white/10 bg-[#121218]/90 px-3.5 py-2.5 shadow-xl backdrop-blur lg:block [animation-delay:1.2s]"
      >
        <p className="text-[10px] uppercase tracking-widest text-white/40">AI summary</p>
        <p className="mt-0.5 max-w-[180px] text-sm font-medium text-white">
          Funding velocity signals a category inflection
        </p>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Landing() {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useAuth();

  const go = (path: string) => {
    navigate(isAuthenticated ? path : `/auth?returnTo=${path}`);
  };
  const startResearch = () => go("/dashboard");

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#0b0b0d] text-white">
      {/* Backdrop layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-radial-fade" />

      {/* ------------------------------------------------ Nav */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0b0b0d]/75 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <BrandLogo onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
          <div className="hidden items-center gap-7 text-sm text-white/60 md:flex">
            <a href="#product" className="transition-colors hover:text-white">Product</a>
            <a href="#sources" className="transition-colors hover:text-white">Sources</a>
            <a href="#pricing" className="transition-colors hover:text-white">Pricing</a>
            <a href="#faq" className="transition-colors hover:text-white">FAQ</a>
          </div>
          <div className="flex items-center gap-2">
            {!isLoading && isAuthenticated ? (
              <Button onClick={() => navigate("/dashboard")} className="gap-2">
                Open dashboard <ArrowRight className="size-4" />
              </Button>
            ) : (
              <>
                <Button variant="ghost" className="text-white/70" onClick={() => navigate("/auth")}>
                  Sign in
                </Button>
                <Button onClick={startResearch} className="gap-2">
                  Start Research <ArrowRight className="size-4" />
                </Button>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* ------------------------------------------------ Hero */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-5 pb-24 pt-20 text-center sm:pt-28">
          <FadeIn>
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur">
              <Sparkles className="size-3.5 text-blue-400" />
              AI-powered startup intelligence, built on live public web data
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="mx-auto max-w-4xl text-balance text-4xl font-bold leading-[1.06] tracking-tight sm:text-6xl">
              Turn live web data into{" "}
              <span className="text-gradient">startup intelligence</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/55 sm:text-lg">
              SignalForge AI monitors Product Hunt, Hacker News, GitHub, Reddit, YC
              batches, company blogs, and career pages around the clock — then distills
              it into clear market briefs. Validate ideas, size up competitors, and spot
              pricing shifts before anyone else, with an analyst-grade summary in seconds.
            </p>
          </FadeIn>
          <FadeIn delay={0.24}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" onClick={startResearch} className="group h-12 gap-2 px-7 text-base">
                Start Research
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 gap-2 border-white/15 bg-white/4 px-7 text-base text-white/80 hover:bg-white/8"
                onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Play className="size-4 fill-current" />
                Watch demo
              </Button>
            </div>
          </FadeIn>
          <FadeIn delay={0.32}>
            <p className="mt-6 text-xs text-white/35">
              No credit card required · Free tier includes 10 research credits
            </p>
          </FadeIn>
        </div>

        <div id="demo" className="mx-auto max-w-6xl scroll-mt-24 px-5">
          <HeroDashboard onStartResearch={startResearch} />
        </div>
      </section>

      {/* ------------------------------------------------ Sources */}
      <section id="sources" className="relative py-20">
        <div className="mx-auto max-w-6xl px-5">
          <FadeIn>
            <p className="text-center text-sm font-medium text-white/40">
              Powered by publicly available web data
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {SOURCES.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => go(s.to)}
                  title={`View ${s.label} signals`}
                  className="group flex cursor-pointer items-center gap-2.5 rounded-xl border border-white/8 bg-white/3 px-4 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/30 hover:bg-blue-500/10"
                >
                  <span className="flex size-6 items-center justify-center rounded-md bg-white/6 text-xs font-bold text-blue-300 transition-colors group-hover:bg-blue-500/20">
                    {s.glyph}
                  </span>
                  <span className="text-sm font-medium text-white/70 transition-colors group-hover:text-white">
                    {s.label}
                  </span>
                  <ChevronRight className="size-3.5 text-blue-300 opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ------------------------------------------------ Features */}
      <section id="product" className="relative py-24">
        <div className="mx-auto max-w-6xl px-5">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="bg-blue-500/10 text-blue-300">
                What SignalForge does
              </Badge>
              <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                A research analyst that never sleeps
              </h2>
              <p className="mt-4 text-pretty text-white/55">
                Instead of hours of tab-hopping and spreadsheet upkeep, ask SignalForge
                a question about any market — and get a sourced, scored brief back in
                seconds.
              </p>
            </div>
          </FadeIn>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <FadeIn key={f.title} delay={0.05 * i}>
                <button
                  type="button"
                  onClick={() => go(f.to)}
                  className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#101014] p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/30"
                >
                  <div
                    aria-hidden
                    className="absolute -right-10 -top-10 size-28 rounded-full bg-blue-500/10 blur-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  />
                  <div className="flex size-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-300">
                    <f.icon className="size-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50">{f.body}</p>
                  <span className="mt-4 flex items-center gap-1.5 text-xs font-medium text-blue-300 opacity-0 transition-opacity group-hover:opacity-100">
                    Explore <ChevronRight className="size-3.5" />
                  </span>
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ How it works */}
      <section className="relative py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <Badge variant="secondary" className="bg-blue-500/10 text-blue-300">
                For founders, teams & investors
              </Badge>
              <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Validate before you build.
                <br />
                Monitor after you launch.
              </h2>
              <p className="mt-5 text-pretty leading-relaxed text-white/55">
                Early-stage founders, indie hackers, startup teams, accelerators, and
                investors all face the same problem: markets move faster than research
                does. SignalForge gives you a live, always-on view — so you can commit
                to an idea with evidence, and react to competitors the week they move,
                not the quarter after.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  { icon: FileSearch, text: "Validate startup ideas with scored opportunity briefs" },
                  { icon: Radar, text: "Discover competitors you haven't heard of yet" },
                  { icon: LineChart, text: "Analyze market trends from six weighted signal groups" },
                  { icon: Globe, text: "Track pricing and customer sentiment over time" },
                ].map((item, i) => (
                  <FadeIn key={i} delay={0.05 * i}>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-white/4 text-blue-300">
                        <item.icon className="size-4" />
                      </span>
                      <span className="pt-1.5 text-sm text-white/70">{item.text}</span>
                    </li>
                  </FadeIn>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="glass-strong relative rounded-2xl p-6">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/40">
                  <Zap className="size-3.5 text-blue-400" />
                  Example research brief
                </div>
                <div className="mt-5 rounded-xl border border-white/8 bg-white/3 p-4">
                  <p className="text-sm font-medium text-white">
                    “Is there a SaaS opportunity in healthcare prior-authorization?”
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-white/50">
                    SignalForge cross-referenced 214 public sources and produced a
                    84/100 opportunity score: strong demand signals, fragmented
                    competition, and heavy hiring in the category — with three
                    concrete startup angles and two risks to de-risk first.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["84/100 opportunity", "6 signal groups", "9 sources cited", "3 startup angles"].map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-[11px] font-medium text-blue-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { label: "Growth", value: "92" },
                    { label: "Competition", value: "38" },
                    { label: "Funding", value: "90" },
                  ].map((f) => (
                    <div key={f.label} className="rounded-lg border border-white/6 bg-white/3 p-3">
                      <p className="text-[10px] uppercase tracking-widest text-white/35">{f.label}</p>
                      <p className="mt-1 text-lg font-bold text-white">{f.value}</p>
                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/8">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${f.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Pricing */}
      <section id="pricing" className="relative py-24">
        <div className="mx-auto max-w-6xl px-5">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="bg-blue-500/10 text-blue-300">
                Pricing
              </Badge>
              <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Start free. Scale when the research pays off.
              </h2>
              <p className="mt-4 text-white/55">
                Simple plans that grow with your company — no per-seat surprises.
              </p>
            </div>
          </FadeIn>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {PLANS.map((plan, i) => (
              <FadeIn key={plan.name} delay={0.08 * i}>
                <div
                  className={`relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
                    plan.popular
                      ? "border-blue-400/40 bg-gradient-to-b from-blue-500/10 to-[#101014] shadow-[0_0_60px_-15px_rgba(59,130,246,0.4)]"
                      : "border-white/8 bg-[#101014] hover:border-white/15"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-3 py-1 text-[11px] font-semibold text-white">
                      Most popular
                    </span>
                  )}
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50">
                    {plan.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="text-4xl font-bold tracking-tight text-white">{plan.price}</span>
                    <span className="text-sm text-white/40">{plan.period}</span>
                  </div>
                  <p className="mt-3 text-sm text-white/50">{plan.description}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                        <Check className="mt-0.5 size-4 shrink-0 text-blue-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`mt-8 w-full ${plan.popular ? "" : "bg-white/6 text-white hover:bg-white/12"}`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={startResearch}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Final CTA */}
      <section className="relative py-24">
        <div className="mx-auto max-w-4xl px-5">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/20 via-[#101014] to-[#101014] px-8 py-16 text-center">
              <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
              <div className="relative">
                <h2 className="mx-auto max-w-xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                  Get your next market read in seconds
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-pretty text-white/55">
                  Join the founders who stopped guessing. Ask SignalForge about any
                  idea, market, or competitor — free.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button size="lg" onClick={startResearch} className="h-12 gap-2 px-8 text-base">
                    Start Research <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ------------------------------------------------ Footer */}
      <footer className="border-t border-white/6 py-14">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <div className="max-w-xs">
              <BrandLogo />
              <p className="mt-4 text-sm leading-relaxed text-white/40">
                AI-powered startup intelligence and market research, built on live
                public web data.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
              {[
                { title: "Product", links: ["Dashboard", "AI Search", "Market Trends", "Competitors"] },
                { title: "Resources", links: ["Documentation", "GitHub", "API reference"] },
                { title: "Company", links: ["Privacy", "Terms", "Contact"] },
                { title: "Follow", links: ["X / Twitter", "LinkedIn", "Product Hunt"] },
              ].map((col) => (
                <div key={col.title}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                    {col.title}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="text-sm text-white/55 transition-colors hover:text-white"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/6 pt-8 sm:flex-row">
            <p className="text-xs text-white/35">
              © 2026 SignalForge AI. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-white/35">
              <Github className="size-4" />
              <Mail className="size-4" />
              <ShieldCheck className="size-4" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
