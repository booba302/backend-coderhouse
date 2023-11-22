import { Router } from "express";
import * as CartController from "../controllers/carts.controller.js";
import { isUser } from "../utils/secure.middleware.js";

const cartRouter = Router();

cartRouter
  .get("/", CartController.GETCarts)
  .get("/:id", CartController.GETCartById)
  .get("/:id/purchase", CartController.GETPurchase)
  .post("/", CartController.POSTCart)
  .post("/:idCart/product/:idProd", CartController.POSTProductToCart)
  .put("/:idCart", isUser, CartController.PUTCart)
  .put("/:idCart/product/:idProd", isUser, CartController.PUTQuantityInCart)
  .delete("/:idCart", isUser, CartController.DELETEEmptyCart)
  .delete(
    "/:idCart/product/:idProd",
    isUser,
    CartController.DELETEProductInCart
  );

export default cartRouter;
