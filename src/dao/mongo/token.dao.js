import TokenModel from "../models/token.schema.js";

export default class TokenDAO {
  constructor() {}

  async create(token) {
    return await TokenModel.create(token);
  }

  async find(id) {
    return await TokenModel.findOne({ userId: id });
  }

  async delete(id) {
    return await TokenModel.deleteOne({ userId: id });
  }
}
