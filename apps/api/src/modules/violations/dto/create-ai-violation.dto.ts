import { z } from "zod";
import { createZodDto } from "@common/dto/zod.dto";
import { violationTypeValues } from "../schema/violations.schema";

export const createAiViolationSchema = z.object({
  plateNumber: z.string().trim().min(3),
  timestamp: z.string().datetime(),
  imageUrls: z.array(z.string().url()).default([]),
  violationType: z.enum(violationTypeValues),
});

export class CreateAiViolationDto extends createZodDto(createAiViolationSchema) {}
export type CreateAiViolationInput = z.infer<typeof createAiViolationSchema>;
