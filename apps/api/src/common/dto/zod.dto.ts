import { z, type ZodSchema } from "zod";

export type ZodInfer<T extends ZodSchema> = z.infer<T>;

export const createZodDto = <T extends ZodSchema>(schema: T) => {
  class ZodDto {
    static schema = schema;
  }

  return ZodDto as new () => z.infer<T>;
};
