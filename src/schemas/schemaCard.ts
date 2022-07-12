import Joi, { string } from "joi";

export const schemaCard = Joi.object({
  type: Joi.string()
    .equal("groceries", "restaurants", "transport", "education", "health")
    .required(),
  cpf: Joi.number().required(),
});

export const schemaActivateCard = Joi.object({
  number: Joi.string().length(19).required(),
  cardholderName: Joi.string().required(),
  expirationDate: Joi.string().length(5).required(),
  cvc: Joi.string().length(3).required(),
  password: Joi.string().length(4).required(),
});

export const schemaVisualizationBalance = Joi.object({
  cardId: Joi.string().required(),
});
