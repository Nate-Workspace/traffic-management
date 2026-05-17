import type { NextFunction, Request, Response } from "express";
import { randomUUID } from "crypto";
import { REQUEST_ID_HEADER } from "../constants/http.constants";

export function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const incoming = req.headers[REQUEST_ID_HEADER];
  const requestId =
    typeof incoming === "string" && incoming.trim().length > 0
      ? incoming
      : randomUUID();

  req.id = requestId;
  res.setHeader(REQUEST_ID_HEADER, requestId);
  next();
}
