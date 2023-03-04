import { sendMail } from "../utils/mailer";

export const mailRegister = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await sendMail(email, `New message from ${name}`, message);
    console.log('ok');

    res.send('Email sent successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send('Failed to send email');
  }
};
