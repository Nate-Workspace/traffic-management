import { z } from "zod";
import { createZodDto } from "@common/dto/zod.dto";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export class LoginDto extends createZodDto(loginSchema) {}
