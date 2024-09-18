"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const error_1 = __importDefault(require("../../services/error"));
const test_1 = __importDefault(require("../../services/test"));
exports.default = {
  async testControllerFunction(req, res) {
    try {
      const testService = typedi_1.Container.get(test_1.default);
      const result = await testService.test();
      return res.status(200).json({ result });
    } catch (e) {
      const errorService = typedi_1.Container.get(error_1.default);
      const error = errorService.generateError(e);
      return res.status(error.code).json(error);
    }
  },
};
//# sourceMappingURL=testController.js.map
