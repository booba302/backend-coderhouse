import UserDTO from "../dto/user.dto.js";
import * as UserServices from "../services/users.service.js";

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
