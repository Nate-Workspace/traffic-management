import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { and, desc, eq, gte, lte, ne, sql } from "drizzle-orm";
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
import type {
  AiViolationPayload,
  AiViolationResult,
  RelatedViolation,
  ViolationDetail,
  ViolationListItem,
} from "./types/violation.types";

const toRangeStart = (value: Date) => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
};

const toRangeEnd = (value: Date) => {
  const date = new Date(value);
  date.setHours(23, 59, 59, 999);
  return date;
};

@Injectable()
export class ViolationsService {
  constructor(@Inject(DRIZZLE_DB) private readonly db: Database) {}

  private mapListItem(row: {
    id: string;
    driverId: string;
    driverName: string;
    plateNumber: string;
    violationType: ViolationListItem["violationType"];
    status: ViolationListItem["status"];
    imageUrls: string[];
    violationAt: Date;
    createdAt: Date;
    updatedAt: Date;
  }): ViolationListItem {
    return {
      id: row.id,
      violationType: row.violationType,
      status: row.status,
      imageUrls: row.imageUrls,
      violationAt: row.violationAt,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      driver: {
        id: row.driverId,
        fullName: row.driverName,
        plateNumber: row.plateNumber,
      },
    };
  }

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
      violationAtFrom,
      violationAtTo,
      createdAtFrom,
      createdAtTo,
    } = query;

    const { offset } = getPagination({ page, limit });

    const filters = combineFilters([
      buildSearchCondition(search, [drivers.fullName, drivers.plateNumber]),
      status ? eq(violations.status, status) : undefined,
      violationType ? eq(violations.violationType, violationType) : undefined,
      driverId ? eq(violations.driverId, driverId) : undefined,
      plateNumber ? eq(drivers.plateNumber, plateNumber) : undefined,
      violationAtFrom
        ? gte(violations.violationAt, toRangeStart(violationAtFrom))
        : undefined,
      violationAtTo
        ? lte(violations.violationAt, toRangeEnd(violationAtTo))
        : undefined,
      createdAtFrom
        ? gte(violations.createdAt, toRangeStart(createdAtFrom))
        : undefined,
      createdAtTo ? lte(violations.createdAt, toRangeEnd(createdAtTo)) : undefined,
    ]);

    const orderBy = buildSort(sortBy, sortOrder, {
      driverName: drivers.fullName,
      violationAt: violations.violationAt,
      createdAt: violations.createdAt,
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
      data: items.map((item) => this.mapListItem(item)),
      ...buildPaginationMeta(page, limit, total),
    };
  }

  async findDetails(id: string): Promise<ViolationDetail> {
    const [violation] = await this.db
      .select({
        id: violations.id,
        violationType: violations.violationType,
        status: violations.status,
        imageUrls: violations.imageUrls,
        violationAt: violations.violationAt,
        createdAt: violations.createdAt,
        updatedAt: violations.updatedAt,
        driverId: drivers.id,
        driverName: drivers.fullName,
        driverEmail: drivers.email,
        driverPhone: drivers.phoneNumber,
        driverNationalId: drivers.nationalId,
        driverPlate: drivers.plateNumber,
        driverLicense: drivers.driverLicenseNumber,
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

    const relatedRows = await this.db
      .select({
        id: violations.id,
        violationType: violations.violationType,
        status: violations.status,
        violationAt: violations.violationAt,
        createdAt: violations.createdAt,
      })
      .from(violations)
      .where(
        and(
          eq(violations.driverId, violation.driverId),
          ne(violations.id, violation.id),
        ),
      )
      .orderBy(desc(violations.violationAt))
      .limit(5);

    const relatedViolations: RelatedViolation[] = relatedRows.map((row) => ({
      id: row.id,
      violationType: row.violationType,
      status: row.status,
      violationAt: row.violationAt,
      createdAt: row.createdAt,
    }));

    return {
      violation: {
        id: violation.id,
        violationType: violation.violationType,
        status: violation.status,
        imageUrls: violation.imageUrls,
        violationAt: violation.violationAt,
        createdAt: violation.createdAt,
        updatedAt: violation.updatedAt,
      },
      driver: {
        id: violation.driverId,
        fullName: violation.driverName,
        email: violation.driverEmail,
        phoneNumber: violation.driverPhone,
        nationalId: violation.driverNationalId,
        plateNumber: violation.driverPlate,
        driverLicenseNumber: violation.driverLicense,
      },
      relatedViolations,
    };
  }

  async createFromAi(payload: AiViolationPayload): Promise<AiViolationResult> {
    const [driver] = await this.db
      .select({
        id: drivers.id,
        fullName: drivers.fullName,
        plateNumber: drivers.plateNumber,
      })
      .from(drivers)
      .where(eq(drivers.plateNumber, payload.plateNumber))
      .limit(1);

    if (!driver) {
      return {
        status: "driver_not_found",
        plateNumber: payload.plateNumber,
      };
    }

    const [violation] = await this.db
      .insert(violations)
      .values({
        driverId: driver.id,
        violationType: payload.violationType,
        imageUrls: payload.imageUrls,
        violationAt: new Date(payload.timestamp),
        status: "PENDING",
      })
      .returning({
        id: violations.id,
        violationType: violations.violationType,
        status: violations.status,
        imageUrls: violations.imageUrls,
        violationAt: violations.violationAt,
        createdAt: violations.createdAt,
        updatedAt: violations.updatedAt,
      });

    if (!violation) {
      throw new Error("Failed to create violation");
    }

    return {
      status: "created",
      driver,
      violation: {
        id: violation.id,
        violationType: violation.violationType,
        status: violation.status,
        imageUrls: violation.imageUrls,
        violationAt: violation.violationAt,
        createdAt: violation.createdAt,
        updatedAt: violation.updatedAt,
        driver,
      },
    };
  }
}
