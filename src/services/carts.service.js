import { v4 as uuidv4 } from "uuid";

import CartDAO from "../dao/mongo/carts.dao.js";
import ProductDAO from "../dao/mongo/products.dao.js";
import * as TicketServices from "../services/ticket.service.js";
import * as ProductService from "../services/products.service.js";

const cartDAO = new CartDAO();
const productDAO = new ProductDAO();

export const getCarts = async () => {
  try {
    const carts = await cartDAO.find();
    return {
      code: 200,
      error: false,
      msg: "Carritos encontrados",
      cart: carts,
    };
  } catch (e) {
    return {
      code: 400,
      error: true,
      msg: "Carritos no encontrados",
      info: e,
    };
  }
};

export const getCartsById = async (id) => {
  try {
    const cart = await cartDAO.findById(id);
    return {
      code: 200,
      error: false,
      msg: "Carritos encontrados",
      cart: cart,
    };
  } catch (e) {
    return {
      code: 400,
      error: true,
      msg: "Ocurrió un error al hacer la búsqueda",
      info: e,
    };
  }
};

export const getCartPurchase = async (id, email, products) => {
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

      ticket = await TicketServices.addTicket(newTicket);
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
  } catch (e) {
    return {
      code: 400,
      error: true,
      msg: "Ocurrió un error al crear el ticket",
      info: e,
    };
  }
};

export const addCart = async () => {
  try {
    const newCart = await cartDAO.create();
    return {
      code: 201,
      error: false,
      msg: "Carrito creado satisfactoriamente",
      cart: newCart,
    };
  } catch (e) {
    return {
      code: 400,
      error: true,
      msg: "Ocurrió un error al agregar el carrito",
      info: e,
    };
  }
};

export const addProductToCart = async (idCart, idProd) => {
  try {
    let products = [];
    let findCart = await cartDAO.findById(idCart);
    const findProd = await productDAO.findById(idProd);
    if (!findCart || !findProd) {
      return {
        error: true,
        msg: "Carrito o producto no encontrado",
      };
    }
    const findProductsInCart = findCart.products.find(
      (prod) => prod.product._id == idProd
    );
    if (!findProductsInCart) {
      products = findCart.products;
      products.push({ product: idProd, quantity: 1 });
      await cartDAO.update(idCart, products);
    } else {
      findCart.products.map((prod) => {
        if (prod.product._id != idProd) {
          products.push(prod);
        }
      });
      findProductsInCart.quantity++;
      products.push(findProductsInCart);
      await cartDAO.update(idCart, products);
    }
    findCart = await cartDAO.findById(idCart);
    return {
      code: 201,
      error: false,
      msg: `Se agrego ${idProd} al carrito ${idCart}`,
      cart: findCart,
    };
  } catch (e) {
    return {
      code: 400,
      error: true,
      msg: "Ocurrió un error al agregar un producto al carrito",
      info: e,
    };
  }
};

export const updateCart = async (id, product) => {
  try {
    let findCart = await cartDAO.findById(id);
    await cartDAO.update(id, product);
    findCart = await cartDAO.findById(id);
    return {
      code: 201,
      error: false,
      msg: `Carrito actualizado`,
      product: findCart,
    };
  } catch (e) {
    return {
      code: 400,
      error: true,
      msg: "Ocurrió un error al actualizar el carrito",
      info: e,
    };
  }
};

export const updateQtyInCart = async (idCart, idProd, quantity) => {
  try {
    const findCart = await cartDAO.findById(idCart);
    const prdtIndex = findCart.products.findIndex(
      (prod) => prod.product == idProd
    );
    if (prdtIndex !== -1) {
      findCart.products[prdtIndex].quantity = quantity;
      await findCart.save();
      return {
        code: 201,
        error: false,
        msg: `Se actualizó la cantidad del producto ${idProd} del carrito ${idCart}`,
        cart: findCart,
      };
    } else {
      return {
        code: 200,
        error: true,
        msg: `Producto no encontrado en el carrito`,
      };
    }
  } catch (e) {
    return {
      code: 400,
      error: true,
      msg: "Ocurrió un error al actualizar el carrito",
      info: e,
    };
  }
};

export const delCart = async (id) => {
  try {
    const cart = await cartDAO.delete(id);
    return {
      code: 200,
      error: false,
      msg: "Carrito eliminado",
      product: cart,
    };
  } catch (e) {
    return {
      code: 400,
      error: true,
      msg: "Ocurrió un error al eliminar el carrito",
      info: e,
    };
  }
};

export const delProductInCart = async (idCart, idProd) => {
  try {
    let findCart = await cartDAO.findById(idCart);
    const prdtIndex = findCart.products.findIndex(
      (prod) => prod.product == idProd
    );
    if (findCart.products[prdtIndex].quantity > 1) {
      findCart.products[prdtIndex].quantity--;
    } else {
      findCart = await CartModel.findOneAndUpdate(
        { _id: idCart },
        { $pull: { products: { product: idProd } } },
        { new: true }
      );
    }
    await findCart.save();
    return {
      code: 200,
      error: false,
      msg: `Se eliminó ${idProd} del carrito ${idCart}`,
      cart: findCart,
    };
  } catch (e) {
    return {
      code: 400,
      error: true,
      msg: "Ocurrió un error al eliminar el producto del carrito",
      info: e,
    };
  }
};

export const emptyCart = async (id) => {
  try {
    let findCart = await cartDAO.findById(id);
    findCart.products = [];
    await findCart.save();
    return {
      code: 200,
      error: false,
      msg: `Se limpió el carrito ${id}`,
      cart: findCart,
    };
  } catch (e) {
    return {
      code: 400,
      error: true,
      msg: "Ocurrió un error al limpiar el carrito",
      info: e,
    };
  }
};

//
