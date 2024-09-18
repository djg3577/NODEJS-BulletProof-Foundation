import winston from "winston";

const { combine, colorize, timestamp, printf } = winston.format;

const logFormat = printf(({ level, message, timestamp, method, url, ...meta }) => {
  let log = `${timestamp} `;
  if (method) log += ` [${method}] `;
  if (url) log += `[${url}] `;
  log += `[${level}] ${message} `;
  if (meta) log += JSON.stringify(meta, null, 2);
  return log;
});

const consoleFormat = combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), colorize({ all: true }), logFormat);

const transports: winston.transport[] = [new winston.transports.Console({ format: consoleFormat })];

const Logger = winston.createLogger({
  level: "silly",
  levels: winston.config.npm.levels,
  transports,
});

export default Logger;
