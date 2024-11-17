import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

export const personalSchema = toTypedSchema(
  zod.object({
    jobTitle: zod
      .string({ required_error: "Job Title is required" })
      .min(1, { message: "Job Title is required" }),
    firstName: zod
      .string({ required_error: "First Name is required" })
      .min(1, { message: "First Name is required" }),
    lastName: zod
      .string({ required_error: "Last Name is required" })
      .min(1, { message: "Last Name is required" }),
    email: zod
      .string({ required_error: "Email is required" })
      .email({ message: "Must be a valid email" })
      .min(1, { message: "Email is required" }),
    phone: zod
      .string()
      .nullable()
      .optional(),
    country: zod
      .string({ required_error: "Country is required" })
      .min(1, { message: "Country is required" })
      .optional(),
    city: zod
      .string({ required_error: "City is required" }).
      min(1, { message: "City is required" }),
    address: zod
      .string()
      .nullable()
      .optional(),
    postalCode: zod
      .number({ required_error: "Postal Code is required" })
      .min(1, { message: "Postal Code is required" }),
    drivingLicense: zod.string().nullable().optional(),
    nationality: zod
      .string({ required_error: "Nasionality is required" })
      .min(1, { message: "Nasionality is required" }),
    professionalSummary: zod.string().nullable().optional(),
  })
);