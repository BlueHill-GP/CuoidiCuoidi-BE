import ServicePackage from '../models/servicePackage';
import { sendMail } from './mailerUtils';

export const mailRegister = (otp: string, email: string) => {
  const message = `This is your OTP ${otp}`;
  sendMail(email, `OTP Cuoidi Cuoidi`, message);
};

export const mailPaymentSuccessful = async (serviceId: string, email: string) => {

  try {
    const service = await ServicePackage.findById(serviceId);
    const message = `You have just successfully paid for service package ${service.title} with amount ${service.price}. We will contact you as soon as our Photogapher/Makeup astist accepts your booking.`;
    sendMail(email, `Cuoidi Cuoidi`, message);
  } catch (error) {
    console.log(error);
    
  }
};
