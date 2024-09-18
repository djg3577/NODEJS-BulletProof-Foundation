"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const express_1 = __importDefault(require("./express"));
exports.default = async ({ expressApp }) => {
  try {
    (0, express_1.default)({ app: expressApp });
    logger_1.default.info("# - Express loaded!");
  } catch (e) {
    logger_1.default.error(e);
    process.exit(1);
  }
};
//# sourceMappingURL=index.js.map
