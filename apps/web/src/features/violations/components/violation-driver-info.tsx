import type { ViolationDriverDetail } from "../types/violation";
import { DetailItem } from "./detail-item";

type ViolationDriverInfoProps = {
  driver: ViolationDriverDetail | null;
};

const notAvailable = "Not Available";

export function ViolationDriverInfo({ driver }: ViolationDriverInfoProps) {
  return (
    <div className="rounded-xl border border-zinc-200/80 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DetailItem label="Full name" value={driver?.fullName ?? "Unknown Driver"} />
        <DetailItem label="Phone number" value={driver?.phoneNumber ?? notAvailable} />
        <DetailItem label="Email" value={driver?.email ?? notAvailable} />
        <DetailItem label="National ID" value={driver?.nationalId ?? notAvailable} />
        <DetailItem label="Plate number" value={driver?.plateNumber ?? "Unknown"} />
        <DetailItem label="Driver license" value={driver?.driverLicenseNumber ?? notAvailable} />
      </div>
    </div>
  );
}
