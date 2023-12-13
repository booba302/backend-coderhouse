import { Router } from "express";
import * as ViewController from "../controllers/views.controller.js";
import { notLogged, logged } from "../utils/secure.middleware.js";

const viewRouter = Router();

viewRouter
  .get("/", ViewController.GETIndex)
  .get("/login", logged, ViewController.GETLogin)
  .get("/register", logged, ViewController.GETRegister)
  .get("/recoverpassword", logged, ViewController.GETPasswordRecovery)
  .get("/resetpassword", logged, ViewController.GETResetPassword)
  .get("/products", ViewController.GETProductsView)
  .get("/products/new", notLogged, ViewController.GETNewProducts)
  .get("/product/edit/:id", notLogged, ViewController.GETEditProduct)
  .get("/carts/:idCart", notLogged, ViewController.GETCarts)
  .get("/realtimeproducts", notLogged, (req, res) => {
    res.render("realTimeProducts");
    req.io.emit("sendProdc");
  })
  .post("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
    req.io.emit("sendProdc");
  })
  .get("/chat", notLogged, (req, res) => {
    res.render("chat");
  });

export default viewRouter;
