import { Injectable, type PipeTransform } from "@nestjs/common";
import type { ZodSchema } from "zod";
import { ZodValidationError } from "../errors/zod-validation.error";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: unknown) {
    const parsed = this.schema.safeParse(value);
    if (!parsed.success) {
      throw new ZodValidationError(parsed.error);
    }

    return parsed.data;
  }
}
