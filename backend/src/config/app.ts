import "dotenv/config";
import Joi from "joi";

export interface ConfigApp {
  env: "development" | "production" | "test";
  host: string;
  port: number | string;
  dbUrl: string;
}

const envVarsSchema = Joi.object().keys({
  NODE_ENV: Joi.string().valid("production", "development", "test").required(),
  APP_HOST: Joi.string().default("localhost"),
  APP_PORT: Joi.number().default(8080),
  DATABASE_URL: Joi.string().default(
    "postgresql://username:randompassword@localhost:5432/mydb?schema=public",
  ),
});

const { value: envVars, error } = envVarsSchema
  .prefs({
    errors: { label: "key" },
    allowUnknown: true,
  })
  .validate(process.env);

if (error != null) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const configApp: ConfigApp = {
  env: envVars.NODE_ENV,
  port: envVars.APP_PORT,
  host: envVars.APP_HOST,
  dbUrl: envVars.DATABASE_URL,
};
