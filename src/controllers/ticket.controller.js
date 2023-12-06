import * as TicketServices from "../services/ticket.service.js";
import * as CartService from "../services/carts.service.js";

import CustomErrors from "../utils/customErrors.js";
import ERROR_DICTIONARY from "../config/errorDictionary.js";

export const POSTPurchase = async (req, res, next) => {
  const { email } = req.user;
  const { id } = req.params;
  try {
    const cart = await CartService.getCartsById(id);
    if (!cart) return CustomErrors.create(ERROR_DICTIONARY.default);
    const { products } = cart.cart;
    const purchase = await TicketServices.getPurchase(id, email, products);
    if (!purchase) return CustomErrors.create(ERROR_DICTIONARY.default);
    res.status(purchase.code).send(purchase);
  } catch (error) {
    error.from = error.from || "CONTROLLER";
    next(error);
  }
};
