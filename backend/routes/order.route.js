import express from "express";
import  protect  from "../middleware/auth.middleware.js";
const router = express.Router();
import {
  createOrder,
  updateOrder,
  getAllOrders,
  deleteOrder,
  getUserOrder,
} from "../controller/order.controller.js";

// CREATE ORDER ROUTE
router.post("/", createOrder);
//UPDATE ORDER ROUTE
router.put("/:id", updateOrder);
//GET ALL ORDERS ROUTE
router.get("/", protect, getAllOrders);
// DELETE ORDER ROUTE
router.delete("/:id", deleteOrder);
//GET USER ORDERS ROUTE
router.get("/find/:id", getUserOrder);

export default router;