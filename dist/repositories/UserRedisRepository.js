"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.set = void 0;
const redisUtils_1 = __importDefault(require("../utils/redisUtils"));
const PREFIX_KEY = 'UserInfo:';
const EXPIRE = 1800;
const set = (user, callBack) => {
    const key = PREFIX_KEY + user.email;
    const value = JSON.stringify(user);
    return redisUtils_1.default.set(key, value, EXPIRE, callBack);
};
exports.set = set;
const get = (email, callBack) => {
    return redisUtils_1.default.get(PREFIX_KEY + email, callBack);
};
exports.get = get;
exports.default = {
    set: exports.set,
    get: exports.get,
};
//# sourceMappingURL=UserRedisRepository.js.map