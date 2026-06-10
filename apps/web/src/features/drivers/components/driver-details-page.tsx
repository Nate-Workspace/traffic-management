"use client";

import { useParams } from "next/navigation";
import { EmptyState } from "@/components/feedback/empty-state";
import { useDriverQuery } from "../hooks/use-driver-query";
import { useDriverStatsQuery } from "../hooks/use-driver-stats-query";
import { driverNotFoundState } from "../constants";
import { DriverActivityCard } from "./driver-activity-card";
import { DriverDetailsSkeleton } from "./driver-details-skeleton";
import { DriverProfileCard } from "./driver-profile-card";
import { DriverStatsSection } from "./driver-stats-section";
import { DriverViolationsSection } from "./driver-violations-section";

export function DriverDetailsPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : params?.id?.[0];

  const { data: driver, isLoading: isDriverLoading } = useDriverQuery(id);
  const { data: stats, isLoading: isStatsLoading } = useDriverStatsQuery(id);

  if (isDriverLoading) {
    return <DriverDetailsSkeleton />;
  }

  if (!driver) {
    return (
      <EmptyState
        title={driverNotFoundState.title}
        description={driverNotFoundState.description}
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="page-header">
        <h1 className="page-title">{driver.fullName}</h1>
        <p className="page-description">
          Plate {driver.plateNumber} · Driver profile and violation history
        </p>
      </div>

      <DriverProfileCard driver={driver} />

      <DriverStatsSection stats={stats} isLoading={isStatsLoading} />

      <DriverViolationsSection driverId={driver.id} />

      <DriverActivityCard
        driver={driver}
        stats={stats}
        isLoading={isStatsLoading}
      />
    </div>
  );
}
