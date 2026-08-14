import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const recent = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return [];
    return ctx.db
      .query("searches")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(8);
  },
});

export const record = mutation({
  args: { query: v.string() },
  handler: async (ctx, { query }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return null;
    const trimmed = query.trim();
    if (trimmed.length < 3) return null;
    // Keep history tidy — drop exact duplicates of the most recent search.
    const existing = await ctx.db
      .query("searches")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(1);
    if (existing[0]?.query === trimmed) return null;
    return ctx.db.insert("searches", { userId, query: trimmed });
  },
});
