import type { JwtPayload } from "../modules/auth/types/auth.types";

declare global {
  namespace Express {
    export interface Request {
      id?: string;
      admin?: JwtPayload;
    }
  }
}

export {};
