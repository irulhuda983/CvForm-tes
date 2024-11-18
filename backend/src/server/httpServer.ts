import express, { Express, Request, Response, NextFunction } from "express";
import { createServer } from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import routes from "../routes";
import { configApp, ConfigApp } from "../config/app";
import { logger } from "../libs/logger/logger";
import path from "path";

interface ServerConfig {
  config: ConfigApp;
}

const init = ({ config }: ServerConfig) => {
  const app: Express = express();

  app.use(express.json());
  // app.use(express.urlencoded());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors());
  app.use(helmet());
  app.use(
    "/api/uploads",
    express.static(path.join(__dirname, "../../public/uploads")),
  );
  app.use("/api", routes);
  // Middleware 404 untuk rute yang tidak ditemukan
  app.use((req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(404).json({
        statusCode: 404,
        message: `url not found`,
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        message: "internal server error",
      });
    }
  });

  return app;
};

const run = (app: any) => {
  const host = configApp.host;
  const port = Number(configApp.port);
  const httpServer = createServer(app);

  httpServer.listen(port, host, () => {
    logger.info(`⚡ Server is listening on http://${host}:${port}`);
  });
};

export { init, run };
