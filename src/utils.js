import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-mailgun-transport";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};
// nodemailer + mailgun --> env + utils + server.js
const sendMail = (email) => {
  const options = {
    auth: {
      domain: process.env.MAILGUN_DOMAIN,
      api_key: process.env.MAILGUN_API,
    },
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (adress, secret) => {
  const email = {
    from: "bobob935@naver.com",
    to: adress,
    subject: "🔒Login Secret for Schoolgram🔒",
    html: `Hello! Your login secret it ${secret}.<br/>Copy paste on the app/website to log in`,
  };
  return sendMail(email);
};
