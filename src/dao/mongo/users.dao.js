import UserModel from "../models/user.schema.js";

export default class UserDAO {
  constructor() {}

  async find() {
    try {
      return await UserModel.find().lean();
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  }

  async findById(id) {
    try {
      return await UserModel.findById(id).populate("cart").lean();
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  }

  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  }

  async update(id, user) {
    try {
      return await UserModel.updateOne({ _id: id }, user);
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  }

  async create(user) {
    try {
      return await UserModel.insertMany(user);
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  }

  async delete(id) {
    try {
      return await UserModel.findByIdAndDelete(id);
    } catch (error) {
      error.from = "DAOs";
      throw error;
    }
  }
}
