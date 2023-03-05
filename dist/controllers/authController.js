"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRegister = exports.getRefreshToken = exports.login = exports.register = void 0;
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const responseUtils_1 = require("../utils/responseUtils");
const tokenUtils_1 = require("../utils/tokenUtils");
const OTPUtils_1 = require("../utils/OTPUtils");
const UserRedisRepository_1 = __importDefault(require("../repositories/UserRedisRepository"));
const OtpRedisRepository_1 = __importDefault(require("../repositories/OtpRedisRepository"));
const mailUtils_1 = require("../utils/mailUtils");
const register = async (req, res) => {
    // validation
    const { username, password, email } = req.body;
    console.log(username, password);
    try {
        //check if user already exists
        const user = await User_1.default.findOne({ username });
        if (user) {
            return (0, responseUtils_1.createResponse)(res, 400, false, 'User already exists');
        }
        // start user registration
        const hashedPassword = await argon2_1.default.hash(password);
        const otp = (0, OTPUtils_1.generateOTP)();
        const userInfo = {
            user: { username: username, password: hashedPassword, email: email },
        };
        const dataOtp = {
            otp: otp,
            email: email
        };
        UserRedisRepository_1.default.set(userInfo);
        OtpRedisRepository_1.default.set(dataOtp);
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
        console.log(typeof reply);
        console.log("verifyRegister: ", reply);
    });
};
exports.verifyRegister = verifyRegister;
const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password) {
        return (0, responseUtils_1.createResponse)(res, 400, false, 'Missing username or password?');
    }
    try {
        const user = await User_1.default.findOne({ username });
        if (!user) {
            return (0, responseUtils_1.createResponse)(res, 404, false, 'Incorrect username or password?');
        }
        const isMatch = await argon2_1.default.verify(user.password, password);
        if (!isMatch) {
            return (0, responseUtils_1.createResponse)(res, 400, false, 'Incorrect username or password?');
        }
        const token = (0, tokenUtils_1.generateToken)(user._id);
        (0, tokenUtils_1.updateRefreshToken)(user._id, token.refreshToken);
        (0, responseUtils_1.createResponse)(res, 200, true, 'Login successful', token);
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