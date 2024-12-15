import express from 'express';
import { errorHandler } from './middleware/error.middleware.js';
import { notFound } from './middleware/error.middleware.js';
import cookiePasror from 'cookie-parser'
import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import bannerRoute from "./routes/banner.route.js";
import userRoute from './routes/user.route.js';
import orderRoute from './routes/order.route.js';
import cors from 'cors';
const app = express();

app.use(cookiePasror());

app.use(express.json());
app.use(cors());
app.use(cookiePasror());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/banner", bannerRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/order", orderRoute);


app.use(notFound);
app.use(errorHandler);

export default app;