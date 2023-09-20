import { Router } from "express";
import * as ProductController from "../controllers/products.controller.js";

const productRouter = Router();

productRouter
  .get("/", ProductController.GETProducts)
  .get("/:id", ProductController.GETProductsById)
  .post("/", ProductController.POSTProduct)
  .put("/:id", ProductController.PUTProduct)
  .delete("/:id", ProductController.DELETEProduct);

export default productRouter;
