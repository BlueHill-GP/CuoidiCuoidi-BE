"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailRegister = void 0;
const mailerUtils_1 = require("../utils/mailerUtils");
const mailRegister = async (req, res) => {
    const { name, email, message } = req.body;
    try {
        await (0, mailerUtils_1.sendMail)(email, `New message from ${name}`, message);
        console.log('ok');
        res.send('Email sent successfully');
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Failed to send email');
    }
};
exports.mailRegister = mailRegister;
//# sourceMappingURL=mailerController.js.map