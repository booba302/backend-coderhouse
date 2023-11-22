import * as CartService from "../services/carts.service.js";

export const GETCarts = async (req, res) => {
  const carts = await CartService.getCarts();
  res.status(carts.code).send(carts);
};

export const GETCartById = async (req, res) => {
  const { id } = req.params;
  const cart = await CartService.getCartsById(id);
  res.status(cart.code).send(cart);
};

export const POSTCart = async (req, res) => {
  const cart = await CartService.addCart();
  res.status(cart.code).send(cart);
};

export const POSTProductToCart = async (req, res) => {
  const { idCart, idProd } = req.params;
  const cart = await CartService.addProductToCart(idCart, idProd);
  res.status(cart.code).send(cart);
};

export const PUTCart = async (req, res) => {
  const { idCart } = req.params;
  const { product } = req.body;
  const cart = await CartService.updateCart(idCart, product);
  res.status(cart.code).send(cart);
};

export const PUTQuantityInCart = async (req, res) => {
  const { idCart, idProd } = req.params;
  const { quantity } = req.body;
  const cart = await CartService.updateQtyInCart(idCart, idProd, quantity);
  res.status(cart.code).send(cart);
};

export const DELETEProductInCart = async (req, res) => {
  const { idCart, idProd } = req.params;
  const cart = await CartService.delProductInCart(idCart, idProd);
  res.status(cart.code).send(cart);
};

export const DELETECart = async (req, res) => {
  const { idCart } = req.params;
  const cart = await CartService.delCart(idCart);
  res.status(cart.code).send(cart);
};

export const DELETEEmptyCart = async (req, res) => {
  const { idCart } = req.params;
  const cart = await CartService.emptyCart(idCart);
  res.status(cart.code).send(cart);
};
