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
const viewMomo = `<!DOCTYPE html>
<html>

<head>
    <title>
    </title>
    <script>
        window.location.href = 'http://13.54.229.100/user-booking';
    </script>
</head>

<body>
    <h1>
    </h1>
</body>

</html>`;
const viewVnpSuccess = `<!DOCTYPE html>
<html><head><title></title><style>.container { width: 100%; height: 100%; display: flex;
align-items: center; justify-content: center; } .row{ justify-content: center !important; display: flex; flex-direction: column; align-items: center; } .view-message__row{ display: flex; justify-content: center;
} .view-message{ padding: 8rem 0;
} .view-message.view-message--success .view-message__image { filter: drop-shadow(0 5px 15px rgba(240, 196, 25, 0.3))
} .view-message .view-message__title { font-size: 3rem; margin: 3rem 0 1rem;
} .view-message.view-message--success .view-message__title { color: #4fba6f;
} .view-message.view-message--error .view-message__title { color: #ff5d5d;
} .view-message .view-message__text { font-size: 1.3rem;
} .view-message__btn{ display: inline-block; padding: 1rem 2rem; color: #fff; background-color: #4fba6f; text-decoration: none; transition: all ease-in-out .3s;
}
.view-message__btn:hover,
.view-message__btn:focus{ text-decoration: none;
} .view-message.view-message--success .view-message__btn:hover { color: #fff; background-color: #222;
} .view-message.view-message--error .view-message__btn { color: #fff; background-color: #222;
} @media screen and (max-width: 667px){ .view-message .view-message__image { max-width: 4rem; } .view-message .view-message__title { font-size: 2rem; margin: 1rem; } .view-message .view-message__title__icon { font-size: 1.3rem; } .view-message .view-message__text { font-size: 1.1rem; }
} </style>
</head><body><div class="container"><a href="https://www.example.com" id="myLink"></a><div class="row"><div class="col-lg-8 mx-auto"><div class="view-message view-message--success text-center py-5 row"><img src="https://i.ibb.co/yByr2gQ/success.png" alt="success" class="view-message__image img-fluid"><h3 class="view-message__title">Payment Success <i class="far fa-check-circle view-message__title__icon"></i></h3><p class="view-message__text">Your payment is successfull Done !</p></div></div></div></div>
</body><script>setTimeout(function () { window.location.href = 'http://13.54.229.100/user-booking'; console.log('ok'); }, 3000); </script></html>`;
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
    if (vnpParams.resultCode === '0') {
        BookingRedisRepository_1.default.get(vnpParams.orderId, async (err, reply) => {
            const booking = JSON.parse(reply);
            try {
                booking.paymentStatus = true;
                booking.bookingOrder = vnpParams.orderId;
                delete booking._id;
                const newBooking = new booking_1.default(booking);
                // gail notifications
                (0, mailUtils_1.mailPaymentSuccessful)(newBooking.serviceId, newBooking.customerEmail);
                // socketio message to partner
                await newBooking.save();
                (0, testSocketIo_1.notification)(booking.owenService, 'New booking momo!!!');
                (0, testSocketIo_1.sendDataBooking)(booking.owenService, newBooking);
                res.send(viewMomo);
            }
            catch (error) {
                console.log(error);
                return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal server error');
            }
        });
    }
    else {
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
                        (0, testSocketIo_1.notification)(booking.owenService, 'New booking!!!');
                        (0, testSocketIo_1.sendDataBooking)(booking.owenService, newBooking);
                        newBooking.save();
                        res.send(viewVnpSuccess);
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
    }
};
exports.handleVnPayIPN = handleVnPayIPN;
//# sourceMappingURL=paymentController.js.map