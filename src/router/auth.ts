import express from 'express';
import {
  register,
  login,
  getRefreshToken,
  verifyRegister,
  resendOtp,
} from '../controllers/authController';
import { userGetBackOtp, verifyOtp } from '../middleware/auth';
// import verifyToken from '../middleware/auth';
import {
  userLoginValidation,
  userRegisterValidation,
} from '../middleware/validation';

const router = express.Router();

// @router POST api/user/register
// @desc Register user
// @access Public


// http://localhost:3000/api/auth/
// http://localhost:3000/api/booking;


router.post('/register', userRegisterValidation, register);

router.post('/register/resend-OTP', userGetBackOtp, resendOtp);

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
