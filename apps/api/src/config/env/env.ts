import { z } from "zod";
import { envSchema } from "./env.schema";

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);

export const validateEnv = (config: Record<string, unknown>) =>
  envSchema.parse(config);
