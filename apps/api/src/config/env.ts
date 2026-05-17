import { envSchema } from "./env.schema";

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const formatted = parsed.error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));

  throw new Error(
    `Invalid environment variables:\n${JSON.stringify(formatted, null, 2)}`,
  );
}

export const env = parsed.data;
export type Env = typeof env;
