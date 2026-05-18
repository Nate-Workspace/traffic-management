"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { QueryValue } from "@/lib/query-params";

export type QueryState = Record<string, QueryValue>;

export const useQueryState = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const current = useMemo(() => new URLSearchParams(searchParams), [searchParams]);

  const setQuery = useCallback(
    (next: QueryState, options?: { replace?: boolean }) => {
      const params = new URLSearchParams(current);

      Object.entries(next).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      const queryString = params.toString();
      const url = queryString.length > 0 ? `${pathname}?${queryString}` : pathname;

      if (options?.replace ?? true) {
        router.replace(url, { scroll: false });
      } else {
        router.push(url, { scroll: false });
      }
    },
    [current, pathname, router],
  );

  return {
    searchParams: current,
    setQuery,
  };
};
