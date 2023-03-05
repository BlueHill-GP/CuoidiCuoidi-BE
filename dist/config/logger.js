"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const express_winston_1 = __importDefault(require("express-winston"));
const logger = winston_1.default.createLogger({
    level: 'debug',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    defaultMeta: { service: 'my-service' },
    transports: [
        new winston_1.default.transports.File({ filename: 'error.log', level: 'error' }),
        new winston_1.default.transports.File({ filename: 'combined.log' }),
    ],
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.simple(),
    }));
}
exports.expressLogger = express_winston_1.default.logger({
    transports: [
        // new winston.transports.Console({
        //   format: winston.format.combine(
        //     winston.format.colorize(),
        //     winston.format.simple()
        //   )
        // }),
        new winston_1.default.transports.File({ filename: 'http.log' }),
    ],
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    meta: true,
    expressFormat: true,
    colorize: false,
    ignoreRoute: (req, res) => {
        return false;
    },
});
exports.default = logger;
//# sourceMappingURL=logger.js.map