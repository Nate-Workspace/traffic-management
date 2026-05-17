import { index, pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { timestamps, uuidPrimaryKey } from "../../../database/schema/helpers";

export const drivers = pgTable(
  "drivers",
  {
    id: uuidPrimaryKey(),
    fullName: varchar("full_name", { length: 200 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phoneNumber: varchar("phone_number", { length: 32 }).notNull(),
    nationalId: varchar("national_id", { length: 64 }).notNull(),
    plateNumber: varchar("plate_number", { length: 32 }).notNull(),
    driverLicenseNumber: varchar("driver_license_number", { length: 64 }).notNull(),
    ...timestamps,
  },
  (table) => ({
    emailUnique: uniqueIndex("drivers_email_unique").on(table.email),
    plateUnique: uniqueIndex("drivers_plate_unique").on(table.plateNumber),
    nationalIdUnique: uniqueIndex("drivers_national_id_unique").on(table.nationalId),
    nameIdx: index("drivers_full_name_idx").on(table.fullName),
    phoneIdx: index("drivers_phone_number_idx").on(table.phoneNumber),
  }),
);
