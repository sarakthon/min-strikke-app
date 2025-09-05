import cookie from "cookie";
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
  session: string | undefined;

  constructor(request: Request) {
    const cookieHeader = request.headers.get("Cookie") ?? "";
    const cookies = cookie.parse(cookieHeader);

    this.appConfig = getAppConfig();
    this.appSecrets = getAppSecrets();
    this.db = getDb();
    this.session = cookies.session;
  }
}

export async function createRequestContext(request: Request) {
  return new RequestContext(request);
}
