"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
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
//# sourceMappingURL=validation.js.map