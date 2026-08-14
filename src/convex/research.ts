"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { vly } from "../lib/vly-integrations";

export const analyzeMarket = action({
  args: { query: v.string() },
  handler: async (_ctx, { query }): Promise<Record<string, unknown>> => {
    void vly;
    return { query, placeholder: true };
  },
});
