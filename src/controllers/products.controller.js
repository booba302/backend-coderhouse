import * as ProductService from "../services/products.service.js";

import CustomErrors from "../utils/customErrors.js";
import ERROR_DICTIONARY from "../config/errorDictionary.js";

export const GETProducts = async (req, res, next) => {
  const { limit = 10, page = 1, query, sort } = req.query;
  try {
    let order, filter;
    !query ? (filter = {}) : (filter = { catergory: query });
    sort == "asc"
      ? (order = { price: 1 })
      : sort == "desc"
      ? (order = { price: -1 })
      : (order = { price: 0 });

    const products = await ProductService.getFilteredProducts(
      limit,
      page,
      filter,
      order
    );
    if (!products) return CustomErrors.create(ERROR_DICTIONARY.default);
    res.status(products.code).send(products);
  } catch (error) {
    error.from = error.from || "CONTROLLER";
    next(error);
  }
};

export const GETProductsById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await ProductService.getProductById(id);
    if (!product) return CustomErrors.create(ERROR_DICTIONARY.notFound);
    res.status(product.code).send(product);
  } catch (error) {
    error.from = error.from || "CONTROLLER";
    next(error);
  }
};

export const POSTProduct = async (req, res, next) => {
  const body = req.body;
  try {
    const product = await ProductService.addProduct(body);
    if (!product) return CustomErrors.create(ERROR_DICTIONARY.default);
    res.status(product.code).send(product);
  } catch (error) {
    error.from = error.from || "CONTROLLER";
    next(error);
  }
};

export const PUTProduct = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  console.log(body);
  try {
    const product = await ProductService.updateProduct(id, body);
    if (!product) return CustomErrors.create(ERROR_DICTIONARY.default);
    res.status(product.code).send(product);
  } catch (error) {
    error.from = error.from || "CONTROLLER";
    next(error);
  }
};

export const DELETEProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await ProductService.deleteProduct(id);
    if (!product) return CustomErrors.create(ERROR_DICTIONARY.default);
    res.status(product.code).send(product);
  } catch (error) {
    error.from = error.from || "CONTROLLER";
    next(error);
  }
};
