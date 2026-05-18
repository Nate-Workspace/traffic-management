import { z } from "zod";

export const driverFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(200),
  email: z.string().email("Enter a valid email"),
  phoneNumber: z.string().min(7, "Enter a valid phone number").max(32),
  nationalId: z.string().min(4, "National ID is required").max(64),
  plateNumber: z.string().min(3, "Plate number is required").max(32),
  driverLicenseNumber: z
    .string()
    .min(4, "Driver license number is required")
    .max(64),
});

export type DriverFormValues = z.infer<typeof driverFormSchema>;
