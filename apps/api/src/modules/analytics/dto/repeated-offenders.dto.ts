import { z } from "zod";
import { createZodDto } from "@common/dto/zod.dto";
import { analyticsRangeSchema } from "./analytics-range.dto";

export const repeatedOffendersSchema = analyticsRangeSchema.merge(
  z.object({
    limit: z.coerce.number().int().positive().max(20).default(6),
  }),
);

export class RepeatedOffendersQueryDto extends createZodDto(repeatedOffendersSchema) {}
export type RepeatedOffendersQuery = z.infer<typeof repeatedOffendersSchema>;
