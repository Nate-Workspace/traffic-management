import { Injectable, type ArgumentMetadata, type PipeTransform } from "@nestjs/common";
import type { ZodSchema } from "zod";
import { ZodValidationError } from "../errors/zod-validation.error";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    const schema = (metadata?.metatype as { schema?: ZodSchema } | undefined)
      ?.schema;
    if (!schema) {
      return value;
    }

    const parsed = schema.safeParse(value);
    if (!parsed.success) {
      throw new ZodValidationError(parsed.error);
    }

    return parsed.data;
  }
}
