import UserDAO from "../dao/mongo/users.dao.js";
import bcrypt from "bcrypt";

const userDAO = new UserDAO();

export const valUser = async (email, password) => {
  const user = await userDAO.findByEmail(email);
  if (!user) return false;
  const validPassword = bcrypt.compareSync(password, user.password);
  console.log(validPassword);
  return validPassword ? user : false;
};
