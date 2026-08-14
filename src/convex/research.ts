"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { generateBaseReport, generateCompanyAnalysis, type MarketReport } from "../lib/analysis";
import { vly } from "../lib/vly-integrations";

/**
 * SignalForge AI research engine.
 *
 * Each action composes a structured report from the curated public-web
 * knowledge base (Product Hunt, Hacker News, GitHub, Reddit, YC, company
 * blogs & career pages) and — when the VLY_INTEGRATION_KEY is configured —
 * polishes the narrative with an LLM pass. If the LLM is unavailable the
 * deterministic report is returned as-is, so research always succeeds.
 */

async function aiNarrative(query: string, report: MarketReport): Promise<string | null> {
  try {
    const res = await vly.ai.completion({
      messages: [
        {
          role: "system",
          content:
            "You are SignalForge AI, a senior market analyst and startup advisor. Write a sharp, concrete 3–4 sentence executive summary for an opportunity brief. Lead with the strongest signal, name the tension (opportunity vs. risk), and end with the single most important recommendation for a founder validating this idea. Do not use markdown headings.",
        },
        {
          role: "user",
          content: [
            `Research question: "${query}"`,
            `Category: ${report.industry}`,
            `Opportunity score: ${report.opportunityScore}/100 (${report.verdict})`,
            `Factor scores: ${report.factors.map((f) => `${f.label} ${f.score}`).join(", ")}`,
            `Key insights:\n${report.keyInsights.map((i) => `- ${i}`).join("\n")}`,
            `Growth: ${report.growth.analysis}`,
            `Top competitors: ${report.competitors.map((c) => c.name).join(", ") || "none mapped"}`,
          ].join("\n\n"),
        },
      ],
      temperature: 0.4,
      maxTokens: 320,
    });
    if (res.success && res.data?.choices?.[0]?.message?.content) {
      return res.data.choices[0].message.content.trim();
    }
    return null;
  } catch {
    return null;
  }
}

export const analyzeMarket = action({
  args: { query: v.string() },
  handler: async (_ctx, { query }): Promise<MarketReport> => {
    const report = generateBaseReport(query);
    const narrative = await aiNarrative(query, report);
    if (narrative) {
      report.executiveSummary = narrative;
    }
    return report;
  },
});

export const analyzeCompany = action({
  args: { name: v.string() },
  handler: async (_ctx, { name }): Promise<ReturnType<typeof generateCompanyAnalysis>> => {
    return generateCompanyAnalysis(name);
  },
});
