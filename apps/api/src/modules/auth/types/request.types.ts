import type { Request } from "express";
import type { JwtPayload } from "./auth.types";

export type RequestWithAdmin = Request & {
  admin?: JwtPayload;
};
