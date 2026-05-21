import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { surfaces } from "@/lib/ui/surfaces";

export type DataTableColumn<T> = {
  key: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  className?: string;
  headerClassName?: string;
};

type DataTableProps<T> = {
  columns: Array<DataTableColumn<T>>;
  data: T[];
  rowKey: (row: T, index: number) => string;
  className?: string;
};

export function DataTable<T>({
  columns,
  data,
  rowKey,
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn(surfaces.table, "overflow-x-auto", className)}>
      <table className="w-full min-w-[640px] border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-zinc-200/80 bg-zinc-50/90">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "px-4 py-2.5 text-left text-[11px] font-medium tracking-wide text-zinc-500",
                  column.headerClassName,
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100/90 bg-white">
          {data.map((row, index) => (
            <tr
              key={rowKey(row, index)}
              className="transition-colors duration-100 hover:bg-zinc-50/80"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    "px-4 py-3 align-middle text-zinc-700",
                    column.className,
                  )}
                >
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
