"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBackOtpSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object({
    username: joi_1.default.string()
        .trim()
        .pattern(/^[^0-9]+$/)
        .pattern(/^\S.*\S$/)
        .replace(/[\s]+/g, ' ')
        .strict()
        .min(3)
        .regex(/^.*\S*.*$/)
        .max(30)
        .required(),
    password: joi_1.default.string()
        .pattern(/^(?=.*[a-zA-Z])/)
        .pattern(/^(?=.*\d)/)
        .pattern(/^(?=.*[!@#$%^&*])/)
        .trim()
        .strict()
        .min(6)
        .required(),
    email: joi_1.default.string()
        .email()
        .required(),
    phone: joi_1.default.string()
        .pattern(/^0\d{9}$/)
        .required(),
    userType: joi_1.default.string()
        .valid('photographer', 'makeup', 'couple')
        .required(),
});
exports.loginSchema = joi_1.default.object({
    password: joi_1.default.string()
        .pattern(/^(?=.*[a-zA-Z])/)
        .pattern(/^(?=.*\d)/)
        .pattern(/^(?=.*[!@#$%^&*])/)
        .trim()
        .strict()
        .min(6)
        .required(),
    email: joi_1.default.string()
        .email()
        .required(),
});
exports.getBackOtpSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
});
//# sourceMappingURL=userValidationSchema.js.map