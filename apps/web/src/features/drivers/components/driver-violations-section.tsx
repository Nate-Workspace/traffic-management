"use client";

import { useMemo } from "react";
import type { UseQueryResult } from "@tanstack/react-query";
import { TablePagination } from "@/components/tables/table-pagination";
import { TableEmptyState } from "@/components/tables/table-empty-state";
import { TableSkeleton } from "@/components/tables/table-skeleton";
import { useTableQuery } from "@/hooks/use-table-query";
import { useViolationsQuery } from "@/features/violations/hooks/use-violations-query";
import type { ViolationsListResponse } from "@/features/violations/api/violations.api";
import type {
  DriverViolationSortField,
  NotificationDeliveryStatus,
  ViolationStatus,
} from "@/features/violations/types/violation";
import {
  driverViolationsEmptyState,
  driverViolationsFilterEmptyState,
  driverViolationsFilterKeys,
} from "../constants";
import { DriverViolationsFilters } from "./driver-violations-filters";
import { DriverViolationsTable } from "./driver-violations-table";

type DriverViolationsSectionProps = {
  driverId: string;
};

export function DriverViolationsSection({ driverId }: DriverViolationsSectionProps) {
  const {
    query,
    setPage,
    setLimit,
    setSort,
    setFilter,
    clearFilters,
  } = useTableQuery({
    defaultSortBy: "violationAt",
    filterKeys: driverViolationsFilterKeys,
  });

  const violationsQuery = useMemo(
    () => ({
      page: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      driverId,
      status: query.filters.status as ViolationStatus | undefined,
      notificationStatus: query.filters.notificationStatus as
        | NotificationDeliveryStatus
        | undefined,
    }),
    [driverId, query],
  );

  const { data, isLoading, isFetching } = useViolationsQuery(
    violationsQuery,
  ) as UseQueryResult<ViolationsListResponse>;

  const violations = data?.data ?? [];
  const totalPages = data?.totalPages ?? 0;
  const hasFilters = Object.keys(query.filters).length > 0;
  const emptyState = hasFilters
    ? driverViolationsFilterEmptyState
    : driverViolationsEmptyState;

  const handleSort = (field: DriverViolationSortField, order: "asc" | "desc") => {
    setSort(field, order);
  };

  return (
    <section className="space-y-3">
      <div>
        <h2 className="section-title">Violations</h2>
        <p className="mt-0.5 text-[13px] text-zinc-500">
          Incident history linked to this driver
        </p>
      </div>

      <DriverViolationsFilters
        filters={query.filters}
        onFilterChange={setFilter}
        onClear={clearFilters}
      />

      {isLoading ? (
        <TableSkeleton rows={5} columns={6} />
      ) : violations.length === 0 ? (
        <TableEmptyState title={emptyState.title} description={emptyState.description} />
      ) : (
        <DriverViolationsTable
          data={violations}
          sortBy={query.sortBy}
          sortOrder={query.sortOrder}
          onSort={handleSort}
        />
      )}

      {totalPages > 0 ? (
        <TablePagination
          page={query.page}
          limit={query.limit}
          totalPages={totalPages}
          onPageChange={setPage}
          onLimitChange={setLimit}
        />
      ) : null}

      {isFetching && !isLoading ? (
        <p className="text-[12px] text-zinc-400">Updating results…</p>
      ) : null}
    </section>
  );
}
