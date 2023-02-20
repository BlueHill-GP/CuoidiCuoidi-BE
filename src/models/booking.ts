import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBooking extends Document {
  partnerId: string;
  customerId: string;
  serviceId: string;
  paymentStatus: string;
  notes?: string;
  createAt?: Date;
}

const BookingSchema: Schema = new mongoose.Schema({
  partnerId: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking: Model<IBooking> = mongoose.model<IBooking>('bookings', BookingSchema);

export default Booking;
