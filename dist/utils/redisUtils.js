"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("../config/redis"));
const set = (key, value, exTime, callBack) => {
    return redis_1.default.set(key, value, 'EX', exTime, callBack);
};
const get = (key, callBack) => {
    return redis_1.default.get(key, callBack);
};
exports.default = {
    get, set
};
//# sourceMappingURL=redisUtils.js.map