"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBookingOfCouple = exports.getAllBookingByUser = exports.updateBookingStatus = exports.updateBooking = exports.createABooking = void 0;
const booking_1 = __importDefault(require("../models/booking"));
const servicePackage_1 = __importDefault(require("../models/servicePackage"));
const responseUtils_1 = require("../utils/responseUtils");
const BookingRedisRepository_1 = __importDefault(require("../repositories/BookingRedisRepository"));
const mailUtils_1 = require("../utils/mailUtils");
const testSocketIo_1 = require("./testSocketIo");
const createABooking = async (req, res) => {
    const { customerId, customerName, customerAddress, customerPhone, customerEmail, customerGender, customerAge, bookingTime, bookingAddress, bookingStatus, serviceId, owenService, paymentStatus, notes, } = req.body;
    try {
        const newBooking = new booking_1.default({
            customerId,
            customerName,
            customerAddress,
            customerPhone,
            customerEmail,
            customerGender,
            customerAge,
            bookingTime,
            bookingAddress,
            bookingStatus,
            serviceId,
            owenService,
            paymentStatus,
            notes,
        });
        BookingRedisRepository_1.default.set(newBooking);
        console.log(newBooking);
        (0, testSocketIo_1.notification)(owenService, "booking test!!!");
        (0, responseUtils_1.createResponse)(res, 201, true, 'Booking created successfully', newBooking._id);
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
};
exports.createABooking = createABooking;
const updateBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        console.log(bookingId);
        const oldBooking = await booking_1.default.findById(bookingId);
        if (!oldBooking) {
            return (0, responseUtils_1.createResponse)(res, 404, false, 'Booking not found');
        }
        let updatedBooking = Object.assign(Object.assign({}, oldBooking.toJSON()), req.body);
        const condition = { _id: bookingId, user: req.userId };
        updatedBooking = await booking_1.default.findOneAndUpdate(condition, updatedBooking, {
            new: true,
        });
        if (!updatedBooking) {
            return (0, responseUtils_1.createResponse)(res, 404, false, 'Booking not found or authorization failed');
        }
        (0, responseUtils_1.createResponse)(res, 200, true, 'Booking updated successfully');
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
};
exports.updateBooking = updateBooking;
const updateBookingStatus = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const user = req.userId;
        const newBookingStatus = { bookingStatus: req.body.bookingStatus };
        console.log('newBookingStatus', newBookingStatus);
        const booking = await booking_1.default.findById(bookingId);
        const servicePackage = await servicePackage_1.default.findById(booking.serviceId);
        if (user !== servicePackage.user.toString()) {
            return (0, responseUtils_1.createResponse)(res, 404, false, 'booking not found');
        }
        const condition = {
            _id: bookingId,
        };
        const updateBooking = await booking_1.default.findOneAndUpdate(condition, newBookingStatus, {
            new: true,
        });
        if (!updateBooking) {
            return (0, responseUtils_1.createResponse)(res, 404, false, 'updateBooking failed');
        }
        (0, testSocketIo_1.sendDataAndNotification)(updateBooking.owenService, updateBooking.customerId, 'Your booking has been updated', updateBooking);
        (0, responseUtils_1.createResponse)(res, 200, true, 'Booking updated successfully', updateBooking);
        (0, mailUtils_1.mailUpdateBookingStatus)(updateBooking);
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
};
exports.updateBookingStatus = updateBookingStatus;
const getAllBookingByUser = async (req, res) => {
    const { userId } = req;
    try {
        const bookings = await booking_1.default.find({ owenService: userId });
        console.log(bookings);
        (0, responseUtils_1.createResponse)(res, 200, true, 'get all bookings successfully', bookings);
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
};
exports.getAllBookingByUser = getAllBookingByUser;
const getAllBookingOfCouple = async (req, res) => {
    const { userId } = req;
    console.log("adfasdf", userId);
    try {
        const bookings = await booking_1.default.find({ customerId: userId });
        console.log(bookings);
        (0, responseUtils_1.createResponse)(res, 200, true, 'get all bookings successfully', bookings);
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
};
exports.getAllBookingOfCouple = getAllBookingOfCouple;
//# sourceMappingURL=bookingController.js.map