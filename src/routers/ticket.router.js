import { Router } from "express";
import * as TicketController from "../controllers/ticket.controller.js";

const ticketRouter = Router();

ticketRouter.post("/:id", TicketController.GETPurchase);

export default ticketRouter;
