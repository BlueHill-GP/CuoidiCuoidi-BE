"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
const client = redis_1.default.createClient({
    host: 'localhost',
    port: 6379
});
client.on('connect', () => {
    console.log('Redis client connected');
});
client.on('error', (err) => {
    console.error('Redis client error:', err);
});
exports.default = client;
//# sourceMappingURL=redis.js.map