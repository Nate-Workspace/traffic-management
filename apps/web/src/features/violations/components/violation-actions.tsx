"use client";

import { ActionIcon, Menu } from "@mantine/core";
import Link from "next/link";
import type { ViolationListItem } from "../types/violation";

type ViolationActionsProps = {
  violation: ViolationListItem;
};

export function ViolationActions({ violation }: ViolationActionsProps) {
  return (
    <Menu shadow="md" position="bottom-end" withArrow>
      <Menu.Target>
        <ActionIcon variant="subtle" color="gray" aria-label="Open actions">
          ...
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item component={Link} href={`/violations/${violation.id}`}>
          View details
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
