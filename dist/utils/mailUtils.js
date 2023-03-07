"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailRegister = void 0;
const mailerUtils_1 = require("./mailerUtils");
const mailRegister = (otp, email) => {
    const message = `This is your OTP ${otp}`;
    (0, mailerUtils_1.sendMail)(email, `OTP Cuoidi Cuoidi`, message);
};
exports.mailRegister = mailRegister;
//# sourceMappingURL=mailUtils.js.map