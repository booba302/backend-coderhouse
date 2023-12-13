import dao from "../dao/factory.js";

const { Product } = dao;
const productDAO = new Product();

export const getProducts = async () => {
  try {
    const products = await productDAO.find();
    if (!products) {
      return {
        code: 404,
        error: true,
        msg: "Productos no encontrados",
      };
    } else {
      return {
        code: 200,
        error: false,
        msg: "Productos encontrados",
        products: products,
      };
    }
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
  }
};

export const getFilteredProducts = async (limit, page, filter, order) => {
  try {
    const products = await productDAO.findFiltered(limit, page, filter, order);
    if (!products) {
      return {
        code: 404,
        error: true,
        msg: "Productos no encontrados",
      };
    } else {
      return {
        code: 200,
        error: false,
        msg: "Productos encontrados",
        products: products,
      };
    }
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const product = await productDAO.findById(id);
    if (!product) {
      return {
        code: 404,
        error: true,
        msg: `Producto con id ${id} no encontrado`,
      };
    } else {
      return {
        code: 200,
        error: false,
        msg: `Producto con id ${id} encontrado`,
        product: product,
      };
    }
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
  }
};

export const addProduct = async (product, id) => {
  try {
    product.owner = id
    const newProduct = await productDAO.create(product);
    return {
      code: 201,
      error: false,
      msg: "Producto creado satisfactoriamente",
      product: newProduct,
    };
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
  }
};

export const updateProduct = async (id, product) => {
  try {
    let products = await productDAO.findById(id);
    if (!products) {
      return {
        code: 404,
        error: true,
        msg: `Producto con id ${id} no encontrado`,
      };
    } else {
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
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const delProduct = productDAO.delete(id);
    if (!delProduct) {
      return {
        code: 404,
        error: true,
        msg: `Producto con id ${id} no encontrado`,
      };
    } else {
      return {
        code: 200,
        error: false,
        msg: `Producto eliminado con éxito`,
        product: delProduct,
      };
    }
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
  }
};
