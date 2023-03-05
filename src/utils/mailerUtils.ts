import nodemailer from 'nodemailer';
import mailConfig from '../config/mailConfig';

const transporter = nodemailer.createTransport(mailConfig);

export async function sendMail(to: string, subject: string, text: string) {
  const mailOptions = {
    from: mailConfig.auth.user,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
}
