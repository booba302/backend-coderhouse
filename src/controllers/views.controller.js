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

export const GETPasswordRecovery = async (req, res) => {
  res.render("recoverPassword");
};

export const GETResetPassword = async (req, res) => {
  const { id, token } = req.query;
  res.render("resetPassword", { id, token });
};

export const POSTResetPassword = async (req, res) => {
  console.log(qadasdasdasd);
  const { password } = req.body;
  console.log(password);
  /* Lógica de envío de correo */
};
