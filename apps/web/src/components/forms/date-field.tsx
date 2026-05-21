"use client";

import { DateInput, type DateInputProps } from "@mantine/dates";
import { formatDateString, parseDateString } from "@/lib/date-input";

type DateFieldProps = Omit<DateInputProps, "value" | "onChange"> & {
  value?: string;
  onChange: (value: string | undefined) => void;
};

export function DateField({ value, onChange, ...props }: DateFieldProps) {
  return (
    <DateInput
      size="sm"
      radius="md"
      valueFormat="MMM D, YYYY"
      clearable
      {...props}
      value={parseDateString(value)}
      onChange={(date) => {
        const formatted = formatDateString(date);
        onChange(formatted || undefined);
      }}
      popoverProps={{ withinPortal: true, shadow: "md" }}
      classNames={{
        input: "border-zinc-200/80 bg-white transition-colors duration-150",
      }}
    />
  );
}
