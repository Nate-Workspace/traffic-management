import { sql } from "drizzle-orm";
import { index, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { timestamps, uuidPrimaryKey } from "../../../database/schema/helpers";
import { drivers } from "../../drivers/schema/drivers.schema";

export const violationStatusValues = [
  "PENDING",
  "NOTIFIED",
  "REVIEWED",
  "DISMISSED",
] as const;

export const violationTypeValues = ["RED_LIGHT"] as const;

export type ViolationType = (typeof violationTypeValues)[number];

export const notificationDeliveryStatusValues = [
  "NOT_SENT",
  "SENT",
  "FAILED",
] as const;

export const notificationDeliveryStatusEnum = pgEnum(
  "notification_delivery_status",
  notificationDeliveryStatusValues,
);

export const violationStatusEnum = pgEnum(
  "violation_status",
  violationStatusValues,
);

export const violationTypeEnum = pgEnum(
  "violation_type",
  violationTypeValues,
);

export const violations = pgTable(
  "violations",
  {
    id: uuidPrimaryKey(),
    driverId: uuid("driver_id")
      .notNull()
      .references(() => drivers.id, { onDelete: "cascade" }),
    violationType: violationTypeEnum("violation_type").notNull(),
    imageUrls: text("image_urls")
      .array()
      .notNull()
      .default(sql`ARRAY[]::text[]`),
    violationAt: timestamp("violation_at", { withTimezone: true }).notNull(),
    status: violationStatusEnum("status").notNull().default("PENDING"),
    notificationStatus: notificationDeliveryStatusEnum("notification_status")
      .notNull()
      .default("NOT_SENT"),
    lastNotifiedAt: timestamp("last_notified_at", { withTimezone: true }),
    ...timestamps,
  },
  (table) => ({
    driverIdx: index("violations_driver_id_idx").on(table.driverId),
    statusIdx: index("violations_status_idx").on(table.status),
    typeIdx: index("violations_type_idx").on(table.violationType),
    violationAtIdx: index("violations_violation_at_idx").on(table.violationAt),
    createdAtIdx: index("violations_created_at_idx").on(table.createdAt),
  }),
);
