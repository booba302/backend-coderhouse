import ProductDAO from "../dao/mongo/products.dao.js";

const productDAO = new ProductDAO();

export const getProducts = async () => {
  try {
    const products = await productDAO.find();
    return {
      error: false,
      msg: "Productos encontrados",
      products: products,
    };
  } catch (e) {
    return {
      error: true,
      msg: "Productos no encontrados",
      info: e,
    };
  }
};

export const getFilteredProducts = async (limit, page, filter, order) => {
  try {
    const products = await productDAO.findFiltered(limit, page, filter, order);
    return {
      error: false,
      msg: "Productos encontrados",
      products: products,
    };
  } catch (e) {
    return {
      error: true,
      msg: "Productos no encontrados",
      info: e,
    };
  }
};

export const getProductById = async (id) => {
  try {
    const product = await productDAO.findById(id);
    if (!product) {
      return {
        error: true,
        msg: `Producto con id ${id} no encontrado`,
      };
    } else {
      return {
        error: false,
        msg: `Producto con id ${id} encontrado`,
        product: product,
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

export const addProduct = async (product) => {
  try {
    const newProduct = await productDAO.create(product);
    return {
      error: false,
      msg: "Producto creado satisfactoriamente",
      product: newProduct,
    };
  } catch (e) {
    return {
      error: true,
      msg: "Ocurrió un error al agregar el producto",
      info: e,
    };
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
        error: false,
        msg: `Producto actualizado`,
        product: products,
      };
    }
  } catch (e) {
    return {
      error: true,
      msg: "Ocurrió un error al actualizar el producto",
      info: e,
    };
  }
};

export const deleteProduct = (id) => {
  try {
    const delProduct = productDAO.delete(id);
    return delProduct;
  } catch (e) {
    return {
      error: true,
      msg: "Ocurrió un error al eliminar el producto",
      info: e,
    };
  }
};
