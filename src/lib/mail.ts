import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

const smtpConfig: SMTPTransport.Options = {
  host: process.env.EMAIL_SERVER_HOST as any,
  port: Number(process.env.EMAIL_SERVER_PORT),
  from: process.env.EMAIL_FROM,
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(smtpConfig);

export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
}) {
  const { to, subject, html } = opts;
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });
}
