import express from "express";
import { Server as HTTPServer } from "http";
import { Server as SocketIO } from "socket.io";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import methodOverride from "method-override";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";

import authRouter from "./routers/auth.router.js";
import cartRouter from "./routers/cart.router.js";
import productRouter from "./routers/product.router.js";
import userRouter from "./routers/user.router.js";
import viewRouter from "./routers/views.router.js";
import mockRouter from "./routers/mock.router.js";
import ticketRouter from "./routers/ticket.router.js";

import __dirname from "./config/dirname.js";
import InitPassport from "./config/passport.config.js";
import config from "./config/config.js";
import options from "./config/swagger.js";
import { logger } from "./config/logger.js";

import { socketConnection } from "./controllers/socket.controller.js";
import ErrorHandlerMiddleware from "./utils/error.middleware.js";

const app = express();
InitPassport();

const httpServer = HTTPServer(app);
const io = new SocketIO(httpServer);

app.use((req, res, next) => {
  req.io = io;
  next();
});

const specs = swaggerJSDoc(options);

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/../views`);
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(ErrorHandlerMiddleware);
app.use(methodOverride("_method"));

app.use(
  session({
    secret: config.mongoSecret,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: config.mongoUrl,
      ttl: 3600,
    }),
    ttl: 3600,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(`${__dirname}/../public`));

logger(app);

app.use("/api/docs", serve, setup(specs));

app.use("/", viewRouter);
app.use("/api/auth", authRouter);
app.use("/api/carts", cartRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/tickets", ticketRouter);
app.use("/mockingproducts", mockRouter);

io.on("connection", async (socket) => {
  socketConnection(socket);
});

httpServer.listen(config.port, () => {
  console.log(`Escuchando puerto: ${config.port}`);
});
