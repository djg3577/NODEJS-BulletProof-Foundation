import cors from "cors";
import { Application } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import Logger from "./logger";
import { logMiddleware } from "../api/middlewares/logMiddleware";
import routes from "../api/routes";

export default ({ app }: { app: Application }) => {
  app.use(cors());
  app.use(require("method-override")());
  app.use(bodyParser.json());
  app.use(cookieParser());

  // Middleware to listen for the start of a request
  app.use(logMiddleware);
  // Load API routes
  app.use(routes());

  /// error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    Logger.error(err);
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).json({ message: err.message }).end();
    }
    return next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    Logger.error(err);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
