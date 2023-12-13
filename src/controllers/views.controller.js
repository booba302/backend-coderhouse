import * as ProductService from "../services/products.service.js";
import * as CartService from "../services/carts.service.js";

import CustomErrors from "../utils/customErrors.js";
import ERROR_DICTIONARY from "../config/errorDictionary.js";

export const GETIndex = async (req, res) => {
  const roles = { notLogged: true };
  res.render("index", { roles });
};

export const GETLogin = async (req, res) => {
  const roles = { notLogged: true };
  res.render("login", { roles });
};

export const GETPasswordRecovery = async (req, res) => {
  const roles = { notLogged: true };
  res.render("recoverPassword", { roles });
};

export const GETRegister = async (req, res) => {
  const roles = { notLogged: true };
  res.render("register", { roles });
};

export const GETProductsView = async (req, res) => {
  const products = await ProductService.getProducts();
  let roles = {};
  if (req.user) {
    const { name, lastname, email, role, cart } = req.user;
    roles = { [role]: true };
    if (role === "premium") {
      products.products.map((prod) => {
        console.log(prod.owner);
        if (prod.owner.email === req.user.email) {
          prod.owned = true;
        }
      });
    }
    res.render("products", {
      products,
      roles,
      name,
      lastname,
      email,
      role,
      cart,
    });
  } else {
    roles = { notLogged: true };
    res.render("indexProducts", { products });
  }
};

export const GETNewProducts = async (req, res) => {
  res.render("newProduct");
};

export const GETEditProduct = async (req, res) => {
  const { id } = req.params;
  const product = await ProductService.getProductById(id);
  res.render("editProduct", { product, id });
};

export const GETCarts = async (req, res) => {
  const { idCart } = req.params;
  const productsInCart = await CartService.getCartsById(idCart);
  const products = productsInCart.cart.products;
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    let subtotal = products[i].product.price * products[i].quantity;
    products[i].product.subtotal = subtotal.toFixed(2);
    total = total + subtotal;
    products.total = total.toFixed(2);
  }
  res.render("cart", { idCart, products });
};

export const GETResetPassword = async (req, res) => {
  const { id, token } = req.query;
  res.render("resetPassword", { id, token });
};
