import { z } from "zod";
import { createZodDto } from "@common/dto/zod.dto";
import { paginationSchema } from "@common/dto/pagination.dto";
import { searchSchema } from "@common/dto/search.dto";
import { sortOrderSchema } from "@common/dto/sort.dto";

export const driverSortFields = [
  "createdAt",
  "updatedAt",
  "fullName",
] as const;

export const driversQuerySchema = paginationSchema
  .merge(searchSchema)
  .merge(
    z.object({
      sortBy: z.enum(driverSortFields).default("createdAt"),
      sortOrder: sortOrderSchema,
    }),
  );

export class DriversQueryDto extends createZodDto(driversQuerySchema) {}
export type DriversQuery = z.infer<typeof driversQuerySchema>;
