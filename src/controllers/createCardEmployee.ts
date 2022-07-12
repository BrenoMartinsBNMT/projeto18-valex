import { Request, Response } from "express";
import {
  findByTypeAndEmployeeId,
  insert,
} from "../repositories/cardRepository.js";
import { findByApiKey } from "../repositories/companyRepository.js";
import { findById } from "../repositories/employeeRepository.js";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import cryptr from "../../cryptr.js";

export async function createCardEmployee(req: Request, res: Response) {
  const tokenCompany = req.header("x-api-key");
  const { type, cpf } = req.body;
  const ifExistCompany = await findByApiKey(tokenCompany);
  const ifExistEmployee = await findById(cpf);
  if (!ifExistCompany || !ifExistEmployee) {
    return res.status(404).send("Company or employee does not exist!");
  }
  const ifEmployeeHasTypeCard = await findByTypeAndEmployeeId(
    type,
    ifExistEmployee.id
  );

  if (ifEmployeeHasTypeCard) {
    return res.status(409).send("employee has this type of card");
  }

  const splitedNameEmployee = ifExistEmployee.fullName.split(" ");
  const nameInCardWithFormat = splitedNameEmployee.map((element, index) => {
    if (index !== 0 && index !== splitedNameEmployee.length - 1) {
      return element[0];
    }
    return element;
  });

  const cardDateNowdayjs = `${dayjs().add(5, "years").format("MM/YY")}`;
  const cvc = faker.finance.creditCardCVV();
  const createCardInfos = {
    employeeId: ifExistEmployee.id,
    number: faker.finance.creditCardNumber("visa"),
    cardholderName: nameInCardWithFormat.join(" "),
    securityCode: cryptr.encrypt(cvc),
    expirationDate: cardDateNowdayjs,
    password: "",
    isVirtual: false,

    isBlocked: false,
    type: type,
  };
  try {
    await insert(createCardInfos);
    return res.sendStatus(201);
  } catch (e) {
    return res.status(e.response.status).send(e);
  }
}
