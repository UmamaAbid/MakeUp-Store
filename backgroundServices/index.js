import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./utils/db.js";
import cron from "node-cron";
import sendWelcomeEmail from "./EmailService/sendWelcomeEmail.js";
import sendPendingOrderEmail from "./EmailService/sendPendingOrderEmail.js";
import sendDeliveredOrder from "./EmailService/sendDeliveredOrder.js";
import sendPromotionEmail from "./EmailService/sendPromotionEmail.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;

const services = () => {
  cron.schedule("* * * * * *", async () => {
   sendWelcomeEmail();
   sendPendingOrderEmail();
   sendDeliveredOrder();
   sendPromotionEmail();
  });
};

const promotion = () => {
    cron.schedule("30 5  * * 5", async () => {
    });
  };
services();
promotion();
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  dbConnection();
});
