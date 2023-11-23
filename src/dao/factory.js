import mongoose from "mongoose";
import args from "../config/args.js";
import config from "../config/config.js";

let dao = {};

switch (args.mode) {
  case "dev":
    console.log("FS");
    break;
  case "prod":
    mongoose
      .connect(config.mongoUrl)
      .then(() => console.log("BD Mongo Connected"));
    const { default: ProductDAO } = await import("./mongo/products.dao.js");
    const { default: UserDAO } = await import("./mongo/users.dao.js");
    const { default: CartDAO } = await import("./mongo/carts.dao.js");
    const { default: TicketDAO } = await import("./mongo/ticket.dao.js");
    const { default: TokenDAO } = await import("./mongo/token.dao.js");
    dao = {
      Product: ProductDAO,
      User: UserDAO,
      Cart: CartDAO,
      Ticket: TicketDAO,
      Token: TokenDAO,
    };
    break;
}

export default dao;
