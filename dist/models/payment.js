"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const paymentSchema = new mongoose_1.default.Schema({
    vnpAmount: Number,
    vnpBankCode: String,
    vnpBankTranNo: String,
    vnpCardType: String,
    vnpOrderInfo: String,
    vnpPayDate: Date,
    vnpResponseCode: String,
    vnpTmnCode: String,
    vnpTransactionNo: String,
    vnpTransactionStatus: String,
    vnpTxnRef: String,
    vnpSecureHash: String,
});
const Payment = mongoose_1.default.model('Payment', paymentSchema);
exports.default = Payment;
//# sourceMappingURL=payment.js.map