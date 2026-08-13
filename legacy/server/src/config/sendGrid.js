import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid";

const transporter = nodemailer.createTransport(
  sgTransport({
    apiKey: process.env.SENDGRID_API_KEY,
  })
);

export default transporter;