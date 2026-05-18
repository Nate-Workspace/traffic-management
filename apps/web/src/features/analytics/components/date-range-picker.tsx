"use client";

import { Button, Group, TextInput } from "@mantine/core";

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
  const handleStartChange = (value: string) => {
    const nextStart = value;
    const nextEnd = endDate && value > endDate ? value : endDate;
    onRangeChange(nextStart, nextEnd);
  };

  const handleEndChange = (value: string) => {
    const nextEnd = value;
    const nextStart = startDate && value < startDate ? value : startDate;
    onRangeChange(nextStart, nextEnd);
  };

  return (
    <div className="flex flex-wrap items-end gap-3">
      <TextInput
        label="Start date"
        type="date"
        size="sm"
        value={startDate}
        onChange={(event) => handleStartChange(event.currentTarget.value)}
      />
      <TextInput
        label="End date"
        type="date"
        size="sm"
        value={endDate}
        onChange={(event) => handleEndChange(event.currentTarget.value)}
      />
      <Group gap="xs" className="pb-1">
        {[7, 30, 90].map((days) => (
          <Button
            key={days}
            size="xs"
            variant="subtle"
            color="gray"
            onClick={() => {
              const range = buildRange(days);
              onRangeChange(range.startDate, range.endDate);
            }}
          >
            Last {days}d
          </Button>
        ))}
      </Group>
    </div>
  );
}
