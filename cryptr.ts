import dotenv from "dotenv";
import Cryptr from "cryptr";
dotenv.config();
const cryptr = new Cryptr(process.env.CRYPTR_KEY);

export default cryptr;
