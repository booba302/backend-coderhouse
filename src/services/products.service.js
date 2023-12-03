import dao from "../dao/factory.js";

const { Product } = dao;
const productDAO = new Product();

import CustomErrors from "../utils/customErrors.js";
import enumError from "../utils/enumError.js";
import {
  newProductError,
  getProductError,
  getProductsError,
} from "../utils/generateError.js";

export const getProducts = async () => {
  try {
    const products = await productDAO.find();
    return {
      code: 200,
      error: false,
      msg: "Productos encontrados",
      products: products,
    };
  } catch (e) {
    CustomErrors.createError({
      message: "CANNOT GET PRODUCTS",
      cause: getProductsError(),
      name: "Get products error",
      code: enumError.DATABASE_ERROR,
    });
  }
};

export const getFilteredProducts = async (limit, page, filter, order) => {
  try {
    const products = await productDAO.findFiltered(limit, page, filter, order);
    return {
      code: 200,
      error: false,
      msg: "Productos encontrados",
      products: products,
    };
  } catch (e) {
    CustomErrors.createError({
      message: "CANNOT GET PRODUCTS",
      cause: getProductsError(),
      name: "Get products error",
      code: enumError.DATABASE_ERROR,
    });
  }
};

export const getProductById = async (id) => {
  /* try {
    const product = await productDAO.findById(id);
    return {
      code: 200,
      error: false,
      msg: `Producto con id ${id} encontrado`,
      product: product,
    };
  } catch (e) {
    return {
      code: 400,
      error: true,
      msg: "Ocurrió un error al hacer la búsqueda",
      info: e,
    };
  } */
};

export const addProduct = async (product) => {
  try {
    const newProduct = await productDAO.create(product);
    return {
      code: 201,
      error: false,
      msg: "Producto creado satisfactoriamente",
      product: newProduct,
    };
  } catch (e) {
    CustomErrors.createError({
      message: "CANNOT CREATE PRODUCT",
      cause: newProductError(product),
      name: "Product Error",
      code: enumError.USER_INPUT_ERROR,
    });
  }
};

export const updateProduct = async (id, product) => {
  try {
    let products = await productDAO.findById(id);
    if (products) {
      const productData = products._doc;
      const newProduct = {
        ...productData,
        ...product,
      };
      await productDAO.update(id, newProduct);
      products = await productDAO.findById(id);
      return {
        code: 201,
        error: false,
        msg: `Producto actualizado`,
        product: products,
      };
    }
  } catch (e) {
    return {
      code: 400,
      error: true,
      msg: "Ocurrió un error al actualizar el producto",
      info: e,
    };
  }
};

export const deleteProduct = async (id) => {
  try {
    const delProduct = productDAO.delete(id);
    return {
      code: 200,
      error: false,
      msg: "Producto eliminado satisfactoriamente",
      product: delProduct,
    };
  } catch (e) {
    return {
      code: 400,
      error: true,
      msg: "Ocurrió un error al eliminar el producto",
      info: e,
    };
  }
};
