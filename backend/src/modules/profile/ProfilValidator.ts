import joi from "joi";

export const createProfileSchema = (payload: any) => {
  const schema = joi.object({
    wantedJobTitle: joi
      .string()
      .pattern(/^[^<>{}]*$/)
      .pattern(/^[^'";]*$/)
      .trim()
      .required(),
    firstName: joi
      .string()
      .pattern(/^[^<>{}]*$/)
      .pattern(/^[^'";]*$/)
      .trim()
      .required(),
    lastName: joi
      .string()
      .pattern(/^[^<>{}]*$/)
      .pattern(/^[^'";]*$/)
      .trim()
      .required(),
    email: joi.string().email().trim().required(),
    phone: joi
      .string()
      .pattern(/^(?:\+62|62|0)8[0-9][0-9]{6,11}$/)
      .required(),
    country: joi
      .string()
      .pattern(/^[^<>{}]*$/)
      .pattern(/^[^'";]*$/)
      .trim()
      .required(),
    city: joi
      .string()
      .pattern(/^[^<>{}]*$/)
      .pattern(/^[^'";]*$/)
      .trim()
      .required(),
    address: joi
      .string()
      .pattern(/^[^<>{}]*$/)
      .pattern(/^[^'";]*$/)
      .trim()
      .required(),
    postalCode: joi.number().required(),
    drivingLicense: joi
      .string()
      .pattern(/^[^<>{}]*$/)
      .pattern(/^[^'";]*$/)
      .trim()
      .required(),
    nationality: joi
      .string()
      .pattern(/^[^<>{}]*$/)
      .pattern(/^[^'";]*$/)
      .trim()
      .required(),
    placeOfBirth: joi
      .string()
      .pattern(/^[^<>{}]*$/)
      .pattern(/^[^'";]*$/)
      .trim()
      .required(),
    dateOfBirth: joi
      .string()
      .pattern(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/)
      .required(),
  });

  return schema.validate(payload);
};

export const updateProfileSchema = (payload: any) => {
  const schema = joi.object({
    wantedJobTitle: joi
      .string()
      .pattern(/^[^<>{}]*$/)
      .pattern(/^[^'";]*$/)
      .trim()
      .required(),
    firstName: joi
      .string()
      .pattern(/^[^<>{}]*$/)
      .pattern(/^[^'";]*$/)
      .trim()
      .required(),
    lastName: joi
      .string()
      .pattern(/^[^<>{}]*$/)
      .pattern(/^[^'";]*$/)
      .trim()
      .required(),
    email: joi.string().email().trim().required(),
    phone: joi
      .string()
      .pattern(/^(?:\+62|62|0)8[0-9][0-9]{6,11}$/)
      .required(),
    country: joi
      .string()
      .pattern(/^[^<>{}]*$/)
      .pattern(/^[^'";]*$/)
      .trim()
      .required(),
    city: joi
      .string()
      .pattern(/^[^<>{}]*$/)
      .pattern(/^[^'";]*$/)
      .trim()
      .required(),
    address: joi
      .string()
      .pattern(/^[^<>{}]*$/)
      .pattern(/^[^'";]*$/)
      .trim()
      .required(),
    postalCode: joi.number().required(),
    drivingLicense: joi
      .string()
      .pattern(/^[^<>{}]*$/)
      .pattern(/^[^'";]*$/)
      .trim()
      .required(),
    nationality: joi
      .string()
      .pattern(/^[^<>{}]*$/)
      .pattern(/^[^'";]*$/)
      .trim()
      .required(),
    placeOfBirth: joi
      .string()
      .pattern(/^[^<>{}]*$/)
      .pattern(/^[^'";]*$/)
      .trim()
      .required(),
    dateOfBirth: joi
      .string()
      .pattern(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/)
      .required(),
  });

  return schema.validate(payload);
};

export const updateWorkingExperienceSchema = (payload: any) => {
  const schema = joi.object({
    workingExperience: joi.string().required(),
  });

  return schema.validate(payload);
};
