import { SimpleGrid, Stack, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { DriverFormValues } from "../validation/driver.schema";

type DriverFormProps = {
  form: UseFormReturnType<DriverFormValues>;
};

export function DriverForm({ form }: DriverFormProps) {
  return (
    <Stack gap="sm">
      <TextInput
        label="Full name"
        placeholder="John Doe"
        {...form.getInputProps("fullName")}
      />
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
        <TextInput
          label="Email"
          placeholder="john.doe@example.com"
          {...form.getInputProps("email")}
        />
        <TextInput
          label="Phone number"
          placeholder="+1 555 123 456"
          {...form.getInputProps("phoneNumber")}
        />
      </SimpleGrid>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
        <TextInput
          label="National ID"
          placeholder="ID-123456"
          {...form.getInputProps("nationalId")}
        />
        <TextInput
          label="Plate number"
          placeholder="AA-12345"
          {...form.getInputProps("plateNumber")}
        />
      </SimpleGrid>
      <TextInput
        label="Driver license number"
        placeholder="DL-987654"
        {...form.getInputProps("driverLicenseNumber")}
      />
    </Stack>
  );
}
