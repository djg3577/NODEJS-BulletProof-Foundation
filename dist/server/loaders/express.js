"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("../api/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const logger_1 = __importDefault(require("./logger"));
const logMiddleware_1 = require("../api/middlewares/logMiddleware");
exports.default = ({ app }) => {
  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });
  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable("trust proxy");
  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use((0, cors_1.default)());
  // Some sauce I that always add since 2014
  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  app.use(require("method-override")());
  // Middleware that transforms the raw string of req.body into json
  app.use(body_parser_1.default.json());
  // Middleware that transforms string of cookies into a JSON
  app.use((0, cookie_parser_1.default)());
  // Middleware to listen for the start of a request
  app.use(logMiddleware_1.logMiddleware);
  // Load API routes
  app.use((0, routes_1.default)());
  /// error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    logger_1.default.error(err);
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).json({ message: err.message }).end();
    }
    return next(err);
  });
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    logger_1.default.error(err);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
//# sourceMappingURL=express.js.map
