import { Router } from "express";
import * as TicketController from "../controllers/ticket.controller.js";

import { isAdmin } from "../utils/secure.middleware.js";

const ticketRouter = Router();

ticketRouter.post("/:id", isAdmin, TicketController.POSTPurchase);

export default ticketRouter;
