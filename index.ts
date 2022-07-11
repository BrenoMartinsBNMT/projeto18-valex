import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routerCreateCard from "./routers/routerCreateCard.js";
const app = express();
dotenv.config();

app.use(cors());
app.use(json());
app.use(routerCreateCard);

app.get("/", (req, res) => {
  res.send("api funcionado!!!");
});
app.listen(process.env.PORT, () => {
  console.log("server open ", process.env.PORT);
});
