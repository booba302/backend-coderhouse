import ProductModel from "../models/products.schema.js";

export default class ProductDAO {
  constructor() {}

  async find() {
    return await ProductModel.find().lean();
  }

  async findFiltered(limit, page, filter, order) {
    try {
      return await ProductModel.paginate(filter, {
        limit: limit,
        page: page,
        sort: order,
        lean: true,
      });
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  }

  async findById(id) {
    try {
      return await ProductModel.findById(id).lean();
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  }

  async create(product) {
    try {
      return await ProductModel.insertMany([product]);
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  }

  async update(id, product) {
    try {
      return await ProductModel.updateOne({ _id: id }, product);
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  }

  async delete(id) {
    try {
      return await ProductModel.findByIdAndDelete(id);
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  }
}
