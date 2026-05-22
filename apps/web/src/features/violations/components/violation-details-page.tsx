"use client";

import { useParams } from "next/navigation";
import { EmptyState } from "@/components/feedback/empty-state";
import { useViolationQuery } from "../hooks/use-violation-query";
import { RelatedViolations } from "./related-violations";
import { ViolationDetailsSkeleton } from "./violation-details-skeleton";
import { ViolationDriverInfo } from "./violation-driver-info";
import { ViolationEvidence } from "./violation-evidence";
import { ViolationOperationsPanel } from "./violation-operations-panel";

export function ViolationDetailsPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : params?.id?.[0];
  const { data, isLoading } = useViolationQuery(id);

  if (isLoading) {
    return <ViolationDetailsSkeleton />;
  }

  if (!data) {
    return (
      <EmptyState
        title="Violation not found"
        description="We could not load this violation record."
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="page-header">
        <h1 className="page-title">Violation details</h1>
        <p className="page-description">
          Review evidence, driver context, and related incidents.
        </p>
      </div>

      <ViolationOperationsPanel data={data} />

      <section className="space-y-3">
        <h2 className="section-title">Violation evidence</h2>
        <ViolationEvidence violation={data.violation} driver={data.driver} />
      </section>

      <section className="space-y-3">
        <h2 className="section-title">
          Driver information
        </h2>
        <ViolationDriverInfo driver={data.driver} />
      </section>

      <section className="space-y-3">
        <h2 className="section-title">
          Related violations
        </h2>
        <RelatedViolations violations={data.relatedViolations} />
      </section>
    </div>
  );
}
