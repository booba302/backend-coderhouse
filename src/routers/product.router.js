import { Router } from "express";
import * as ProductController from "../controllers/products.controller.js";
import { isAdmin } from "../utils/secure.middleware.js";

const productRouter = Router();

productRouter
  .get("/", ProductController.GETProducts)
  .get("/:id", ProductController.GETProductsById)
  .post("/", isAdmin, ProductController.POSTProduct)
  .put("/:id", isAdmin, ProductController.PUTProduct)
  .delete("/:id", isAdmin, ProductController.DELETEProduct);

export default productRouter;
