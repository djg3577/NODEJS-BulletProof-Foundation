"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = (0, express_1.Router)();
exports.default = (app) => {
  app.use("/test", route);
  route.get("/");
};
//# sourceMappingURL=testRoute.js.map
