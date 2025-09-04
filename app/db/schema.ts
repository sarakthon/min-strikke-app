import { integer, json, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const recipesTable = pgTable("recipes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  intro: text().notNull(),
  image_url: text().notNull().unique(),
  alt_image_urls: json().$type<string[]>(),
  designer: text(),
  recommended_needle_size: text(),
  yarn: text(),
  gauge: text(),
});
