"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
let ErrorService = class ErrorService {
  constructor() {
    this.generateError = (error) => {
      const isValidHttpCode = (code) => {
        return typeof code === "number" && code >= 100 && code <= 599;
      };
      const getStatusCode = (error) => {
        if (isValidHttpCode(error.statusCode)) return error.statusCode;
        if (typeof error.code === "number" && isValidHttpCode(error.code)) return error.code;
        return 500;
      };
      const formatMessage = (error) => {
        const codeMessage = error.code && !isValidHttpCode(error.code) ? ` (code: ${error.code})` : "";
        return `${error.message}${codeMessage}`;
      };
      return {
        message: formatMessage(error),
        code: getStatusCode(error),
      };
    };
  }
};
ErrorService = __decorate([(0, typedi_1.Service)(), __metadata("design:paramtypes", [])], ErrorService);
exports.default = ErrorService;
//# sourceMappingURL=error.js.map
