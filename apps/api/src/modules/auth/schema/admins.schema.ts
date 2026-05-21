import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { timestamps, uuidPrimaryKey } from "../../../database/schema/helpers";

export const admins = pgTable(
  "admins",
  {
    id: uuidPrimaryKey(),
    fullName: varchar("full_name", { length: 200 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    ...timestamps,
  },
  (table) => ({
    emailUnique: uniqueIndex("admins_email_unique").on(table.email),
  }),
);
