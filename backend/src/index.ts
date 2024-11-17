import { logger } from "./libs/logger/logger";
import { configApp } from "./config/app";
import { run, init } from "./server/httpServer";

try {
  const server = init({ config: configApp });
  logger.info(`running server...`);
  run(server);
} catch (error) {
  logger.error(`Error while running the server ` + error);
}
