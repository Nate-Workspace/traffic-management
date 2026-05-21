"use client";

import { SegmentedControl } from "@mantine/core";
import { DateField } from "@/components/forms/date-field";

type DateRangePickerProps = {
  startDate: string;
  endDate: string;
  onRangeChange: (startDate: string, endDate: string) => void;
};

const buildRange = (days: number) => {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - (days - 1));

  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
};

export function DateRangePicker({
  startDate,
  endDate,
  onRangeChange,
}: DateRangePickerProps) {
  const handleStartChange = (value: string | undefined) => {
    const nextStart = value ?? "";
    const nextEnd = endDate && nextStart > endDate ? nextStart : endDate;
    onRangeChange(nextStart, nextEnd);
  };

  const handleEndChange = (value: string | undefined) => {
    const nextEnd = value ?? "";
    const nextStart = startDate && nextEnd < startDate ? nextEnd : startDate;
    onRangeChange(nextStart, nextEnd);
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-zinc-200/70 bg-white px-3 py-3 shadow-sm sm:flex-row sm:flex-wrap sm:items-end">
      <DateField
        label="Start date"
        placeholder="Pick start date"
        value={startDate}
        onChange={handleStartChange}
        className="min-w-[160px] flex-1"
      />
      <DateField
        label="End date"
        placeholder="Pick end date"
        value={endDate}
        onChange={handleEndChange}
        className="min-w-[160px] flex-1"
      />
      <SegmentedControl
        size="xs"
        className="sm:mb-1"
        data={[
          { label: "7d", value: "7" },
          { label: "30d", value: "30" },
          { label: "90d", value: "90" },
        ]}
        onChange={(value) => {
          const range = buildRange(Number(value));
          onRangeChange(range.startDate, range.endDate);
        }}
      />
    </div>
  );
}
