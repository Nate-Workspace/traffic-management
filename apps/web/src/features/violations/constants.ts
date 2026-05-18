import type { ViolationStatus, ViolationType } from "./types/violation";

export const violationFilterKeys = [
  "status",
  "violationAtFrom",
  "violationAtTo",
  "createdAtFrom",
  "createdAtTo",
] as const;

export const violationsEmptyState = {
  title: "No violations logged",
  description: "Captured violations will appear here once records arrive.",
};

export const violationsSearchEmptyState = {
  title: "No matches found",
  description: "Try adjusting your search or filters.",
};

export const violationImagesEmptyState = {
  title: "No evidence images",
  description: "This violation does not have any uploaded images.",
};

export const violationsRelatedEmptyState = {
  title: "No related violations",
  description: "This driver has no other recent violations.",
};

export const violationStatusOptions: Array<{ value: ViolationStatus; label: string }> = [
  { value: "PENDING", label: "Pending" },
  { value: "NOTIFIED", label: "Notified" },
  { value: "REVIEWED", label: "Reviewed" },
  { value: "DISMISSED", label: "Dismissed" },
];

export const violationStatusColors: Record<ViolationStatus, string> = {
  PENDING: "yellow",
  NOTIFIED: "blue",
  REVIEWED: "teal",
  DISMISSED: "gray",
};

export const violationTypeLabels: Record<ViolationType, string> = {
  RED_LIGHT: "Red light",
};

export const getViolationTypeLabel = (type: ViolationType) =>
  violationTypeLabels[type] ?? type;
