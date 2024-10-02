import { Router } from "express";
import testRoute from "./testRoute";

export default (): Router => {
  const app = Router();
  // API's here

  testRoute(app)
  return app;
};
