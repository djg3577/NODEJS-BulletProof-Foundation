"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.logMiddleware = logMiddleware;
const logger_1 = __importDefault(require("../../loaders/logger"));
function logMiddleware(req, res, next) {
  const originalJson = res.json;
  res.json = function (json) {
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
        logger_1.default.error("HTTP Error:", meta);
      } else if (statusCode >= 400) {
        logger_1.default.error("HTTP Error:", meta);
      } else if (isDevelopment) {
        logger_1.default.info("HTTP Info:", meta);
      }
    } catch (error) {
      logger_1.default.error("Error in logMiddleware", { error });
    }
  });
  next();
}
//# sourceMappingURL=logMiddleware.js.map
