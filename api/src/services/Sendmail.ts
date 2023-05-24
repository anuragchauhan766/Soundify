import nodemailer, {
  createTransport,
  SendMailOptions,
  TransportOptions,
} from "nodemailer";
import ErrorResponse from "../utils/ErrorResponse.js";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";

export const sendMailResetPassword = (
  to?: string,
  url?: string,
  text?: string,
  name?: string
) => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAIL_USERNAME,
      pass: process.env.NODEMAIL_PASSWORD,
    },
  });
  const mailOptions: SendMailOptions = {
    from: process.env.NODEMAIL_EMAIL_FROM,
    to: to,
    subject: "RESET YOUR PASSWORD",
    html: `<h1>hello this is test email</h1>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return err;
    }
    return info;
  });
};
