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
    try {
      return await CartModel.create({ products: [] });
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  }

  async update(id, product) {
    try {
      return await CartModel.findByIdAndUpdate(
        { _id: id },
        { products: product }
      );
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  }

  async delete(id) {
    try {
      return await CartModel.findByIdAndDelete(id);
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  }

  async save() {
    try {
      return await CartModel.save();
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  }
}
