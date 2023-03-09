"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkImage = exports.userLoginValidation = exports.userRegisterValidation = void 0;
const User_1 = __importDefault(require("../models/User"));
const responseUtils_1 = require("../utils/responseUtils");
const userValidationSchema_1 = require("../validation/userValidationSchema");
const userRegisterValidation = async (req, res, next) => {
    const validation = userValidationSchema_1.registerSchema.validate(req.body);
    if (validation.error) {
        return res.status(400).json({
            errors: validation.error.details[0].path[0] + ' is not a valid',
        });
    }
    let { email, phone } = req.body;
    try {
        email = await User_1.default.findOne({ email });
        phone = await User_1.default.findOne({ phone });
        if (email || phone) {
            return (0, responseUtils_1.createResponse)(res, 400, false, 'email or phone already exists');
        }
        next();
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal server error');
    }
};
exports.userRegisterValidation = userRegisterValidation;
const userLoginValidation = (req, res, next) => {
    const validation = userValidationSchema_1.loginSchema.validate(req.body);
    if (validation.error) {
        return res.status(400).json({
            errors: validation.error.details[0].path[0] + ' is not a valid',
        });
    }
    next();
};
exports.userLoginValidation = userLoginValidation;
const checkImage = (req, res, next) => {
    const files = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];
    if (files.length === 0) {
        return (0, responseUtils_1.createResponse)(res, 400, false, 'Please upload a file');
    }
    files.map((file) => {
        if (!file.mimetype.startsWith('image')) {
            return (0, responseUtils_1.createResponse)(res, 400, false, 'Please upload an image');
        }
    });
    next();
};
exports.checkImage = checkImage;
//# sourceMappingURL=validation.js.map