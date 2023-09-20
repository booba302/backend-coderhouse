import CartModel from "../models/cart.schema.js";

export default class CartDAO {
  constructor() {}

  async find() {
    return await CartModel.find().lean();
  }

  async findById(id) {
    return await CartModel.find({ _id: id })
      .populate("products.product")
      .lean();
  }

  async create() {
    return await CartModel.create({ products: [] });
  }

  async update(id, product) {
    console.log(product);
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
