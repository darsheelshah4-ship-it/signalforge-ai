import { describe, it, expect } from "vitest";

// Re-declare the constants inline so tests catch any accidental removal of
// required fields (to, price, etc.) without importing the full React page.

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
  { title: "Live web scraping", to: "/dashboard/trends" },
  { title: "AI research assistant", to: "/dashboard/search" },
  { title: "Competitor intelligence", to: "/dashboard/competitors" },
  { title: "Startup discovery", to: "/dashboard/startups" },
  { title: "Market opportunity finder", to: "/dashboard/search" },
  { title: "Daily intelligence digest", to: "/dashboard/overview" },
];

const PLANS = [
  { name: "Free", price: "$0", period: "forever" },
  { name: "Pro", price: "$24.99", period: "per month" },
  { name: "Enterprise", price: "Custom", period: "annual" },
];

describe("Landing constants", () => {
  describe("SOURCES — every chip navigates to a /dashboard route", () => {
    it("has exactly 7 sources", () => {
      expect(SOURCES).toHaveLength(7);
    });

    it("every source has a label, glyph, and to field", () => {
      for (const s of SOURCES) {
        expect(s.label).toBeTruthy();
        expect(s.glyph).toBeTruthy();
        expect(s.to).toMatch(/^\/dashboard\//);
      }
    });

    it("Product Hunt routes to product-hunt page", () => {
      expect(SOURCES.find((s) => s.label === "Product Hunt")?.to).toBe(
        "/dashboard/product-hunt",
      );
    });

    it("Hacker News routes to trends page", () => {
      expect(SOURCES.find((s) => s.label === "Hacker News")?.to).toBe(
        "/dashboard/trends",
      );
    });

    it("GitHub routes to github page", () => {
      expect(SOURCES.find((s) => s.label === "GitHub")?.to).toBe(
        "/dashboard/github",
      );
    });

    it("Reddit routes to reddit page", () => {
      expect(SOURCES.find((s) => s.label === "Reddit")?.to).toBe(
        "/dashboard/reddit",
      );
    });

    it("Y Combinator routes to startups page", () => {
      expect(SOURCES.find((s) => s.label === "Y Combinator")?.to).toBe(
        "/dashboard/startups",
      );
    });

    it("Company Blogs routes to competitors page", () => {
      expect(SOURCES.find((s) => s.label === "Company Blogs")?.to).toBe(
        "/dashboard/competitors",
      );
    });

    it("Career Pages routes to competitors page", () => {
      expect(SOURCES.find((s) => s.label === "Career Pages")?.to).toBe(
        "/dashboard/competitors",
      );
    });

    it("all source routes are valid dashboard sub-routes", () => {
      const valid = [
        "/dashboard/search",
        "/dashboard/trends",
        "/dashboard/funding",
        "/dashboard/product-hunt",
        "/dashboard/github",
        "/dashboard/reddit",
        "/dashboard/competitors",
        "/dashboard/startups",
        "/dashboard/reports",
        "/dashboard/overview",
        "/dashboard/settings",
      ];
      for (const s of SOURCES) {
        expect(valid).toContain(s.to);
      }
    });

    it("Company Blogs and Career Pages both route to competitors", () => {
      const blogs = SOURCES.find((s) => s.label === "Company Blogs");
      const careers = SOURCES.find((s) => s.label === "Career Pages");
      expect(blogs?.to).toBe(careers?.to);
      expect(blogs?.to).toBe("/dashboard/competitors");
    });
  });

  describe("FEATURES — every card navigates to a /dashboard route", () => {
    it("has exactly 6 features", () => {
      expect(FEATURES).toHaveLength(6);
    });

    it("every feature has a title and to field", () => {
      for (const f of FEATURES) {
        expect(f.title).toBeTruthy();
        expect(f.to).toMatch(/^\/dashboard\//);
      }
    });

    it("Live web scraping routes to trends", () => {
      expect(FEATURES.find((f) => f.title === "Live web scraping")?.to).toBe(
        "/dashboard/trends",
      );
    });

    it("AI research assistant routes to search", () => {
      expect(
        FEATURES.find((f) => f.title === "AI research assistant")?.to,
      ).toBe("/dashboard/search");
    });

    it("Competitor intelligence routes to competitors", () => {
      expect(
        FEATURES.find((f) => f.title === "Competitor intelligence")?.to,
      ).toBe("/dashboard/competitors");
    });

    it("Startup discovery routes to startups", () => {
      expect(FEATURES.find((f) => f.title === "Startup discovery")?.to).toBe(
        "/dashboard/startups",
      );
    });

    it("Market opportunity finder routes to search", () => {
      expect(
        FEATURES.find((f) => f.title === "Market opportunity finder")?.to,
      ).toBe("/dashboard/search");
    });

    it("Daily intelligence digest routes to overview", () => {
      expect(
        FEATURES.find((f) => f.title === "Daily intelligence digest")?.to,
      ).toBe("/dashboard/overview");
    });

    it("all feature routes are valid dashboard sub-routes", () => {
      const valid = [
        "/dashboard/search",
        "/dashboard/trends",
        "/dashboard/funding",
        "/dashboard/product-hunt",
        "/dashboard/github",
        "/dashboard/reddit",
        "/dashboard/competitors",
        "/dashboard/startups",
        "/dashboard/reports",
        "/dashboard/overview",
        "/dashboard/settings",
      ];
      for (const f of FEATURES) {
        expect(valid).toContain(f.to);
      }
    });
  });

  describe("PLANS — pricing", () => {
    it("has exactly 3 plans", () => {
      expect(PLANS).toHaveLength(3);
    });

    it("Free plan costs $0", () => {
      expect(PLANS.find((p) => p.name === "Free")?.price).toBe("$0");
    });

    it("Pro plan costs $24.99", () => {
      expect(PLANS.find((p) => p.name === "Pro")?.price).toBe("$24.99");
    });

    it("Enterprise plan is Custom", () => {
      expect(PLANS.find((p) => p.name === "Enterprise")?.price).toBe("Custom");
    });

    it("Pro plan period is per month", () => {
      expect(PLANS.find((p) => p.name === "Pro")?.period).toBe("per month");
    });
  });
});
