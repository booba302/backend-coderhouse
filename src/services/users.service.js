import dao from "../dao/factory.js";

const { User, Token } = dao;

const userDAO = new User();
const tokenDAO = new Token();

import bcrypt from "bcrypt";
import crypto from "crypto";

export const valUser = async (email, password) => {
  try {
    const user = await userDAO.findByEmail(email);
    if (!user) return false;
    const validPassword = bcrypt.compareSync(password, user.password);
    return validPassword ? user : false;
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
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
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
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
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
  }
};

export const recoverPassword = async (email) => {
  try {
    const user = await userDAO.findByEmail(email);
    if (!user) {
      return {
        code: 204,
        error: false,
        msg: "Usuario no existe",
      };
    }
    const token = await tokenDAO.find(user._id);
    if (token) await token.deleteOne();
    const resetToken = crypto.randomBytes(32).toString("hex");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(resetToken, salt);

    await tokenDAO.create({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
    });

    const link = `http://localhost:8080/resetpassword?token=${resetToken}&id=${user._id}`;
    return {
      code: 200,
      error: false,
      msg: "Enlace de recuperación creado",
      link: link,
    };
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
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
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
  }
};

export const updateUser = async (id, user) => {
  try {
    let users = await userDAO.findById(id);
    if (users) {
      const userData = users._doc;
      const newUser = {
        ...userData,
        ...user,
      };
      await userDAO.update(id, newUser);
      users = await userDAO.findById(id);
      return {
        code: 201,
        error: false,
        msg: `Usuario actualizado`,
        user: users,
      };
    }
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
  }
};

export const resetPassword = async (id, token, password) => {
  try {
    const passwordResetToken = await tokenDAO.find(id);
    if (!passwordResetToken) {
      return {
        code: 204,
        error: true,
        msg: "Token inválido o expiró",
      };
    }

    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
      return {
        code: 204,
        error: true,
        msg: "Token inválido o expiró",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    await userDAO.update(id, { password: hashedPwd });
    await passwordResetToken.deleteOne();

    return {
      code: 200,
      error: false,
      msg: `Contraseña actualizada`,
    };
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
  }
};

export const premiumUser = async (id) => {
  try {
    const user = await userDAO.findById(id);
    if (user) {
      const userUpdated = await userDAO.update(id, { role: "premium" });
      return {
        code: 200,
        error: false,
        msg: `Usuario actualizado`,
        user: userUpdated,
      };
    }
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const user = await userDAO.delete(id);
    return {
      code: 200,
      error: false,
      msg: "Usuario Eliminado",
      user: user,
    };
  } catch (error) {
    error.from = error.from || "SERVICE";
    throw error;
  }
};
