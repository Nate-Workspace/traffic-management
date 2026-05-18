import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { eq, sql } from "drizzle-orm";
import { drivers } from "@modules/drivers/schema/drivers.schema";
import { violations } from "./schema/violations.schema";
import { DRIZZLE_DB } from "@database/database.tokens";
import type { Database } from "@database/database.types";
import type { CreateViolationInput } from "./dto/create-violation.dto";
import type { ViolationsQuery } from "./dto/violations-query.dto";
import {
  buildPaginationMeta,
  buildSearchCondition,
  buildSort,
  combineFilters,
  getPagination,
} from "@common/utils/query.utils";
import type { PaginatedResult } from "@common/types/pagination";
import type { ViolationListItem } from "./types/violation.types";

@Injectable()
export class ViolationsService {
  constructor(@Inject(DRIZZLE_DB) private readonly db: Database) {}

  async create(payload: CreateViolationInput) {
    const [driver] = await this.db
      .select({ id: drivers.id })
      .from(drivers)
      .where(eq(drivers.id, payload.driverId))
      .limit(1);

    if (!driver) {
      throw new NotFoundException({
        code: "driver_not_found",
        message: "Driver not found",
      });
    }

    const [violation] = await this.db
      .insert(violations)
      .values({
        driverId: payload.driverId,
        violationType: payload.violationType,
        imageUrls: payload.imageUrls,
        violationAt: payload.violationAt,
        status: payload.status,
      })
      .returning();

    return violation;
  }

  async findAll(query: ViolationsQuery): Promise<PaginatedResult<ViolationListItem>> {
    const {
      page,
      limit,
      sortBy,
      sortOrder,
      search,
      status,
      violationType,
      plateNumber,
      driverId,
    } = query;

    const { offset } = getPagination({ page, limit });

    const filters = combineFilters([
      buildSearchCondition(search, [drivers.fullName, drivers.plateNumber]),
      status ? eq(violations.status, status) : undefined,
      violationType ? eq(violations.violationType, violationType) : undefined,
      driverId ? eq(violations.driverId, driverId) : undefined,
      plateNumber ? eq(drivers.plateNumber, plateNumber) : undefined,
    ]);

    const orderBy = buildSort(sortBy, sortOrder, {
      createdAt: violations.createdAt,
      violationAt: violations.violationAt,
      status: violations.status,
    });

    const items = await this.db
      .select({
        id: violations.id,
        driverId: violations.driverId,
        driverName: drivers.fullName,
        plateNumber: drivers.plateNumber,
        violationType: violations.violationType,
        status: violations.status,
        imageUrls: violations.imageUrls,
        violationAt: violations.violationAt,
        createdAt: violations.createdAt,
        updatedAt: violations.updatedAt,
      })
      .from(violations)
      .innerJoin(drivers, eq(violations.driverId, drivers.id))
      .where(filters)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    const countResult = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(violations)
      .innerJoin(drivers, eq(violations.driverId, drivers.id))
      .where(filters);

    const total = Number(countResult[0]?.count ?? 0);

    return {
      data: items,
      ...buildPaginationMeta(page, limit, total),
    };
  }

  async findOne(id: string) {
    const [violation] = await this.db
      .select({
        id: violations.id,
        driverId: violations.driverId,
        driverName: drivers.fullName,
        plateNumber: drivers.plateNumber,
        violationType: violations.violationType,
        status: violations.status,
        imageUrls: violations.imageUrls,
        violationAt: violations.violationAt,
        createdAt: violations.createdAt,
        updatedAt: violations.updatedAt,
      })
      .from(violations)
      .innerJoin(drivers, eq(violations.driverId, drivers.id))
      .where(eq(violations.id, id))
      .limit(1);

    if (!violation) {
      throw new NotFoundException({
        code: "violation_not_found",
        message: "Violation not found",
      });
    }

    return violation;
  }
}
