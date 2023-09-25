import { Router } from "express";
import * as ViewController from "../controllers/views.controller.js";
import { notLogged, logged } from "../utils/secure.middleware.js";

const viewRouter = Router();

viewRouter
  .get("/", logged, ViewController.GETRoot)
  .get("/login", logged, ViewController.GETLogin)
  .get("/products", notLogged, ViewController.GETProductsView)
  .get("/carts/:idCart", notLogged, ViewController.GETCarts)
  .get("/register", logged, ViewController.GETRegister);

export default viewRouter;
