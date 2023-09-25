import { Router } from "express";
import * as UserController from "../controllers/users.controller.js";
import { notLogged, logged } from "../utils/secure.middleware.js";

const userRouter = Router();

userRouter
  .get("/logout", notLogged, UserController.GETLogout)
  .get("/current", notLogged, UserController.GETCurrent);

export default userRouter;
