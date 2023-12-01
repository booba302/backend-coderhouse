import { Router } from "express";
import * as ProductController from "../controllers/products.controller.js";
import { isUser } from "../utils/secure.middleware.js";

const productRouter = Router();

productRouter
  .get("/", isUser, ProductController.GETProducts)
  .get("/:id", ProductController.GETProductsById)
  .post("/", isUser, ProductController.POSTProduct)
  .put("/:id", isUser, ProductController.PUTProduct)
  .delete("/:id", isUser, ProductController.DELETEProduct);

export default productRouter;
