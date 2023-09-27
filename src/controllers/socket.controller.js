import * as ProductService from "../services/products.service.js";
import * as MessageService from "../services/message.service.js";

export const socketConnection = async (socket) => {
  console.log(`socket conectado: ${socket.id}`);
  const products = await ProductService.getProducts();
  socket.emit("sendProdc", products);

  const messages = await MessageService.getMessages();
  socket.emit("allMessages", messages);

  socket.on("addProdc", async (product) => {
    try {
      await ProductService.addProduct(product);
      const products = await ProductService.getProducts();
      socket.emit("sendProdc", products);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("delProdc", async (id) => {
    try {
      await ProductService.deleteProduct(id);
      const products = await ProductService.getProducts();
      socket.emit("sendProdc", products);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("sendMsg", async (data) => {
    let user = data.user;
    let message = data.message;
    await MessageService.addMessage({
      user,
      message,
    });
    const messages = await MessageService.getMessages();
    socket.broadcast.emit("getMsg", messages);
  });
};
