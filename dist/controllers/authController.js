"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendOtp = exports.verifyRegister = exports.getRefreshToken = exports.login = exports.register = void 0;
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const responseUtils_1 = require("../utils/responseUtils");
const tokenUtils_1 = require("../utils/tokenUtils");
const OTPUtils_1 = require("../utils/OTPUtils");
const UserRedisRepository_1 = __importDefault(require("../repositories/UserRedisRepository"));
const OtpRedisRepository_1 = __importDefault(require("../repositories/OtpRedisRepository"));
const mailUtils_1 = require("../utils/mailUtils");
const UserInfo_1 = __importDefault(require("../models/UserInfo"));
const register = async (req, res) => {
    // validation
    const { username, password, email, phone, userType } = req.body;
    try {
        // start user save user in redis
        const hashedPassword = await argon2_1.default.hash(password);
        const otp = (0, OTPUtils_1.generateOTP)();
        const userInfo = {
            username,
            password: hashedPassword,
            email,
            phone,
            userType,
        };
        const dataOtp = {
            otp: otp,
            email: email,
        };
        UserRedisRepository_1.default.set(userInfo);
        OtpRedisRepository_1.default.set(dataOtp);
        // send OTP in mail
        (0, mailUtils_1.mailRegister)(otp, email);
        (0, responseUtils_1.createResponse)(res, 200, true, 'We was send you an OPT, Please check it in your email.');
    }
    catch (err) {
        console.log(err);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal server error');
    }
};
exports.register = register;
const verifyRegister = async (req, res) => {
    const { email } = req.body;
    UserRedisRepository_1.default.get(email, (err, reply) => {
        const user = JSON.parse(reply);
        try {
            const newUser = new User_1.default(user);
            const newUserInfo = new UserInfo_1.default({
                userId: newUser._id,
                username: user.username,
                phone: user.phone,
                userType: user.userType,
            });
            newUser.save();
            newUserInfo.save();
            (0, responseUtils_1.createResponse)(res, 200, true, 'user successfully registered');
        }
        catch (error) {
            console.log(error);
            return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal server error');
        }
    });
};
exports.verifyRegister = verifyRegister;
const resendOtp = async (req, res) => {
    const otp = (0, OTPUtils_1.generateOTP)();
    const { email } = req.body;
    const dataOtp = {
        otp: otp,
        email: email,
    };
    try {
        OtpRedisRepository_1.default.set(dataOtp);
        // send OTP in mail
        (0, mailUtils_1.mailRegister)(otp, email);
        (0, responseUtils_1.createResponse)(res, 200, true, 'We was resend you an OPT, Please check it in your email again.');
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal server error');
    }
};
exports.resendOtp = resendOtp;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return (0, responseUtils_1.createResponse)(res, 404, false, 'Incorrect email or password?');
        }
        const isMatch = await argon2_1.default.verify(user.password, password);
        if (!isMatch) {
            return (0, responseUtils_1.createResponse)(res, 400, false, 'Incorrect email or password?');
        }
        const token = (0, tokenUtils_1.generateToken)(user._id);
        (0, tokenUtils_1.updateRefreshToken)(user._id, token.refreshToken);
        (0, responseUtils_1.createResponse)(res, 200, true, 'Login successful', { token, userId: user._id });
    }
    catch (err) {
        console.log(err);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal server error');
    }
};
exports.login = login;
const getRefreshToken = async (req, res) => {
    const { userId, refreshToken } = req.body;
    if (!userId || !refreshToken) {
        return (0, responseUtils_1.createResponse)(res, 400, false, 'Missing userId or refreshToken?');
    }
    try {
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const token = (0, tokenUtils_1.generateToken)(userId);
        (0, tokenUtils_1.updateRefreshToken)(userId, token.refreshToken);
        (0, responseUtils_1.createResponse)(res, 200, true, 'refreshToken successful', token);
    }
    catch (error) {
        console.log(error.name);
        if (error.name === 'TokenExpiredError') {
            const token = (0, tokenUtils_1.generateToken)(userId);
            (0, tokenUtils_1.updateRefreshToken)(userId, token.refreshToken);
            return (0, responseUtils_1.createResponse)(res, 200, true, 'refreshToken successful', token);
        }
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal server error');
    }
};
exports.getRefreshToken = getRefreshToken;
//# sourceMappingURL=authController.js.map