"use client";

import { Drawer } from "@mantine/core";
import { Sidebar } from "./sidebar";

type MobileSidebarProps = {
  opened: boolean;
  onClose: () => void;
};

export function MobileSidebar({ opened, onClose }: MobileSidebarProps) {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      padding={0}
      size={280}
      withCloseButton={false}
    >
      <Sidebar className="w-full border-r-0" onNavigate={onClose} />
    </Drawer>
  );
}
