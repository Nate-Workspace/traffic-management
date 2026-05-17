import { z } from "zod";
import { createZodDto } from "@common/dto/zod.dto";

export const createDriverSchema = z.object({
  fullName: z.string().min(2).max(200),
  email: z.string().email(),
  phoneNumber: z.string().min(7).max(32),
  nationalId: z.string().min(4).max(64),
  plateNumber: z.string().min(3).max(32),
  driverLicenseNumber: z.string().min(4).max(64),
});

export class CreateDriverDto extends createZodDto(createDriverSchema) {}
export type CreateDriverInput = z.infer<typeof createDriverSchema>;
