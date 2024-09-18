import { Request, Response, NextFunction } from "express";
import Logger from "../../loaders/logger";

export function logMiddleware(req: Request, res: Response, next: NextFunction) {
  const originalJson = res.json;

  res.json = function (json: any): Response<any, Record<string, any>> {
    res.locals.message = JSON.stringify(json.message);
    return originalJson.call(this, json);
  };

  res.on("finish", () => {
    try {
      const { statusCode } = res;
      const message = res.locals.message || res.statusMessage || "";
      const isDevelopment = process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined;

      let meta = {
        method: req.method,
        url: `${req.baseUrl}${req.url}`,
        message,
        requestBody: undefined,
      };

      if (statusCode >= 500) {
        meta = { ...meta, requestBody: req.body };
        Logger.error("HTTP Error:", meta);
      } else if (statusCode >= 400) {
        Logger.error("HTTP Error:", meta);
      } else if (isDevelopment) {
        Logger.info("HTTP Info:", meta);
      }
    } catch (error) {
      Logger.error("Error in logMiddleware", { error });
    }
  });

  next();
}
