import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { and, desc, eq, gte, lte, ne, sql } from "drizzle-orm";
import { drivers } from "@modules/drivers/schema/drivers.schema";
import { NotificationsService } from "@modules/notifications/notifications.service";
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
  constructor(
    @Inject(DRIZZLE_DB) private readonly db: Database,
    private readonly notificationsService: NotificationsService,
  ) {}

  private normalizePlateNumber(plateNumber: string) {
    return plateNumber.trim();
  }

  private async findDriverByPlateNumber(plateNumber: string) {
    const normalizedPlateNumber = this.normalizePlateNumber(plateNumber);

    if (!normalizedPlateNumber || normalizedPlateNumber.toLowerCase() === "unknown") {
      return null;
    }

    const [driver] = await this.db
      .select({
        id: drivers.id,
        fullName: drivers.fullName,
        plateNumber: drivers.plateNumber,
      })
      .from(drivers)
      .where(sql`lower(trim(${drivers.plateNumber})) = ${normalizedPlateNumber.toLowerCase()}`)
      .limit(1);

    return driver ?? null;
  }

  private mapListItem(row: {
    id: string;
    driverId: string | null;
    driverName: string | null;
    plateNumber: string;
    violationType: ViolationListItem["violationType"];
    status: ViolationListItem["status"];
    notificationStatus: ViolationListItem["notificationStatus"];
    imageUrls: string[];
    violationAt: Date;
    createdAt: Date;
    updatedAt: Date;
  }): ViolationListItem {
    return {
      id: row.id,
      violationType: row.violationType,
      status: row.status,
      notificationStatus: row.notificationStatus,
      imageUrls: row.imageUrls,
      plateNumber: row.plateNumber,
      violationAt: row.violationAt,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      driver:
        row.driverId && row.driverName
          ? {
              id: row.driverId,
              fullName: row.driverName,
              plateNumber: row.plateNumber,
            }
          : null,
    };
  }

  async create(payload: CreateViolationInput) {
    const plateNumber = this.normalizePlateNumber(payload.plateNumber);
    const driver = await this.findDriverByPlateNumber(plateNumber);

    const [violation] = await this.db
      .insert(violations)
      .values({
        driverId: driver?.id ?? null,
        plateNumber,
        violationType: payload.violationType,
        imageUrls: payload.imageUrls,
        violationAt: payload.violationAt,
        status: payload.status ?? "PENDING",
        notificationStatus: "NOT_SENT",
      })
      .returning();

    if (!violation) {
      throw new Error("Failed to create violation");
    }

    if (driver) {
      await this.notificationsService.dispatchViolationNotice(violation.id);
    }

    return this.findDetails(violation.id);
  }

  async findAll(query: ViolationsQuery): Promise<PaginatedResult<ViolationListItem>> {
    const {
      page,
      limit,
      sortBy,
      sortOrder,
      search,
      status,
      notificationStatus,
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
      buildSearchCondition(search, [drivers.fullName, violations.plateNumber]),
      status ? eq(violations.status, status) : undefined,
      notificationStatus
        ? eq(violations.notificationStatus, notificationStatus)
        : undefined,
      violationType ? eq(violations.violationType, violationType) : undefined,
      driverId ? eq(violations.driverId, driverId) : undefined,
      plateNumber
        ? sql`lower(trim(${violations.plateNumber})) = ${plateNumber.trim().toLowerCase()}`
        : undefined,
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
        plateNumber: violations.plateNumber,
        violationType: violations.violationType,
        status: violations.status,
        notificationStatus: violations.notificationStatus,
        imageUrls: violations.imageUrls,
        violationAt: violations.violationAt,
        createdAt: violations.createdAt,
        updatedAt: violations.updatedAt,
      })
      .from(violations)
      .leftJoin(drivers, eq(violations.driverId, drivers.id))
      .where(filters)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    const countResult = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(violations)
      .leftJoin(drivers, eq(violations.driverId, drivers.id))
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
        notificationStatus: violations.notificationStatus,
        lastNotifiedAt: violations.lastNotifiedAt,
        imageUrls: violations.imageUrls,
        plateNumber: violations.plateNumber,
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
      .leftJoin(drivers, eq(violations.driverId, drivers.id))
      .where(eq(violations.id, id))
      .limit(1);

    if (!violation) {
      throw new NotFoundException({
        code: "violation_not_found",
        message: "Violation not found",
      });
    }

    const relatedRows = violation.driverId
      ? await this.db
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
          .limit(5)
      : [];

    const relatedViolations: RelatedViolation[] = relatedRows.map((row) => ({
      id: row.id,
      violationType: row.violationType,
      status: row.status,
      violationAt: row.violationAt,
      createdAt: row.createdAt,
    }));

    const latestNotification = await this.notificationsService.getLatestLog(id);

    return {
      violation: {
        id: violation.id,
        violationType: violation.violationType,
        status: violation.status,
        notificationStatus: violation.notificationStatus,
        lastNotifiedAt: violation.lastNotifiedAt,
        imageUrls: violation.imageUrls,
        plateNumber: violation.plateNumber,
        violationAt: violation.violationAt,
        createdAt: violation.createdAt,
        updatedAt: violation.updatedAt,
      },
      driver:
        violation.driverId && violation.driverName
          ? {
              id: violation.driverId,
              fullName: violation.driverName,
              email: violation.driverEmail ?? "",
              phoneNumber: violation.driverPhone ?? "",
              nationalId: violation.driverNationalId ?? "",
              plateNumber: violation.driverPlate ?? violation.plateNumber,
              driverLicenseNumber: violation.driverLicense ?? "",
            }
          : null,
      relatedViolations,
      latestNotification,
    };
  }

  async createFromAi(payload: AiViolationPayload): Promise<AiViolationResult> {
    const plateNumber = this.normalizePlateNumber(payload.plateNumber);
    const driver = await this.findDriverByPlateNumber(plateNumber);

    const [violation] = await this.db
      .insert(violations)
      .values({
        driverId: driver?.id ?? null,
        plateNumber,
        violationType: payload.violationType,
        imageUrls: payload.imageUrls,
        violationAt: new Date(payload.timestamp),
        status: "PENDING",
        notificationStatus: "NOT_SENT",
      })
      .returning({
        id: violations.id,
        violationType: violations.violationType,
        status: violations.status,
        notificationStatus: violations.notificationStatus,
        imageUrls: violations.imageUrls,
        violationAt: violations.violationAt,
        createdAt: violations.createdAt,
        updatedAt: violations.updatedAt,
      });

    if (!violation) {
      throw new Error("Failed to create violation");
    }

    const notification = driver
      ? await this.notificationsService.dispatchViolationNotice(violation.id)
      : null;

    const listItem = this.mapListItem({
      id: violation.id,
      driverId: driver?.id ?? null,
      driverName: driver?.fullName ?? null,
      plateNumber,
      violationType: violation.violationType,
      status: notification?.workflowStatus ?? violation.status,
      notificationStatus: notification?.deliveryStatus ?? violation.notificationStatus,
      imageUrls: violation.imageUrls,
      violationAt: violation.violationAt,
      createdAt: violation.createdAt,
      updatedAt: violation.updatedAt,
    });

    return {
      status: "created",
      driver,
      violation: listItem,
      notification,
    };
  }
}
