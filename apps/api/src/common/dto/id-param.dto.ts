import { z } from "zod";
import { createZodDto } from "./zod.dto";

export const idParamSchema = z.object({
  id: z.string().uuid(),
});

export class IdParamDto extends createZodDto(idParamSchema) {}
export type IdParam = z.infer<typeof idParamSchema>;
