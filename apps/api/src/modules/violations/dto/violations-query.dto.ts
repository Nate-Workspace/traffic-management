import { z } from "zod";
import { createZodDto } from "@common/dto/zod.dto";
import { paginationSchema } from "@common/dto/pagination.dto";
import { searchSchema } from "@common/dto/search.dto";
import { sortOrderSchema } from "@common/dto/sort.dto";
import {
  violationStatusValues,
  violationTypeValues,
} from "../schema/violations.schema";

export const violationSortFields = [
  "createdAt",
  "violationAt",
  "status",
] as const;

export const violationsQuerySchema = paginationSchema
  .merge(searchSchema)
  .merge(
    z.object({
      sortBy: z.enum(violationSortFields).default("createdAt"),
      sortOrder: sortOrderSchema,
      status: z.enum(violationStatusValues).optional(),
      violationType: z.enum(violationTypeValues).optional(),
      plateNumber: z.string().trim().min(1).optional(),
      driverId: z.string().uuid().optional(),
    }),
  );

export class ViolationsQueryDto extends createZodDto(violationsQuerySchema) {}
export type ViolationsQuery = z.infer<typeof violationsQuerySchema>;
