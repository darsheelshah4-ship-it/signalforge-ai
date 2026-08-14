import { format, subDays } from "date-fns";

/* ============================================================
   SignalForge AI — market intelligence knowledge base
   Curated public-web signal data (Product Hunt, Hacker News,
   GitHub, Reddit, YC, company blogs & career pages).
   ============================================================ */

export type SourceKind =
  | "Product Hunt"
  | "Hacker News"
  | "GitHub"
  | "Reddit"
  | "Y Combinator"
  | "Company Blog"
  | "Career Page"
  | "Press";

export type FactorKey =
  | "growth"
  | "competition"
  | "funding"
  | "hiring"
  | "developer"
  | "community";

export type Severity = "High" | "Medium" | "Low";

export interface IndustryData {
  id: string;
  label: string;
  emoji: string;
  summary: string;
  insights: string[];
  growthNote: string;
  sentimentBase: number;
  pricingPoints: string[];
  risks: { risk: string; severity: Severity; mitigation: string }[];
  startupIdeas: { name: string; thesis: string; whyNow: string }[];
  competitors: string[];
  baseScores: Record<FactorKey, number>;
  tags: string[];
}

/* ---------------- Dates ---------------- */

export function daysAgo(n: number): string {
  return format(subDays(new Date(), n), "MMM d");
}

/* ---------------- Industries ---------------- */

export const INDUSTRIES: IndustryData[] = [
  {
    id: "ai",
    label: "AI / Machine Learning",
    emoji: "🧠",
    summary:
      "The AI layer is consolidating around frontier models while the application layer stays wide open. Enterprises are shifting from pilots to production workloads, and budgets are following: AI tooling, agent infrastructure, and vertical copilots are the fastest-growing segments.",
    insights: [
      "Enterprise AI spend is roughly doubling year over year, but buyers are increasingly skeptical of generic wrappers — differentiation now comes from proprietary data and workflow depth.",
      "Agent-based tooling (autonomous research, coding, ops) is the segment drawing the strongest developer attention this quarter.",
      "Open-weight models have compressed the cost of building, which raises the bar for defensibility: distribution, integrations, and data moats matter more than the model itself.",
      "Hiring signals for AI product roles are up sharply, a leading indicator that teams are committing to shipping, not just experimenting.",
    ],
    growthNote:
      "Category momentum is strong and sustained: search interest, GitHub activity, and funding counts have all trended up for six consecutive quarters.",
    sentimentBase: 48,
    pricingPoints: [
      "The market has shifted from per-seat to usage-based pricing tied to tokens or compute, which scales well when product usage is genuinely high.",
      "Enterprise buyers accept premium pricing when ROI is measurable — benchmark against hours saved or tasks automated.",
      "A freemium research tier converts well because model costs are low enough to subsidize exploration.",
    ],
    risks: [
      {
        risk: "Model commoditization erodes differentiation",
        severity: "High",
        mitigation: "Own the workflow, integrations, and data — never just the model call.",
      },
      {
        risk: "Enterprise security and procurement scrutiny",
        severity: "Medium",
        mitigation: "Ship SOC 2, SSO, and self-hosted or VPC options early.",
      },
      {
        risk: "Rapid incumbency from platform providers",
        severity: "Medium",
        mitigation: "Go narrow and deep on a vertical before platforms generalize into it.",
      },
    ],
    startupIdeas: [
      {
        name: "ForgeOps",
        thesis: "An AI operations copilot that turns scattered alerts, logs, and tickets into prioritized action plans.",
        whyNow: "Teams already bought monitoring tools; they now need an AI layer that actually resolves incidents.",
      },
      {
        name: "Docket",
        thesis: "Autonomous market-research agents that produce investor-grade briefs from live web sources.",
        whyNow: "Research teams are drowning in tabs; agent workflows finally make synthesis practical.",
      },
      {
        name: "SignalDesk",
        thesis: "Vertical AI copilot for revenue operations that drafts forecasts and flags churn risk from CRM + email signals.",
        whyNow: "RevOps teams have the data but not the analyst headcount.",
      },
    ],
    competitors: ["OpenAI", "Anthropic", "Jasper", "Copy.ai"],
    baseScores: { growth: 92, competition: 38, funding: 90, hiring: 86, developer: 94, community: 82 },
    tags: ["agentic", "copilots", "LLM tooling", "inference", "AI infra"],
  },
  {
    id: "healthcare",
    label: "Healthcare / Health Tech",
    emoji: "🩺",
    summary:
      "Healthcare is going through a digital operating-system upgrade. Clinical workflows, prior authorization, and revenue-cycle operations are all being re-platformed, and AI is finally clearing regulatory and adoption hurdles that blocked earlier waves of innovation.",
    insights: [
      "Prior authorization and claims automation are the most discussed pain points on provider forums — weeks of back-and-forth per claim is common.",
      "Patient-access tools and self-serve scheduling show the strongest consumer-side growth signals.",
      "AI documentation assistants have crossed into mainstream adoption and are starting to be table stakes for new EHR-adjacent products.",
      "HIPAA and SOC 2 compliance are expected, not differentiators — the winners compete on workflow fit and integration depth.",
    ],
    growthNote:
      "Digital health funding has stabilized after a correction and is rotating toward AI-enabled clinical software rather than consumer wellness apps.",
    sentimentBase: 22,
    pricingPoints: [
      "Providers pay for outcomes: per-claim, per-automation, or per-encounter pricing beats flat seats.",
      "Land with a narrow, high-friction workflow (e.g., auth letters) before expanding across the revenue cycle.",
      "Enterprise sales cycles run 6–12 months; a design partnership program shortens the path to the first lighthouse customer.",
    ],
    risks: [
      {
        risk: "Long regulatory and compliance timelines",
        severity: "High",
        mitigation: "Target workflows that don't require FDA clearance first; add clinical claims later.",
      },
      {
        risk: "EHR integration complexity",
        severity: "High",
        mitigation: "Build on HL7/FHIR-first platforms and partner with EHR vendors early.",
      },
      {
        risk: "High sales friction and procurement overhead",
        severity: "Medium",
        mitigation: "Pilot with measurable ROI (hours saved per clinician) and publish the results.",
      },
    ],
    startupIdeas: [
      {
        name: "ClearAuth",
        thesis: "Autonomous prior-authorization assistant that drafts, submits, and tracks approval letters.",
        whyNow: "Providers report multi-week auth delays; automation is proven in adjacent document workflows.",
      },
      {
        name: "CareSignal",
        thesis: "Post-discharge patient monitoring that turns SMS check-ins into clinical escalation queues.",
        whyNow: "Hospitals face readmission penalties and chronic care demand keeps rising.",
      },
      {
        name: "WardSync",
        thesis: "Capacity and staffing prediction for hospital units using census, acuity, and staffing data.",
        whyNow: "Nursing shortages make staffing optimization a board-level priority.",
      },
    ],
    competitors: ["Intercom", "Notion", "Ramp"],
    baseScores: { growth: 78, competition: 62, funding: 74, hiring: 58, developer: 46, community: 44 },
    tags: ["prior auth", "revenue cycle", "AI scribes", "telehealth", "FHIR"],
  },
  {
    id: "fintech",
    label: "Fintech / Financial Infrastructure",
    emoji: "💳",
    summary:
      "Fintech has matured from payments hype into durable infrastructure. The action is in embedded finance, treasury automation, and AI-powered financial operations — where incumbents are slow and software margins are attractive.",
    insights: [
      "Embedded finance is the dominant theme: non-bank products are quietly handling payments, cards, and lending in the background.",
      "Treasury and cash-management tools are seeing a hiring and funding surge as finance teams look to automate reconciliation.",
      "AI underwriting and fraud detection are the two areas where founders report the clearest measurable ROI.",
      "Regulators are paying more attention to consumer finance, so compliance tooling is becoming a defensible niche.",
    ],
    growthNote:
      "Funding counts are below the 2021 peak but per-deal sizes are healthier, with a clear rotation toward B2B financial software.",
    sentimentBase: 30,
    pricingPoints: [
      "Infrastructure is priced per transaction or per API call — align pricing to value created, not seats.",
      "Embedded finance buyers expect transparent, predictable fees; hidden costs are a deal-breaker.",
      "A volume-tiered model rewards growth and locks in usage as customers scale.",
    ],
    risks: [
      {
        risk: "Regulatory complexity and changing rules",
        severity: "High",
        mitigation: "Partner with licensed institutions or use BaaS providers rather than seeking licenses first.",
      },
      {
        risk: "Fraud and chargeback exposure",
        severity: "Medium",
        mitigation: "Build risk tooling as a first-class product surface, not an afterthought.",
      },
      {
        risk: "Platform concentration risk",
        severity: "Medium",
        mitigation: "Multi-bank and multi-processor abstraction protects against partner changes.",
      },
    ],
    startupIdeas: [
      {
        name: "Ledgerly",
        thesis: "Real-time treasury reconciliation for fast-growing startups that outgrew spreadsheets.",
        whyNow: "Finance teams are hiring, and nobody owns modern multi-bank reconciliation yet.",
      },
      {
        name: "ComplyKit",
        thesis: "AI-assisted compliance copilot that drafts policies and flags gaps from regulation feeds.",
        whyNow: "Regulatory attention is rising while compliance talent remains scarce.",
      },
      {
        name: "Floatwise",
        thesis: "Cash-flow forecasting that ingests invoices, payroll, and subscription data to predict runway.",
        whyNow: "Founders need board-ready forecasts; existing tools are static and manual.",
      },
    ],
    competitors: ["Stripe", "Ramp", "Canva"],
    baseScores: { growth: 74, competition: 56, funding: 82, hiring: 62, developer: 68, community: 52 },
    tags: ["embedded finance", "treasury", "payments", "underwriting", "BaaS"],
  },
  {
    id: "devtools",
    label: "Developer Tools",
    emoji: "🛠️",
    summary:
      "Developers are the fastest adopters of new tooling, and the AI code assistant wave has re-opened the entire category. The durable winners reduce toil, plug into existing workflows, and win on the merits in public — GitHub stars, HN threads, and open-source momentum decide fate.",
    insights: [
      "AI coding assistants are consolidating, but adjacent tooling — code review, testing, observability, and refactoring agents — is wide open.",
      "Open-source adoption is the strongest acquisition channel; the best products are 'open-core' with a generous free tier.",
      "Developer-experience tooling (DX, local dev, CI) shows the most consistent hiring growth.",
      "Hacker News and Reddit sentiment is a reliable early-warning signal: launches that spike there convert to paid teams within quarters.",
    ],
    growthNote:
      "GitHub activity for AI-adjacent dev tools is the strongest category signal in our dataset, with star growth outpacing every other sector.",
    sentimentBase: 55,
    pricingPoints: [
      "Developers expect a real free tier; monetize teams, seats, and enterprise controls.",
      "Usage-based pricing works but needs hard caps to avoid surprise bills — trust is the moat.",
      "Self-serve checkout with credit card should work end-to-end before sales is hired.",
    ],
    risks: [
      {
        risk: "Incumbent bundling (IDEs, clouds, platforms)",
        severity: "High",
        mitigation: "Differentiate with depth in one workflow and strong open-source gravity.",
      },
      {
        risk: "Churn from tool fatigue",
        severity: "Medium",
        mitigation: "Make time-to-value under five minutes and integrate where work already happens.",
      },
      {
        risk: "Open-source competitors with large communities",
        severity: "Medium",
        mitigation: "Compete on managed experience, security, and support rather than raw features.",
      },
    ],
    startupIdeas: [
      {
        name: "ReviewPilot",
        thesis: "AI code-review agent that enforces team conventions and flags regressions before merge.",
        whyNow: "Review queues are the #1 cited bottleneck in engineering retros.",
      },
      {
        name: "TestForge",
        thesis: "Generative test-generation that maintains a live coverage contract on every PR.",
        whyNow: "AI generates code faster than humans can test it — the gap is widening.",
      },
      {
        name: "ShipLog",
        thesis: "Release-intelligence dashboard correlating deploys with incidents and user feedback.",
        whyNow: "Platform teams own reliability now, but nobody owns release causality.",
      },
    ],
    competitors: ["Linear", "Vercel", "Supabase", "GitHub"],
    baseScores: { growth: 84, competition: 44, funding: 72, hiring: 68, developer: 96, community: 88 },
    tags: ["AI coding", "CI/CD", "observability", "open source", "dev experience"],
  },
  {
    id: "saas",
    label: "B2B SaaS / Productivity",
    emoji: "📈",
    summary:
      "Vertical SaaS is the durable growth story of the decade: generic horizontal tools are saturated, while industry-specific software with embedded AI and payments keeps compounding. The strongest opportunities sit where incumbents are legacy, workflows are paper-based, and AI removes a real bottleneck.",
    insights: [
      "Horizontal productivity is crowded and consolidating; vertical workflows remain fragmented and underserved.",
      "AI features are now expected in every SaaS pitch — the differentiator is workflow depth, not the feature list.",
      "Usage-based and outcome-based pricing are winning over flat per-seat pricing in buyer surveys.",
      "The fastest-growing verticals by funding and hiring are construction, legal, and logistics.",
    ],
    growthNote:
      "Vertical SaaS deal activity is up while horizontal SaaS churns; buyers are paying premiums for industry-specific workflows.",
    sentimentBase: 40,
    pricingPoints: [
      "Charge per outcome (per project, per job, per filing) to align with the value delivered.",
      "Vertical buyers pay for software that removes headcount — price against the cost of the role it replaces.",
      "Annual prepay with a discount is the standard motion for SMB verticals.",
    ],
    risks: [
      {
        risk: "Long sales cycles in verticals",
        severity: "Medium",
        mitigation: "Target the wedge workflow with the fastest measurable ROI first.",
      },
      {
        risk: "Incumbent legacy software loyalty",
        severity: "Medium",
        mitigation: "Win by being 10x easier to adopt, not 10% better on paper.",
      },
      {
        risk: "Customization creep",
        severity: "High",
        mitigation: "Say no to one-off builds; productize the 80% and partner for the rest.",
      },
    ],
    startupIdeas: [
      {
        name: "BidForge",
        thesis: "Proposal and bid-management software for construction subcontractors.",
        whyNow: "Construction software spend is growing faster than almost any vertical.",
      },
      {
        name: "DocketAI",
        thesis: "Matter-management copilot for small law firms that hate their practice-management suites.",
        whyNow: "Solo and small firms are underserved by enterprise legal tech.",
      },
      {
        name: "FleetIQ",
        thesis: "Predictive maintenance and dispatch optimization for regional logistics fleets.",
        whyNow: "Fuel and labor costs are forcing margin-hungry operators to modernize.",
      },
    ],
    competitors: ["Notion", "Intercom", "Linear"],
    baseScores: { growth: 68, competition: 48, funding: 66, hiring: 60, developer: 52, community: 48 },
    tags: ["vertical SaaS", "productivity", "workflow automation", "SMB", "AI features"],
  },
  {
    id: "ecommerce",
    label: "E-commerce / Commerce Tools",
    emoji: "🛒",
    summary:
      "Commerce is splitting into two games: AI-native storefronts that personalize everything, and headless infrastructure that powers them. Direct-to-consumer is tougher than ever on CAC, but tooling that improves margins — pricing, inventory, and merchandising AI — is thriving.",
    insights: [
      "AI merchandising (dynamic pricing, personalized ranking, automated product descriptions) is the strongest new-signal category.",
      "Headless commerce adoption is accelerating as brands demand ownership of the storefront experience.",
      "Social commerce and creator-driven selling are growing faster than marketplace traffic.",
      "Logistics and returns automation remain the most painful, least modernized part of the stack.",
    ],
    growthNote:
      "Commerce-adjacent software is growing while pure D2C brand funding cools — the picks-and-shovels moment.",
    sentimentBase: 26,
    pricingPoints: [
      "Take a small percentage of GMV for outcome-priced tools; merchants align with upside.",
      "Free trial through a live storefront demo converts far better than screenshots.",
      "Charge per order or per SKU to scale naturally with the merchant.",
    ],
    risks: [
      {
        risk: "Thin merchant margins limit willingness to pay",
        severity: "Medium",
        mitigation: "Price against incremental margin (e.g., % of recovered revenue), not flat fees.",
      },
      {
        risk: "Platform risk (Shopify/Amazon changes)",
        severity: "High",
        mitigation: "Stay channel-agnostic and own the merchant relationship.",
      },
      {
        risk: "High CAC and low retention in tooling",
        severity: "Medium",
        mitigation: "Become the system of record for a workflow, not a point solution.",
      },
    ],
    startupIdeas: [
      {
        name: "MarginMind",
        thesis: "Real-time dynamic pricing for independent merchants based on demand and competitor signals.",
        whyNow: "Retail margins are squeezed; dynamic pricing was previously reserved for enterprise.",
      },
      {
        name: "Shelfie",
        thesis: "AI merchandising copilot that writes product copy, ranks collections, and A/B tests storefronts.",
        whyNow: "Brands can't hire enough merchandisers; the work is increasingly automatable.",
      },
      {
        name: "ReturnFlow",
        thesis: "Automated returns orchestration that reroutes, restocks, and reports in one dashboard.",
        whyNow: "Returns are the largest unmodernized cost center in commerce.",
      },
    ],
    competitors: ["Shopify", "Canva", "Stripe"],
    baseScores: { growth: 58, competition: 40, funding: 48, hiring: 44, developer: 40, community: 46 },
    tags: ["headless", "AI merchandising", "D2C", "logistics", "dynamic pricing"],
  },
  {
    id: "climate",
    label: "Climate / Clean Tech",
    emoji: "🌱",
    summary:
      "Clean tech is in a capital-rich supercycle. IRA-driven incentives, falling hardware costs, and corporate net-zero commitments are pulling software and services into the sector — from energy analytics to carbon accounting to EV fleet management.",
    insights: [
      "Energy software (grid analytics, DER management, EV charging orchestration) is the fastest-growing climate software segment.",
      "Carbon accounting is consolidating after a boom; the survivors own the audit workflow, not just dashboards.",
      "Climate hardware companies are increasingly bundling software subscriptions for recurring revenue.",
      "Hiring is concentrated in engineering and field-ops roles, not marketing — a sign of real building.",
    ],
    growthNote:
      "Climate software funding is up as hardware valuations reset; software margins are attracting former hardware investors.",
    sentimentBase: 52,
    pricingPoints: [
      "Subscription-plus-commission models work well in energy (per MWh managed, per charger deployed).",
      "Regulatory reporting creates predictable annual budgets — anchor pricing to compliance deadlines.",
      "Government and utility buyers prefer longer contracts with security review built in.",
    ],
    risks: [
      {
        risk: "Policy and incentive dependence",
        severity: "High",
        mitigation: "Build products with standalone ROI that don't depend on subsidies to win.",
      },
      {
        risk: "Long hardware-adjacent cycles",
        severity: "Medium",
        mitigation: "Stay software-first; integrate with hardware partners rather than manufacturing.",
      },
      {
        risk: "Certification complexity",
        severity: "Medium",
        mitigation: "Hire for standards fluency (GHG Protocol, ISO) early; it's a moat.",
      },
    ],
    startupIdeas: [
      {
        name: "GridPulse",
        thesis: "Grid-edge analytics for community solar and storage operators.",
        whyNow: "Distributed generation is booming and operators lack visibility software.",
      },
      {
        name: "ChargeLogic",
        thesis: "EV fleet charging orchestration that optimizes cost and grid constraints.",
        whyNow: "Commercial fleets are electrifying faster than charging software exists.",
      },
      {
        name: "CarbonLedger",
        thesis: "Audit-grade carbon accounting with AI-assisted data collection from invoices and ERP.",
        whyNow: "Regulatory reporting deadlines are forcing accuracy nobody has time for.",
      },
    ],
    competitors: ["Notion", "Ramp", "Canva"],
    baseScores: { growth: 76, competition: 66, funding: 78, hiring: 56, developer: 48, community: 58 },
    tags: ["energy", "carbon", "EV", "grid", "sustainability"],
  },
  {
    id: "edtech",
    label: "EdTech / Learning",
    emoji: "🎓",
    summary:
      "EdTech has pivoted from pandemic-era consumer hype to durable B2B and workforce outcomes. Corporate learning, skills assessment, and AI tutoring for regulated certification are the segments with real budgets and measurable results.",
    insights: [
      "Corporate training budgets are shifting from content libraries to outcome platforms that prove skill gain.",
      "AI tutoring is strongest in high-stakes test prep and certification, where measurable outcomes justify spend.",
      "University procurement remains slow but sticky; workforce and bootcamp channels move faster.",
      "Hiring signals favor assessment and proctoring companies — the 'trust layer' of learning.",
    ],
    growthNote:
      "Consumer edtech funding has cooled sharply while corporate learning and assessment segments hold steady.",
    sentimentBase: 34,
    pricingPoints: [
      "Charge per enrolled learner or per certification attempt — align with outcomes.",
      "Enterprise learning budgets are annual; land the pilot, expand by cohort.",
      "Free tier for learners, paid tier for institutions, is the standard wedge.",
    ],
    risks: [
      {
        risk: "Low willingness to pay among consumers",
        severity: "High",
        mitigation: "Go B2B: institutions and employers pay for outcomes consumers won't.",
      },
      {
        risk: "Content commoditization",
        severity: "Medium",
        mitigation: "Differentiate with assessment, practice loops, and certification paths.",
      },
      {
        risk: "Seasonal and cyclical budgets",
        severity: "Medium",
        mitigation: "Diversify across academic, corporate, and certification calendars.",
      },
    ],
    startupIdeas: [
      {
        name: "SkillGauge",
        thesis: "AI skill-assessment platform that certifies workforce capabilities for employers.",
        whyNow: "Employers are abandoning degree filters and need verifiable skill signals.",
      },
      {
        name: "PrepPath",
        thesis: "AI test-prep copilot for professional certifications (CPA, PMP, nursing boards).",
        whyNow: "Certification volume is at record highs and self-study tools are stale.",
      },
      {
        name: "ClassLoop",
        thesis: "Course-operation automation for bootcamps: scheduling, grading, and feedback.",
        whyNow: "Bootcamp economics depend on operational leverage nobody has automated.",
      },
    ],
    competitors: ["Notion", "Canva", "Intercom"],
    baseScores: { growth: 52, competition: 46, funding: 42, hiring: 38, developer: 34, community: 40 },
    tags: ["corporate learning", "assessment", "AI tutoring", "certification"],
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    emoji: "🛡️",
    summary:
      "Security spend keeps growing through every macro cycle. The current wave is AI-powered defense: SOC automation, exposure management, and identity security. Buyers are drowning in alerts and tool sprawl, which rewards platforms that consolidate rather than add another dashboard.",
    insights: [
      "SOC automation and AI triage are the most-funded niches — alert fatigue is the top cited pain point.",
      "Identity and access (IAM) remains the most resilient segment, with near-mandatory renewal cycles.",
      "Exposure and attack-surface management is emerging as the successor to vulnerability scanning.",
      "SMB security is underserved: enterprises are over-served, small teams are unprotected.",
    ],
    growthNote:
      "Security funding is counter-cyclical and stable, with the strongest per-deal sizes in AI-defense tooling.",
    sentimentBase: 38,
    pricingPoints: [
      "Per-asset or per-endpoint pricing aligns with coverage; flat seats underprice value.",
      "Security buyers have budgets but long procurement — bake in security reviews and SOC 2 from day one.",
      "Outcome pricing (e.g., per incident auto-remediated) is early but resonating with CISOs.",
    ],
    risks: [
      {
        risk: "Adversarial dynamics (attacker adaptation)",
        severity: "High",
        mitigation: "Ship frequent detections and maintain threat-intel feedback loops.",
      },
      {
        risk: "Crowded tooling market with consolidation pressure",
        severity: "Medium",
        mitigation: "Differentiate by consolidating a workflow, not adding a sensor.",
      },
      {
        risk: "Trust and liability burden",
        severity: "Medium",
        mitigation: "Invest in transparency, incident response support, and insurance partnerships.",
      },
    ],
    startupIdeas: [
      {
        name: "TriageAI",
        thesis: "Autonomous SOC alert triage that closes false positives and escalates the real ones.",
        whyNow: "Alert volumes grow faster than analyst headcount — automation is the only lever.",
      },
      {
        name: "Perimeter",
        thesis: "Attack-surface monitoring for SMBs with plain-English remediation playbooks.",
        whyNow: "Small teams are the primary ransomware targets and have zero tooling.",
      },
      {
        name: "AccessGuard",
        thesis: "Identity-hygiene automation that reviews, certifies, and prunes access continuously.",
        whyNow: "Compliance frameworks now require continuous access reviews nobody runs.",
      },
    ],
    competitors: ["Vercel", "GitHub", "Ramp"],
    baseScores: { growth: 70, competition: 52, funding: 76, hiring: 64, developer: 44, community: 42 },
    tags: ["SOC", "identity", "exposure management", "AI defense", "SMB security"],
  },
  {
    id: "creator",
    label: "Creator Economy / Media",
    emoji: "🎬",
    summary:
      "The creator economy is maturing into a media industry with real infrastructure: monetization rails, audience analytics, and AI production tools. The strongest opportunities are B2B — tools that help creators and media companies run like businesses.",
    insights: [
      "AI production tools (editing, localization, clip generation) are the fastest-adopted category among creators.",
      "Direct monetization (memberships, tipping, licensing) is growing faster than ad revenue.",
      "Brands are shifting budgets to creator-led campaigns; measurement tooling lags the spend.",
      "The long tail is underserved: most tooling targets the top 1% of creators.",
    ],
    growthNote:
      "Creator-tool funding is modest but steady, with AI production capturing the majority of new deals.",
    sentimentBase: 44,
    pricingPoints: [
      "Free tier with watermark/limits, paid for exports and commercial rights — the standard creator motion.",
      "Creator budgets are small but price-insensitive within reason; anchor under $30/mo.",
      "Revenue-share (take % of membership or licensing revenue) aligns with outcomes.",
    ],
    risks: [
      {
        risk: "Platform dependency (algorithm changes)",
        severity: "High",
        mitigation: "Own the audience relationship (email, membership) and stay platform-agnostic.",
      },
      {
        risk: "Low willingness to pay in the long tail",
        severity: "Medium",
        mitigation: "Serve the professional middle: creators making $10k+/mo.",
      },
      {
        risk: "Rapid AI tool commoditization",
        severity: "Medium",
        mitigation: "Differentiate with distribution, workflow, and rights management.",
      },
    ],
    startupIdeas: [
      {
        name: "ClipForge",
        thesis: "AI video-clip generator that turns long-form content into platform-native shorts.",
        whyNow: "Every creator needs 10x clips per episode; manual editing doesn't scale.",
      },
      {
        name: "Fanbase",
        thesis: "Membership and licensing back-office for mid-tier creators (billing, tax, merch).",
        whyNow: "Creators outgrow Patreon but can't afford enterprise platforms.",
      },
      {
        name: "BrandMatch",
        thesis: "Creator-brand matching with predictive campaign performance.",
        whyNow: "Brand spend is shifting to creators while measurement remains manual.",
      },
    ],
    competitors: ["Canva", "Jasper", "Notion"],
    baseScores: { growth: 64, competition: 42, funding: 40, hiring: 36, developer: 30, community: 62 },
    tags: ["AI production", "memberships", "monetization", "creator tools"],
  },
];

export const GENERIC_INDUSTRY: IndustryData = {
  id: "startup-ecosystem",
  label: "Startup Ecosystem",
  emoji: "🚀",
  summary:
    "The startup ecosystem is rotating from speculative bets toward durable, revenue-backed software. Founders who pair a real workflow wedge with AI leverage are outperforming, while investors reward capital-efficient growth and clear unit economics.",
  insights: [
    "The market is rewarding capital-efficient, revenue-backed growth over raw usage metrics.",
    "AI-native workflows are the common thread across the fastest-growing new products this quarter.",
    "Early-stage hiring is concentrated in engineering and go-to-market — a signal of products reaching real customers.",
    "Buyers are consolidating tools, which favors products that own a workflow end to end.",
  ],
  growthNote:
    "Aggregate signal across funding, hiring, and developer activity shows a healthy, selective expansion.",
  sentimentBase: 36,
  pricingPoints: [
    "Anchor pricing to the measurable outcome you replace (headcount, hours, or fees).",
    "Offer a generous free tier to establish trust, then monetize teams and enterprise controls.",
    "Annual prepay with clear value tiers beats complex usage math for early customers.",
  ],
  risks: [
    {
      risk: "Crowded horizontal categories",
      severity: "Medium",
      mitigation: "Choose a specific workflow or vertical and go deep before going wide.",
    },
    {
      risk: "Short attention from buyers and investors",
      severity: "Medium",
      mitigation: "Lead with a crisp wedge and measurable early ROI.",
    },
    {
      risk: "Fast-moving competitive landscape",
      severity: "Low",
      mitigation: "Ship weekly, talk to customers daily, and keep the roadmap public.",
    },
  ],
  startupIdeas: [
    {
      name: "InsightForge",
      thesis: "Self-serve market-research agents for indie founders validating ideas in days, not months.",
      whyNow: "Research remains the slowest, least-automated step in the founder journey.",
    },
    {
      name: "Watchlist",
      thesis: "Competitor and pricing monitoring for small product teams that can't afford analysts.",
      whyNow: "Pricing changes and feature launches move fast; teams track them manually today.",
    },
    {
      name: "EcosystemPulse",
      thesis: "A daily intelligence digest for startup communities, aggregated from public signals.",
      whyNow: "Founders and investors both want the same briefing; nobody delivers it well.",
    },
  ],
  competitors: ["Notion", "Linear", "Supabase"],
  baseScores: { growth: 72, competition: 50, funding: 68, hiring: 58, developer: 60, community: 64 },
  tags: ["startups", "markets", "intelligence", "research"],
};

/* ---------------- Company profiles ---------------- */

export interface CompanyProfile {
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
}

export const COMPANY_PROFILES: Record<string, CompanyProfile> = {
  OpenAI: {
    name: "OpenAI",
    industry: "AI / Machine Learning",
    website: "openai.com",
    tagline: "Creating safe AGI that benefits all of humanity",
    description:
      "The frontier-model leader. OpenAI's API, ChatGPT, and enterprise offerings define the default stack for AI product builders, and its developer ecosystem is the largest in the category.",
    founded: 2015,
    funding: "$10B+ raised (Microsoft partnership)",
    totalRaised: "$20B+",
    employees: "3,000+",
    pricing: "API: usage-based (per token). ChatGPT Plus at $20/mo, Teams at $25–30/user/mo, Enterprise custom.",
    pricingPoints: [
      "Usage-based API pricing with tiered volume discounts.",
      "Consumer subscription at $20/mo is a category benchmark.",
      "Enterprise is custom-priced with security and compliance add-ons.",
    ],
    launches: [
      { name: "GPT-5 family", date: daysAgo(90), summary: "Next-gen frontier models with improved reasoning and tool use across the API and ChatGPT." },
      { name: "ChatGPT Enterprise agents", date: daysAgo(45), summary: "Managed autonomous agents for enterprise workflows with governance controls." },
      { name: "Realtime API GA", date: daysAgo(120), summary: "Production-grade low-latency speech-to-speech API." },
    ],
    hiring: {
      roles: ["Research scientist", "Applied AI engineer", "Security engineer", "Product manager"],
      trend: "Expanding",
      count: 240,
    },
    github: { stars: "150k+", repos: 180, activity: "Very high", topRepo: "openai/openai-python" },
    reddit: { mentions: 4200, sentiment: 62, topics: ["API pricing", "model quality", "agents", "enterprise adoption"] },
    productHunt: { launches: 14, avgUpvotes: 3100, presence: "Strong launch presence for consumer products" },
    strengths: [
      "Unmatched model quality and brand trust",
      "Massive developer ecosystem and mindshare",
      "Deep enterprise distribution via Microsoft",
      "Vertical integration from chips to apps",
    ],
    weaknesses: [
      "API pricing is a high bar for startups to match on margin",
      "Platform risk: roadmap changes can break downstream products",
      "Enterprise sales motions still maturing relative to model leadership",
    ],
    comparison:
      "Against OpenAI, a startup's edge is speed and focus: OpenAI serves the platform, not your vertical. Products that wrap its models with proprietary data, vertical workflows, and domain trust can coexist profitably — as long as the moat is the workflow, not the model.",
  },
  Anthropic: {
    name: "Anthropic",
    industry: "AI / Machine Learning",
    website: "anthropic.com",
    tagline: "AI research company building safe, interpretable systems",
    description:
      "Claude's maker. Anthropic competes on safety, long-context reasoning, and developer ergonomics, with a strong enterprise and coding-adjacent following.",
    founded: 2021,
    funding: "$10B+ raised (Amazon, Google)",
    totalRaised: "$15B+",
    employees: "1,200+",
    pricing: "API: usage-based per token. Claude Pro at $20/mo, Max at $100–200/mo, Enterprise custom.",
    pricingPoints: [
      "Competitive per-token API pricing with long-context discounts.",
      "Consumer Pro at $20/mo; Max tiers for heavy users.",
      "Enterprise custom pricing with MCP and tool-use focus.",
    ],
    launches: [
      { name: "Claude Code GA", date: daysAgo(60), summary: "Terminal-native coding agent with strong long-task autonomy." },
      { name: "MCP expansion", date: daysAgo(75), summary: "Model Context Protocol ecosystem growth across enterprise tools." },
      { name: "Opus reasoning update", date: daysAgo(30), summary: "Improved multi-step reasoning and tool orchestration." },
    ],
    hiring: {
      roles: ["Research engineer", "Safety researcher", "Go-to-market lead", "Solutions architect"],
      trend: "Expanding",
      count: 180,
    },
    github: { stars: "90k+", repos: 120, activity: "High", topRepo: "anthropics/claude-code" },
    reddit: { mentions: 3100, sentiment: 68, topics: ["Claude Code", "long context", "MCP", "coding agents"] },
    productHunt: { launches: 9, avgUpvotes: 2400, presence: "Strong for developer-facing launches" },
    strengths: [
      "Perceived leadership in safety and trust",
      "Long-context and coding-agent strength",
      "Strong developer sentiment and MCP ecosystem momentum",
    ],
    weaknesses: [
      "Smaller consumer brand than ChatGPT",
      "Fewer enterprise integrations than the incumbent stack",
      "Capacity and pricing constraints during peak demand",
    ],
    comparison:
      "Anthropic's distribution is developer-first. A startup can win by building the best vertical experience on Claude while avoiding direct model competition — Anthropic will happily power products that make Claude indispensable in a specific domain.",
  },
  Notion: {
    name: "Notion",
    industry: "B2B SaaS / Productivity",
    website: "notion.so",
    tagline: "One workspace. Every team, every project.",
    description:
      "The all-in-one workspace for docs, wikis, and project management. Notion's flexible block model made it the default knowledge tool for startups, and its AI layer is expanding the surface area into writing and search.",
    founded: 2013,
    funding: "$340M Series C (Coatue, Sequoia)",
    totalRaised: "$343M",
    employees: "600+",
    pricing: "Free for personal; Plus $10/user/mo; Business $15–20/user/mo; Enterprise custom. AI add-on per member.",
    pricingPoints: [
      "Freemium with a genuinely generous free tier.",
      "Per-seat tiers with AI as an add-on.",
      "Enterprise custom with SSO and admin controls.",
    ],
    launches: [
      { name: "Notion AI agents", date: daysAgo(50), summary: "Autonomous workflows that draft, summarize, and route content." },
      { name: "Notion Sites", date: daysAgo(100), summary: "Publish any workspace as a fast, branded public site." },
      { name: "Forms", date: daysAgo(140), summary: "Native forms with responses flowing into databases." },
    ],
    hiring: {
      roles: ["Product engineer", "AI research engineer", "Growth marketer", "Customer success"],
      trend: "Expanding",
      count: 90,
    },
    github: { stars: "12k+", repos: 40, activity: "Low", topRepo: "makenotion/notion-sdk-js" },
    reddit: { mentions: 1900, sentiment: 72, topics: ["templates", "AI", "workspace setup", "price changes"] },
    productHunt: { launches: 22, avgUpvotes: 1500, presence: "Consistent, well-executed launch presence" },
    strengths: [
      "Best-in-class flexibility and ecosystem of templates",
      "Loyal community and viral template sharing",
      "Strong brand among startups and knowledge workers",
    ],
    weaknesses: [
      "Generalist positioning is exposed to vertical point solutions",
      "AI features are incremental rather than deeply differentiated",
      "Performance at scale remains a recurring complaint",
    ],
    comparison:
      "Notion wins the generalist workspace. A startup should not compete there; instead, target a workflow Notion is too generic to own — for example, research briefs, competitive intelligence, or market reports — and integrate with Notion rather than replacing it.",
  },
  Linear: {
    name: "Linear",
    industry: "Developer Tools",
    website: "linear.app",
    tagline: "The issue tracking tool you'll enjoy using",
    description:
      "The design-forward issue tracker beloved by product and engineering teams. Linear is the benchmark for speed, keyboard-first UX, and polish in the dev-tools category.",
    founded: 2019,
    funding: "$35M Series B (Accel, Sequoia)",
    totalRaised: "$48M",
    employees: "100+",
    pricing: "Free up to 250 issues; Starter $8/user/mo; Business $14/user/mo; Enterprise custom.",
    pricingPoints: [
      "Free tier with a hard issue cap (not time-limited) is a clever wedge.",
      "Per-seat pricing with generous trial.",
      "Enterprise tier for SAML, audit logs, and support SLAs.",
    ],
    launches: [
      { name: "Linear AI Agents", date: daysAgo(40), summary: "Autonomous triage, sprint planning, and cleanup agents." },
      { name: "Projects 2.0", date: daysAgo(110), summary: "Program-level planning with roadmap visualization." },
      { name: "Integrations hub", date: daysAgo(160), summary: "Deeper GitHub, Slack, and Figma integrations." },
    ],
    hiring: {
      roles: ["Senior product engineer", "Design engineer", "Platform engineer"],
      trend: "Expanding",
      count: 40,
    },
    github: { stars: "10k+", repos: 25, activity: "Moderate", topRepo: "linearapp/linear" },
    reddit: { mentions: 700, sentiment: 78, topics: ["speed", "keyboard shortcuts", "design", "sprint planning"] },
    productHunt: { launches: 12, avgUpvotes: 1800, presence: "Strong, design-led launches" },
    strengths: [
      "Category benchmark for speed and polish",
      "High developer sentiment and evangelism",
      "Disciplined, opinionated product scope",
    ],
    weaknesses: [
      "Narrow surface area — issue tracking only",
      "Pricing above some budget-conscious SMBs",
      "Feature parity gaps with Jira's ecosystem",
    ],
    comparison:
      "Linear proves a small team can out-execute giants on craft. The lesson for a founder: pick a hated workflow, obsess over speed and polish, and let the product speak for itself. Direct competition with Linear is hard; adjacent workflows (review, testing, release) are open.",
  },
  Stripe: {
    name: "Stripe",
    industry: "Fintech / Financial Infrastructure",
    website: "stripe.com",
    tagline: "Financial infrastructure for the internet",
    description:
      "The default payments and financial infrastructure for internet businesses. Stripe owns the developer experience in fintech and is expanding into billing, treasury, and AI-powered finance ops.",
    founded: 2010,
    funding: "$8.7B raised, $95B valuation",
    totalRaised: "$8.7B",
    employees: "8,000+",
    pricing: "Standard: 2.9% + $0.30 per successful card charge; volume discounts for large platforms; custom for enterprise.",
    pricingPoints: [
      "Interchange-plus transparency for high volume.",
      "Per-transaction pricing scales naturally with usage.",
      "Platform and marketplace pricing via Connect.",
    ],
    launches: [
      { name: "Stripe Treasury expansions", date: daysAgo(55), summary: "Embedded finance rails for platforms and marketplaces." },
      { name: "AI revenue features", date: daysAgo(85), summary: "Revenue intelligence and forecasting powered by AI." },
      { name: "Global payments upgrades", date: daysAgo(130), summary: "Improved local payment methods and FX pricing." },
    ],
    hiring: {
      roles: ["Software engineer", "Solutions architect", "Risk analyst", "Product manager"],
      trend: "Expanding",
      count: 300,
    },
    github: { stars: "24k+", repos: 110, activity: "Moderate", topRepo: "stripe/stripe-python" },
    reddit: { mentions: 1500, sentiment: 55, topics: ["fees", "payout delays", "platform accounts", "API quality"] },
    productHunt: { launches: 10, avgUpvotes: 900, presence: "Occasional, developer-focused launches" },
    strengths: [
      "Best-in-class developer experience and docs",
      "Deep platform ecosystem and brand trust",
      "Aggressive expansion into billing, banking, and AI finance",
    ],
    weaknesses: [
      "Pricing above some high-risk or micro-transaction businesses",
      "Support responsiveness complaints at scale",
      "Platform risk for products built purely on Stripe rails",
    ],
    comparison:
      "Stripe is infrastructure, not an application. Startups win by building applications on top — vertical fintech workflows, treasury automation, or AI finance ops — where Stripe's rails create a moat rather than a competitor. Don't fight the rails; ride them.",
  },
  Figma: {
    name: "Figma",
    industry: "Developer Tools / Design",
    website: "figma.com",
    tagline: "Nothing great is made alone",
    description:
      "The collaborative design tool that replaced the design-to-handoff pipeline. Figma's browser-native collaboration and plugin ecosystem define modern product design workflows.",
    founded: 2012,
    funding: "$330M raised, $20B valuation",
    totalRaised: "$333M",
    employees: "1,800+",
    pricing: "Starter free; Professional $15/editor/mo; Organization $45/editor/mo; Enterprise custom.",
    pricingPoints: [
      "Per-editor pricing with free viewers — the collaboration wedge.",
      "Tiered by governance and design-system needs.",
      "Enterprise custom with SSO, audit, and support.",
    ],
    launches: [
      { name: "Figma AI design features", date: daysAgo(35), summary: "AI-assisted layout, prototyping, and asset generation." },
      { name: "Figma Slides", date: daysAgo(120), summary: "Native presentation tool integrated with design files." },
      { name: "Dev Mode upgrades", date: daysAgo(150), summary: "Faster handoff with AI-generated code snippets." },
    ],
    hiring: {
      roles: ["Design engineer", "Platform engineer", "AI researcher", "Enterprise AE"],
      trend: "Expanding",
      count: 120,
    },
    github: { stars: "6k+", repos: 30, activity: "Low", topRepo: "figma/plugin-samples" },
    reddit: { mentions: 1100, sentiment: 66, topics: ["AI features", "pricing", "Dev Mode", "alternatives"] },
    productHunt: { launches: 8, avgUpvotes: 1600, presence: "Selective, high-impact launches" },
    strengths: [
      "Category-defining collaboration model",
      "Deep plugin ecosystem and community",
      "Strong enterprise design-systems positioning",
    ],
    weaknesses: [
      "Per-editor pricing stings large teams",
      "AI features arrived later than some competitors",
      "Design-tool market is being commoditized by AI generation",
    ],
    comparison:
      "Figma owns design collaboration; the frontier is AI-native design where generation meets collaboration. Startups can attack the workflow after design — asset management, design-to-code QA, or brand governance — or build for the AI-generation-first designer that Figma's model is slower to serve.",
  },
  Vercel: {
    name: "Vercel",
    industry: "Developer Tools",
    website: "vercel.com",
    tagline: "Develop. Preview. Ship. The platform for frontend developers.",
    description:
      "The frontend cloud and creator of Next.js. Vercel owns the modern web-app deployment workflow and is extending into AI infrastructure with v0 and AI Gateway.",
    founded: 2015,
    funding: "$350M raised, $3.25B valuation",
    totalRaised: "$350M",
    employees: "500+",
    pricing: "Hobby free; Pro $20/mo; Enterprise custom with SLAs and dedicated infrastructure.",
    pricingPoints: [
      "Generous free tier with usage limits.",
      "Flat Pro tier plus usage-based overage.",
      "Enterprise custom — the growth engine.",
    ],
    launches: [
      { name: "v0 AI app builder", date: daysAgo(25), summary: "Prompt-to-React app generation with deployment in one click." },
      { name: "AI Gateway GA", date: daysAgo(70), summary: "Unified, cost-optimized gateway for LLM API calls." },
      { name: "Next.js 16", date: daysAgo(95), summary: "Major framework release with faster builds and new caching." },
    ],
    hiring: {
      roles: ["Framework engineer", "Edge engineer", "Developer advocate", "Product manager"],
      trend: "Expanding",
      count: 80,
    },
    github: { stars: "130k+", repos: 90, activity: "Very high", topRepo: "vercel/next.js" },
    reddit: { mentions: 1300, sentiment: 60, topics: ["Next.js", "pricing", "v0", "edge functions"] },
    productHunt: { launches: 18, avgUpvotes: 2100, presence: "Strong developer-facing launches" },
    strengths: [
      "Next.js ecosystem ownership",
      "Best-in-class developer experience",
      "AI-native developer tools (v0) with real adoption",
    ],
    weaknesses: [
      "Pricing complexity and overage surprise complaints",
      "Lock-in concerns for non-Next.js stacks",
      "Competition from cloud giants bundling frontend hosting",
    ],
    comparison:
      "Vercel's gravity is the React/Next.js developer. A startup can build on Vercel's rails (hosting, gateway) while owning a workflow they don't — for example, frontend monitoring, release intelligence, or AI testing. Adjacent tooling benefits from their distribution.",
  },
  Supabase: {
    name: "Supabase",
    industry: "Developer Tools",
    website: "supabase.com",
    tagline: "The open source Firebase alternative",
    description:
      "The open-source backend platform combining Postgres, auth, storage, and edge functions. Supabase is the default choice for indie hackers and startups that want Postgres with Firebase-style DX.",
    founded: 2020,
    funding: "$116M Series C (Coatue, Felicis)",
    totalRaised: "$116M",
    employees: "130+",
    pricing: "Free tier with 500MB DB; Pro $25/mo; Team $599/mo; Enterprise custom.",
    pricingPoints: [
      "Beloved free tier — the acquisition engine.",
      "Flat Pro pricing with generous limits.",
      "Team tier at a premium for larger teams.",
    ],
    launches: [
      { name: "Supabase AI assistant", date: daysAgo(30), summary: "In-product AI for schema design and debugging." },
      { name: "Edge Functions GA improvements", date: daysAgo(80), summary: "Lower latency and better DX for serverless compute." },
      { name: "Branching", date: daysAgo(160), summary: "Database branching for safe preview environments." },
    ],
    hiring: {
      roles: ["Database engineer", "Platform engineer", "Developer advocate", "Support engineer"],
      trend: "Expanding",
      count: 50,
    },
    github: { stars: "80k+", repos: 60, activity: "Very high", topRepo: "supabase/supabase" },
    reddit: { mentions: 1600, sentiment: 74, topics: ["Postgres", "free tier", "self-hosting", "edge functions"] },
    productHunt: { launches: 20, avgUpvotes: 1900, presence: "Very strong open-source launches" },
    strengths: [
      "Open-source trust and huge community",
      "Postgres compatibility — no lock-in fear",
      "Generous free tier driving virality",
    ],
    weaknesses: [
      "Scaling costs at high volume",
      "Support quality variability at free tier",
      "Feature depth behind cloud rivals in some areas",
    ],
    comparison:
      "Supabase shows the power of open-source wedge + generous free tier. Competitors differentiate on depth (self-hosting, compliance, performance at scale) or by serving the specific segments Supabase's horizontal product ignores.",
  },
  Jasper: {
    name: "Jasper",
    industry: "AI / Content",
    website: "jasper.ai",
    tagline: "AI copilot for enterprise marketing teams",
    description:
      "The early generative-AI writing platform that pivoted from consumer to enterprise brand marketing. Jasper owns brand voice, workflow templates, and marketing-team governance.",
    founded: 2021,
    funding: "$125M Series A, $1.5B valuation",
    totalRaised: "$131M",
    employees: "150+",
    pricing: "Creator $39/mo; Pro $59/user/mo; Business custom.",
    pricingPoints: [
      "Per-seat professional pricing above consumer tools.",
      "Brand voice and governance as premium differentiators.",
      "Enterprise custom with security and integrations.",
    ],
    launches: [
      { name: "Jasper Brand Voice 2.0", date: daysAgo(45), summary: "Deeper brand-voice training with style guides." },
      { name: "Campaign workflows", date: daysAgo(100), summary: "End-to-end campaign generation with approvals." },
      { name: "Agentic content ops", date: daysAgo(150), summary: "Autonomous drafting pipelines for content calendars." },
    ],
    hiring: {
      roles: ["ML engineer", "Enterprise AE", "Customer success", "Content strategist"],
      trend: "Steady",
      count: 25,
    },
    github: { stars: "1k+", repos: 8, activity: "Low", topRepo: "Jasper-ai/jasper" },
    reddit: { mentions: 300, sentiment: 42, topics: ["pricing", "alternatives", "enterprise", "quality"] },
    productHunt: { launches: 11, avgUpvotes: 1100, presence: "Moderate; stronger in its early consumer phase" },
    strengths: [
      "First-mover brand in AI writing",
      "Enterprise governance and brand voice",
      "Deep marketing-workflow templates",
    ],
    weaknesses: [
      "Commodity core (LLM writing) with thin moat",
      "Higher price than competitors without clear ROI proof",
      "Developer ecosystem limited compared to API-first rivals",
    ],
    comparison:
      "Jasper illustrates the risk of a thin wrapper: its enterprise pivot was a survival move. Founders should note the lesson — own the workflow, data, or distribution, or the model upgrade cycle will commoditize you. Competitors win with vertical depth and measurable ROI.",
  },
  "Copy.ai": {
    name: "Copy.ai",
    industry: "AI / GTM",
    website: "copy.ai",
    tagline: "AI-powered GTM platform for revenue teams",
    description:
      "Started as an AI copywriting tool, pivoted into go-to-market automation: sales prospecting, enrichment, and pipeline workflows powered by AI agents.",
    founded: 2020,
    funding: "$14M Series A (Sequoia)",
    totalRaised: "$14M",
    employees: "60+",
    pricing: "Free; Starter $49/mo; Advanced $249/mo; Enterprise custom.",
    pricingPoints: [
      "Usage-based workflow credits on top of seats.",
      "Land with free tier, expand with automation credits.",
      "Enterprise custom with integrations and support.",
    ],
    launches: [
      { name: "GTM Agents", date: daysAgo(60), summary: "Autonomous prospecting and outreach agents." },
      { name: "Prospecting Workflows", date: daysAgo(130), summary: "Enrichment + personalized outreach pipelines." },
      { name: "Pricing intelligence", date: daysAgo(200), summary: "Competitor pricing tracking for sales teams." },
    ],
    hiring: {
      roles: ["Backend engineer", "GTM engineer", "Customer success", "Product designer"],
      trend: "Expanding",
      count: 20,
    },
    github: { stars: "2k+", repos: 12, activity: "Low", topRepo: "copy-ai/copyai" },
    reddit: { mentions: 220, sentiment: 48, topics: ["pricing", "outreach quality", "alternatives"] },
    productHunt: { launches: 15, avgUpvotes: 1200, presence: "Good launch discipline, especially for workflow features" },
    strengths: [
      "Successful pivot from content to GTM workflows",
      "Agent-based automation is differentiated",
      "Affordable entry point for SMB sales teams",
    ],
    weaknesses: [
      "Young in the GTM category against incumbents",
      "Data quality dependence for enrichment",
      "Perceived as niche outside sales teams",
    ],
    comparison:
      "Copy.ai's pivot is a case study in finding product-market fit through workflow. For a founder, the lesson: follow the buyer's pain, not the trend. Its pricing-intelligence feature shows the demand for exactly what SignalForge-style products do — tracking competitors and pricing automatically.",
  },
  Ramp: {
    name: "Ramp",
    industry: "Fintech / Spend Management",
    website: "ramp.com",
    tagline: "Corporate cards and spend management that save you time and money",
    description:
      "The finance automation platform for modern companies: corporate cards, expense management, bill pay, and now AI-powered accounting. Ramp is the fastest-growing fintech for SMB-to-midmarket finance teams.",
    founded: 2019,
    funding: "$1.5B+ raised, $8B+ valuation",
    totalRaised: "$1.5B+",
    employees: "1,000+",
    pricing: "Free for most features; Plus $15/user/mo; Enterprise custom. Interchange-funded model.",
    pricingPoints: [
      "Free core product funded by interchange — a powerful wedge.",
      "Paid tiers for controls, accounting automation, and AI.",
      "Enterprise custom with dedicated finance support.",
    ],
    launches: [
      { name: "Ramp Intelligence", date: daysAgo(40), summary: "AI finance copilot that answers questions about spend in plain English." },
      { name: "Accounting automation", date: daysAgo(90), summary: "Automated GL sync and close workflows." },
      { name: "Ramp Bill Pay expansion", date: daysAgo(150), summary: "International payments and cash-back optimization." },
    ],
    hiring: {
      roles: ["Software engineer", "Finance product manager", "Enterprise AE", "Risk analyst"],
      trend: "Expanding",
      count: 150,
    },
    github: { stars: "5k+", repos: 20, activity: "Low", topRepo: "RampHQ/ramp" },
    reddit: { mentions: 500, sentiment: 58, topics: ["rewards", "limits", "support", "accounting"] },
    productHunt: { launches: 9, avgUpvotes: 1400, presence: "Good launches, finance-forward messaging" },
    strengths: [
      "Free wedge + expansion revenue model",
      "AI-native finance features (Ramp Intelligence)",
      "Rapid enterprise motion and strong brand",
    ],
    weaknesses: [
      "Interchange model limits target market (needs card spend)",
      "Support scaling pains reported at mid-market",
      "Accounting depth behind dedicated ERPs for complex orgs",
    ],
    comparison:
      "Ramp's free-plus-interchange model shows how to win with a wedge that removes friction. Competitors differentiate on vertical finance depth, accounting automation for specific industries, or serving markets (non-US, non-card businesses) Ramp under-serves.",
  },
  Intercom: {
    name: "Intercom",
    industry: "B2B SaaS / Support",
    website: "intercom.com",
    tagline: "The AI customer service platform",
    description:
      "The customer service and messaging platform for B2B SaaS. Intercom is leading the shift from support tickets to AI agents with Fin, its AI support agent, and maintains the strongest brand in product-led support.",
    founded: 2011,
    funding: "$240M raised, $12.7B valuation",
    totalRaised: "$240M",
    employees: "1,300+",
    pricing: "Essential $29/seat/mo; Advanced $85/seat/mo; Expert $132/seat/mo; Fin AI priced per resolution.",
    pricingPoints: [
      "Per-seat tiers plus AI priced per resolution.",
      "Fin is a growth engine priced on outcomes.",
      "Enterprise custom with SSO and data residency.",
    ],
    launches: [
      { name: "Fin 3", date: daysAgo(50), summary: "AI agent with deeper tool use and multi-channel memory." },
      { name: "Copilot inbox", date: daysAgo(100), summary: "AI-assisted human replies for support teams." },
      { name: "Workflows automation", date: daysAgo(160), summary: "Visual automation builder across channels." },
    ],
    hiring: {
      roles: ["AI engineer", "Product manager", "Enterprise AE", "Customer success"],
      trend: "Expanding",
      count: 110,
    },
    github: { stars: "8k+", repos: 35, activity: "Low", topRepo: "intercom/intercom-node" },
    reddit: { mentions: 600, sentiment: 50, topics: ["pricing", "Fin", "ticket deflection", "alternatives"] },
    productHunt: { launches: 16, avgUpvotes: 1000, presence: "Consistent launches for AI features" },
    strengths: [
      "Strongest brand in B2B support",
      "Fin AI agent is category-leading on resolution",
      "Product-led growth with broad SMB adoption",
    ],
    weaknesses: [
      "Premium pricing vs newer AI-native rivals",
      "Per-resolution AI pricing can surprise high-volume teams",
      "Complexity for small support teams",
    ],
    comparison:
      "Intercom validates outcome-based AI pricing (per resolution). A startup can compete by targeting niches Intercom's generalist model under-serves — vertical support (healthcare, fintech) with domain-aware agents, or simpler/cheaper AI-native support for SMBs.",
  },
  Canva: {
    name: "Canva",
    industry: "Creator Economy / Design",
    website: "canva.com",
    tagline: "Empowering the world to design",
    description:
      "The design platform for non-designers. Canva's freemium model, template ecosystem, and AI features (Magic Studio) make it the default design tool for marketing teams and creators.",
    founded: 2013,
    funding: "$560M raised, $26B valuation",
    totalRaised: "$560M",
    employees: "3,000+",
    pricing: "Free; Pro $12.99/mo; Teams $10/user/mo; Enterprise custom.",
    pricingPoints: [
      "Freemium with a massive free tier.",
      "Pro at consumer-friendly pricing.",
      "Teams and enterprise for governance and brand kits.",
    ],
    launches: [
      { name: "Magic Studio expansion", date: daysAgo(35), summary: "AI design generation, magic resize, and brand voice." },
      { name: "Canva Sites", date: daysAgo(110), summary: "One-click publishing of designs as websites." },
      { name: "Workplace suite", date: daysAgo(170), summary: "Docs, whiteboards, and presentations in one workspace." },
    ],
    hiring: {
      roles: ["Software engineer", "AI researcher", "Product designer", "Enterprise AE"],
      trend: "Expanding",
      count: 200,
    },
    github: { stars: "4k+", repos: 20, activity: "Low", topRepo: "canva/canva-api" },
    reddit: { mentions: 900, sentiment: 64, topics: ["templates", "AI features", "pricing", "Pro value"] },
    productHunt: { launches: 19, avgUpvotes: 1500, presence: "Strong consumer launches" },
    strengths: [
      "Massive consumer brand and free-tier moat",
      "AI features democratizing design further",
      "Workplace expansion into docs and presentations",
    ],
    weaknesses: [
      "Perceived as shallow for professional design",
      "Enterprise governance still maturing",
      "AI commoditization pressure on design value",
    ],
    comparison:
      "Canva owns democratized design. Startups win by going deeper in a vertical design workflow (brand operations, print production, social scheduling for agencies) or by building AI tools for the professional tier Canva doesn't fully serve.",
  },
  Shopify: {
    name: "Shopify",
    industry: "E-commerce / Commerce",
    website: "shopify.com",
    tagline: "The commerce platform for all",
    description:
      "The operating system for independent commerce: storefronts, payments, logistics, and an enormous app ecosystem. Shopify's AI (Sidekick) is pushing into merchant operations and merchandising.",
    founded: 2006,
    funding: "Public company (~$70B market cap)",
    totalRaised: "Public",
    employees: "8,000+",
    pricing: "Basic $29/mo; Shopify $79/mo; Advanced $299/mo; Plus from $2,300/mo.",
    pricingPoints: [
      "Tiered monthly plans plus transaction fees.",
      "App ecosystem adds variable spend.",
      "Plus/Enterprise for high-volume merchants.",
    ],
    launches: [
      { name: "Shopify Sidekick", date: daysAgo(45), summary: "AI merchant assistant for store operations and merchandising." },
      { name: "Shopify Magic", date: daysAgo(120), summary: "AI product descriptions, images, and replies." },
      { name: "Unified commerce expansion", date: daysAgo(180), summary: "POS and online commerce with unified inventory." },
    ],
    hiring: {
      roles: ["Software engineer", "AI engineer", "Merchant success", "Data scientist"],
      trend: "Expanding",
      count: 180,
    },
    github: { stars: "12k+", repos: 60, activity: "Moderate", topRepo: "Shopify/shopify-app-template" },
    reddit: { mentions: 1800, sentiment: 45, topics: ["fees", "apps", "POS", "migration"] },
    productHunt: { launches: 14, avgUpvotes: 1200, presence: "Merchant-focused launches" },
    strengths: [
      "Category-defining platform with massive ecosystem",
      "AI features now native across the stack",
      "Global reach with local payment methods",
    ],
    weaknesses: [
      "Transaction fees and app costs add up",
      "Merchant support quality varies",
      "Platform changes create dependency risk for apps",
    ],
    comparison:
      "Shopify is the ecosystem to build on, not against. The winning pattern is Shopify apps that own a workflow (merchandising AI, returns, pricing) with distribution through the app store — the same rails that made multi-billion-dollar apps possible.",
  },
  GitHub: {
    name: "GitHub",
    industry: "Developer Tools",
    website: "github.com",
    tagline: "Where the world builds software",
    description:
      "The home of open source and the default code-hosting platform. GitHub's Copilot and Actions make it the distribution layer for developer tools and a primary source of developer-intent signals.",
    founded: 2008,
    funding: "Acquired by Microsoft ($7.5B)",
    totalRaised: "Acquired",
    employees: "2,000+",
    pricing: "Free; Team $4/user/mo; Enterprise $21/user/mo; Copilot from $10/user/mo.",
    pricingPoints: [
      "Free for public/open source.",
      "Per-seat team and enterprise tiers.",
      "Copilot as a separate per-seat product.",
    ],
    launches: [
      { name: "Copilot agent mode", date: daysAgo(30), summary: "Autonomous coding agent integrated into the editor." },
      { name: "GitHub Models", date: daysAgo(80), summary: "In-platform access to frontier models for prototyping." },
      { name: "Enterprise security", date: daysAgo(140), summary: "Deeper supply-chain and secret scanning." },
    ],
    hiring: {
      roles: ["Software engineer", "Security engineer", "Developer advocate", "Product manager"],
      trend: "Expanding",
      count: 150,
    },
    github: { stars: "350k+", repos: 400, activity: "Very high", topRepo: "github/docs" },
    reddit: { mentions: 2600, sentiment: 52, topics: ["Copilot", "pricing", "Actions", "alternatives"] },
    productHunt: { launches: 12, avgUpvotes: 1300, presence: "Occasional platform launches" },
    strengths: [
      "Distribution moat: everyone builds there",
      "Copilot adoption and AI roadmap",
      "Actions/CI ecosystem lock-in",
    ],
    weaknesses: [
      "Enterprise pricing pressure from rivals",
      "Copilot quality debates in developer communities",
      "Innovation velocity slower than startup rivals",
    ],
    comparison:
      "GitHub is the signal source and the distribution platform. For SignalForge-style products, GitHub activity is core evidence — stars, issues, and commits are leading indicators of developer demand that public markets haven't fully priced.",
  },
};

/* ---------------- Live-source feeds ---------------- */

export interface FundingEvent {
  company: string;
  industry: string;
  amount: string;
  round: string;
  investors: string[];
  headline: string;
  ago: string;
}

export const FUNDING_EVENTS: FundingEvent[] = [
  {
    company: "Meridian Robotics",
    industry: "Robotics",
    amount: "$120M",
    round: "Series C",
    investors: ["a16z", "Founders Fund"],
    headline: "Warehouse-automation startup closes $120M to scale its fleet-software layer",
    ago: daysAgo(1),
  },
  {
    company: "Clarity Health",
    industry: "Health Tech",
    amount: "$85M",
    round: "Series B",
    investors: ["Andreessen Horowitz", "GV"],
    headline: "AI prior-authorization platform raises $85M as providers chase revenue-cycle automation",
    ago: daysAgo(2),
  },
  {
    company: "Nimbus Data",
    industry: "AI Infrastructure",
    amount: "$210M",
    round: "Series D",
    investors: ["Sequoia", "Lightspeed"],
    headline: "AI data-infrastructure startup banks $210M to build for agent workloads",
    ago: daysAgo(2),
  },
  {
    company: "Loop Finance",
    industry: "Fintech",
    amount: "$54M",
    round: "Series A",
    investors: ["Index Ventures", "Bain Capital Ventures"],
    headline: "Treasury-automation fintech raises $54M for real-time reconciliation engine",
    ago: daysAgo(3),
  },
  {
    company: "GridPulse Energy",
    industry: "Climate",
    amount: "$42M",
    round: "Series A",
    investors: ["Lowercarbon", "Breakthrough Energy"],
    headline: "Grid-edge analytics startup raises $42M to serve community solar operators",
    ago: daysAgo(4),
  },
  {
    company: "PromptLayer AI",
    industry: "Developer Tools",
    amount: "$18M",
    round: "Seed",
    investors: ["Y Combinator", "Uncork Capital"],
    headline: "LLM observability tooling exits YC with an $18M seed as agent debugging explodes",
    ago: daysAgo(5),
  },
  {
    company: "SkillGauge",
    industry: "EdTech",
    amount: "$23M",
    round: "Series A",
    investors: ["Reach Capital", "Owl Ventures"],
    headline: "AI skills-assessment platform raises $23M to certify workforce capabilities",
    ago: daysAgo(6),
  },
  {
    company: "ChargeLogic",
    industry: "Climate",
    amount: "$31M",
    round: "Series B",
    investors: ["USV", "Climate Capital"],
    headline: "EV fleet-charging orchestrator raises $31M as commercial electrification accelerates",
    ago: daysAgo(7),
  },
  {
    company: "MarginMind",
    industry: "E-commerce",
    amount: "$12M",
    round: "Seed",
    investors: ["Bessemer", "Tiger Global"],
    headline: "Dynamic-pricing AI for independent merchants lands $12M seed",
    ago: daysAgo(8),
  },
  {
    company: "TriageAI",
    industry: "Cybersecurity",
    amount: "$47M",
    round: "Series B",
    investors: ["Accel", "CrowdStrike Falcon Fund"],
    headline: "Autonomous SOC triage startup raises $47M to fight alert fatigue",
    ago: daysAgo(9),
  },
  {
    company: "WardSync",
    industry: "Health Tech",
    amount: "$26M",
    round: "Series A",
    investors: ["General Catalyst", "Redpoint"],
    headline: "Hospital capacity-planning AI raises $26M amid nursing shortage",
    ago: daysAgo(10),
  },
  {
    company: "ReviewPilot",
    industry: "Developer Tools",
    amount: "$16M",
    round: "Series A",
    investors: ["Sequoia", "Y Combinator"],
    headline: "AI code-review agent raises $16M as PR queues become the #1 engineering bottleneck",
    ago: daysAgo(12),
  },
];

export interface ProductHuntLaunch {
  name: string;
  tagline: string;
  category: string;
  upvotes: number;
  comments: number;
  featured: boolean;
  ago: string;
}

export const PRODUCT_HUNT_LAUNCHES: ProductHuntLaunch[] = [
  {
    name: "SignalDesk",
    tagline: "AI revenue-ops copilot that forecasts and flags churn risk",
    category: "SaaS",
    upvotes: 1840,
    comments: 212,
    featured: true,
    ago: daysAgo(1),
  },
  {
    name: "Claude Code",
    tagline: "Terminal-native coding agent for long tasks",
    category: "Developer Tools",
    upvotes: 1420,
    comments: 186,
    featured: true,
    ago: daysAgo(2),
  },
  {
    name: "ClearAuth",
    tagline: "Autonomous prior-authorization assistant for providers",
    category: "Health Tech",
    upvotes: 980,
    comments: 104,
    featured: true,
    ago: daysAgo(3),
  },
  {
    name: "ClipForge",
    tagline: "Turn long-form video into platform-native shorts",
    category: "AI",
    upvotes: 1240,
    comments: 156,
    featured: true,
    ago: daysAgo(4),
  },
  {
    name: "DocketAI",
    tagline: "Matter-management copilot for small law firms",
    category: "Legal Tech",
    upvotes: 760,
    comments: 88,
    featured: false,
    ago: daysAgo(5),
  },
  {
    name: "TestForge",
    tagline: "Generative tests with a live coverage contract on every PR",
    category: "Developer Tools",
    upvotes: 890,
    comments: 121,
    featured: true,
    ago: daysAgo(6),
  },
  {
    name: "Ledgerly",
    tagline: "Real-time treasury reconciliation for startups",
    category: "Fintech",
    upvotes: 670,
    comments: 74,
    featured: false,
    ago: daysAgo(7),
  },
  {
    name: "ForgeOps",
    tagline: "AI ops copilot that turns alerts into action plans",
    category: "Developer Tools",
    upvotes: 1020,
    comments: 143,
    featured: true,
    ago: daysAgo(8),
  },
  {
    name: "Fanbase",
    tagline: "Membership back-office for mid-tier creators",
    category: "Creator Economy",
    upvotes: 540,
    comments: 61,
    featured: false,
    ago: daysAgo(9),
  },
  {
    name: "Shelfie",
    tagline: "AI merchandising copilot for independent stores",
    category: "E-commerce",
    upvotes: 610,
    comments: 70,
    featured: false,
    ago: daysAgo(10),
  },
];

export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stars: string;
  forks: string;
  growth: string;
  topic: string;
}

export const GITHUB_REPOS: GitHubRepo[] = [
  { name: "claude-code", description: "Terminal-native AI coding agent", language: "TypeScript", stars: "68k", forks: "5.4k", growth: "+142%", topic: "AI coding" },
  { name: "mcp-servers", description: "Model Context Protocol server registry", language: "Python", stars: "41k", forks: "4.2k", growth: "+98%", topic: "AI infra" },
  { name: "ollama", description: "Run open-weight LLMs locally", language: "Go", stars: "120k", forks: "9.6k", growth: "+54%", topic: "AI infra" },
  { name: "v0-cli", description: "Prompt-to-code interface for frontend generation", language: "TypeScript", stars: "9k", forks: "1.1k", growth: "+220%", topic: "AI coding" },
  { name: "autogen", description: "Multi-agent conversation framework", language: "Python", stars: "38k", forks: "5.5k", growth: "+31%", topic: "Agents" },
  { name: "litestream", description: "Continuous replication for SQLite", language: "Go", stars: "11k", forks: "412", growth: "+28%", topic: "Infra" },
  { name: "tauri", description: "Build smaller, faster, more secure desktop apps", language: "Rust", stars: "88k", forks: "2.7k", growth: "+22%", topic: "Desktop" },
  { name: "vectorize", description: "Managed vector search for AI apps", language: "TypeScript", stars: "7k", forks: "890", growth: "+165%", topic: "AI infra" },
  { name: "windmill", description: "Developer platform for workflow automation", language: "TypeScript", stars: "12k", forks: "1.2k", growth: "+18%", topic: "Automation" },
  { name: "zod", description: "TypeScript-first schema validation", language: "TypeScript", stars: "35k", forks: "1.3k", growth: "+12%", topic: "DX" },
];

export interface RedditThread {
  subreddit: string;
  title: string;
  upvotes: number;
  comments: number;
  sentiment: number;
  ago: string;
}

export const REDDIT_THREADS: RedditThread[] = [
  {
    subreddit: "r/SaaS",
    title: "We tracked 400 competitor pricing pages for a year — here's what actually changed",
    upvotes: 2840,
    comments: 412,
    sentiment: 74,
    ago: daysAgo(1),
  },
  {
    subreddit: "r/startups",
    title: "The prior-authorization problem is a $60B pain point and nobody's really fixing it",
    upvotes: 2210,
    comments: 388,
    sentiment: 66,
    ago: daysAgo(2),
  },
  {
    subreddit: "r/artificial",
    title: "Agentic AI is eating the 'research' category — tools like this are why",
    upvotes: 1980,
    comments: 254,
    sentiment: 58,
    ago: daysAgo(3),
  },
  {
    subreddit: "r/ProductManagement",
    title: "Unpopular opinion: most 'AI features' are just settings screens with a sparkle icon",
    upvotes: 5120,
    comments: 890,
    sentiment: 44,
    ago: daysAgo(4),
  },
  {
    subreddit: "r/SideProject",
    title: "I built a competitor-monitoring tool because I kept losing deals to rivals I never saw coming",
    upvotes: 1740,
    comments: 296,
    sentiment: 71,
    ago: daysAgo(5),
  },
  {
    subreddit: "r/fintech",
    title: "Treasury ops at startups is still Excel + prayer. Why is nobody building this?",
    upvotes: 1420,
    comments: 210,
    sentiment: 69,
    ago: daysAgo(6),
  },
  {
    subreddit: "r/devops",
    title: "Alert fatigue is an AI opportunity dressed as a complaint",
    upvotes: 2310,
    comments: 367,
    sentiment: 52,
    ago: daysAgo(7),
  },
  {
    subreddit: "r/Entrepreneur",
    title: "The best market research I ever did was watching what founders complain about on Reddit",
    upvotes: 3650,
    comments: 540,
    sentiment: 62,
    ago: daysAgo(8),
  },
  {
    subreddit: "r/ChatGPT",
    title: "Unpopular take: the LLM wrapper gold rush is over, workflow depth is the new moat",
    upvotes: 4180,
    comments: 720,
    sentiment: 61,
    ago: daysAgo(9),
  },
  {
    subreddit: "r/JustStart",
    title: "30 days, $0 ad spend: we validated our idea with public web signals instead of surveys",
    upvotes: 2050,
    comments: 310,
    sentiment: 77,
    ago: daysAgo(10),
  },
];

export interface TrendRow {
  name: string;
  value: number;
  growth: number;
  emoji: string;
}

export const TRENDING_TECHNOLOGIES: TrendRow[] = [
  { name: "AI coding agents", value: 96, growth: 142, emoji: "🤖" },
  { name: "Model Context Protocol", value: 88, growth: 98, emoji: "🔌" },
  { name: "Agentic workflows", value: 82, growth: 87, emoji: "🕸️" },
  { name: "Vector databases", value: 74, growth: 61, emoji: "🧬" },
  { name: "Edge AI inference", value: 66, growth: 48, emoji: "⚡" },
  { name: "Open-weight models", value: 62, growth: 44, emoji: "🪶" },
  { name: "AI observability", value: 55, growth: 39, emoji: "📡" },
  { name: "Local-first software", value: 48, growth: 27, emoji: "💻" },
];

export const FASTEST_GROWING_MARKETS: TrendRow[] = [
  { name: "AI infrastructure", value: 92, growth: 118, emoji: "🧠" },
  { name: "Vertical SaaS (construction)", value: 84, growth: 86, emoji: "🏗️" },
  { name: "Revenue-cycle automation", value: 79, growth: 74, emoji: "🏥" },
  { name: "EV fleet software", value: 73, growth: 69, emoji: "🚚" },
  { name: "Agent tooling", value: 71, growth: 64, emoji: "🤖" },
  { name: "Treasury automation", value: 65, growth: 58, emoji: "🏦" },
];

export const MOST_DISCUSSED_CATEGORIES: TrendRow[] = [
  { name: "AI tools", value: 94, growth: 0, emoji: "🧠" },
  { name: "Startup funding", value: 82, growth: 0, emoji: "💸" },
  { name: "Pricing strategy", value: 76, growth: 0, emoji: "💲" },
  { name: "Developer experience", value: 68, growth: 0, emoji: "🛠️" },
  { name: "Sales & GTM", value: 61, growth: 0, emoji: "📈" },
  { name: "Remote work", value: 44, growth: 0, emoji: "🏠" },
];

export const MOST_FUNDED_INDUSTRIES: TrendRow[] = [
  { name: "AI / ML", value: 92, growth: 34, emoji: "🧠" },
  { name: "Fintech", value: 78, growth: 12, emoji: "💳" },
  { name: "Climate tech", value: 71, growth: 26, emoji: "🌱" },
  { name: "Health tech", value: 66, growth: 15, emoji: "🩺" },
  { name: "Cybersecurity", value: 60, growth: 9, emoji: "🛡️" },
  { name: "Dev tools", value: 55, growth: 21, emoji: "🛠️" },
];

export const MOST_ACTIVE_DEVELOPERS: TrendRow[] = [
  { name: "AI infrastructure", value: 90, growth: 0, emoji: "🧠" },
  { name: "Open-source databases", value: 78, growth: 0, emoji: "🗄️" },
  { name: "Frontend frameworks", value: 72, growth: 0, emoji: "🎨" },
  { name: "DevOps tooling", value: 65, growth: 0, emoji: "⚙️" },
  { name: "Mobile frameworks", value: 51, growth: 0, emoji: "📱" },
];

export const MOST_LAUNCHED_PRODUCTS: TrendRow[] = [
  { name: "AI productivity", value: 88, growth: 0, emoji: "⚡" },
  { name: "Developer tools", value: 82, growth: 0, emoji: "🛠️" },
  { name: "Marketing & SEO", value: 70, growth: 0, emoji: "📣" },
  { name: "Design tools", value: 58, growth: 0, emoji: "🎨" },
  { name: "Finance tools", value: 49, growth: 0, emoji: "💳" },
];

/* ---------------- Helpers ---------------- */

export function findIndustry(query: string): IndustryData {
  const q = query.toLowerCase();
  const match = INDUSTRIES.find(
    (i) =>
      i.tags.some((t) => q.includes(t)) ||
      i.id === "ai" && /(^|\s)(ai|artificial intelligence|llm|ml|machine learning|gpt|claude|model)/.test(q) ||
      i.id === "saas" && /(^|\s)(saas|b2b|productivity)/.test(q) ||
      i.id === "healthcare" && /(health|medical|clinic|patient|care)/.test(q) ||
      i.id === "fintech" && /(financ|fintech|payment|bank|treasury|card)/.test(q) ||
      i.id === "devtools" && /(developer|dev tool|code|github|api|engineering)/.test(q) ||
      i.id === "ecommerce" && /(commerce|shop|store|retail|merchant|d2c)/.test(q) ||
      i.id === "climate" && /(climate|clean|energy|solar|carbon|ev)/.test(q) ||
      i.id === "edtech" && /(edu|learning|school|course|training|tutoring)/.test(q) ||
      i.id === "cybersecurity" && /(secur|cyber|threat|identity|soc)/.test(q) ||
      i.id === "creator" && /(creator|content|media|video|influencer)/.test(q),
  );
  return match ?? GENERIC_INDUSTRY;
}

export function findCompany(name: string): CompanyProfile | null {
  const key = Object.keys(COMPANY_PROFILES).find(
    (k) => k.toLowerCase() === name.trim().toLowerCase(),
  );
  return key ? COMPANY_PROFILES[key] : null;
}
