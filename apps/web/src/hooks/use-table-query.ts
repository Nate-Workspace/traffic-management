"use client";

import { useMemo } from "react";
import { useQueryState } from "./use-query-state";
import { parseNumber, parseString } from "@/lib/query-params";
import { tableDefaults } from "@/constants/table";

export type SortOrder = "asc" | "desc";

export type TableQueryOptions = {
  defaultSortBy?: string;
  filterKeys?: string[];
};

export type TableQueryState = {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder: SortOrder;
  filters: Record<string, string>;
};

export const useTableQuery = (options: TableQueryOptions = {}) => {
  const { searchParams, setQuery } = useQueryState();

  const query = useMemo<TableQueryState>(() => {
    const page = parseNumber(searchParams.get("page"), tableDefaults.page);
    const limit = parseNumber(searchParams.get("limit"), tableDefaults.limit);
    const search = parseString(searchParams.get("search"));
    const sortBy = parseString(searchParams.get("sortBy")) ?? options.defaultSortBy;
    const sortOrder =
      (parseString(searchParams.get("sortOrder")) as SortOrder | undefined) ??
      tableDefaults.sortOrder;

    const filters: Record<string, string> = {};
    options.filterKeys?.forEach((key) => {
      const value = parseString(searchParams.get(key));
      if (value) {
        filters[key] = value;
      }
    });

    return {
      page,
      limit,
      search,
      sortBy,
      sortOrder,
      filters,
    };
  }, [options.defaultSortBy, options.filterKeys, searchParams]);

  const setPage = (page: number) => setQuery({ page });
  const setLimit = (limit: number) => setQuery({ limit, page: 1 });
  const setSearch = (search?: string) => setQuery({ search, page: 1 });
  const setSort = (sortBy: string, sortOrder: SortOrder) =>
    setQuery({ sortBy, sortOrder });
  const setFilter = (key: string, value?: string) =>
    setQuery({ [key]: value, page: 1 });
  const reset = () => {
    const filterReset = Object.fromEntries(
      (options.filterKeys ?? []).map((key) => [key, undefined]),
    );

    setQuery({
      page: tableDefaults.page,
      limit: tableDefaults.limit,
      search: undefined,
      sortBy: options.defaultSortBy,
      sortOrder: tableDefaults.sortOrder,
      ...filterReset,
    });
  };

  return {
    query,
    setPage,
    setLimit,
    setSearch,
    setSort,
    setFilter,
    reset,
  };
};
