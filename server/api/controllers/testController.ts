import { Container } from "typedi";
import ErrorService from "../../services/error";
import { Request, Response } from "express";
import TestService from "../../services/test";

export default {
  async testControllerFunction(req: Request, res: Response) {
    try {
      const testService = Container.get(TestService);
      const result = await testService.test();
      return res.status(200).json({ result });
    } catch (e) {
      const errorService = Container.get(ErrorService);
      const error = errorService.generateError(e);
      return res.status(error.code).json(error);
    }
  },
};
