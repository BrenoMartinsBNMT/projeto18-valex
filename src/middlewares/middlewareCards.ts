import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export function middlewareCards(schema: ObjectSchema) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const { error } = schema.validate(req.body);
    try {
      if (error) {
        return res.status(422).send(error.details);
      }
      next();
    } catch (e) {
      return res.status(e.response.status).send(e);
    }
  };
}
