export type ApiMeta = {
  timestamp: string;
  path: string;
  requestId?: string;
  version?: string;
};

export type ApiError = {
  code: string;
  message: string;
  details?: unknown;
};

export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
  meta: ApiMeta;
};

export type ApiErrorResponse = {
  success: false;
  error: ApiError;
  meta: ApiMeta;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export type PaginatedResponse<T> = {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
