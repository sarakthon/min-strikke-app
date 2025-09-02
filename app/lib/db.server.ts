import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";

declare global {
  // Allow global caching in dev to avoid creating many pools on HMR
  var __db: NodePgDatabase;
}

export function getDb(database_url: string) {
  if (global.__db == null) {
    global.__db = drizzle(database_url);
  }
  return global.__db;
}
