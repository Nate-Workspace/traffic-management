"use client";

import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useMemo } from "react";
import { DriverForm } from "./driver-form";
import { FormDrawer } from "@/components/forms/form-drawer";
import { LoadingButton } from "@/components/feedback/loading-button";
import { zodResolver } from "@/lib/zod-resolver";
import { driverFormSchema, type DriverFormValues } from "../validation/driver.schema";
import { useDriverMutations } from "../hooks/use-driver-mutations";
import { toastPromise } from "@/components/feedback/toast";
import { getApiErrorMessage } from "@/services/api/errors";
import type { Driver } from "../types/driver";

const emptyValues: DriverFormValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  nationalId: "",
  plateNumber: "",
  driverLicenseNumber: "",
};

type DriverDrawerProps = {
  opened: boolean;
  mode: "create" | "edit";
  driver?: Driver | null;
  onClose: () => void;
};

export function DriverDrawer({ opened, mode, driver, onClose }: DriverDrawerProps) {
  const isEdit = mode === "edit";
  const { createDriver, updateDriver } = useDriverMutations();

  const initialValues = useMemo(
    () =>
      driver
        ? {
            fullName: driver.fullName,
            email: driver.email,
            phoneNumber: driver.phoneNumber,
            nationalId: driver.nationalId,
            plateNumber: driver.plateNumber,
            driverLicenseNumber: driver.driverLicenseNumber,
          }
        : emptyValues,
    [driver],
  );

  const form = useForm<DriverFormValues>({
    initialValues,
    validate: zodResolver(driverFormSchema),
  });

  useEffect(() => {
    form.setValues(initialValues);
    form.resetDirty(initialValues);
  }, [form, initialValues, opened]);

  const handleSubmit = async (values: DriverFormValues) => {
    const action = isEdit && driver
      ? updateDriver.mutateAsync({ id: driver.id, values })
      : createDriver.mutateAsync(values);

    await toastPromise(action, {
      loading: {
        title: isEdit ? "Updating driver" : "Creating driver",
        message: "Please wait a moment",
      },
      success: {
        title: isEdit ? "Driver updated" : "Driver created",
        message: "Changes have been saved",
      },
      error: {
        title: "Action failed",
        message: (error) => getApiErrorMessage(error),
      },
    });

    onClose();
  };

  return (
    <FormDrawer
      opened={opened}
      title={isEdit ? "Edit driver" : "Create driver"}
      isDirty={form.isDirty()}
      onClose={onClose}
    >
      <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-6">
        <DriverForm form={form} />
        <Group justify="flex-end">
          <LoadingButton
            type="submit"
            size="sm"
            isLoading={createDriver.isPending || updateDriver.isPending}
          >
            {isEdit ? "Save changes" : "Create driver"}
          </LoadingButton>
        </Group>
      </form>
    </FormDrawer>
  );
}
