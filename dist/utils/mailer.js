"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailConfig_1 = __importDefault(require("../mailConfig"));
const transporter = nodemailer_1.default.createTransport(mailConfig_1.default);
function sendMail(to, subject, text) {
    return __awaiter(this, void 0, void 0, function* () {
        const mailOptions = {
            from: mailConfig_1.default.auth.user,
            to,
            subject,
            text,
        };
        return transporter.sendMail(mailOptions);
    });
}
exports.sendMail = sendMail;
//# sourceMappingURL=mailer.js.map