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
      classNames={{
        input:
          "border-zinc-200/80 bg-white transition-colors duration-150 focus:border-zinc-300",
      }}
      leftSection={
        <span className="text-zinc-400" aria-hidden>
          ⌕
        </span>
      }
    />
  );
}
