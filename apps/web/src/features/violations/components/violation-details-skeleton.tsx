import { Skeleton } from "@mantine/core";
import { TableSkeleton } from "@/components/tables/table-skeleton";

export function ViolationDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton height={24} width={240} />
        <Skeleton height={16} width={360} />
      </div>

      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
        <Skeleton height={20} width={180} />
        <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
          <Skeleton height={240} />
          <div className="grid grid-cols-2 gap-2">
            <Skeleton height={110} />
            <Skeleton height={110} />
            <Skeleton height={110} />
            <Skeleton height={110} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton height={56} />
          <Skeleton height={56} />
          <Skeleton height={56} />
          <Skeleton height={56} />
          <Skeleton height={56} />
          <Skeleton height={56} />
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
        <Skeleton height={20} width={180} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton height={56} />
          <Skeleton height={56} />
          <Skeleton height={56} />
          <Skeleton height={56} />
          <Skeleton height={56} />
          <Skeleton height={56} />
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
        <Skeleton height={20} width={200} />
        <TableSkeleton rows={4} columns={4} />
      </div>
    </div>
  );
}
