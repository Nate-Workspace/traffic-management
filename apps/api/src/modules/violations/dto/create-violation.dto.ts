import { z } from "zod";
import { createZodDto } from "@common/dto/zod.dto";
import {
  violationStatusValues,
  violationTypeValues,
} from "../schema/violations.schema";

export const createViolationSchema = z.object({
  plateNumber: z.string().transform((value) => value.trim()),
  violationType: z.enum(violationTypeValues),
  imageUrls: z.array(z.string().url()).default([]),
  violationAt: z.coerce.date(),
  status: z.enum(violationStatusValues).default("PENDING"),
});

export class CreateViolationDto extends createZodDto(createViolationSchema) {}
export type CreateViolationInput = z.infer<typeof createViolationSchema>;
