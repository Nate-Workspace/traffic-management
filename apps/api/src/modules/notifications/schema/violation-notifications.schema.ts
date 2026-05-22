import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { timestamps, uuidPrimaryKey } from "../../../database/schema/helpers";
import {
  notificationDeliveryStatusEnum,
  violations,
} from "../../violations/schema/violations.schema";

export const notificationChannelValues = ["EMAIL"] as const;

export const notificationChannelEnum = pgEnum(
  "notification_channel",
  notificationChannelValues,
);

export const violationNotifications = pgTable(
  "violation_notifications",
  {
    id: uuidPrimaryKey(),
    violationId: uuid("violation_id")
      .notNull()
      .references(() => violations.id, { onDelete: "cascade" }),
    channel: notificationChannelEnum("channel").notNull().default("EMAIL"),
    deliveryStatus: notificationDeliveryStatusEnum("delivery_status")
      .notNull()
      .default("NOT_SENT"),
    recipientEmail: varchar("recipient_email", { length: 255 }).notNull(),
    subject: text("subject").notNull(),
    failureReason: text("failure_reason"),
    attemptCount: integer("attempt_count").notNull().default(1),
    sentAt: timestamp("sent_at", { withTimezone: true }),
    ...timestamps,
  },
  (table) => ({
    violationIdx: index("violation_notifications_violation_id_idx").on(
      table.violationId,
    ),
    statusIdx: index("violation_notifications_delivery_status_idx").on(
      table.deliveryStatus,
    ),
    createdAtIdx: index("violation_notifications_created_at_idx").on(
      table.createdAt,
    ),
  }),
);
