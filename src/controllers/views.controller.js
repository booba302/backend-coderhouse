import * as ProductService from "../services/products.service.js";
import * as CartService from "../services/carts.service.js";

export const GETRoot = async (req, res) => {
  res.redirect("/login");
};

export const GETLogin = async (req, res) => {
  res.render("login");
};

export const GETProductsView = async (req, res) => {
  const { name, lastname, email, role } = req.user.user;
  const products = await ProductService.getProducts();
  res.render("products", { products, name, lastname, email, role });
};

export const GETCarts = async (req, res) => {
  const { idCart } = req.params;
  const productsInCart = await CartService.getCartsById(idCart);
  const products = productsInCart.cart[0].products;
  res.render("cart", { idCart, products });
};

export const GETRegister = async (req, res) => {
  res.render("register");
};
