import morgan from "morgan";
import fs from "fs";
import path from "path";
import __dirname from "./dirname.js";
import args from "./args.js";

const logsFolder = `${__dirname}/../logs`;

if (!fs.existsSync(logsFolder)) {
  fs.mkdirSync(logsFolder);
}

export const logger = (app) => {
  const mode = args.mode || "dev";
  const logFile = mode === "prod" ? "log-prod.log" : "log-dev.log";
  const accessLogStream = fs.createWriteStream(path.join(logsFolder, logFile), {
    flags: "a",
  });

  app.use(morgan("combined", { stream: accessLogStream }));
};
