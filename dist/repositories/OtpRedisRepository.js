"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.set = void 0;
const redisUtils_1 = __importDefault(require("../utils/redisUtils"));
const PREFIX_KEY = "OTP:";
const EXPIRE = 100;
const set = (payload, callBack) => {
    const key = PREFIX_KEY + payload.email;
    const value = payload.otp;
    return redisUtils_1.default.set(key, value, EXPIRE, callBack);
};
exports.set = set;
const get = (email, callBack) => {
    return redisUtils_1.default.get(PREFIX_KEY + email, callBack);
};
exports.get = get;
exports.default = {
    set: exports.set,
    get: exports.get
};
//# sourceMappingURL=OtpRedisRepository.js.map