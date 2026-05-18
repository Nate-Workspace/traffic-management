import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

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
    <div className={cn("overflow-hidden rounded-xl border border-slate-200", className)}>
      <table className="w-full border-collapse text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn("px-4 py-3 font-semibold", column.headerClassName)}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {data.map((row, index) => (
            <tr key={rowKey(row, index)} className="hover:bg-slate-50">
              {columns.map((column) => (
                <td key={column.key} className={cn("px-4 py-3", column.className)}>
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
