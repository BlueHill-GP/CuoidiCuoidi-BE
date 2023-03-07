import express from 'express';
import {
  register,
  login,
  getRefreshToken,
  verifyRegister,
} from '../controllers/authController';
import { verifyOtp } from '../middleware/auth';
// import verifyToken from '../middleware/auth';
import {
  userLoginValidation,
  userRegisterValidation,
} from '../middleware/validation';

const router = express.Router();

// @router POST api/user/register
// @desc Register user
// @access Public
router.post('/register', userRegisterValidation, register);
router.post('/register/otp', verifyOtp, verifyRegister);

// @router POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', userLoginValidation, login);

// @router PUT api/auth/refresh-token
// @desc Get Refresh token
// @access Public
router.put('/refresh-token', getRefreshToken);
export default router;
