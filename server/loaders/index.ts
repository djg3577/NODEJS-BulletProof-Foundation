import Logger from "./logger";
import expressLoader from "./express";

export default async ({ expressApp }) => {
  try {
    expressLoader({ app: expressApp });
    Logger.info("# - Express loaded!");
  } catch (e) {
    Logger.error(e);
    process.exit(1);
  }
};
