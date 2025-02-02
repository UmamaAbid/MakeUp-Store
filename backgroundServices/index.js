import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./utils/db.js";
import cron from "node-cron";
import sendWelcomeEmail from "./EmailService/sendWelcomeEmail.js";
import sendPendingOrderEmail from "./EmailService/sendPendingOrderEmail.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;

const services = () => {
  cron.schedule("* * * * * *", async () => {
   sendWelcomeEmail();
   sendPendingOrderEmail();
  });
};
services();
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  dbConnection();
});
