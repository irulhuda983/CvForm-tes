import joi from "joi";

export const createEducationSchema = (payload: any) => {
  const schema = joi.object({
    school: joi
      .string()
      .pattern(/^[^<>{}]*$/)
      .pattern(/^[^'";]*$/)
      .trim()
      .required(),
    degree: joi
      .string()
      .pattern(/^[^<>{}]*$/)
      .pattern(/^[^'";]*$/)
      .trim()
      .required(),
    startDate: joi
      .string()
      .pattern(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/)
      .required(),
    endDate: joi
      .string()
      .pattern(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/)
      .trim()
      .allow(null)
      .allow("")
      .optional(),
    city: joi
      .string()
      .pattern(/^[^<>{}]*$/)
      .pattern(/^[^'";]*$/)
      .trim()
      .required(),
    description: joi
      .string()
      .pattern(/^[^<>{}]*$/)
      .pattern(/^[^'";]*$/)
      .trim()
      .required(),
  });

  return schema.validate(payload);
};
