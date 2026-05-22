import { z } from "zod";
import { createZodDto } from "@common/dto/zod.dto";

export const updateViolationStatusSchema = z.object({
  status: z.enum(["PENDING", "REVIEWED", "DISMISSED"]),
});

export class UpdateViolationStatusDto extends createZodDto(
  updateViolationStatusSchema,
) {}
