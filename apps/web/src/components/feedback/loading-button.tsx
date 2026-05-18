"use client";

import { Button, type ButtonProps } from "@mantine/core";

type LoadingButtonProps = ButtonProps & {
  isLoading?: boolean;
};

export function LoadingButton({ isLoading, ...props }: LoadingButtonProps) {
  return <Button loading={isLoading} {...props} />;
}
