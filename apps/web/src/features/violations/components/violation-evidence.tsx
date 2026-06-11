import { formatDateTime, formatDateTimeWithTime } from "@/lib/date";
import { getViolationTypeLabel } from "../constants";
import type { ViolationDetail, ViolationDriverDetail } from "../types/violation";
import { DetailItem } from "./detail-item";
import { ViolationImageGallery } from "./violation-image-gallery";
import { ViolationStatusBadge } from "./violation-status-badge";

type ViolationEvidenceProps = {
  violation: ViolationDetail["violation"];
  driver: ViolationDriverDetail | null;
};

const formatUnknownValue = (value: string | null | undefined) => {
  const trimmed = value?.trim();
  if (!trimmed || trimmed.toLowerCase() === "unknown") {
    return "Unknown";
  }

  return trimmed;
};

export function ViolationEvidence({ violation, driver }: ViolationEvidenceProps) {
  const driverName = driver?.fullName?.trim() || "Unknown Driver";
  const plateNumber = formatUnknownValue(driver?.plateNumber ?? violation.plateNumber);

  return (
    <div className="space-y-4 rounded-xl border border-zinc-200/80 bg-white p-4 shadow-sm sm:p-5">
      <ViolationImageGallery imageUrls={violation.imageUrls} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DetailItem
          label="Violation type"
          value={getViolationTypeLabel(violation.violationType)}
        />
        <DetailItem label="Status" value={<ViolationStatusBadge status={violation.status} />} />
        <DetailItem
          label="Violation time"
          value={formatDateTimeWithTime(violation.violationAt)}
        />
        <DetailItem label="Created at" value={formatDateTime(violation.createdAt)} />
        <DetailItem label="Updated at" value={formatDateTime(violation.updatedAt)} />
        <DetailItem
          label="Driver"
          value={`${driverName} (${plateNumber})`}
        />
      </div>
    </div>
  );
}
