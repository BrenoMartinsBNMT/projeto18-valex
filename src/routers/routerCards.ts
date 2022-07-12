import { Router } from "express";
import { createCardEmployee } from "../controllers/createCardEmployee.js";
import { middlewareCards } from "../middlewares/middlewareCards.js";
import { schemaCard, schemaActivateCard } from "../schemas/schemaCard.js";
import { activateCard } from "../services/servicesCard.js";

const routerCards = Router();

routerCards.post(
  "/createCard",
  middlewareCards(schemaCard),
  createCardEmployee
);

routerCards.post(
  "/activateCard",
  middlewareCards(schemaActivateCard),
  activateCard
);

routerCards.get("/balance-and-transactions");
export default routerCards;
