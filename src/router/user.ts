import { Router } from "express";
import {  getUserById, updateAvatar } from "../controllers/userController";
import { verifyToken } from "../middleware/auth";
import { checkImage } from "../middleware/validation";

const router: Router = Router();

router.get('/:id', getUserById);

router.put('/avatar', verifyToken, checkImage, updateAvatar)

export default router;
