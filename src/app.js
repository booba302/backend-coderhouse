import express from "express";
import { Server as HTTPServer } from "http";
import { Server as SocketIO } from "socket.io";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";

import authRouter from "./routers/auth.router.js";
import cartRouter from "./routers/cart.router.js";
import productRouter from "./routers/product.router.js";
import userRouter from "./routers/user.router.js";
import viewRouter from "./routers/views.router.js";

import __dirname from "./config/dirname.js";
import InitPassport from "./config/passport.config.js";

const app = express();
InitPassport();

const conn = await mongoose.connect(
  "mongodb+srv://booba302:CEtg68FE9czaHCp@codercluster.ex9gekc.mongodb.net/ecommerce"
);

const httpServer = HTTPServer(app);
const io = new SocketIO(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/../views`);
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "topsecret2023",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl:
        "mongodb+srv://booba302:CEtg68FE9czaHCp@codercluster.ex9gekc.mongodb.net/ecommerce",
      ttl: 3600,
    }),
    ttl: 3600,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(`${__dirname}/../public`));

app.use("/", viewRouter);
app.use("/api/auth", authRouter);
app.use("/api/carts", cartRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

httpServer.listen(8080, () => {
  console.log("Escuchando puerto: 8080");
});
