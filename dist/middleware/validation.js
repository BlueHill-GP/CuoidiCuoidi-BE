"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkImage = exports.userValidation = void 0;
const response_1 = require("../utils/response");
const userValidationSchema_1 = require("../validation/userValidationSchema");
const userValidation = (req, res, next) => {
    const validation = userValidationSchema_1.userSchema.validate(req.body);
    if (validation.error) {
        return res.status(400).json({
            errors: validation.error.details[0].path[0] + ' is not a valid',
        });
    }
    next();
};
exports.userValidation = userValidation;
const checkImage = (req, res, next) => {
    // console.log("hii    :",req.body);
    // console.log('hii    :', req.params);
    // console.log('hii    :', req);
    const files = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];
    console.log(files);
    if (files.length === 0) {
        return (0, response_1.createResponse)(res, 400, false, 'Please upload a file');
    }
    files.map((file) => {
        if (!file.mimetype.startsWith('image')) {
            return (0, response_1.createResponse)(res, 400, false, 'Please upload an image');
        }
    });
    next();
};
exports.checkImage = checkImage;
//# sourceMappingURL=validation.js.map