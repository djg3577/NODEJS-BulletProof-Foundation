import { Router } from "express";
import controllers from "../controllers";

const route = Router();

export default (app: Router) => {
  app.use("/test", route); //  localhost:4000/api/test

  route.get("/", controllers.testController.testControllerFunction);
  "localhost:4000/api/test"

  route.get("/pokemon", controllers.testController.testControllerFunction);
  "localhost:4000/api/test/pokemon"
};
