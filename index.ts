import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routerCards from "./src/routers/routerCards.js";
const app = express();
dotenv.config();

app.use(cors());
app.use(json());
app.use(routerCards);

app.get("/", (req, res) => {
  res.send("api funcionado!!!");
});
app.listen(process.env.PORT, () => {
  console.log("server open ", process.env.PORT);
});
