import { z } from "zod";
import { createZodDto } from "@common/dto/zod.dto";

export const recentViolationsSchema = z.object({
  limit: z.coerce.number().int().positive().max(20).default(6),
});

export class RecentViolationsQueryDto extends createZodDto(recentViolationsSchema) {}
export type RecentViolationsQuery = z.infer<typeof recentViolationsSchema>;
