import { describe, expect, it } from "vitest";
import {
  COMPANY_PROFILES,
  FUNDING_EVENTS,
  GITHUB_REPOS,
  INDUSTRIES,
  PRODUCT_HUNT_LAUNCHES,
  REDDIT_THREADS,
  TRENDING_TECHNOLOGIES,
  daysAgo,
  findCompany,
  findIndustry,
} from "./market-data";

const FACTOR_KEYS = ["growth", "competition", "funding", "hiring", "developer", "community"] as const;

describe("findIndustry", () => {
  it("routes AI-related queries to the AI industry", () => {
    expect(findIndustry("Show me AI startups launched this week").id).toBe("ai");
    expect(findIndustry("build an LLM tool for developers").id).toBe("ai");
  });

  it("routes healthcare queries before the generic SaaS regex", () => {
    expect(findIndustry("Find SaaS opportunities in healthcare").id).toBe("healthcare");
  });

  it("routes fintech queries to fintech even when SaaS is mentioned", () => {
    expect(findIndustry("saas opportunity in fintech").id).toBe("fintech");
  });

  it("falls back to the generic startup-ecosystem industry for unrelated queries", () => {
    expect(findIndustry("Which startup raised funding yesterday?").id).toBe("startup-ecosystem");
    expect(findIndustry("").id).toBe("startup-ecosystem");
  });
});

describe("findCompany", () => {
  it("matches known companies case-insensitively with trimmed input", () => {
    const hit = findCompany("  linear ");
    expect(hit).not.toBeNull();
    expect(hit?.name).toBe("Linear");
  });

  it("returns null for unknown companies", () => {
    expect(findCompany("Acme Widgets")).toBeNull();
  });
});

describe("daysAgo", () => {
  it("formats as a short month + day", () => {
    expect(daysAgo(0)).toMatch(/^[A-Z][a-z]{2} \d{1,2}$/);
    expect(daysAgo(7)).toMatch(/^[A-Z][a-z]{2} \d{1,2}$/);
  });
});

describe("knowledge-base integrity", () => {
  it("gives every industry the fields the report generator depends on", () => {
    expect(INDUSTRIES.length).toBeGreaterThanOrEqual(10);
    for (const ind of INDUSTRIES) {
      expect(ind.id.length).toBeGreaterThan(0);
      expect(ind.label.length).toBeGreaterThan(0);
      expect(ind.startupIdeas.length).toBeGreaterThan(0);
      expect(ind.competitors.length).toBeGreaterThan(0);
      expect(ind.risks.length).toBeGreaterThan(0);
      expect(ind.tags.length).toBeGreaterThan(0);
      for (const key of FACTOR_KEYS) {
        expect(ind.baseScores[key]).toBeGreaterThanOrEqual(0);
        expect(ind.baseScores[key]).toBeLessThanOrEqual(100);
      }
    }
  });

  it("gives every company profile every field the competitor page renders", () => {
    const entries = Object.values(COMPANY_PROFILES);
    expect(entries.length).toBeGreaterThanOrEqual(15);
    for (const p of entries) {
      expect(p.name.length).toBeGreaterThan(0);
      expect(p.industry.length).toBeGreaterThan(0);
      expect(p.website.length).toBeGreaterThan(0);
      expect(p.tagline.length).toBeGreaterThan(0);
      expect(p.description.length).toBeGreaterThan(10);
      expect(p.founded).toBeGreaterThan(1990);
      expect(p.funding.length).toBeGreaterThan(0);
      expect(p.pricing.length).toBeGreaterThan(0);
      expect(p.pricingPoints.length).toBeGreaterThan(0);
      expect(p.launches.length).toBeGreaterThan(0);
      expect(["Expanding", "Steady", "Reducing"]).toContain(p.hiring.trend);
      expect(p.strengths.length).toBeGreaterThan(0);
      expect(p.weaknesses.length).toBeGreaterThan(0);
      expect(p.comparison.length).toBeGreaterThan(20);
    }
  });

  it("keeps every feed populated with well-formed rows", () => {
    expect(FUNDING_EVENTS.length).toBeGreaterThanOrEqual(8);
    for (const f of FUNDING_EVENTS) {
      expect(f.amount).toMatch(/^\$\d/);
      expect(f.investors.length).toBeGreaterThan(0);
      expect(f.headline.length).toBeGreaterThan(0);
    }

    expect(PRODUCT_HUNT_LAUNCHES.length).toBeGreaterThanOrEqual(8);
    for (const p of PRODUCT_HUNT_LAUNCHES) {
      expect(p.upvotes).toBeGreaterThan(0);
      expect(p.tagline.length).toBeGreaterThan(0);
    }

    expect(GITHUB_REPOS.length).toBeGreaterThanOrEqual(8);
    for (const g of GITHUB_REPOS) {
      expect(g.stars).toMatch(/^\d+k\+?$/);
      expect(g.growth).toMatch(/^\+?\d+%$/);
    }

    expect(REDDIT_THREADS.length).toBeGreaterThanOrEqual(8);
    for (const t of REDDIT_THREADS) {
      expect(t.upvotes).toBeGreaterThan(0);
      expect(t.sentiment).toBeGreaterThanOrEqual(0);
      expect(t.sentiment).toBeLessThanOrEqual(100);
    }

    expect(TRENDING_TECHNOLOGIES.length).toBeGreaterThanOrEqual(6);
    for (const t of TRENDING_TECHNOLOGIES) {
      expect(t.growth).toBeGreaterThan(0);
    }
  });
});
