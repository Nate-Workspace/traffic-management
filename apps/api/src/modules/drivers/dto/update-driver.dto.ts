import { z } from "zod";
import { createDriverSchema } from "./create-driver.dto";
import { createZodDto } from "@common/dto/zod.dto";

export const updateDriverSchema = createDriverSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided",
  });

export class UpdateDriverDto extends createZodDto(updateDriverSchema) {}
export type UpdateDriverInput = z.infer<typeof updateDriverSchema>;
