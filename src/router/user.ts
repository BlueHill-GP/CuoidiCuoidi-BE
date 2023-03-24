import { Router } from "express";
import {
  getUserById,
  updateAvatar,
  updateDesc,
} from '../controllers/userController';
import { verifyToken } from "../middleware/auth";
import { checkImage } from "../middleware/validation";

const router: Router = Router();

router.get('/:id', getUserById);

router.put('/avatar', verifyToken, checkImage, updateAvatar)
router.put('/desc', verifyToken, updateDesc);

export default router;
