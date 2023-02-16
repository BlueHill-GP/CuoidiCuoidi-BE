"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponse = void 0;
const createResponse = (res, statusCode, success, message, data) => {
    const response = { statusCode, success, message, data };
    return res.status(statusCode).json(response);
};
exports.createResponse = createResponse;
//# sourceMappingURL=response.js.map