import dao from "../dao/factory.js";

const { Ticket, Cart } = dao;

const cartDAO = new Cart();
const ticketDAO = new Ticket();

import { v4 as uuidv4 } from "uuid";

import * as ProductService from "../services/products.service.js";

export const getPurchase = async (id, email, products) => {
  try {
    let failedProduct = [];
    let amount = 0;
    let ticket;
    for (const prd of products) {
      if (prd.product.stock >= prd.quantity) {
        let stock = { stock: prd.product.stock - prd.quantity };
        await ProductService.updateProduct(prd.product._id, stock);
        amount = amount + prd.product.price * prd.quantity;
      } else {
        failedProduct.push(prd);
      }
    }

    if (amount > 0) {
      const newTicket = {
        code: uuidv4(),
        purchase_datetime: new Date(),
        amount: amount,
        purchaser: email,
      };

      ticket = ticketDAO.create(newTicket);
      await cartDAO.update(id, failedProduct);

      return {
        code: 200,
        msg: "Ticket creado",
        ticket: ticket,
        noStock: failedProduct,
      };
    } else {
      return {
        code: 200,
        msg: "Productos no disponibles",
        noStock: failedProduct,
      };
    }
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
  }
};
