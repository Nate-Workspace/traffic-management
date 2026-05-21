import { SimpleGrid, Stack, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { DriverFormValues } from "../validation/driver.schema";

type DriverFormProps = {
  form: UseFormReturnType<DriverFormValues>;
};

const inputClassNames = {
  input: "border-zinc-200/80 bg-white transition-colors duration-150",
  label: "text-[13px] font-medium text-zinc-700",
};

export function DriverForm({ form }: DriverFormProps) {
  return (
    <Stack gap="md">
      <TextInput
        label="Full name"
        placeholder="John Doe"
        classNames={inputClassNames}
        {...form.getInputProps("fullName")}
      />
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <TextInput
          label="Email"
          placeholder="john.doe@example.com"
          classNames={inputClassNames}
          {...form.getInputProps("email")}
        />
        <TextInput
          label="Phone number"
          placeholder="+1 555 123 456"
          classNames={inputClassNames}
          {...form.getInputProps("phoneNumber")}
        />
      </SimpleGrid>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <TextInput
          label="National ID"
          placeholder="ID-123456"
          classNames={inputClassNames}
          {...form.getInputProps("nationalId")}
        />
        <TextInput
          label="Plate number"
          placeholder="AA-12345"
          classNames={inputClassNames}
          {...form.getInputProps("plateNumber")}
        />
      </SimpleGrid>
      <TextInput
        label="Driver license number"
        placeholder="DL-987654"
        classNames={inputClassNames}
        {...form.getInputProps("driverLicenseNumber")}
      />
    </Stack>
  );
}
