import { Request, Response, NextFunction } from 'express';
import qs from 'qs';
import crypto from 'crypto';
import BookingRedis from '../repositories/BookingRedisRepository';
import { createResponse as response } from '../utils/responseUtils';
import Booking from '../models/booking';
import { IBooking } from '../interfaces/module';
import { mailPaymentSuccessful } from '../utils/mailUtils';

const viewPaySuccess = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cuoidi Cuoidi</title>
</head>
<body>
    <div class="">Thanh toan thanh cong</div>
    <a href="http://localhost:3000/"> back</a>

</body>
</html>`;

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
  }
  return sorted;
}

export const handleVnPayIPN =  async(
  req: Request,
  res: Response,
) => {
  const vnpParams = req.query as Record<string, string>;
  const secureHash = vnpParams['vnp_SecureHash'];

  delete vnpParams['vnp_SecureHash'];
  delete vnpParams['vnp_SecureHashType'];

  const sortedParams = sortObject(vnpParams);
  const secretKey = process.env.VNPAY_SECRET_KEY;
  const signData = qs.stringify(sortedParams, { encode: false });
  const hmac = crypto.createHmac('sha512', secretKey);
  const signed = hmac.update(signData, 'utf-8').digest('hex');

  if (secureHash === signed) {
    const orderId = vnpParams['vnp_TxnRef'];
    const rspCode = vnpParams['vnp_ResponseCode'];
    // Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
    if (rspCode === '00') {
      BookingRedis.get(orderId, (err, reply) => {
        const booking: IBooking = JSON.parse(reply);
        try {
          booking.paymentStatus = true
          booking.bookingOrder = orderId
          delete booking._id;
          const newBooking = new Booking(booking);
          // gail notifications
          mailPaymentSuccessful(newBooking.serviceId, newBooking.customerEmail);
          newBooking.save();
         res.send(viewPaySuccess);
        } catch (error) {
          console.log(error);
          return response(res, 500, false, 'Internal server error');
        }
      });
    }
  } else {
    res.status(200).json({ RspCode: '97', Message: 'Fail checksum' });
  }
};
