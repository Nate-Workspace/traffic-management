"use client";

import { Drawer } from "@mantine/core";
import type { ReactNode } from "react";
import { useConfirm } from "@/hooks/use-confirm";

type FormDrawerProps = {
  opened: boolean;
  title: string;
  children: ReactNode;
  isDirty?: boolean;
  onClose: () => void;
};

export function FormDrawer({
  opened,
  title,
  children,
  isDirty,
  onClose,
}: FormDrawerProps) {
  const { confirm } = useConfirm();

  const handleClose = async () => {
    if (isDirty) {
      const proceed = await confirm({
        title: "Discard changes?",
        message: "You have unsaved updates. Discard them?",
        confirmLabel: "Discard",
        cancelLabel: "Keep editing",
      });

      if (!proceed) {
        return;
      }
    }

    onClose();
  };

  return (
    <Drawer
      opened={opened}
      onClose={handleClose}
      title={title}
      position="right"
      size="lg"
      keepMounted={false}
      styles={{
        body: {
          padding: 0,
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
        },
      }}
    >
      <div className="flex min-h-full flex-1 flex-col">{children}</div>
    </Drawer>
  );
}
