import dao from "../dao/factory.js";

const { Cart, Product } = dao;
const cartDAO = new Cart();
const productDAO = new Product();

export const getCarts = async () => {
  try {
    const carts = await cartDAO.find();
    if (!carts) {
      return {
        code: 201,
        error: true,
        msg: "Carritos no encontrados",
      }
    } else {
      return {
        code: 200,
        error: false,
        msg: "Carritos encontrados",
        cart: carts,
      }
    }
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
  }
};

export const getCartsById = async (id) => {
  try {
    const cart = await cartDAO.findById(id);
    if (!cart) {
      return {
        code: 201,
        error: true,
        msg: "Carrito no encontrado",
      }
    } else {
      return {
        code: 200,
        error: false,
        msg: "Carritos encontrados",
        cart: cart,
      }
    }
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
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
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
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
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
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
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
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
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
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
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
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
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
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
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
  }
};
