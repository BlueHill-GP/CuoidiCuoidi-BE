import express from 'express';
import { register, login, getRefreshToken } from '../controllers/authController';
import verifyToken from '../middleware/auth';
import { userValidation } from '../middleware/validation';

const router = express.Router();

// @router POST api/user/register
// @desc Register user
// @access Public
router.post('/register', userValidation,  register);

// @router POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', userValidation, login);

// @router PUT api/auth/refresh-token
// @desc Get Refresh token
// @access Public
router.put('/refresh-token', getRefreshToken);
export default router;
