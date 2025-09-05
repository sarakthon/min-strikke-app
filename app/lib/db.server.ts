import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

declare global {
  // Allow global caching in dev to avoid creating many pools on HMR
  var __db: NodePgDatabase;
}

export function getDb(database_url: string) {
  if (global.__db == null) {
    const pool = new Pool({
      connectionString: database_url,
      ssl: {
        rejectUnauthorized: false,
        ca: process.env.DB_CA_CERT,
      },
    });
    global.__db = drizzle(pool);
  }
  return global.__db;
}
