import { Router } from "express";
import * as UserController from "../controllers/users.controller.js";
import { notLogged } from "../utils/secure.middleware.js";

const userRouter = Router();

userRouter
  .get("/current", notLogged, UserController.GETCurrent)
  .get("/prem", UserController.GETPremiumUser)
  .get("/:id", UserController.GETUserById)
  .post("/recoverpassword", UserController.POSTRecoverPassword)
  .post("/resetpassword/:id/:token", UserController.POSTResetPassword)
  .delete("/:id", UserController.DELETEUser);

export default userRouter;
