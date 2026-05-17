import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import type { Request } from "express";
import type { ApiSuccessResponse } from "../types/api-response";
import type { RequestWithId } from "../types/request-context";

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiSuccessResponse<unknown>> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<RequestWithId & { version?: string }>();
    const baseMeta = {
      timestamp: new Date().toISOString(),
      path: request.originalUrl || request.url,
      requestId: request.id,
      version: request.version,
    };

    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
        meta: baseMeta,
      })),
    );
  }
}
