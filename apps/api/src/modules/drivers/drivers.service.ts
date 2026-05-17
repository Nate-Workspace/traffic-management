import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { eq, sql } from "drizzle-orm";
import { drivers } from "./schema/drivers.schema";
import { DRIZZLE_DB } from "@database/database.tokens";
import type { Database } from "@database/database.types";
import type { CreateDriverInput } from "./dto/create-driver.dto";
import type { UpdateDriverInput } from "./dto/update-driver.dto";
import type { DriversQuery } from "./dto/drivers-query.dto";
import { handleDatabaseError } from "@common/utils/db-errors";
import {
  buildPaginationMeta,
  buildSearchCondition,
  buildSort,
  combineFilters,
  getPagination,
} from "@common/utils/query.utils";
import type { PaginatedResult } from "@common/types/pagination";

@Injectable()
export class DriversService {
  constructor(@Inject(DRIZZLE_DB) private readonly db: Database) {}

  async create(payload: CreateDriverInput) {
    try {
      const [driver] = await this.db.insert(drivers).values(payload).returning();
      return driver;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findAll(query: DriversQuery): Promise<PaginatedResult<typeof drivers.$inferSelect>> {
    const { page, limit, sortBy, sortOrder, search } = query;
    const { offset } = getPagination({ page, limit });

    const filters = combineFilters([
      buildSearchCondition(search, [
        drivers.fullName,
        drivers.plateNumber,
        drivers.phoneNumber,
        drivers.nationalId,
      ]),
    ]);

    const orderBy = buildSort(sortBy, sortOrder, {
      createdAt: drivers.createdAt,
      fullName: drivers.fullName,
      plateNumber: drivers.plateNumber,
    });

    const items = await this.db
      .select()
      .from(drivers)
      .where(filters)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    const countResult = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(drivers)
      .where(filters);

    const total = Number(countResult[0]?.count ?? 0);

    return {
      items,
      ...buildPaginationMeta(page, limit, total),
    };
  }

  async findOne(id: string) {
    const [driver] = await this.db
      .select()
      .from(drivers)
      .where(eq(drivers.id, id))
      .limit(1);

    if (!driver) {
      throw new NotFoundException({
        code: "driver_not_found",
        message: "Driver not found",
      });
    }

    return driver;
  }

  async update(id: string, payload: UpdateDriverInput) {
    const updates = Object.fromEntries(
      Object.entries(payload).filter(([, value]) => value !== undefined),
    );

    try {
      const [driver] = await this.db
        .update(drivers)
        .set(updates)
        .where(eq(drivers.id, id))
        .returning();

      if (!driver) {
        throw new NotFoundException({
          code: "driver_not_found",
          message: "Driver not found",
        });
      }

      return driver;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async remove(id: string) {
    const [deleted] = await this.db
      .delete(drivers)
      .where(eq(drivers.id, id))
      .returning({ id: drivers.id });

    if (!deleted) {
      throw new NotFoundException({
        code: "driver_not_found",
        message: "Driver not found",
      });
    }

    return deleted;
  }
}
