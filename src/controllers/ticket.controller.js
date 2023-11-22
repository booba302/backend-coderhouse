import * as TicketServices from "../services/ticket.service.js";
import * as CartService from "../services/carts.service.js";

export const GETPurchase = async (req, res) => {
  const { email } = req.user;
  const { id } = req.params;
  const cart = await CartService.getCartsById(id);
  const { products } = cart.cart;
  const purchase = await TicketServices.getPurchase(id, email, products);
  res.status(purchase.code).send(purchase);
};
