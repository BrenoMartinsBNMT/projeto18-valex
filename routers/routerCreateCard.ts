import { Router } from "express";
import { createCardEmployee } from "../controllers/createCardEmployee.js";
import { middlewareRegistrationCard } from "../middlewares/middlewareRegistrationCard.js";
import { schemaCard } from "../schemas/schemaRegistrationCard.js";

const routerCreateCard = Router();

routerCreateCard.post(
  "/createCard",
  middlewareRegistrationCard(schemaCard),
  createCardEmployee
);

export default routerCreateCard;
