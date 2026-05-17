import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import type { Request, Response } from "express";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request & { id?: string }>();
    const response = httpContext.getResponse<Response>();
    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        const requestId = request.id ?? "";
        this.logger.log(
          `${request.method} ${request.originalUrl} ${response.statusCode} ${duration}ms ${requestId}`,
        );
      }),
      catchError((error) => {
        const duration = Date.now() - start;
        this.logger.error(
          `${request.method} ${request.originalUrl} ${response.statusCode} ${duration}ms`,
          error instanceof Error ? error.stack : undefined,
        );
        return throwError(() => error);
      }),
    );
  }
}
