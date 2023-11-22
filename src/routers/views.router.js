import { Router } from "express";
import * as ViewController from "../controllers/views.controller.js";
import * as UserController from "../controllers/users.controller.js";
import {
  notLogged,
  logged,
  isAdmin,
  isUser,
} from "../utils/secure.middleware.js";

const viewRouter = Router();

viewRouter
  .get("/", ViewController.GETIndex)
  .get("/login", logged, ViewController.GETLogin)
  .get("/products", ViewController.GETProductsView)
  .get("/products/new", notLogged, ViewController.GETNewProducts)
  .get("/product/edit/:id", ViewController.GETEditProduct)
  .get("/carts/:idCart", notLogged, ViewController.GETCarts)
  .get("/register", logged, ViewController.GETRegister)
  .get("/realtimeproducts", notLogged, isAdmin, (req, res) => {
    res.render("realTimeProducts");
    req.io.emit("sendProdc");
  })
  .post("/realtimeproducts", isAdmin, (req, res) => {
    res.render("realTimeProducts");
    req.io.emit("sendProdc");
  })
  .get("/chat", notLogged, isUser, (req, res) => {
    res.render("chat");
  })
  .get("/recoverpassword", ViewController.GETPasswordRecovery)
  .get("/resetpassword", ViewController.GETResetPassword);

export default viewRouter;
