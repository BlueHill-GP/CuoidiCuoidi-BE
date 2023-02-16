"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userSchema = joi_1.default.object({
    username: joi_1.default.string()
        .pattern(/^[^0-9]+$/)
        .min(3)
        .max(30)
        .required(),
    //   email: Joi.string().email().required(),
    password: joi_1.default.string()
        .pattern(/^(?=.*[a-zA-Z])/)
        .pattern(/^(?=.*\d)/)
        .pattern(/^(?=.*[!@#$%^&*])/)
        .min(6)
        .required(),
});
//# sourceMappingURL=userValidationSchema.js.map