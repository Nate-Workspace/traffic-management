import { surfaces } from "@/lib/ui/surfaces";
import { formatDateTimeWithTime } from "@/lib/date";
import { DetailItem } from "@/features/violations/components/detail-item";
import type { Driver } from "../types/driver";

type DriverProfileCardProps = {
  driver: Driver;
};

const copyableValue = (value: string) => (
  <span className="select-all font-mono text-[13px] text-zinc-800">{value}</span>
);

export function DriverProfileCard({ driver }: DriverProfileCardProps) {
  return (
    <div className={surfaces.card}>
      <div className="border-b border-zinc-100/90 px-5 py-4">
        <h2 className="section-title">Driver profile</h2>
        <p className="mt-0.5 text-[13px] text-zinc-500">
          Registered vehicle operator and contact details
        </p>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
        <DetailItem label="Full name" value={copyableValue(driver.fullName)} />
        <DetailItem label="Phone number" value={copyableValue(driver.phoneNumber)} />
        <DetailItem label="Email" value={copyableValue(driver.email)} />
        <DetailItem label="National ID" value={copyableValue(driver.nationalId)} />
        <DetailItem
          label="Driver license number"
          value={copyableValue(driver.driverLicenseNumber)}
        />
        <DetailItem label="Plate number" value={copyableValue(driver.plateNumber)} />
        <DetailItem
          label="Created at"
          value={formatDateTimeWithTime(driver.createdAt)}
        />
        <DetailItem
          label="Updated at"
          value={formatDateTimeWithTime(driver.updatedAt)}
        />
      </div>
    </div>
  );
}
