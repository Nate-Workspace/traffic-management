import type { ZodSchema } from "zod";

export const zodResolver = <T>(schema: ZodSchema<T>) => (values: T) => {
  const result = schema.safeParse(values);

  if (result.success) {
    return {};
  }

  return result.error.flatten().fieldErrors;
};
