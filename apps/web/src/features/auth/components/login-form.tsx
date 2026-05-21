"use client";

import { PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "@/lib/zod-resolver";
import { LoadingButton } from "@/components/feedback/loading-button";
import {
  loginFormSchema,
  type LoginFormValues,
} from "../validation/login.schema";

type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => Promise<void>;
  isLoading?: boolean;
};

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

export function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const form = useForm<LoginFormValues>({
    initialValues,
    validate: zodResolver(loginFormSchema),
  });

  const handleSubmit = form.onSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <TextInput
          label="Email"
          placeholder="admin@traffic.local"
          autoComplete="email"
          size="md"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          size="md"
          {...form.getInputProps("password")}
        />
        <LoadingButton
          type="submit"
          size="md"
          fullWidth
          isLoading={isLoading}
          className="mt-2"
        >
          Sign in
        </LoadingButton>
      </Stack>
    </form>
  );
}
