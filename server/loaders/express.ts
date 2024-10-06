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
};
