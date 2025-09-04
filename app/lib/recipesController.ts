import { eq } from "drizzle-orm";
import type { RequestContext } from "./context.server";
import { recipesTable } from "~/db/schema";

export async function createRecipe(
  recipe: typeof recipesTable.$inferInsert,
  ctx: RequestContext
) {
  const result = await ctx.db.insert(recipesTable).values(recipe).returning();
  return result[0];
}

export async function getRecipes(ctx: RequestContext) {
  return await ctx.db.select().from(recipesTable);
}

export async function getRecipe(id: number, ctx: RequestContext) {
  const rows = await ctx.db
    .select()
    .from(recipesTable)
    .where(eq(recipesTable.id, id))
    .limit(1);
  return rows[0];
}

export async function updateRecipe(
  id: number,
  input: typeof recipesTable.$inferInsert,
  ctx: RequestContext
) {
  return await ctx.db
    .update(recipesTable)
    .set(input)
    .where(eq(recipesTable.id, id));
}

export async function deleteRecipe(id: number, ctx: RequestContext) {
  return await ctx.db.delete(recipesTable).where(eq(recipesTable.id, id));
}
