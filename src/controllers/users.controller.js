import UserDTO from "../dto/user.dto.js";
import * as UserServices from "../services/users.service.js";
import config from "../config/config.js";

import nodemailer from "nodemailer";

import CustomErrors from "../utils/customErrors.js";
import ERROR_DICTIONARY from "../config/errorDictionary.js";

const transport = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: config.mailUser,
    pass: config.mailPass,
  },
});

export const GETCurrent = (req, res, next) => {
  const user = req.user;
  if (!user) return res.send("No existe usuario loggeado");
  const userDTO = new UserDTO(user);
  res.send({ user: userDTO });
};

export const GETUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await UserServices.getUserById(id);
    if (!user) return CustomErrors.create(ERROR_DICTIONARY.default);
    res.send(user);
  } catch (error) {
    error.from = error.from || "CONTROLLER";
    next(error);
  }
};

export const POSTRecoverPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await UserServices.recoverPassword(email);
    if (!user) return CustomErrors.create(ERROR_DICTIONARY.default);
    if (user.code !== 200) {
      res.render("notFound");
    } else {
      const mail = await transport.sendMail({
        from: "The Great Henge <josh.dietrich87@ethereal.email>",
        to: email,
        subject: "Cambio de contraseña",
        text: "Cambio de contraseña",
        html: `<a href=${user.link}>Restaura tu contraseña acá</a>`,
      });
      if (!mail) return CustomErrors.create(ERROR_DICTIONARY.default);
      res.render("found");
    }
  } catch (error) {
    error.from = error.from || "CONTROLLER";
    next(error);
  }
};

export const POSTResetPassword = async (req, res, next) => {
  const { token, id } = req.params;
  const { password } = req.body;
  try {
    const updPassword = await UserServices.resetPassword(id, token, password);
    if (!updPassword) return CustomErrors.create(ERROR_DICTIONARY.default);
    res.send(updPassword);
  } catch (error) {
    error.from = error.from || "CONTROLLER";
    next(error);
  }
};

export const GETPremiumUser = async (req, res, next) => {
  const { _id: id } = req.user;
  try {
    const user = await UserServices.premiumUser(id);
    if (!user) return CustomErrors.create(ERROR_DICTIONARY.default);
    res.send(user);
  } catch (error) {
    error.from = error.from || "CONTROLLER";
    next(error);
  }
};

export const DELETEUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await UserServices.deleteUser(id);
    if (!user) return CustomErrors.create(ERROR_DICTIONARY.default);
    res.send(user);
  } catch (error) {
    error.from = error.from || "CONTROLLER";
    next(error);
  }
};
