import { env } from "@/config/env";
import type { ApiResponse } from "./types";
import { ApiClientError } from "./errors";

export type ApiFetchOptions = RequestInit & {
  query?: Record<string, string | number | undefined>;
  skipUnauthorizedHandler?: boolean;
};

let unauthorizedHandler: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: (() => void) | null) => {
  unauthorizedHandler = handler;
};

const buildUrl = (path: string, query?: ApiFetchOptions["query"]) => {
  const base = env.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "");
  const url = new URL(path, base);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        return;
      }
      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
};

export const apiFetch = async <T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> => {
  const { query, headers, skipUnauthorizedHandler, ...rest } = options;

  let response: Response;
  try {
    response = await fetch(buildUrl(path, query), {
      credentials: "include",
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
  } catch {
    throw new ApiClientError(
      "Unable to reach the API. Wait for the API to finish starting, then try again.",
      { status: 0, code: "network_error" },
    );
  }

  if (response.status === 401 && !skipUnauthorizedHandler) {
    unauthorizedHandler?.();
  }

  let payload: ApiResponse<T> | undefined;

  try {
    payload = (await response.json()) as ApiResponse<T>;
  } catch (error) {
    throw new ApiClientError("Invalid API response", {
      status: response.status,
      code: "invalid_response",
    });
  }

  if (!payload || !payload.success || !response.ok) {
    const errorPayload = payload && !payload.success ? payload.error : undefined;
    throw new ApiClientError(errorPayload?.message ?? "Request failed", {
      status: response.status,
      code: errorPayload?.code ?? "request_failed",
      details: errorPayload?.details,
    });
  }

  return payload.data;
};
