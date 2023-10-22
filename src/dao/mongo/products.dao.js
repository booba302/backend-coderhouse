import ProductModel from "../models/products.schema.js";

export default class ProductDAO {
  constructor() {}

  async find() {
    return await ProductModel.find().lean();
  }

  async findFiltered(limit, page, filter, order) {
    return await ProductModel.paginate(filter, {
      limit: limit,
      page: page,
      sort: order,
      lean: true,
    });
  }

  async findById(id) {
    return await ProductModel.findById(id);
  }

  async create(product) {
    return await ProductModel.insertMany([product]);
  }

  async update(id, product) {
    return await ProductModel.updateOne({ _id: id }, product);
  }

  async delete(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}
