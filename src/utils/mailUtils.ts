import { sendMail } from './mailerUtils';

export const mailRegister = (otp: string, email: string) => {
  const message = `This is your OTP ${otp}`;
  sendMail(email, `OTP Cuoidi Cuoidi`, message);
};
