"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkImage = exports.userValidation = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const userValidationSchema_1 = require("../validation/userValidationSchema");
const userValidation = (req, res, next) => {
    const validation = userValidationSchema_1.loginSchema.validate(req.body);
    if (validation.error) {
        return res.status(400).json({
            errors: validation.error.details[0].path[0] + ' is not a valid',
        });
    }
    next();
};
exports.userValidation = userValidation;
const checkImage = (req, res, next) => {
    console.log(req);
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