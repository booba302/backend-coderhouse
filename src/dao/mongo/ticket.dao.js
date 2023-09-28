import TicketModel from "../models/ticket.schema.js";

export default class TicketDAO {
  constructor() {}

  async create(ticket) {
    return await TicketModel.create(ticket);
  }
}
