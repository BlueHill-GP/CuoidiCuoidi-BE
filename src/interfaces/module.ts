import bodyParser from 'body-parser';
import { Document } from 'mongoose';
export interface IBooking extends Document {
  customerId?: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string;
  customerGender: string;
  customerAge: number;

  bookingTime: Date;
  bookingStatus: string;
  bookingOrder:string;
  bookingAddress: string;
  serviceId: string;
  paymentStatus: boolean;
  notes?: string;
  createAt?: Date;
}
