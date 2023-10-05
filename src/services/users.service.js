import UserDAO from "../dao/mongo/users.dao.js";
import bcrypt from "bcrypt";

const userDAO = new UserDAO();

export const valUser = async (email, password) => {
  try {
    const user = await userDAO.findByEmail(email);
    if (!user) return false;
    const validPassword = bcrypt.compareSync(password, user.password);
    return validPassword ? user : false;
  } catch (e) {
    console.log("first");
  }
};

export const getUserById = async (id) => {
  try {
    const user = await userDAO.findById(id);
    return {
      code: 200,
      error: false,
      msg: "Usuario encontrado",
      user: user,
    };
  } catch (e) {
    return {
      code: 400,
      error: true,
      msg: "Usuario no encontrado",
      info: e,
    };
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await userDAO.findByEmail(email);
    if (user == null) {
      return {
        code: 204,
        error: false,
        msg: "Usuario no existe",
      };
    } else {
      return {
        code: 200,
        error: false,
        msg: "Usuario encontrado",
        user: user,
      };
    }
  } catch (e) {
    return {
      code: 400,
      error: true,
      msg: "Usuario no encontrado",
      info: e,
    };
  }
};

export const addUser = async (user) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(user.password, salt);
    user.password = hashedPwd;
    const newUser = await userDAO.create(user);
    return {
      code: 201,
      error: false,
      msg: "Usuario creado satisfactoriamente",
      user: newUser,
    };
  } catch (e) {
    return {
      code: 400,
      error: true,
      msg: "Ocurrió un error al agregar el usuario",
      info: e,
    };
  }
};
