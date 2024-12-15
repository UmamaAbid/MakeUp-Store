import express from 'express';
import { errorHandler } from './middleware/error.middleware.js';
import { notFound } from './middleware/error.middleware.js';
import cookiePasror from 'cookie-parser'
import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";

import cors from 'cors';
const app = express();

app.use(cookiePasror());

app.use(express.json());
app.use(cors());
app.use(cookiePasror());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/products", productRoute);

app.use(notFound);
app.use(errorHandler);

export default app;