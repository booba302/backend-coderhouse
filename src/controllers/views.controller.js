import * as ProductService from "../services/products.service.js";
import * as CartService from "../services/carts.service.js";

export const GETIndex = async (req, res) => {
  res.render("index");
};

export const GETLogin = async (req, res) => {
  res.render("login");
};

export const GETProductsView = async (req, res) => {
  const products = await ProductService.getProducts();
  if (req.user) {
    let roles = {};
    let name, lastname, email, role, cart;
    if (req.user) {
      ({ name, lastname, email, role, cart } = req.user);
      roles = { [role]: true };
    } else {
      roles = { notLogged: true };
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
    console.log(products);
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
