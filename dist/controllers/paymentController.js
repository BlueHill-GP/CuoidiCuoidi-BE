"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleVnPayIPN = void 0;
const qs_1 = __importDefault(require("qs"));
const crypto_1 = __importDefault(require("crypto"));
const BookingRedisRepository_1 = __importDefault(require("../repositories/BookingRedisRepository"));
const responseUtils_1 = require("../utils/responseUtils");
const booking_1 = __importDefault(require("../models/booking"));
const mailUtils_1 = require("../utils/mailUtils");
const testSocketIo_1 = require("./testSocketIo");
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
const handleVnPayIPN = async (req, res) => {
    const vnpParams = req.query;
    const secureHash = vnpParams['vnp_SecureHash'];
    delete vnpParams['vnp_SecureHash'];
    delete vnpParams['vnp_SecureHashType'];
    const sortedParams = sortObject(vnpParams);
    const secretKey = process.env.VNPAY_SECRET_KEY;
    const signData = qs_1.default.stringify(sortedParams, { encode: false });
    const hmac = crypto_1.default.createHmac('sha512', secretKey);
    const signed = hmac.update(signData, 'utf-8').digest('hex');
    if (secureHash === signed) {
        const orderId = vnpParams['vnp_TxnRef'];
        const rspCode = vnpParams['vnp_ResponseCode'];
        // Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
        if (rspCode === '00') {
            BookingRedisRepository_1.default.get(orderId, async (err, reply) => {
                const booking = JSON.parse(reply);
                try {
                    booking.paymentStatus = true;
                    booking.bookingOrder = orderId;
                    delete booking._id;
                    const newBooking = new booking_1.default(booking);
                    // gail notifications
                    (0, mailUtils_1.mailPaymentSuccessful)(newBooking.serviceId, newBooking.customerEmail);
                    // socketio message to partner
                    (0, testSocketIo_1.notification)(booking.owenService, "New booking!!!");
                    newBooking.save();
                    res.send(viewPaySuccess);
                }
                catch (error) {
                    console.log(error);
                    return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal server error');
                }
            });
        }
    }
    else {
        res.status(200).json({ RspCode: '97', Message: 'Fail checksum' });
    }
};
exports.handleVnPayIPN = handleVnPayIPN;
//# sourceMappingURL=paymentController.js.map