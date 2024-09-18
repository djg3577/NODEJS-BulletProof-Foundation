import { Service } from "typedi";
import { Error } from "../api/interfaces/Error";

@Service()
export default class ErrorService {
  constructor() {}

  public generateError = (error: Error) => {
    const isValidHttpCode = (code: Error["code"]): boolean => {
      return typeof code === "number" && code >= 100 && code <= 599;
    };

    const getStatusCode = (error: Error): number => {
      if (isValidHttpCode(error.statusCode)) return error.statusCode;
      if (typeof error.code === "number" && isValidHttpCode(error.code)) return error.code;
      return 500;
    };

    const formatMessage = (error: Error): Error["message"] => {
      const codeMessage = error.code && !isValidHttpCode(error.code) ? ` (code: ${error.code})` : "";
      return `${error.message}${codeMessage}`;
    };

    return {
      message: formatMessage(error),
      code: getStatusCode(error),
    };
  };
}
