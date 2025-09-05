import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./app/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
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
  },
});
