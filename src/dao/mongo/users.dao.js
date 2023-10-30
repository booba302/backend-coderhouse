import UserModel from "../models/user.schema.js";

export default class UserDAO {
  constructor() {}

  async find() {
    return await UserModel.find().lean();
  }

  async findById(id) {
    return await UserModel.findById(id).populate("cart").lean();
  }

  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async update(id, user) {
    return await UserModel.updateOne({ _id: id }, user)
  }

  async create(user) {
    return await UserModel.insertMany(user);
  }

  async delete(id) {
    return await UserModel.findByIdAndDelete(id);
  }
}
