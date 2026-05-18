export class ApiClientError extends Error {
  status: number;
  code: string;
  details?: unknown;

  constructor(message: string, options: { status: number; code: string; details?: unknown }) {
    super(message);
    this.status = options.status;
    this.code = options.code;
    this.details = options.details;
  }
}

export const getApiErrorMessage = (error: unknown, fallback = "Something went wrong") => {
  if (error instanceof ApiClientError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};
