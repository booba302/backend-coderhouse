import * as ProductService from "../services/products.service.js";

export const GETProducts = async (req, res) => {
  const { limit = 10, page = 1, query, sort } = req.query;
  let order, filter;
  !query ? (filter = {}) : (filter = { catergory: query });
  sort == "asc"
    ? (order = { price: 1 })
    : sort == "desc"
    ? (order = { price: -1 })
    : (order = { price: 0 });

  const products = await ProductService.getFilteredProducts(
    limit,
    page,
    filter,
    order
  );
  res.send(products);
};

export const GETProductsById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductService.getProductById(id);
  res.send(product);
};

export const POSTProduct = async (req, res) => {
  const body = req.body;
  const product = await ProductService.addProduct(body);
  res.send(product);
};

export const PUTProduct = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = await ProductService.updateProduct(id, body);
  res.send(product);
};

export const DELETEProduct = async (req, res) => {
  const { id } = req.params;
  const product = await ProductService.deleteProduct(id);
  res.send(product);
};
