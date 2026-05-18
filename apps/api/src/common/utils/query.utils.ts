import {
  and,
  asc,
  desc,
  ilike,
  or,
  type AnyColumn,
  type SQL,
} from "drizzle-orm";

export type SortOrder = "asc" | "desc";

export type PaginationInput = {
  page: number;
  limit: number;
};

export const getPagination = ({ page, limit }: PaginationInput) => ({
  page,
  limit,
  offset: (page - 1) * limit,
});

export const buildPaginationMeta = (
  page: number,
  limit: number,
  total: number,
) => ({
  page,
  limit,
  total,
  totalPages: total === 0 ? 0 : Math.ceil(total / limit),
});

export const buildSearchCondition = (
  search: string | undefined,
  columns: AnyColumn[],
) => {
  if (!search) {
    return undefined;
  }

  const term = `%${search}%`;
  return or(...columns.map((column) => ilike(column, term)));
};

export const combineFilters = (filters: Array<SQL | undefined>) => {
  const active = filters.filter(Boolean) as SQL[];
  return active.length > 0 ? and(...active) : undefined;
};

export const buildSort = <T extends AnyColumn>(
  sortBy: string,
  sortOrder: SortOrder,
  map: Record<string, T>,
) => {
  const fallbackKey = Object.keys(map)[0];
  const column = (sortBy in map ? map[sortBy] : undefined) ??
    (fallbackKey ? map[fallbackKey] : undefined);

  if (!column) {
    throw new Error("Sort map is empty");
  }
  return sortOrder === "asc" ? asc(column) : desc(column);
};
