import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import type { Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DATABASE_POOL, DRIZZLE_DB } from "./database.tokens";
import * as schema from "./schema";
import type { Database } from "./database.types";

export type DatabaseConfig = {
  url: string;
  ssl: boolean;
  poolMax: number;
  poolIdleMs: number;
};

export const databaseProviders: Provider[] = [
  {
    provide: DATABASE_POOL,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const config = configService.get<DatabaseConfig>("database", {
        infer: true,
      });

      if (!config) {
        throw new Error("Database configuration is missing");
      }

      return new Pool({
        connectionString: config.url,
        max: config.poolMax,
        idleTimeoutMillis: config.poolIdleMs,
        ssl: config.ssl ? { rejectUnauthorized: false } : false,
      });
    },
  },
  {
    provide: DRIZZLE_DB,
    inject: [DATABASE_POOL],
    useFactory: (pool: Pool) => drizzle(pool, { schema }) as Database,
  },
];
