import CartModel from "../models/cart.schema.js";

export default class CartDAO {
  constructor() {}

  async find() {
    return await CartModel.find().lean();
  }

  async findById(id) {
    try {
      return await CartModel.findById(id).lean();
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  }

  async create() {
    return await CartModel.create({ products: [] });
  }

  async update(id, product) {
    return await CartModel.findByIdAndUpdate(
      { _id: id },
      { products: product }
    );
  }

  async delete(id) {
    return await CartModel.findByIdAndDelete(id);
  }

  async save() {
    return await CartModel.save();
  }
}
