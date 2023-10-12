import { Router } from "express";
import * as MockProducts from "../controllers/mocks.controller.js";

const mockRouter = Router();

mockRouter.get("/", MockProducts.GETFakeProducts);

export default mockRouter;
