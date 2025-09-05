import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

declare global {
  // Allow global caching in dev to avoid creating many pools on HMR
  var __db: NodePgDatabase;
}

export function getDb() {
  if (global.__db == null) {
    const pool = new Pool({
      user: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      host: process.env.DB_HOST!,
      database: process.env.DB_DATABASE!,
      port: parseInt(process.env.DB_PORT!),
      ...(process.env.DB_CA_CERT != null
        ? {
            ssl: {
              rejectUnauthorized: false,
              ca: process.env.DB_CA_CERT,
            },
          }
        : {}),
    });
    global.__db = drizzle(pool);
  }
  return global.__db;
}
