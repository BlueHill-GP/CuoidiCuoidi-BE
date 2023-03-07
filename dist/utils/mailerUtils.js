"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailConfig_1 = __importDefault(require("../config/mailConfig"));
const transporter = nodemailer_1.default.createTransport(mailConfig_1.default);
async function sendMail(to, subject, text) {
    const mailOptions = {
        from: mailConfig_1.default.auth.user,
        to,
        subject,
        text,
    };
    return transporter.sendMail(mailOptions);
}
exports.sendMail = sendMail;
//# sourceMappingURL=mailerUtils.js.map