import dayjs from "dayjs";
import { Request, Response } from "express";
import cryptr from "../../cryptr.js";
import { findByCardDetails, update } from "../repositories/cardRepository.js";

export async function activateCard(req: Request, res: Response) {
  try {
    const { number, cardholderName, expirationDate, cvc, password } = req.body;

    const infosToActivateCard = await findByCardDetails(
      number,
      cardholderName,
      expirationDate
    );
    if (!(infosToActivateCard.securityCode === cvc)) {
      throw { error: "not a valid cvc", message: "insert a valid cvc!" };
    }

    if (infosToActivateCard.password) {
      throw {
        error: "card was activated",
        message: "this card has been activated",
      };
    }
    if (dayjs().isBefore(infosToActivateCard.expirationDate, "month")) {
      throw { error: "this out of date", message: "this card is out of date" };
    }

    update(infosToActivateCard.id, { password: password });
    console.log(infosToActivateCard);
  } catch (e) {
    return res.status(404).send(e);
  }
}
