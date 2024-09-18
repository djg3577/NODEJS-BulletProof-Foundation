import "reflect-metadata"; // We need this in order to use @Decorators
import express from "express";
import loaders from "./loaders";
import Logger from "./loaders/logger";

async function startServer() {
  const app = express();
  await loaders({ expressApp: app });

  app.listen(4000, (err?: any) => {
    if (err) {
      console.log({ err });
      Logger.error(err);
      process.exit(1);
    }
    Logger.info(`
########################################
  ⚛️  Server listening on port: 4000 ⚛️
########################################
    `);
  });
}

startServer();
