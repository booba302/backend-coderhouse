import CartDAO from "../dao/mongo/carts.dao.js";
import ProductDAO from "../dao/mongo/products.dao.js";

const cartDAO = new CartDAO();
const productDAO = new ProductDAO();

export const getCarts = async () => {
  try {
    const carts = await cartDAO.find();
    return {
      error: false,
      msg: "Carritos encontrados",
      cart: carts,
    };
  } catch (e) {
    return {
      error: true,
      msg: "Carritos no encontrados",
      info: e,
    };
  }
};

export const getCartsById = async (id) => {
  try {
    const cart = await cartDAO.findById(id);
    if (!cart) {
      return {
        error: true,
        msg: `Carrito con id ${id} no encontrado`,
      };
    } else {
      return {
        error: false,
        msg: `Carrito con id ${id} encontrado`,
        cart: cart,
      };
    }
  } catch (e) {
    return {
      error: true,
      msg: "Ocurrió un error al hacer la búsqueda",
      info: e,
    };
  }
};

export const addCart = async () => {
  try {
    const newCart = await cartDAO.create();
    return {
      error: false,
      msg: "Carrito creado satisfactoriamente",
      cart: newCart,
    };
  } catch (e) {
    return {
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
    const findProductsInCart = findCart[0].products.find(
      (prod) => prod.product._id == idProd
    );
    if (!findProductsInCart) {
      products.push({ product: idProd, quantity: 1 });
      await cartDAO.update(idCart, products);
    } else {
      findCart[0].products.map((prod) => {
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
      error: false,
      msg: `Se agrego ${idProd} al carrito ${idCart}`,
      cart: findCart,
    };
  } catch (e) {
    return {
      error: true,
      msg: "Ocurrió un error al agregar un producto al carrito",
      info: e,
    };
  }
};

export const updateCart = async (id, product) => {
  try {
    let findCart = await cartDAO.findById(id);
    if (!findCart) {
      return {
        error: true,
        msg: `Carrito con id ${id} no encontrado`,
      };
    } else {
      await cartDAO.update(id, product);
      findCart = await cartDAO.findById(id);
      return {
        error: false,
        msg: `Carrito actualizado`,
        product: findCart,
      };
    }
  } catch (e) {
    return {
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
        error: false,
        msg: `Se actualizó la cantidad del producto ${idProd} del carrito ${idCart}`,
        cart: findCart,
      };
    } else {
      return {
        error: true,
        msg: `Producto no encontrado en el carrito`,
      };
    }
  } catch (e) {
    return {
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
      error: false,
      msg: "Carrito eliminado",
      product: cart,
    };
  } catch (e) {
    return {
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
      error: false,
      msg: `Se eliminó ${idProd} del carrito ${idCart}`,
      cart: findCart,
    };
  } catch (e) {
    return {
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
      error: false,
      msg: `Se limpió el carrito ${id}`,
      cart: findCart,
    };
  } catch (e) {
    return {
      error: true,
      msg: "Ocurrió un error al limpiar el carrito",
      info: e,
    };
  }
};