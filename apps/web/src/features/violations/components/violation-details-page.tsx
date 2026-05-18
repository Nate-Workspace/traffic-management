"use client";

import { Text } from "@mantine/core";
import { useParams } from "next/navigation";
import { EmptyState } from "@/components/feedback/empty-state";
import { useViolationQuery } from "../hooks/use-violation-query";
import { RelatedViolations } from "./related-violations";
import { ViolationDetailsSkeleton } from "./violation-details-skeleton";
import { ViolationDriverInfo } from "./violation-driver-info";
import { ViolationEvidence } from "./violation-evidence";

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
    <div className="space-y-6">
      <div>
        <Text size="xl" fw={600} c="dark">
          Violation details
        </Text>
        <Text size="sm" c="dimmed">
          Review evidence, driver context, and related incidents.
        </Text>
      </div>

      <section className="space-y-4">
        <Text size="lg" fw={600} c="dark">
          Violation evidence
        </Text>
        <ViolationEvidence violation={data.violation} driver={data.driver} />
      </section>

      <section className="space-y-4">
        <Text size="lg" fw={600} c="dark">
          Driver information
        </Text>
        <ViolationDriverInfo driver={data.driver} />
      </section>

      <section className="space-y-4">
        <Text size="lg" fw={600} c="dark">
          Related violations
        </Text>
        <RelatedViolations violations={data.relatedViolations} />
      </section>
    </div>
  );
}
