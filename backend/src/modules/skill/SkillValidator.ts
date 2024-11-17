import joi from "joi";

export const createSkillSchema = (payload: any) => {
  const schema = joi.object({
    skill: joi
      .string()
      .pattern(/^[^<>{}]*$/)
      .pattern(/^[^'";]*$/)
      .trim()
      .required(),
    level: joi
      .string()
      .pattern(/^[^<>{}]*$/)
      .pattern(/^[^'";]*$/)
      .trim()
      .required(),
  });

  return schema.validate(payload);
};
