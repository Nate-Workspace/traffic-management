import { z } from "zod";
import { createZodDto } from "./zod.dto";

export const sortOrderSchema = z.enum(["asc", "desc"]).default("desc");

export const sortSchema = z.object({
  sortOrder: sortOrderSchema,
});

export class SortQueryDto extends createZodDto(sortSchema) {}
export type SortQuery = z.infer<typeof sortSchema>;
