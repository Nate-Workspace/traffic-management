"use client";

import { TextInput } from "@mantine/core";

type TableSearchProps = {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function TableSearch({ value, onChange, placeholder }: TableSearchProps) {
  return (
    <TextInput
      size="sm"
      radius="md"
      value={value ?? ""}
      placeholder={placeholder ?? "Search"}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
}
