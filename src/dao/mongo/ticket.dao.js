import TicketModel from "../models/ticket.schema.js";

export default class TicketDAO {
  constructor() {}

  async create(ticket) {
    try {
      return await TicketModel.create(ticket);
    } catch (error) {
      error.from = "DAO";
      throw error;
    }
  }
}
