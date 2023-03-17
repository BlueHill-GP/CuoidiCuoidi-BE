"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.set = void 0;
const redisUtils_1 = __importDefault(require("../utils/redisUtils"));
const PREFIX_KEY = 'SOCKET:';
const EXPIRE = 100000;
const set = (payload, callBack) => {
    const key = PREFIX_KEY + payload.userId;
    const value = payload.userSocketId;
    return redisUtils_1.default.set(key, value, EXPIRE, callBack);
};
exports.set = set;
const get = (userId, callBack) => {
    return redisUtils_1.default.get(PREFIX_KEY + userId, callBack);
};
exports.get = get;
exports.default = {
    set: exports.set,
    get: exports.get,
};
//# sourceMappingURL=UserSocketRepository.js.map