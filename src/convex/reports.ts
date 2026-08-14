import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listByUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return [];
    return ctx.db
      .query("reports")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const save = mutation({
  args: {
    query: v.string(),
    title: v.string(),
    summary: v.string(),
    score: v.number(),
    industry: v.string(),
    report: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("You must be signed in to save a report.");
    return ctx.db.insert("reports", { userId, ...args });
  },
});

export const remove = mutation({
  args: { id: v.id("reports") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("You must be signed in.");
    const doc = await ctx.db.get(id);
    if (!doc || doc.userId !== userId) throw new Error("Report not found.");
    await ctx.db.delete(id);
  },
});
