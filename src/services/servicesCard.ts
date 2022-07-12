import { Request, Response } from "express";
import cryptr from "../../cryptr.js";
import { findByCardDetails } from "../repositories/cardRepository.js";

export async function activateCard(req: Request, res: Response) {
  const { number, cardholderName, expirationDate, cvc, password } = req.body;

  const infosToActivateCard = await findByCardDetails(
    number,
    cardholderName,
    expirationDate
  );

  const a = cryptr.decrypt(infosToActivateCard.securityCode);
  console.log(a);
  console.log(infosToActivateCard);
}
