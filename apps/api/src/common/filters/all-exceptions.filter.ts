import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import type { Response } from "express";
import { ZodValidationError } from "../errors/zod-validation.error";
import { REQUEST_ID_HEADER } from "../constants/http.constants";
import type { ApiErrorResponse } from "../types/api-response";
import type { RequestWithId } from "../types/request-context";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<RequestWithId>();
    const status = this.resolveStatus(exception);
    const error = this.resolveError(exception);
    const payload: ApiErrorResponse = {
      success: false,
      error,
      meta: {
        timestamp: new Date().toISOString(),
        path: request.url,
        requestId: request.id,
      },
    };

    if (status >= 500) {
      this.logger.error(
        `${request.method} ${request.url} ${status} - ${error.message}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    }

    if (request.id) {
      response.setHeader(REQUEST_ID_HEADER, request.id);
    }

    response.status(status).json(payload);
  }

  private resolveStatus(exception: unknown) {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private resolveError(exception: unknown) {
    if (exception instanceof ZodValidationError) {
      return {
        code: "validation_error",
        message: "Validation failed",
        details: exception.getResponse(),
      };
    }

    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (typeof response === "string") {
        return {
          code: "http_exception",
          message: response,
        };
      }

      if (response && typeof response === "object") {
        const payload = response as Record<string, unknown>;
        return {
          code: (payload.code as string) ?? "http_exception",
          message: (payload.message as string) ?? exception.message,
          details: payload.issues ?? payload.details ?? payload.error,
        };
      }

      return {
        code: "http_exception",
        message: exception.message,
      };
    }

    if (exception instanceof Error) {
      return {
        code: "internal_error",
        message: exception.message || "Unexpected error",
      };
    }

    return {
      code: "internal_error",
      message: "Unexpected error",
    };
  }
}
