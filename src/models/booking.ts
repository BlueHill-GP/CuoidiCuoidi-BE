import mongoose, { Schema, Model } from 'mongoose';
import { IBooking } from '../interfaces/module';

const BookingSchema: Schema = new mongoose.Schema({
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
    default: 'waiting',
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'servicePackages',
    required: true,
  },
  paymentStatus: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
    default: '',
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking: Model<IBooking> = mongoose.model<IBooking>(
  'bookings',
  BookingSchema
);

export default Booking;
