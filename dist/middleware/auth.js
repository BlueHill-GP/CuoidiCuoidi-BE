"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const OtpRedisRepository_1 = __importDefault(require("../repositories/OtpRedisRepository"));
const responseUtils_1 = require("../utils/responseUtils");
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
        console.log('id user middleware: ', req.userId);
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
    const { otp, email } = req.body;
    try {
        await OtpRedisRepository_1.default.get(email, (err, reply) => {
            console.log(typeof reply);
            reply = JSON.parse(reply);
            console.log(reply);
            if (reply.otp === otp) {
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
//# sourceMappingURL=auth.js.map