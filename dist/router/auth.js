"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
// import verifyToken from '../middleware/auth';
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
// @router POST api/user/register
// @desc Register user
// @access Public
router.post('/register', validation_1.userRegisterValidation, authController_1.register);
router.post('/register/resend-OTP', auth_1.userGetBackOtp, authController_1.resendOtp);
router.post('/register/otp', auth_1.verifyOtp, authController_1.verifyRegister);
// @router POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', validation_1.userLoginValidation, authController_1.login);
// @router PUT api/auth/refresh-token
// @desc Get Refresh token
// @access Public
router.put('/refresh-token', authController_1.getRefreshToken);
exports.default = router;
//# sourceMappingURL=auth.js.map