"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailUpdateBookingStatus = exports.mailPaymentSuccessful = exports.mailRegister = void 0;
const servicePackage_1 = __importDefault(require("../models/servicePackage"));
const mailerUtils_1 = require("./mailerUtils");
const mailRegister = (otp, email) => {
    const message = `This is your OTP ${otp}`;
    (0, mailerUtils_1.sendMail)(email, `OTP Cuoidi Cuoidi`, message);
};
exports.mailRegister = mailRegister;
const mailPaymentSuccessful = async (serviceId, email) => {
    try {
        const service = await servicePackage_1.default.findById(serviceId);
        const message = `You have just successfully paid for service package ${service.title} with amount ${service.price}. We will contact you as soon as our Photogapher/Makeup astist accepts your booking.`;
        (0, mailerUtils_1.sendMail)(email, `Cuoidi Cuoidi`, message);
    }
    catch (error) {
        console.log(error);
    }
};
exports.mailPaymentSuccessful = mailPaymentSuccessful;
const mailUpdateBookingStatus = async (booking) => {
    let message = ``;
    if (booking.bookingStatus === 'accepted') {
        message = 'Accepted';
    }
    else {
        message = 'Rejected';
    }
    (0, mailerUtils_1.sendMail)(booking.customerEmail, `Cuoidi Cuoidi`, message);
};
exports.mailUpdateBookingStatus = mailUpdateBookingStatus;
//# sourceMappingURL=mailUtils.js.map