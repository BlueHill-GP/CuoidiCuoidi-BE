"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response = (res, statusCode, success, message, data) => {
    const response = { success, message, data, statusCode };
    return res.status(statusCode).json(response);
};
exports.default = response;
//# sourceMappingURL=appError.js.map