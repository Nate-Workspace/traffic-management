import { z } from "zod";
import { createZodDto } from "@common/dto/zod.dto";

export const analyticsRangeSchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export class AnalyticsRangeDto extends createZodDto(analyticsRangeSchema) {}
export type AnalyticsRangeQuery = z.infer<typeof analyticsRangeSchema>;
