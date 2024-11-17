import joi from "joi";

export const uploadPhotoSchema = (payload: any) => {
  const schema = joi.object({
    base64img: joi
      .string()
      .pattern(/^data:image\/(png|jpeg|jpg|gif);base64,[A-Za-z0-9+/]+={0,2}$/)
      .custom((value, helpers) => {
        try {
          const base64Data = value.split(",")[1];
          const buffer = Buffer.from(base64Data, "base64");
          if (!buffer || buffer.length === 0) {
            return helpers.error("any.invalid");
          }
          return value;
        } catch (err) {
          return helpers.error("any.invalid");
        }
      })
      .required(),
  });

  return schema.validate(payload);
};
