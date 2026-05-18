import { z } from "zod";
import { envSchema } from "./env.schema";

export type Env = z.infer<typeof envSchema>;

export const validateEnv = (config: Record<string, unknown>) =>
  envSchema.parse(config);

export const getEnv = () => envSchema.parse(process.env);
