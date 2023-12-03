import * as CartService from "../services/carts.service.js";

import CustomErrors from "../utils/customErrors.js";
import ERROR_DICTIONARY from "../config/errorDictionary.js";

export const GETCarts = async (req, res, next) => {
  try {
    const carts = await CartService.getCarts();
    if (!carts) return CustomErrors.create(ERROR_DICTIONARY.default);
    res.status(carts.code).send(carts);
  } catch (error) {
    error.from = error.from || "CONTROLLER";
    next(error);
  }
};

export const GETCartById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const cart = await CartService.getCartsById(id);
    if (!cart) return CustomErrors.create(ERROR_DICTIONARY.notFound);
    res.status(cart.code).send(cart);
  } catch (error) {
    error.from = error.from || "CONTROLLER";
    next(error);
  }
};

export const POSTCart = async (req, res, next) => {
  try {
    const cart = await CartService.addCart();
    if (!cart) return CustomErrors.create(ERROR_DICTIONARY.forbidden);
    res.status(cart.code).send(cart);
  } catch (error) {
    error.from = error.from || "CONTROLLER";
    next(error);
  }
};

export const POSTProductToCart = async (req, res, next) => {
  const { idCart, idProd } = req.params;
  try {
    const cart = await CartService.addProductToCart(idCart, idProd);
    if (!cart) return CustomErrors.create(ERROR_DICTIONARY.default);
    res.status(cart.code).send(cart);
  } catch (error) {
    error.from = error.from || "CONTROLLER";
    next(error);
  }
};

export const PUTCart = async (req, res, next) => {
  const { idCart } = req.params;
  const { product } = req.body;
  try {
    const cart = await CartService.updateCart(idCart, product);
    if (!cart) return CustomErrors.create(ERROR_DICTIONARY.default);
    res.status(cart.code).send(cart);
  } catch (error) {
    error.from = error.from || "CONTROLLER";
    next(error);
  }
};

export const PUTQuantityInCart = async (req, res, next) => {
  const { idCart, idProd } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await CartService.updateQtyInCart(idCart, idProd, quantity);
    if (!cart) return CustomErrors.create(ERROR_DICTIONARY.default);
    res.status(cart.code).send(cart);
  } catch (error) {
    error.from = error.from || "CONTROLLER";
    next(error);
  }
};

export const DELETEProductInCart = async (req, res, next) => {
  const { idCart, idProd } = req.params;
  try {
    const cart = await CartService.delProductInCart(idCart, idProd);
    if (!cart) return CustomErrors.create(ERROR_DICTIONARY.default);
    res.status(cart.code).send(cart);
  } catch (error) {
    error.from = error.from || "CONTROLLER";
    next(error);
  }
};

export const DELETECart = async (req, res, next) => {
  const { idCart } = req.params;
  try {
    const cart = await CartService.delCart(idCart);
    if (!cart) return CustomErrors.create(ERROR_DICTIONARY.default);
    res.status(cart.code).send(cart);
  } catch (error) {
    error.from = error.from || "CONTROLLER";
    next(error);
  }
};

export const DELETEEmptyCart = async (req, res, next) => {
  const { idCart } = req.params;
  try {
    const cart = await CartService.emptyCart(idCart);
    if (!cart) return CustomErrors.create(ERROR_DICTIONARY.default);
    res.status(cart.code).send(cart);
  } catch (error) {
    error.from = error.from || "CONTROLLER";
    next(error);
  }
};
