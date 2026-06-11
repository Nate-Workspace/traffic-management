import { Inject, Injectable } from "@nestjs/common";
import {
  and,
  asc,
  desc,
  eq,
  gte,
  lte,
  sql,
  type SQL,
} from "drizzle-orm";
import { DRIZZLE_DB } from "@database/database.tokens";
import type { Database } from "@database/database.types";
import { drivers } from "@modules/drivers/schema/drivers.schema";
import { violations } from "@modules/violations/schema/violations.schema";
import type { AnalyticsRangeQuery } from "./dto/analytics-range.dto";
import type { RecentViolationsQuery } from "./dto/recent-violations.dto";
import type { RepeatedOffendersQuery } from "./dto/repeated-offenders.dto";
import type {
  AnalyticsSummary,
  RecentViolationsResponse,
  RepeatedOffendersResponse,
  ViolationsTrendResponse,
} from "./types/analytics.types";

const DEFAULT_RANGE_DAYS = 30;

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

const toDateString = (value: Date) => value.toISOString().slice(0, 10);

@Injectable()
export class AnalyticsService {
  constructor(@Inject(DRIZZLE_DB) private readonly db: Database) {}

  async getSummary(query: AnalyticsRangeQuery): Promise<AnalyticsSummary> {
    const range = this.resolveRange(query.startDate, query.endDate);

    const rangeCondition = this.rangeFilter(range.start, range.end);

    const totalViolationsResult = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(violations)
      .where(rangeCondition);

    const repeatedOffenders = await this.getRepeatedOffendersCount(
      rangeCondition,
    );

    return {
      startDate: range.startDate,
      endDate: range.endDate,
      totalViolations: Number(totalViolationsResult[0]?.count ?? 0),
      repeatedOffenders,
    };
  }

  async getViolationsTrend(
    query: AnalyticsRangeQuery,
  ): Promise<ViolationsTrendResponse> {
    const range = this.resolveRange(query.startDate, query.endDate);
    const rangeCondition = this.rangeFilter(range.start, range.end);

    const dateBucket = sql<string>`to_char(${violations.violationAt}, 'YYYY-MM-DD')`;

    const rows = await this.db
      .select({
        date: dateBucket,
        total: sql<number>`count(*)`,
        pending: sql<number>`sum(case when ${violations.status} = 'PENDING' then 1 else 0 end)`,
        notified: sql<number>`sum(case when ${violations.status} = 'NOTIFIED' then 1 else 0 end)`,
        reviewed: sql<number>`sum(case when ${violations.status} = 'REVIEWED' then 1 else 0 end)`,
        dismissed: sql<number>`sum(case when ${violations.status} = 'DISMISSED' then 1 else 0 end)`,
      })
      .from(violations)
      .where(rangeCondition)
      .groupBy(dateBucket)
      .orderBy(asc(dateBucket));

    return {
      startDate: range.startDate,
      endDate: range.endDate,
      points: rows.map((row) => ({
        date: row.date,
        total: Number(row.total ?? 0),
        pending: Number(row.pending ?? 0),
        notified: Number(row.notified ?? 0),
        reviewed: Number(row.reviewed ?? 0),
        dismissed: Number(row.dismissed ?? 0),
      })),
    };
  }

  async getRepeatedOffenders(
    query: RepeatedOffendersQuery,
  ): Promise<RepeatedOffendersResponse> {
    const range = this.resolveRange(query.startDate, query.endDate);
    const rangeCondition = this.rangeFilter(range.start, range.end);
    const limit = query.limit ?? 6;

    const violationCount = sql<number>`count(*)`;

    const offenders = await this.db
      .select({
        driverId: drivers.id,
        driverName: drivers.fullName,
        plateNumber: drivers.plateNumber,
        violationCount,
      })
      .from(violations)
      .innerJoin(drivers, eq(violations.driverId, drivers.id))
      .where(rangeCondition)
      .groupBy(drivers.id, drivers.fullName, drivers.plateNumber)
      .having(sql`count(*) > 1`)
      .orderBy(desc(violationCount))
      .limit(limit);

    return {
      startDate: range.startDate,
      endDate: range.endDate,
      offenders: offenders.map((row) => ({
        driverId: row.driverId,
        driverName: row.driverName,
        plateNumber: row.plateNumber,
        violationCount: Number(row.violationCount ?? 0),
      })),
    };
  }

  async getRecentViolations(
    query: RecentViolationsQuery,
  ): Promise<RecentViolationsResponse> {
    const limit = query.limit ?? 6;

    const totalDriversResult = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(drivers);

    const todayStart = toRangeStart(new Date());
    const todayEnd = toRangeEnd(new Date());

    const violationsTodayResult = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(violations)
      .where(this.rangeFilter(todayStart, todayEnd));

    const items = await this.db
      .select({
        id: violations.id,
        violationType: violations.violationType,
        status: violations.status,
        plateNumber: violations.plateNumber,
        violationAt: violations.violationAt,
        createdAt: violations.createdAt,
        driverId: drivers.id,
        driverName: drivers.fullName,
        driverPlateNumber: drivers.plateNumber,
      })
      .from(violations)
      .leftJoin(drivers, eq(violations.driverId, drivers.id))
      .orderBy(desc(violations.violationAt))
      .limit(limit);

    return {
      totalDrivers: Number(totalDriversResult[0]?.count ?? 0),
      violationsToday: Number(violationsTodayResult[0]?.count ?? 0),
      recentViolations: items.map((row) => ({
        id: row.id,
        violationType: row.violationType,
        status: row.status,
        violationAt: row.violationAt,
        createdAt: row.createdAt,
        plateNumber: row.plateNumber,
        driver:
          row.driverId && row.driverName
            ? {
                id: row.driverId,
                fullName: row.driverName,
                plateNumber: row.driverPlateNumber ?? row.plateNumber,
              }
            : null,
      })),
    };
  }

  private resolveRange(startDate?: Date, endDate?: Date) {
    const today = new Date();
    const resolvedEnd = endDate ? new Date(endDate) : today;
    const resolvedStart = startDate
      ? new Date(startDate)
      : new Date(resolvedEnd);

    if (!startDate) {
      resolvedStart.setDate(resolvedEnd.getDate() - (DEFAULT_RANGE_DAYS - 1));
    }

    if (resolvedStart > resolvedEnd) {
      const temp = new Date(resolvedStart);
      resolvedStart.setTime(resolvedEnd.getTime());
      resolvedEnd.setTime(temp.getTime());
    }

    return {
      start: toRangeStart(resolvedStart),
      end: toRangeEnd(resolvedEnd),
      startDate: toDateString(resolvedStart),
      endDate: toDateString(resolvedEnd),
    };
  }

  private rangeFilter(start: Date, end: Date): SQL {
    const condition = and(
      gte(violations.violationAt, start),
      lte(violations.violationAt, end),
    );

    if (!condition) {
      throw new Error("Range filter requires bounds");
    }

    return condition;
  }

  private async getRepeatedOffendersCount(rangeCondition: SQL) {
    const offenders = this.db
      .select({
        driverId: violations.driverId,
        count: sql<number>`count(*)`,
      })
      .from(violations)
      .where(and(rangeCondition, sql`${violations.driverId} is not null`))
      .groupBy(violations.driverId)
      .having(sql`count(*) > 1`)
      .as("offenders");

    const result = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(offenders);

    return Number(result[0]?.count ?? 0);
  }
}
