"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const BookingSchema = new mongoose_1.default.Schema({
    customerId: {
        type: String,
    },
    customerName: {
        type: String,
        required: true,
    },
    customerAddress: {
        type: String,
        required: true,
    },
    customerPhone: {
        type: String,
        required: true,
    },
    customerEmail: {
        type: String,
        required: true,
    },
    customerGender: {
        type: String,
        required: true,
    },
    customerAge: {
        type: String,
        required: true,
    },
    bookingTime: {
        type: Date,
        required: true,
    },
    bookingAddress: {
        type: String,
        required: true,
    },
    bookingStatus: {
        type: String,
        enum: ['waiting', 'accepted', 'rejected'],
        default: 'waiting',
    },
    serviceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'servicePackages',
        required: true,
    },
    owenService: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
    },
    paymentStatus: {
        type: Boolean,
        default: false,
    },
    notes: {
        type: String,
        default: '',
    },
    bookingOrder: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});
const Booking = mongoose_1.default.model('bookings', BookingSchema);
exports.default = Booking;
// const BookingSchema: Schema = new mongoose.Schema({
//   customerId: {
//     type: String,
//   },
//   customerName: {
//     type: String,
//     required: true,
//   },
//   bookingStatus: {
//     type: String,
//     default: 'waiting',
//   },
//   serviceId: {
//     type: Schema.Types.ObjectId,
//     ref: 'servicePackages',
//     required: true,
//   },
//   bookingOrder: {
//     type: String,
//   },
//   createAt: {
//     type: Date,
//     default: Date.now,
//   },
// });
// const Booking: Model<IBooking> = mongoose.model<IBooking>(
//   'bookings',
//   BookingSchema
// );
// const ServicePackageSchema: Schema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   star: {
//     type: Array<Object>,
//     default: [],
//   },
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'users',
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   createAt: {
//     type: Date,
//     default: Date.now,
//   },
// });
// const ServicePackage: Model<IServicePackage> = mongoose.model<IServicePackage>(
//   'servicePackages',
//   ServicePackageSchema
// );
//# sourceMappingURL=booking.js.map