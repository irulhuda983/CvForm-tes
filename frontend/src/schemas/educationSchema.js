import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

export const educationSchema = toTypedSchema(
  zod.object({
    degree: zod
      .string({
        required_error: "Degree is required",
      })
      .min(1, { message: "Degree is required" }),
    university: zod
      .string({
        required_error: "University is required",
      })
      .min(1, { message: "University is required" }),
    city: zod
      .string({
        required_error: "City is required",
      })
      .min(1, { message: "City is required" }),
    startDate: zod.string({
      required_error: "Month Start Date is required",
    }).min(1, { message: "Month Start Date is required" }),
    endDate: zod.string({
      required_error: "Month End Date is required",
    }).min(1, { message: "Month End Date is required" })
  })
);