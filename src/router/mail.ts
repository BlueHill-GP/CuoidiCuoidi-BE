import express from "express";
import { mailRegister } from "../controllers/mailerController";

const router = express.Router();
router.post('/register', mailRegister);

export default router;