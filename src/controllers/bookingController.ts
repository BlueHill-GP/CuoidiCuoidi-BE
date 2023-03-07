import { Request, Response } from 'express';
import { IBooking } from '../interfaces/module';
import { AuthenticatedRequest } from '../interfaces/request';
import Booking from '../models/booking';
import ServicePackage from '../models/servicePackage';
import { createResponse as response } from '../utils/responseUtils';

export const createABooking = async (req: Request, res: Response) => {
  const {
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
  } = req.body;
  try {
    const newBooking: IBooking = new Booking({
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

    await newBooking.save();
    response(res, 201, true, 'Booking created successfully', newBooking);
  } catch (error) {
    console.log(error);
    return response(res, 500, false, 'Internal Server Error');
  }
};

export const updateBooking = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const bookingId = req.params.id;
    const oldBooking = await Booking.findById(bookingId);
    if (!oldBooking) {
      return response(res, 404, false, 'Booking not found');
    }

    let updatedBooking = {
      ...oldBooking.toJSON(),
      ...req.body,
    };

    const condition = { _id: bookingId, user: req.userId };

    updatedBooking = await Booking.findOneAndUpdate(condition, updatedBooking, {
      new: true,
    });

    if (!updatedBooking) {
      return response(
        res,
        404,
        false,
        'Booking not found or authorization failed'
      );
    }
    response(res, 200, true, 'Booking updated successfully');
  } catch (error) {
    console.log(error);
    return response(res, 500, false, 'Internal Server Error');
  }
};

export const updateBookingStatus = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const bookingId = req.params.id;
    const user = req.userId;
    const newBookingStatus = req.body.bookingStatus;

    const booking = await Booking.findById(bookingId);
    const servicePackage = await ServicePackage.findById(booking.serviceId);

    if (user !== servicePackage.user.toString()) {
      return response(res, 404, false, 'booking not found');
    }
    const condition = {
      _id: bookingId,
      servicePackageId: servicePackage._id.toString(),
    };

    const updateBooking = await Booking.findOneAndUpdate(
      condition,
      newBookingStatus,
      {
        new: true,
      }
    );

    console.log(updateBooking);

    response(res, 200, true, 'Booking updated successfully', updateBooking);
  } catch (error) {
    console.log(error);
    return response(res, 500, false, 'Internal Server Error');
  }
};
