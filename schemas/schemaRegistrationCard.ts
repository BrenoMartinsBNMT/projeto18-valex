import Joi, { string } from "joi";

export const schemaCard = Joi.object({
  type: Joi.string()
    .equal("groceries", "restaurants", "transport", "education", "health")
    .required(),
  cpf: Joi.number().required(),
});
