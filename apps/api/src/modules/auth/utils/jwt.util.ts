import { JwtService } from "@nestjs/jwt";
import type { JwtPayload } from "../types/auth.types";

export const signAccessToken = (
  jwtService: JwtService,
  payload: JwtPayload,
): string => jwtService.sign(payload);

export const verifyAccessToken = (
  jwtService: JwtService,
  token: string,
): JwtPayload | null => {
  try {
    return jwtService.verify<JwtPayload>(token);
  } catch {
    return null;
  }
};
