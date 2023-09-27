import MessageDAO from "../dao/mongo/message.dao.js";

const messageDAO = new MessageDAO();

export const getMessages = async () => {
  try {
    const msgs = await messageDAO.find();
    return {
      code: 200,
      error: false,
      msg: "Mensajes encontrados",
      messages: msgs,
    };
  } catch (e) {
    return {
      code: 400,
      error: true,
      msg: "Mensajes no encontrados",
      info: e,
    };
  }
};

export const addMessage = async (message) => {
  try {
    const newMessage = await messageDAO.create(message);
    return {
      code: 201,
      error: false,
      msg: "Mensajes creado satisfactoriamente",
      messages: newMessage,
    };
  } catch (e) {
    return {
      code: 400,
      error: true,
      msg: "Ocurrió un error al agregar el mensaje",
      info: e,
    };
  }
};
