import generateProducts from "../utils/genetareProducts.js";

export const GETFakeProducts = (req, res) => {
  const products = [];
  for (let i = 0; i < 100; i++) {
    products.push(generateProducts());
  }
  res.send(products);
};
