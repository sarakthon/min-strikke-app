import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import {
  getAppConfig,
  getAppSecrets,
  type AppConfig,
  type AppSecrets,
} from "./appConfig";
import { getDb } from "./db.server";

export class RequestContext {
  appConfig: AppConfig;
  appSecrets: AppSecrets;

  db: NodePgDatabase;

  constructor() {
    this.appConfig = getAppConfig();
    this.appSecrets = getAppSecrets();
    this.db = getDb(this.appSecrets.DATABASE_URL);
  }
}

export async function createRequestContext(_request: Request) {
  return new RequestContext();
}
