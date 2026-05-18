import { formatDateTime, formatDateTimeWithTime } from "@/lib/date";
import { getViolationTypeLabel } from "../constants";
import type { ViolationDetail, ViolationDriverDetail } from "../types/violation";
import { DetailItem } from "./detail-item";
import { ViolationImageGallery } from "./violation-image-gallery";
import { ViolationStatusBadge } from "./violation-status-badge";

type ViolationEvidenceProps = {
  violation: ViolationDetail["violation"];
  driver: ViolationDriverDetail;
};

export function ViolationEvidence({ violation, driver }: ViolationEvidenceProps) {
  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
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
          value={`${driver.fullName} (${driver.plateNumber})`}
        />
      </div>
    </div>
  );
}
