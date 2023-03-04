"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS_EMAIL,
    },
};
//# sourceMappingURL=mailConfig.js.map