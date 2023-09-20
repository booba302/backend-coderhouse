import { Router } from "express";
import * as CartController from "../controllers/carts.controller.js";

const cartRouter = Router();

cartRouter
  .get("/", CartController.GETCarts)
  .get("/:id", CartController.GETCartById)
  .post("/", CartController.POSTCart)
  .post("/:idCart/product/:idProd", CartController.POSTProductToCart)
  .put("/:idCart", CartController.PUTCart)
  .put("/:idCart/product/:idProd", CartController.PUTQuantityInCart)
  .delete("/:idCart", CartController.DELETEEmptyCart)
  .delete("/:idCart/product/:idProd", CartController.DELETEProductInCart);

export default cartRouter;
