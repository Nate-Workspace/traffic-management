"use client";

import { useEffect, useMemo, useState } from "react";
import type { UseQueryResult } from "@tanstack/react-query";
import { Text } from "@mantine/core";
import { TablePagination } from "@/components/tables/table-pagination";
import { TableEmptyState } from "@/components/tables/table-empty-state";
import { TableSkeleton } from "@/components/tables/table-skeleton";
import { useDebouncedInput } from "@/hooks/use-debounced-input";
import { useTableQuery } from "@/hooks/use-table-query";
import { useConfirm } from "@/hooks/use-confirm";
import { toastPromise } from "@/components/feedback/toast";
import { getApiErrorMessage } from "@/services/api/errors";
import { DriversTable, type DriverSortField } from "./drivers-table";
import { DriverDrawer } from "./driver-drawer";
import { useDriversQuery } from "../hooks/use-drivers-query";
import type { DriversListResponse } from "../api/drivers.api";
import { useDriverMutations } from "../hooks/use-driver-mutations";
import type { Driver } from "../types/driver";
import { driversEmptyState, driversSearchEmptyState } from "../constants";
import { DriversQueryBar } from "./drivers-query-bar";

export function DriversPage() {
  const { query, setPage, setLimit, setSearch, setSort } = useTableQuery({
    defaultSortBy: "createdAt",
  });
  const [searchValue, setSearchValue] = useState(query.search ?? "");
  const [drawerMode, setDrawerMode] = useState<"create" | "edit" | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { confirm } = useConfirm();

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

  const driversQuery = useMemo(
    () => ({
      page: query.page,
      limit: query.limit,
      search: query.search,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    }),
    [query],
  );

  const { data, isLoading, isFetching } = useDriversQuery(
    driversQuery,
  ) as UseQueryResult<DriversListResponse>;
  const { deleteDriver } = useDriverMutations();

  const drivers = data?.data ?? [];
  const totalPages = data?.totalPages ?? 0;
  const showPagination = totalPages > 0;

  const openCreate = () => {
    setSelectedDriver(null);
    setDrawerMode("create");
  };

  const openEdit = (driver: Driver) => {
    setSelectedDriver(driver);
    setDrawerMode("edit");
  };

  const closeDrawer = () => {
    setDrawerMode(null);
  };

  const handleDelete = async (driver: Driver) => {
    const confirmed = await confirm({
      title: "Delete driver",
      message: `Delete ${driver.fullName}? This cannot be undone.`,
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
      confirmColor: "red",
    });

    if (!confirmed) {
      return;
    }

    setDeletingId(driver.id);

    try {
      await toastPromise(deleteDriver.mutateAsync(driver.id), {
        loading: { title: "Deleting driver", message: "Please wait" },
        success: { title: "Driver deleted", message: "Driver removed" },
        error: { title: "Delete failed", message: (error) => getApiErrorMessage(error) },
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleSort = (field: DriverSortField, order: "asc" | "desc") => {
    setSort(field, order);
  };

  const emptyState = query.search ? driversSearchEmptyState : driversEmptyState;

  return (
    <div className="space-y-6">
      <div>
        <Text size="xl" fw={600} c="dark">
          Drivers
        </Text>
        <Text size="sm" c="dimmed">
          Manage driver profiles and keep records consistent.
        </Text>
      </div>

      <DriversQueryBar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onCreate={openCreate}
        sortBy={query.sortBy ?? "createdAt"}
        sortOrder={query.sortOrder}
        onSortChange={(sortBy, sortOrder) => setSort(sortBy, sortOrder)}
      />

      {isLoading ? (
        <TableSkeleton rows={6} columns={8} />
      ) : drivers.length === 0 ? (
        <TableEmptyState title={emptyState.title} description={emptyState.description} />
      ) : (
        <DriversTable
          data={drivers}
          sortBy={query.sortBy}
          sortOrder={query.sortOrder}
          onSort={handleSort}
          onEdit={openEdit}
          onDelete={handleDelete}
          disableActions={Boolean(deletingId)}
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

      {drawerMode ? (
        <DriverDrawer
          opened={drawerMode !== null}
          mode={drawerMode}
          driver={selectedDriver}
          onClose={closeDrawer}
        />
      ) : null}
    </div>
  );
}
