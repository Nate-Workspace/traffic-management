"use client";

import { modals } from "@mantine/modals";

export type ConfirmOptions = {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: string;
};

export const useConfirm = () => {
  const confirm = (options: ConfirmOptions) =>
    new Promise<boolean>((resolve) => {
      modals.openConfirmModal({
        title: options.title,
        children: options.message,
        labels: {
          confirm: options.confirmLabel ?? "Confirm",
          cancel: options.cancelLabel ?? "Cancel",
        },
        confirmProps: {
          color: options.confirmColor ?? "red",
          variant: "filled",
          size: "sm",
        },
        cancelProps: {
          variant: "default",
          color: "gray",
          size: "sm",
        },
        groupProps: {
          gap: "sm",
          mt: "lg",
        },
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });

  return { confirm };
};
