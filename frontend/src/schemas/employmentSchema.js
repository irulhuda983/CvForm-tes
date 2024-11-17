import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

export const employmentSchema = toTypedSchema(
  zod.object({
    jobTitle: zod
      .string({
        required_error: "Job Title is required",
      })
      .min(1, { message: "Job Title is required" }),
    location: zod
      .string({
        required_error: "Location is required",
      })
      .min(1, { message: "Location is required" }),
    companyName: zod.string({
      required_error: "Company Name is required",
    }).min(1, { message: "Company Name is required" }),
    monthStartDate: zod.string({
      required_error: "Month Start Date is required",
    }).min(1, { message: "Month Start Date is required" }),
    yearStartDate: zod.string({
      required_error: "Year Start Date is required",
    }).min(1, { message: "Month Start Date is required" }),
    monthEndDate: zod.string().nullable().optional(),
    yearEndDate: zod.string().nullable().optional(),
  })
);