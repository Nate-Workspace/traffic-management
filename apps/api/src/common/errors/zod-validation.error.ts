import { BadRequestException } from "@nestjs/common";
import type { ZodError } from "zod";

export class ZodValidationError extends BadRequestException {
  constructor(error: ZodError) {
    super({
      message: "Validation failed",
      issues: error.issues,
    });
  }
}
