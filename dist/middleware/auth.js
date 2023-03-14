"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTypeUser = exports.userGetBackOtp = exports.verifyOtp = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const OtpRedisRepository_1 = __importDefault(require("../repositories/OtpRedisRepository"));
const responseUtils_1 = require("../utils/responseUtils");
const userValidationSchema_1 = require("../validation/userValidationSchema");
const User_1 = __importDefault(require("../models/User"));
const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: 'Access token not found' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        console.log(error);
        return res
            .status(403)
            .json({ success: false, message: 'Invalid access token' });
    }
};
exports.verifyToken = verifyToken;
const verifyOtp = async (req, res, next) => {
    try {
        const { otp, email } = req.body;
        await OtpRedisRepository_1.default.get(email, (err, reply) => {
            if (reply === otp) {
                next();
            }
            else {
                return (0, responseUtils_1.createResponse)(res, 400, false, 'Invalid OTP');
            }
        });
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal server error');
    }
};
exports.verifyOtp = verifyOtp;
const userGetBackOtp = async (req, res, next) => {
    try {
        const validation = userValidationSchema_1.getBackOtpSchema.validate(req.body);
        if (validation.error) {
            return res.status(400).json({
                errors: validation.error.details[0].path[0] + ' is not a valid',
            });
        }
        const { email } = req.body;
        await OtpRedisRepository_1.default.get(email, (err, reply) => {
            if (reply) {
                next();
            }
            else {
                return (0, responseUtils_1.createResponse)(res, 400, false, 'Invalid OTP');
            }
        });
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal server error');
    }
};
exports.userGetBackOtp = userGetBackOtp;
const verifyTypeUser = async (req, res, next) => {
    try {
        const user = await User_1.default.findById(req.userId);
        if (user &&
            (user.userType === 'photographer' || user.userType === 'makeup')) {
            next();
        }
        else {
            (0, responseUtils_1.createResponse)(res, 400, false, 'You are not our partner');
        }
        ;
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal server error');
    }
};
exports.verifyTypeUser = verifyTypeUser;
//# sourceMappingURL=auth.js.map