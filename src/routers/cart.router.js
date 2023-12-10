import { Router } from "express";
import * as CartController from "../controllers/carts.controller.js";
import { isAdmin } from "../utils/secure.middleware.js";

const cartRouter = Router();

cartRouter
  .get("/", isAdmin, CartController.GETCarts)
  .get("/:id", CartController.GETCartById)
  .post("/", isAdmin, CartController.POSTCart)
  .post("/:idCart/product/:idProd", CartController.POSTProductToCart)
  .put("/:idCart", isAdmin, CartController.PUTCart)
  .put("/:idCart/product/:idProd", CartController.PUTQuantityInCart)
  .delete("/:idCart", CartController.DELETECart)
  .delete("/:idCart/product/:idProd", CartController.DELETEProductInCart);

export default cartRouter;
