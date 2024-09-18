"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const { combine, colorize, timestamp, printf } = winston_1.default.format;
const logFormat = printf(({ level, message, timestamp, method, url, ...meta }) => {
  let log = `${timestamp} `;
  if (method) log += ` [${method}] `;
  if (url) log += `[${url}] `;
  log += `[${level}] ${message} `;
  if (meta) log += JSON.stringify(meta, null, 2);
  return log;
});
const consoleFormat = combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), colorize({ all: true }), logFormat);
const transports = [new winston_1.default.transports.Console({ format: consoleFormat })];
const Logger = winston_1.default.createLogger({
  level: "silly",
  levels: winston_1.default.config.npm.levels,
  transports,
});
exports.default = Logger;
//# sourceMappingURL=logger.js.map
