import { cn } from "@/lib/cn";

type SkeletonProps = {
  className?: string;
};

export const PageSkeleton = ({ className }: SkeletonProps) => (
  <div className={cn("space-y-4", className)}>
    <div className="h-6 w-48 animate-pulse rounded-full bg-slate-200" />
    <div className="h-4 w-72 animate-pulse rounded-full bg-slate-200" />
    <div className="h-80 w-full animate-pulse rounded-2xl bg-slate-100" />
  </div>
);

export const CardSkeleton = ({ className }: SkeletonProps) => (
  <div className={cn("rounded-2xl border border-slate-200 bg-white p-6", className)}>
    <div className="h-4 w-28 animate-pulse rounded-full bg-slate-200" />
    <div className="mt-4 h-8 w-32 animate-pulse rounded-full bg-slate-200" />
    <div className="mt-6 h-3 w-24 animate-pulse rounded-full bg-slate-100" />
  </div>
);

export const FormSkeleton = ({ className }: SkeletonProps) => (
  <div className={cn("space-y-4", className)}>
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={`field-${index}`} className="space-y-2">
        <div className="h-3 w-24 animate-pulse rounded-full bg-slate-200" />
        <div className="h-10 w-full animate-pulse rounded-xl bg-slate-100" />
      </div>
    ))}
  </div>
);

export const DrawerSkeleton = ({ className }: SkeletonProps) => (
  <div className={cn("space-y-6", className)}>
    <div className="h-6 w-40 animate-pulse rounded-full bg-slate-200" />
    <FormSkeleton />
  </div>
);
