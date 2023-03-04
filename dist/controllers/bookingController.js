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
exports.updateBookingStatus = exports.updateBooking = exports.createABooking = void 0;
const booking_1 = __importDefault(require("../models/booking"));
const servicePackage_1 = __importDefault(require("../models/servicePackage"));
const response_1 = require("../utils/response");
const createABooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId, customerName, customerAddress, customerPhone, customerEmail, customerGender, customerAge, bookingTime, bookingAddress, bookingStatus, serviceId, paymentStatus, notes, } = req.body;
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
            paymentStatus,
            notes,
        });
        yield newBooking.save();
        (0, response_1.createResponse)(res, 201, true, 'Booking created successfully', newBooking);
    }
    catch (error) {
        console.log(error);
        return (0, response_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
});
exports.createABooking = createABooking;
const updateBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingId = req.params.id;
        const oldBooking = yield booking_1.default.findById(bookingId);
        if (!oldBooking) {
            return (0, response_1.createResponse)(res, 404, false, 'Booking not found');
        }
        let updatedBooking = Object.assign(Object.assign({}, oldBooking.toJSON()), req.body);
        const condition = { _id: bookingId, user: req.userId };
        updatedBooking = yield booking_1.default.findOneAndUpdate(condition, updatedBooking, {
            new: true,
        });
        if (!updatedBooking) {
            return (0, response_1.createResponse)(res, 404, false, 'Booking not found or authorization failed');
        }
        (0, response_1.createResponse)(res, 200, true, 'Booking updated successfully');
    }
    catch (error) {
        console.log(error);
        return (0, response_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
});
exports.updateBooking = updateBooking;
const updateBookingStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingId = req.params.id;
        const user = req.userId;
        const newBookingStatus = req.body.bookingStatus;
        const booking = yield booking_1.default.findById(bookingId);
        const servicePackage = yield servicePackage_1.default.findById(booking.serviceId);
        if (user !== servicePackage.user.toString()) {
            return (0, response_1.createResponse)(res, 404, false, 'booking not found');
        }
        const condition = {
            _id: bookingId,
            servicePackageId: servicePackage._id.toString(),
        };
        const updateBooking = yield booking_1.default.findOneAndUpdate(condition, newBookingStatus, {
            new: true,
        });
        console.log(updateBooking);
        (0, response_1.createResponse)(res, 200, true, 'Booking updated successfully', updateBooking);
    }
    catch (error) {
        console.log(error);
        return (0, response_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
});
exports.updateBookingStatus = updateBookingStatus;
//# sourceMappingURL=bookingController.js.map