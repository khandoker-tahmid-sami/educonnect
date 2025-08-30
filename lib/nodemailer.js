import nodemailer from "nodemailer";

const email = process.env.NODEMAILER_EMAIL;
const pass = process.env.NODEMAILER_APP_PASS;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: pass,
  },
  from: email,
});

export const sendEmail = async (emailInfo) => {
  if (!emailInfo) return null;

  const response = await Promise.allSettled(
    emailInfo.map((info) => {
      if ((info.to, info.subject, info.message)) {
        const { to, subject, message } = info;
        return transporter.sendMail({
          to: to,
          subject: subject,
          html: message,
        });
      } else {
        console.log(`could not send emails ${JSON.stringify(info)}`);
      }
    })
  );

  return response;
};
