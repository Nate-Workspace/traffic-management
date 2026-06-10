import type { drivers } from "../schema/drivers.schema";

export type Driver = typeof drivers.$inferSelect;
export type NewDriver = typeof drivers.$inferInsert;

export type DriverStats = {
  totalViolations: number;
  pendingViolations: number;
  reviewedViolations: number;
  lastViolationAt: string | null;
};
