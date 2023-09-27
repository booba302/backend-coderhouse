import messageModel from "../models/messages.schema.js";

export default class MessageDAO {
  constructor() {}

  async find() {
    return await messageModel.find().lean();
  }

  async create(message) {
    return await messageModel.insertMany([message]);
  }
}
