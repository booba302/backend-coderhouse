import { Router } from "express";
import * as CartController from "../controllers/carts.controller.js";
import { isAdmin, isUser } from "../utils/secure.middleware.js";

const cartRouter = Router();

cartRouter
  .get("/", isUser, CartController.GETCarts)
  .get("/:id", isUser, CartController.GETCartById)
  .post("/", isAdmin, CartController.POSTCart)
  .post("/:idCart/product/:idProd", isAdmin, CartController.POSTProductToCart)
  .put("/:idCart", isUser, CartController.PUTCart)
  .put("/:idCart/product/:idProd", isAdmin, CartController.PUTQuantityInCart)
  .delete("/:idCart", isUser, CartController.DELETECart)
  .delete(
    "/:idCart/product/:idProd",
    isAdmin,
    CartController.DELETEProductInCart
  );

export default cartRouter;
