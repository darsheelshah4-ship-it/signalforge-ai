import { describe, expect, it } from "vitest";
import {
  generateBaseReport,
  generateCompanyAnalysis,
  moneyLabel,
  scoreVerdict,
  trendSeries,
} from "./analysis";

describe("scoreVerdict", () => {
  it("maps score bands to verdicts", () => {
    expect(scoreVerdict(85)).toBe("Strong opportunity");
    expect(scoreVerdict(84)).toBe("Promising");
    expect(scoreVerdict(72)).toBe("Promising");
    expect(scoreVerdict(71)).toBe("Evaluating");
    expect(scoreVerdict(58)).toBe("Evaluating");
    expect(scoreVerdict(57)).toBe("Crowded — differentiate");
    expect(scoreVerdict(0)).toBe("Crowded — differentiate");
  });
});

describe("generateBaseReport", () => {
  const query = "Show me AI startups launched this week";

  it("is deterministic for the same query (ignoring timestamp)", () => {
    const a = generateBaseReport(query);
    const b = generateBaseReport(query);
    expect({ ...a, generatedAt: "" }).toEqual({ ...b, generatedAt: "" });
  });

  it("differs across distinct queries", () => {
    const a = generateBaseReport(query);
    const b = generateBaseReport("Find SaaS opportunities in healthcare");
    expect({ ...a, generatedAt: "" }).not.toEqual({ ...b, generatedAt: "" });
  });

  it("returns a complete, well-formed report structure", () => {
    const r = generateBaseReport(query);
    expect(r.query).toBe(query.trim());
    expect(r.industryId).toBe("ai");
    expect(r.emoji.length).toBeGreaterThan(0);
    expect(r.headline.length).toBeGreaterThan(0);
    expect(r.executiveSummary.length).toBeGreaterThan(40);
    expect(r.keyInsights.length).toBeGreaterThanOrEqual(3);
    expect(r.startupIdeas).toHaveLength(3);
    expect(r.risks).toHaveLength(3);
    expect(r.sources).toHaveLength(9);
    expect(r.factors).toHaveLength(6);
    expect(new Date(r.generatedAt).getTime()).not.toBeNaN();
  });

  it("keeps the opportunity score in range and consistent with the verdict", () => {
    const r = generateBaseReport(query);
    expect(r.opportunityScore).toBeGreaterThanOrEqual(0);
    expect(r.opportunityScore).toBeLessThanOrEqual(100);
    expect(r.verdict).toBe(scoreVerdict(r.opportunityScore));
  });

  it("produces aligned growth series of 8 points in range", () => {
    const r = generateBaseReport(query);
    expect(r.growth.labels).toHaveLength(8);
    expect(r.growth.values).toHaveLength(8);
    for (const v of r.growth.values) {
      expect(v).toBeGreaterThanOrEqual(5);
      expect(v).toBeLessThanOrEqual(99);
    }
  });

  it("maps the AI industry competitors that exist in the knowledge base", () => {
    const r = generateBaseReport(query);
    const names = r.competitors.map((c) => c.name);
    expect(names).toContain("OpenAI");
    expect(names).toContain("Anthropic");
    for (const c of r.competitors) {
      expect(c.pricing.length).toBeGreaterThan(0);
      expect(c.strengths.length).toBeGreaterThan(0);
      expect(c.weaknesses.length).toBeGreaterThan(0);
    }
  });

  it("survives the JSON round-trip used by the saved-reports page", () => {
    const r = generateBaseReport(query);
    const roundTripped = JSON.parse(JSON.stringify(r)) as typeof r;
    expect(roundTripped).toEqual(r);
  });
});

describe("generateCompanyAnalysis", () => {
  it("returns the verified profile for an exact-match known company", () => {
    const r = generateCompanyAnalysis("Linear");
    expect(r.confidence).toBe("high");
    expect(r.name).toBe("Linear");
    expect(r.pricing.length).toBeGreaterThan(0);
    expect(r.launches.length).toBeGreaterThan(0);
    expect(r.comparison.length).toBeGreaterThan(20);
  });

  it("resolves known companies case-insensitively", () => {
    const r = generateCompanyAnalysis("intercom");
    expect(r.confidence).toBe("high");
    expect(r.name).toBe("Intercom");
  });

  it("generates a complete dossier for unknown companies", () => {
    const r = generateCompanyAnalysis("Acme Widgets");
    expect(r.confidence).toBe("generated");
    expect(r.name).toBe("Acme Widgets");
    expect(r.launches).toHaveLength(3);
    expect(r.hiring.roles.length).toBeGreaterThan(0);
    expect(r.strengths.length).toBeGreaterThan(0);
    expect(r.weaknesses.length).toBeGreaterThan(0);
    expect(r.reddit.mentions).toBeGreaterThan(0);
  });
});

describe("moneyLabel", () => {
  it("formats millions and billions", () => {
    expect(moneyLabel(250)).toBe("$250M");
    expect(moneyLabel(999)).toBe("$999M");
    expect(moneyLabel(1000)).toBe("$1.0B");
    expect(moneyLabel(1500)).toBe("$1.5B");
  });
});

describe("trendSeries", () => {
  it("returns 8 in-range points and is deterministic", () => {
    const a = trendSeries(60, 30);
    const b = trendSeries(60, 30);
    expect(a).toEqual(b);
    expect(a).toHaveLength(8);
    for (const v of a) {
      expect(v).toBeGreaterThanOrEqual(5);
      expect(v).toBeLessThanOrEqual(99);
    }
  });
});
