export type Driver = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  nationalId: string;
  plateNumber: string;
  driverLicenseNumber: string;
  createdAt: string;
  updatedAt: string;
};

export type DriversQueryParams = {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
