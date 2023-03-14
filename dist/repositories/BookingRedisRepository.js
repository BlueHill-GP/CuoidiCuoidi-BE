"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.set = void 0;
const redisUtils_1 = __importDefault(require("../utils/redisUtils"));
const PREFIX_KEY = 'Booking:';
const EXPIRE = 300;
const set = (booking, callBack) => {
    const key = PREFIX_KEY + booking._id;
    const value = JSON.stringify(booking);
    return redisUtils_1.default.set(key, value, EXPIRE, callBack);
};
exports.set = set;
const get = (_id, callBack) => {
    return redisUtils_1.default.get(PREFIX_KEY + _id, callBack);
};
exports.get = get;
exports.default = {
    set: exports.set,
    get: exports.get,
};
//# sourceMappingURL=BookingRedisRepository.js.map