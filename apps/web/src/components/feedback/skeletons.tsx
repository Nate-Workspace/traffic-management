import { cn } from "@/lib/cn";
import { surfaces } from "@/lib/ui/surfaces";

type SkeletonProps = {
  className?: string;
};

export const PageSkeleton = ({ className }: SkeletonProps) => (
  <div className={cn("space-y-5", className)}>
    <div className="space-y-2">
      <div className="skeleton-shimmer h-7 w-48 rounded-lg" />
      <div className="skeleton-shimmer h-4 w-72 max-w-full rounded-md" />
    </div>
    <div className={cn(surfaces.card, "p-4")}>
      <div className="skeleton-shimmer h-10 w-full rounded-lg" />
    </div>
    <div className="skeleton-shimmer h-80 w-full rounded-xl" />
  </div>
);

export const CardSkeleton = ({ className }: SkeletonProps) => (
  <div className={cn(surfaces.card, "p-5", className)}>
    <div className="skeleton-shimmer h-3 w-24 rounded-full" />
    <div className="skeleton-shimmer mt-4 h-8 w-28 rounded-lg" />
    <div className="skeleton-shimmer mt-4 h-3 w-20 rounded-full" />
  </div>
);

export const FormSkeleton = ({ className }: SkeletonProps) => (
  <div className={cn("space-y-5", className)}>
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={`field-${index}`} className="space-y-2">
        <div className="skeleton-shimmer h-3 w-24 rounded-full" />
        <div className="skeleton-shimmer h-10 w-full rounded-lg" />
      </div>
    ))}
  </div>
);

export const DrawerSkeleton = ({ className }: SkeletonProps) => (
  <div className={cn("space-y-6 p-6", className)}>
    <div className="skeleton-shimmer h-6 w-40 rounded-lg" />
    <FormSkeleton />
  </div>
);
