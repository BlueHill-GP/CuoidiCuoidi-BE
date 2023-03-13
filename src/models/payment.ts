import mongoose from 'mongoose';

export interface IPayment extends Document {
  vnpAmount: number;
  vnpBankCode: string;
  vnpBankTranNo: string;
  vnpCardType: string;
  vnpOrderInfo: string;
  vnpPayDate: Date;
  vnpResponseCode: string;
  vnpTmnCode: string;
  vnpTransactionNo: string;
  vnpTransactionStatus: string;
  vnpTxnRef: string;
  vnpSecureHash: string;
}

const paymentSchema = new mongoose.Schema({
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

const Payment = mongoose.model<IPayment>('Payment', paymentSchema);
export default Payment;