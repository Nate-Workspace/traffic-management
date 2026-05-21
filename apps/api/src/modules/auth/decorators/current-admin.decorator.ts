import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { RequestWithAdmin } from "../types/request.types";

export const CurrentAdmin = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithAdmin>();
    return request.admin;
  },
);
