import TicketDAO from "../dao/mongo/ticket.dao.js";

const ticketDAO = new TicketDAO();

export const addTicket = async (ticket) => {
  try {
    const newTicket = ticketDAO.create(ticket);
    return newTicket;
  } catch (e) {
    return e;
  }
};
