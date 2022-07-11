import { Request, Response } from "express";
import { findByApiKey } from "../repositories/companyRepository.js";
import { findById } from "../repositories/employeeRepository.js";
export async function createCardEmployee(req: Request, res: Response) {
  const tokenCompany = req.header("x-api-key");
  const { type, cpf } = req.body;
  const ifExistCompany = await findByApiKey(tokenCompany);
  const ifExistEmployee = await findById(cpf);
  if (!ifExistCompany) {
  }
  return res.send(ifExistCompany);
}
