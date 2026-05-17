import { z } from "zod";
import { createZodDto } from "./zod.dto";

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export class PaginationQueryDto extends createZodDto(paginationSchema) {}
export type PaginationQuery = z.infer<typeof paginationSchema>;
