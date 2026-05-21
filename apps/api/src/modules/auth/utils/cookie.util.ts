import type { CookieOptions, Request, Response } from "express";

export type AuthCookieConfig = {
  name: string;
  secure: boolean;
  sameSite: "strict" | "lax" | "none";
  maxAgeMs: number;
};

export const buildAuthCookieOptions = (
  config: AuthCookieConfig,
): CookieOptions => ({
  httpOnly: true,
  secure: config.secure,
  sameSite: config.sameSite,
  maxAge: config.maxAgeMs,
  path: "/",
});

export const setAuthCookie = (
  response: Response,
  token: string,
  config: AuthCookieConfig,
) => {
  response.cookie(config.name, token, buildAuthCookieOptions(config));
};

export const clearAuthCookie = (response: Response, config: AuthCookieConfig) => {
  response.clearCookie(config.name, {
    httpOnly: true,
    secure: config.secure,
    sameSite: config.sameSite,
    path: "/",
  });
};

export const getAuthCookie = (request: Request, cookieName: string) => {
  const token = request.cookies?.[cookieName];
  return typeof token === "string" && token.length > 0 ? token : null;
};
