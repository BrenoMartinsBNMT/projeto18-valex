import { Request, Response } from "express";
import { findByCardId } from "../repositories/paymentRepository";
export async function balanceAndTransactions(req: Request, res: Response) {
  const { cardId } = req.body;
  findByCardId(cardId);
}
