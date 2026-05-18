export type ViolationStatus = "PENDING" | "NOTIFIED" | "REVIEWED" | "DISMISSED";
export type ViolationType = "RED_LIGHT";

export type ViolationDriverSummary = {
  id: string;
  fullName: string;
  plateNumber: string;
};

export type ViolationDriverDetail = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  nationalId: string;
  plateNumber: string;
  driverLicenseNumber: string;
};

export type ViolationListItem = {
  id: string;
  violationType: ViolationType;
  status: ViolationStatus;
  imageUrls: string[];
  violationAt: string;
  createdAt: string;
  updatedAt: string;
  driver: ViolationDriverSummary;
};

export type RelatedViolation = {
  id: string;
  violationType: ViolationType;
  status: ViolationStatus;
  violationAt: string;
  createdAt: string;
};

export type ViolationDetail = {
  violation: {
    id: string;
    violationType: ViolationType;
    status: ViolationStatus;
    imageUrls: string[];
    violationAt: string;
    createdAt: string;
    updatedAt: string;
  };
  driver: ViolationDriverDetail;
  relatedViolations: RelatedViolation[];
};

export type ViolationSortField = "driverName" | "violationAt" | "createdAt";

export type ViolationsQueryParams = {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: ViolationStatus;
  violationAtFrom?: string;
  violationAtTo?: string;
  createdAtFrom?: string;
  createdAtTo?: string;
  driverId?: string;
};
