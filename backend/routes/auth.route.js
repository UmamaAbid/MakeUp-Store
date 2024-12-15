import express from "express";
import { registerUser } from "../controller/auth.controller.js";
import { loginUser } from "../controller/auth.controller.js";
import { logOut } from "../controller/auth.controller.js";

const router = express.Router();

// REGISTER ROUTE
router.post('/register', registerUser);

//LOGIN ROUTE
router.post('/login', loginUser);

// LOGOUT
router.get('/logout', logOut);

export default router;