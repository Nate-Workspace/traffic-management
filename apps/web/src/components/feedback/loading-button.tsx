"use client";

import { Button, type ButtonProps } from "@mantine/core";

type LoadingButtonProps = ButtonProps & {
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
};

export function LoadingButton({ isLoading, ...props }: LoadingButtonProps) {
  return (
    <Button
      loading={isLoading}
      {...props}
      classNames={{
        root: "font-medium transition-all duration-150",
        ...props.classNames,
      }}
    />
  );
}
