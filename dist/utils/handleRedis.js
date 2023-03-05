"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedis = exports.setRedis = void 0;
const redis_1 = __importDefault(require("../config/redis"));
const setRedis = async (key, value, exTime) => {
    return await redis_1.default.set(key, value, 'EX', exTime, (err, reply) => {
        if (err) {
            console.log(err);
            return false;
        }
        else {
            return reply;
        }
    });
};
exports.setRedis = setRedis;
const getRedis = async (key) => {
    return await redis_1.default.get(key, (err, reply) => {
        if (err) {
            return err.name;
        }
        else {
            console.log("reply:", reply.toString());
            return reply.toString();
        }
    });
};
exports.getRedis = getRedis;
//# sourceMappingURL=handleRedis.js.map