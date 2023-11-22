import UserDTO from "../dto/user.dto.js";
import * as UserServices from "../services/users.service.js";
import config from "../config/config.js";

import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.mailUser,
    pass: config.mailPass,
  },
});

export const GETLogout = (req, res) => {
  req.session.destroy((er) => {
    res.send("Se ha cerrado la sesión correctamente");
  });
};

export const GETCurrent = (req, res) => {
  const user = req.user;
  if (!user) return res.send("No existe usuario loggeado");
  const userDTO = new UserDTO(user);
  res.send({ user: userDTO });
};

export const GETUserById = async (req, res) => {
  const { id } = req.params;
  const user = await UserServices.getUserById(id);
  res.send(user);
};

export const POSTRecoverPassword = async (req, res) => {
  const { email } = req.body;
  const user = await UserServices.recoverPassword(email);
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
    res.render("found");
  }
};

export const POSTResetPassword = async (req, res) => {
  const { token, id } = req.params;
  const { password } = req.body;
   const updPassword = await UserServices.resetPassword(id, token, password);
  res.send(updPassword);
};
