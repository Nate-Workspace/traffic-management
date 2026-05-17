import { Inject, Module, OnModuleDestroy } from "@nestjs/common";
import type { Pool } from "pg";
import { DATABASE_POOL } from "./database.tokens";
import { databaseProviders } from "./database.providers";

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule implements OnModuleDestroy {
  constructor(@Inject(DATABASE_POOL) private readonly pool: Pool) {}

  async onModuleDestroy() {
    await this.pool.end();
  }
}
