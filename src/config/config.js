import { config } from "dotenv";
import args from "./args.js";

const MODE = args.mode;
const ENV_PATH = MODE == "dev" ? "./.env.dev" : "./.env.prod";

config({ path: ENV_PATH });

export default {
  mongoUrl: process.env.MONGO_URL,
  mongoSecret: process.env.SECRET,
  port: process.env.PORT,
  clientID: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  callbackURL: process.env.CALLBACKURL,
  mailUser: process.env.NODEMAILER_USER,
  mailPass: process.env.NODEMAILER_PASS,
};
