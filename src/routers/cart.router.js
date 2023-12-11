import { Router } from "express";
import * as CartController from "../controllers/carts.controller.js";
import { isAdmin, isUser } from "../utils/secure.middleware.js";

const cartRouter = Router();

cartRouter
  .get("/", isUser, CartController.GETCarts)
  .get("/:id", CartController.GETCartById)
  .post("/", isAdmin, CartController.POSTCart)
  .post("/:idCart/product/:idProd", CartController.POSTProductToCart)
  .put("/:idCart", isUser, CartController.PUTCart)
  .put("/:idCart/product/:idProd", CartController.PUTQuantityInCart)
  .delete("/:idCart", isUser, CartController.DELETECart)
  .delete("/:idCart/product/:idProd", CartController.DELETEProductInCart);

export default cartRouter;
