import dotenv from "dotenv";

dotenv.config();

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
