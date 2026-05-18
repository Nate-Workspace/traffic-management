"use client";

import { useEffect, useMemo, useState } from "react";
import type { UseQueryResult } from "@tanstack/react-query";
import { Text } from "@mantine/core";
import { TablePagination } from "@/components/tables/table-pagination";
import { TableEmptyState } from "@/components/tables/table-empty-state";
import { TableSkeleton } from "@/components/tables/table-skeleton";
import { useDebouncedInput } from "@/hooks/use-debounced-input";
import { useTableQuery } from "@/hooks/use-table-query";
import { ViolationsQueryBar } from "./violations-query-bar";
import { ViolationsFilters } from "./violations-filters";
import { ViolationsTable } from "./violations-table";
import { useViolationsQuery } from "../hooks/use-violations-query";
import type { ViolationsListResponse } from "../api/violations.api";
import {
  violationFilterKeys,
  violationsEmptyState,
  violationsSearchEmptyState,
} from "../constants";
import type { ViolationSortField, ViolationStatus } from "../types/violation";

export function ViolationsPage() {
  const {
    query,
    setPage,
    setLimit,
    setSearch,
    setSort,
    setFilter,
    clearFilters,
  } = useTableQuery({
    defaultSortBy: "violationAt",
    filterKeys: violationFilterKeys,
  });
  const [searchValue, setSearchValue] = useState(query.search ?? "");

  const debouncedSearch = useDebouncedInput(searchValue, 350);

  useEffect(() => {
    const normalized = debouncedSearch.trim();
    const currentSearch = query.search ?? "";

    if (normalized === currentSearch) {
      return;
    }

    setSearch(normalized.length > 0 ? normalized : undefined);
  }, [debouncedSearch, query.search, setSearch]);

  useEffect(() => {
    setSearchValue(query.search ?? "");
  }, [query.search]);

  const violationsQuery = useMemo(
    () => ({
      page: query.page,
      limit: query.limit,
      search: query.search,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      status: query.filters.status as ViolationStatus | undefined,
      violationAtFrom: query.filters.violationAtFrom,
      violationAtTo: query.filters.violationAtTo,
      createdAtFrom: query.filters.createdAtFrom,
      createdAtTo: query.filters.createdAtTo,
    }),
    [query],
  );

  const { data, isLoading, isFetching } = useViolationsQuery(
    violationsQuery,
  ) as UseQueryResult<ViolationsListResponse>;

  const violations = data?.data ?? [];
  const totalPages = data?.totalPages ?? 0;
  const showPagination = totalPages > 0;
  const emptyState = query.search ? violationsSearchEmptyState : violationsEmptyState;

  const handleSort = (field: ViolationSortField, order: "asc" | "desc") => {
    setSort(field, order);
  };

  return (
    <div className="space-y-6">
      <div>
        <Text size="xl" fw={600} c="dark">
          Violations
        </Text>
        <Text size="sm" c="dimmed">
          Review evidence, monitor status, and track incident history.
        </Text>
      </div>

      <ViolationsQueryBar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        sortBy={query.sortBy ?? "violationAt"}
        sortOrder={query.sortOrder}
        onSortChange={(sortBy, sortOrder) => setSort(sortBy, sortOrder)}
      />

      <ViolationsFilters
        filters={query.filters}
        onFilterChange={setFilter}
        onClear={clearFilters}
      />

      {isLoading ? (
        <TableSkeleton rows={6} columns={7} />
      ) : violations.length === 0 ? (
        <TableEmptyState title={emptyState.title} description={emptyState.description} />
      ) : (
        <ViolationsTable
          data={violations}
          sortBy={query.sortBy}
          sortOrder={query.sortOrder}
          onSort={handleSort}
        />
      )}

      {showPagination ? (
        <TablePagination
          page={query.page}
          limit={query.limit}
          totalPages={totalPages}
          onPageChange={setPage}
          onLimitChange={setLimit}
        />
      ) : null}

      {isFetching && !isLoading ? (
        <Text size="xs" c="dimmed">
          Updating results...
        </Text>
      ) : null}
    </div>
  );
}
