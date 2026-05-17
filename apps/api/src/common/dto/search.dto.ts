import { z } from "zod";
import { createZodDto } from "./zod.dto";

export const searchSchema = z.object({
  search: z.string().trim().min(1).optional(),
});

export class SearchQueryDto extends createZodDto(searchSchema) {}
export type SearchQuery = z.infer<typeof searchSchema>;
